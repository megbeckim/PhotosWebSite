const assert = require('assert').strict;

const { Given, When, Then, AfterAll } = require('@cucumber/cucumber');
const { Builder, By, until, TimeUnit, WebElement } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const driver = new Builder()
    .forBrowser('chrome')
    .usingServer('http://localhost:4444/wd/hub')
    .build();

async function findMatchingSelfOrAncestor(element, predicate) {
    while(false == await predicate(element)) {
        element = await element.findElement(By.xpath('parent::*'));
    }
    return element;
}

async function checkVisible(element) {
    const rect = await element.getRect();

    element = await findMatchingSelfOrAncestor(
            element,
            async el => 'none' != await driver.executeScript('return getComputedStyle(arguments[0]).pointerEvents', el)
        );

    let elementAtPoint = await driver.executeScript(
        `return document.elementFromPoint(arguments[0], arguments[1]);`, rect.x, rect.y);

    elementAtPoint = await findMatchingSelfOrAncestor(
            elementAtPoint,
            async el => await el.getTagName() == 'body' || await WebElement.equals(el, element)
        );

    const isVisible = await WebElement.equals(elementAtPoint, element);
    return isVisible;
}

function xpathForText(text) {
    return By.xpath(`//*[normalize-space(.) = '${ text }' and not(.//*[normalize-space(.) = '${ text }'])]`)
}

When('I browse to {string}', { timeout: 10000 }, url => driver.get(`http:${ url }`) );

When('I wait {int} second(s)', seconds => new Promise( resolve => setTimeout(resolve, seconds * 1000) ) );

Then('the title is {string}',
    expectedTitle => driver.getTitle()
                .then( title => assert.equal(title, expectedTitle) ) );

Then('I see {string}',
    text => driver.wait( until.elementLocated( xpathForText(text) ) )
                .then( element => checkVisible(element) )
                .then( visible => assert( visible, `The string '${ text }' was not visible` ) ));

When('I click on {string}',
    text => driver.wait( until.elementLocated( xpathForText(text) ) )
                .then( element => element.click() ));

AfterAll( () => driver.quit() );
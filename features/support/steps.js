const assert = require('assert').strict;

const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { until, Key, By, Origin } = require('selenium-webdriver');

const { driver } = require('./browser');
const { checkVisible, xpathForText, xpathForIcon, scroll } = require('./utils');

setDefaultTimeout(10 * 1000);

When('I browse to {string}', async function(url) {
        // without this next line, one of the tests fails
        await driver.get("data:,");
        return driver.get(`https:${ url.replace('faganphotos.com', this.parameters.baseUrl) }`);
    } );

When('I wait {int} second(s)', seconds => new Promise( resolve => setTimeout(resolve, seconds * 1000) ) );

Then('the title is {string}',
    expectedTitle => driver.getTitle()
                .then( title => assert.equal(title, expectedTitle) ) );

Then('I {}see {string}',
    (negator, text) => driver.wait( until.elementLocated( xpathForText(text) ) )
                .then( element => checkVisible(element) )
                .then( visible => assert.equal( visible, negator === undefined, `The string '${ text }' was${ visible ? '' : ' not' } visible` ) ));

When('I click on {string}',
    text => driver.wait( until.elementLocated( xpathForText(text) ) )
                .then( element => element.click() ));

When('I press escape',
    () => driver.actions()
             .sendKeys(Key.ESCAPE)
             .perform());

When('I press right arrow',
    () => driver.actions()
             .sendKeys(Key.ARROW_RIGHT)
             .perform());

When('I press left arrow',
    () => driver.actions()
             .sendKeys(Key.ARROW_LEFT)
             .perform());

Then('I {}see the {word} icon',
    (negator, iconName) => driver.wait( until.elementLocated( xpathForIcon(iconName) ) )
                .then( element => checkVisible(element) )
                .then( visible => assert.equal( visible, negator === undefined, `The '${ iconName }' icon was${ visible ? '' : ' not' } visible` ) ));

When('I click on the {word} icon',
    iconName => driver.wait( until.elementLocated( xpathForIcon(iconName) ) )
                          .then( element => element.click() ) );

When('I scroll {word} {int} pixels',
    (direction, distance) => scroll(direction, distance) );

When('I move the mouse',
    () => driver.actions().move({x: 10, y: 0, origin: Origin.POINTER}).perform() );

When('I click the mouse',
    () => driver.actions().press().release().perform() );
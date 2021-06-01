const assert = require('assert').strict;

const { Given, When, Then } = require('@cucumber/cucumber');
const { until, Key, By } = require('selenium-webdriver');

const { driver } = require('./browser');
const { checkVisible, xpathForText, xpathForIcon, scroll } = require('./utils');

When('I browse to {string}', { timeout: 10000 }, async url => {
        // without this next line, one of the tests fails
        await driver.get("data:,");
        return driver.get(`http:${ url }`);
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

Then('I {}see the {word} icon',
    (negator, iconName) => driver.wait( until.elementLocated( xpathForIcon(iconName) ) )
                .then( element => checkVisible(element) )
                .then( visible => assert.equal( visible, negator === undefined, `The '${ iconName }' icon was${ visible ? '' : ' not' } visible` ) ));

When('I click on the {word} icon',
    iconName => driver.wait( until.elementLocated( xpathForIcon(iconName) ) )
                          .then( element => element.click() ) );

const scrollDirections = {
    down: 1,
    up: -1
}
When('I scroll {word} {int} pixels',
    (direction, distance) => scroll(direction, distance) );
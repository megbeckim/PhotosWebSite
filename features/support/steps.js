const assert = require('assert').strict;

const { Given, When, Then } = require('@cucumber/cucumber');
const { until } = require('selenium-webdriver');

const { driver } = require('./browser');
const { findMatchingSelfOrAncestor, checkVisible, xpathForText } = require('./utils');

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
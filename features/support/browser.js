const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { AfterAll } = require('@cucumber/cucumber');

const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().addArguments('ignore-certificate-errors'))
    .build();

AfterAll( () => driver.quit() );

module.exports.driver = driver;
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { AfterAll } = require('@cucumber/cucumber');

const driver = new Builder()
    .forBrowser('chrome')
    .build();

AfterAll( () => driver.quit() );

module.exports.driver = driver;
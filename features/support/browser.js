const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { AfterAll } = require('@cucumber/cucumber');

const driver = new Builder()
    .forBrowser('chrome')
    .usingServer('http://localhost:4444/wd/hub')
    .build();

AfterAll( () => driver.quit() );

module.exports.driver = driver;
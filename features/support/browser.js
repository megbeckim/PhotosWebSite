const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { AfterAll, Before } = require('@cucumber/cucumber');
const { Type, Level } = require('selenium-webdriver/lib/logging');

let driver = null;

Before(async function() {
    if (driver === null) {
        let options = new chrome.Options()
            .addArguments('ignore-certificate-errors')
            .addArguments('--hide-scrollbars');
        if (this.parameters.headless) {
            options = options.headless().windowSize({width:1200, height:833-124});
        } else {
            options = options.windowSize({width:1200, height:833});
        }
        driver = new Builder()
                 .forBrowser('chrome')
                 .setLoggingPrefs({[Type.BROWSER]: Level.ALL.name})
                 .setChromeOptions(options)
                 .build();
    }

    this.driver = driver;
    this.headless = this.parameters.headless;
});

AfterAll( async function() {
    return driver.quit();
});

const assert = require('assert').strict;

const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { until, Key, By, Origin } = require('selenium-webdriver');

const { xpathForText, xpathForIcon, scroll, checkScreenshot } = require('./utils');

setDefaultTimeout(15 * 1000);

When('I browse to {string}', async function(url) {
        // without this next line, one of the tests fails
        await this.driver.get("data:,");
        return this.driver.get(`https:${ url.replace('faganphotos.com', this.parameters.baseUrl) }`);
    }
);

When('I wait {float} second(s)',
    async function(seconds) {
        return new Promise( resolve => setTimeout(resolve, seconds * 1000) );
    }
);

Then('the title is {string}',
    async function(expectedTitle) {
        return this.driver.getTitle()
            .then( title => assert.equal(title, expectedTitle) );
    }
);

When('I click on {string}',
    async function(text) {
        return this.driver.wait( until.elementLocated( xpathForText(text) ) )
            .then( element => element.click() );
    }
);

When('I press escape',
    async function() {
        return this.driver.actions()
            .sendKeys(Key.ESCAPE)
            .perform();
     }
);

When('I press right arrow',
    async function() {
        return this.driver.actions()
             .sendKeys(Key.ARROW_RIGHT)
             .perform();
    }
);

When('I press left arrow',
    async function() {
        return this.driver.actions()
            .sendKeys(Key.ARROW_LEFT)
            .perform();
    }
);

When('I press space',
    async function() {
        console.log('sending "a" now');
        return this.driver.actions()
            .sendKeys('a')
            .perform();
    }
);

When('I click on the {word} icon',
    async function(iconName) {
       return this.driver.wait( until.elementLocated( xpathForIcon(iconName) ) )
          .then( element => element.click() );
    }
);

When('I scroll {word} {int} pixels',
    async function(direction, distance) {
        return scroll.call(this, direction, distance);
    }
);

When('I move the mouse',
    async function() {
        return this.driver.actions().move({x: 10, y: 0, origin: Origin.POINTER}).perform();
    }
);

When('I click the mouse',
    async function() {
        return this.driver.actions().press().release().perform();
    }
);

Then('the screen matches the {string} screenshot',
    async function(screenshotName) {
        return checkScreenshot.call(this, screenshotName);
    }
);

When('I move the mouse to the top {word} corner',
    async function(horizontalPlacement) {
        let x;
        if (horizontalPlacement === 'left') {
            x = 0;
        } else {
            const body = this.driver.findElement(By.xpath('/html/body'));
            x = (await body.getRect()).width;
            console.log('from right, x =', x);
        }

        return this.driver.actions().move({duration: 0,  origin: Origin.VIEWPORT, x: x}).perform();
    }
);
const { By } = require('selenium-webdriver');
const { Type } = require('selenium-webdriver/lib/logging');
const { Before, BeforeAll } = require('@cucumber/cucumber');
const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

let scenarioName =  null;
let logAtStart;

BeforeAll( () => fs.rmdirSync('failedTestsScreenshots', { recursive: true } ) );

Before( async function(scenario) {
        scenarioName = scenario.pickle.name;

        await this.driver.actions().move({duration: 0 }).perform();
     }
 );

Before( async function(scenario) {
        logAtStart = await this.driver.manage().logs().get(Type.BROWSER);
     }
 );

async function findMatchingSelfOrAncestor(element, matchTest, abandonTest = el => false) {
    if (element === null || 'html' === await element.getTagName()) {
        return null;
    }

    if (await abandonTest(element)) {
        return null;
    }

    if (await matchTest(element)) {
        return element;
    }

    const parentElement = await element.findElement(By.xpath('parent::*'));

    return findMatchingSelfOrAncestor(parentElement, matchTest, abandonTest);
}

async function findFirstMatching(elements, matchTest) {
    if (elements.length === 0) {
        return null;
    }

    const [ firstElement, ...rest ] = elements;

    if (await matchTest(firstElement)) {
        return firstElement;
    }

    return findFirstMatching(rest, matchTest);
}

function xpathForText(text) {
    return By.xpath(`//*[normalize-space(.) = '${ text }' and not(.//*[normalize-space(.) = '${ text }'])]`)
}

function xpathForIcon(iconName) {
    return By.xpath(`//*[local-name() = "svg" and @data-icon="${ iconName }"]`);
}

const scrollDirections = {
    down: 1,
    up: -1
}

async function scroll(direction, distance) {
    let rect = await this.driver.manage().window().getRect();

    let elementCoveringMiddlePoint = await this.driver.executeScript(
        `return document.elementFromPoint(arguments[0], arguments[1]);`, rect.width/2, rect.height/2);

    let scrollableElementCoveringMiddlePoint = await findMatchingSelfOrAncestor(
                elementCoveringMiddlePoint,
                async el => 'scroll' === await this.driver.executeScript('return getComputedStyle(arguments[0]).overflow', el)
            );

//    console.log('scrollableElementCoveringMiddlePoint', scrollableElementCoveringMiddlePoint);

    return this.driver.executeScript(`arguments[0].scrollBy(0, ${ distance * scrollDirections[direction] });`, scrollableElementCoveringMiddlePoint);
}

const MAX_TIME = 13 * 1000;

async function checkScreenshot(screenshotName) {
    const expectedScreenshot = fs.readFileSync(`features/expectedScreenshots/${screenshotName}.png`);
    const expectedScreenshotImage = PNG.sync.read(expectedScreenshot);
    const { width, height } = expectedScreenshotImage;
    const differenceImage = new PNG({ width, height });

    let screenshotBase64 = null;
    let matched = false;
    let failedAttempts = [];
    let screenshotImage = null;

    const threshold = this.parameters.headless ? 0.1 : 0.15;
    const maxMismatchedPixels = this.parameters.headless ? 0 : 100;

    let startTime = Date.now();
    while (Date.now() - startTime < MAX_TIME && !matched) {

        screenshotBase64 = await this.driver.takeScreenshot();
        screenshotImage = PNG.sync.read(Buffer.from(screenshotBase64, 'base64'));

        const mismatchedPixelCount = pixelmatch(screenshotImage.data, expectedScreenshotImage.data,
            differenceImage.data, width, height, {threshold: threshold});

        if (mismatchedPixelCount <= maxMismatchedPixels) {
            matched = true;
            break;
        };

        failedAttempts.push({ name: `${ screenshotName }_at_${ Date.now() }`, screenshot: screenshotBase64 });

        await new Promise( resolve => setTimeout(resolve, 25) );
    }

    if (! matched) {
        // print out the browser logs
        console.log(`\nBrowser log for '${scenarioName}:'`);
        const log = await this.driver.manage().logs().get(Type.BROWSER);
        log.slice(logAtStart.length).forEach( entry => console.log(entry.level.name, entry.message ) );

        failedAttempts.push({ name: screenshotName, screenshot: screenshotBase64 });

        const actualDirectory = `failedTestsScreenshots/${ scenarioName }`;
        fs.mkdirSync(actualDirectory, { recursive: true });

        failedAttempts.forEach( ({ name, screenshot }) => {
                const actualFile = `${ actualDirectory }/${ name }.png`;
                fs.writeFileSync(actualFile, Buffer.from(screenshot, 'base64'));
            }
        )

        const diffFile = `${ actualDirectory }/${ screenshotName }-diff.png`;
        fs.writeFileSync(diffFile, PNG.sync.write(differenceImage));

        throw `screen did not match expected screenshot; actuals and diff have been stored in ${ actualDirectory }`;
    }
}

module.exports = { xpathForText, xpathForIcon, scroll, checkScreenshot };
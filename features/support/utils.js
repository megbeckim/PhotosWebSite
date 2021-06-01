const { By, WebElement } = require('selenium-webdriver');
const { driver } = require('./browser');

async function isTransparent(element) {
    return '0' === await driver.executeScript('return getComputedStyle(arguments[0]).opacity', element)
}

// TODO define in terms of above
async function isNotTransparent(element) {
    return '0' !== await driver.executeScript('return getComputedStyle(arguments[0]).opacity', element)
}

async function acceptsPointerEvents(element) {
    return 'none' !== await driver.executeScript('return getComputedStyle(arguments[0]).pointerEvents', element)
}

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

async function checkVisible(element) {
    const screenBefore = await driver.takeScreenshot();

    const oldStyle = await element.getAttribute('style');

    await driver.executeScript('arguments[0].style.visibility="hidden";', element);

    const screenAfter = await driver.takeScreenshot();

    await driver.executeScript(`arguments[0].style="${ oldStyle }";`, element);

    const screenRecovered = await driver.takeScreenshot();

    if (screenRecovered !== screenBefore) {
        // must have run into an animation! try this again
        return checkVisible(element);
    }

    return screenBefore !== screenAfter;
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
    let rect = await driver.manage().window().getRect();

    let elementCoveringMiddlePoint = await driver.executeScript(
        `return document.elementFromPoint(arguments[0], arguments[1]);`, rect.width/2, rect.height/2);

    let scrollableElementCoveringMiddlePoint = await findMatchingSelfOrAncestor(
                elementCoveringMiddlePoint,
                async el => 'scroll' === await driver.executeScript('return getComputedStyle(arguments[0]).overflow', el)
            );

    return driver.executeScript(`arguments[0].scrollBy(0, ${ distance * scrollDirections[direction] });`, scrollableElementCoveringMiddlePoint);
}

module.exports = { xpathForText, xpathForIcon, checkVisible, scroll };
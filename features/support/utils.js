const { By, WebElement } = require('selenium-webdriver');
const { driver } = require('./browser');

async function findMatchingSelfOrAncestor(element, predicate) {
    while(false == await predicate(element)) {
        element = await element.findElement(By.xpath('parent::*'));
    }
    return element;
}

async function checkVisible(element) {
    const rect = await element.getRect();

    const clickableElement = await findMatchingSelfOrAncestor(
            element,
            async el => 'none' != await driver.executeScript('return getComputedStyle(arguments[0]).pointerEvents', el)
        );

    const elementAtPoint = await driver.executeScript(
        `return document.elementFromPoint(arguments[0], arguments[1]);`, rect.x + rect.width/2, rect.y + rect.height/2);

    // if there is no element at that point in the window (e.g., it is outside of the view pane) ...
    if (elementAtPoint === null) {
        // ... then that counts as invisible
        return false;
    }

    const clickableElementAtPoint = await findMatchingSelfOrAncestor(
            elementAtPoint,
            async el => await el.getTagName() == 'body' || await WebElement.equals(el, clickableElement)
        );

    const isVisible = await WebElement.equals(clickableElementAtPoint, clickableElement);
    return isVisible;
}

function xpathForText(text) {
    return By.xpath(`//*[normalize-space(.) = '${ text }' and not(.//*[normalize-space(.) = '${ text }'])]`)
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

module.exports = { xpathForText, checkVisible, findMatchingSelfOrAncestor, scroll };
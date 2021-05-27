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

    element = await findMatchingSelfOrAncestor(
            element,
            async el => 'none' != await driver.executeScript('return getComputedStyle(arguments[0]).pointerEvents', el)
        );

    let elementAtPoint = await driver.executeScript(
        `return document.elementFromPoint(arguments[0], arguments[1]);`, rect.x + rect.width/2, rect.y + rect.height/2);

    elementAtPoint = await findMatchingSelfOrAncestor(
            elementAtPoint,
            async el => await el.getTagName() == 'body' || await WebElement.equals(el, element)
        );

    const isVisible = await WebElement.equals(elementAtPoint, element);
    return isVisible;
}

function xpathForText(text) {
    return By.xpath(`//*[normalize-space(.) = '${ text }' and not(.//*[normalize-space(.) = '${ text }'])]`)
}

module.exports = { xpathForText, checkVisible, findMatchingSelfOrAncestor };
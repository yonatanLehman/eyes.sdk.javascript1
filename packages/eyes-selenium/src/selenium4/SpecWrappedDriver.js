const {TypeUtils} = require('@applitools/eyes-sdk-core')
const {By, Builder, until} = require('selenium-webdriver')
const cmd = require('selenium-webdriver/lib/command')
const SeleniumFrame = require('../SeleniumFrame')
const SeleniumWrappedElement = require('../SeleniumWrappedElement')

/**
 * @typedef {import('selenium-webdriver').WebDriver} Driver
 * @typedef {import('./SpecWrappedElement').Element} Element
 * @typedef {import('./SpecWrappedElement').Selector} Selector
 *
 * @typedef {import('@applitools/eyes-sdk-core').SpecDriver<Driver, Element, Selector>} SeleniumSpecDriver
 */

function isEqualFrames(leftFrame, rightFrame) {
  return SeleniumFrame.equals(leftFrame, rightFrame)
}
function createFrameReference(reference) {
  return SeleniumFrame.fromReference(reference)
}
function createElement(logger, driver, element, selector) {
  return new SeleniumWrappedElement(logger, driver, element, selector)
}
function toSupportedSelector(selector) {
  return SeleniumWrappedElement.toSupportedSelector(selector)
}
function toEyesSelector(selector) {
  return SeleniumWrappedElement.toEyesSelector(selector)
}
async function executeScript(driver, script, ...args) {
  return driver.executeScript(script, ...args)
}
async function sleep(driver, ms) {
  return driver.sleep(ms)
}
async function switchToFrame(driver, reference) {
  return driver.switchTo().frame(reference)
}
async function switchToParentFrame(driver) {
  return driver.switchTo().parentFrame()
}
async function findElement(driver, selector) {
  try {
    if (TypeUtils.isString(selector)) {
      selector = By.css(selector)
    }
    return await driver.findElement(selector)
  } catch (err) {
    if (err.name === 'NoSuchElementError') return null
    else throw err
  }
}
async function findElements(driver, selector) {
  if (TypeUtils.isString(selector)) {
    selector = By.css(selector)
  }
  return driver.findElements(selector)
}
async function getWindowLocation(driver) {
  const {x, y} = await driver
    .manage()
    .window()
    .getRect()
  return {x, y}
}
async function setWindowLocation(driver, location) {
  await driver
    .manage()
    .window()
    .setRect(location)
}
async function getWindowSize(driver) {
  try {
    const {width, height} = await driver
      .manage()
      .window()
      .getRect()
    return {width, height}
  } catch (err) {
    // workaround for Appium
    return driver.execute(
      new cmd.Command(cmd.Name.GET_WINDOW_SIZE).setParameter('windowHandle', 'current'),
    )
  }
}
async function setWindowSize(driver, size) {
  await driver
    .manage()
    .window()
    .setRect(size)
}
async function getOrientation(driver) {
  const capabilities = await driver.getCapabilities()
  const orientation = capabilities.get('orientation') || capabilities.get('deviceOrientation')
  return orientation.toLowerCase()
}
async function isMobile(driver) {
  const capabilities = await driver.getCapabilities()
  const platformName = capabilities.get('platformName')
  return platformName ? ['android', 'ios'].includes(platformName.toLowerCase()) : false
}
async function isAndroid(driver) {
  const capabilities = await driver.getCapabilities()
  const platformName = capabilities.get('platformName')
  return platformName ? platformName.toLowerCase() === 'android' : false
}
async function isIOS(driver) {
  const capabilities = await driver.getCapabilities()
  const platformName = capabilities.get('platformName')
  return platformName ? platformName.toLowerCase() === 'ios' : false
}
async function isNative(driver) {
  const capabilities = await driver.getCapabilities()
  const platformName = capabilities.get('platformName')
  const browserName = capabilities.get('browserName')
  return platformName
    ? ['android', 'ios'].includes(platformName.toLowerCase()) && !browserName
    : false
}
async function getPlatformVersion(driver) {
  const capabilities = await driver.getCapabilities()
  return capabilities.get('platformVersion')
}
async function getBrowserName(driver) {
  const capabilities = await driver.getCapabilities()
  return capabilities.get('browserName')
}
async function getBrowserVersion(driver) {
  const capabilities = await driver.getCapabilities()
  return capabilities.get('browserVersion')
}
async function getSessionId(driver) {
  const session = await driver.getSession()
  return session.getId()
}
async function takeScreenshot(driver) {
  return driver.takeScreenshot()
}
async function getTitle(driver) {
  return driver.getTitle()
}
async function getUrl(driver) {
  return driver.getCurrentUrl()
}
async function visit(driver, url) {
  return driver.get(url)
}

/* -------- FOR TESTING PURPOSES -------- */

async function build({capabilities, serverUrl = process.env.CVG_TESTS_REMOTE}) {
  return new Builder()
    .withCapabilities(capabilities)
    .usingServer(serverUrl)
    .build()
}
async function cleanup(driver) {
  return driver.quit()
}
async function click(driver, el) {
  if (TypeUtils.isString(el)) {
    el = await findElement(driver, el)
  }
  return el.click()
}
async function type(_driver, el, keys) {
  return el.sendKeys(keys)
}
async function waitUntilDisplayed(driver, selector, timeout) {
  const el = await findElement(driver, selector)
  return driver.wait(until.elementIsVisible(el), timeout)
}
async function getElementRect(_driver, el) {
  return el.getRect()
}

/** @type {SeleniumSpecDriver} */
module.exports = {
  isEqualFrames,
  createFrameReference,
  createElement,
  toSupportedSelector,
  toEyesSelector,
  executeScript,
  sleep,
  switchToFrame,
  switchToParentFrame,
  findElement,
  findElements,
  getWindowLocation,
  setWindowLocation,
  getWindowSize,
  setWindowSize,
  getOrientation,
  isMobile,
  isAndroid,
  isIOS,
  isNative,
  getPlatformVersion,
  getBrowserName,
  getBrowserVersion,
  getSessionId,
  takeScreenshot,
  getTitle,
  getUrl,
  visit,
  build,
  cleanup,
  click,
  type,
  waitUntilDisplayed,
  getElementRect,
}

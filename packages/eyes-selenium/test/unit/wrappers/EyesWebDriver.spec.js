'use strict';

require('chromedriver');
const assert = require('assert');

const { Builder, Capabilities, By } = require('selenium-webdriver');
const { Eyes, EyesWebElement } = require('../../../index');

describe('EyesWebDriver', function () {
  this.timeout(5 * 60 * 1000);

  it('findElement', async function () {
    const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

    const eyes = new Eyes();
    await eyes.open(driver, 'EyesWebDriver test', 'test findElement');
    await driver.get('https://applitools.com/helloworld');

    const element = await eyes.getDriver().findElement(By.css('button'));
    assert.ok(element instanceof EyesWebElement);
    assert.strictEqual(await element.getText(), 'Click me!');

    await driver.quit();
    await eyes.abortIfNotClosed();
  });
});

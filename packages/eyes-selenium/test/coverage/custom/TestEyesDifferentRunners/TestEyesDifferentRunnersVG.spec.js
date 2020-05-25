'use strict'
const {
  BrowserType,
  MatchLevel,
} = require('../../../../index')
const {getDriver, getBatch, getEyes} = require('../util/TestSetup')
const {testSetup, getCheckSettings, validateVG} = require('../util/EyesDifferentRunners')
const batch = getBatch()

describe('TestEyesDifferentRunners VG', () => {
  afterEach(async function () {
    await this.webDriver.quit()
    await this.eyes.abortIfNotClosed()
  })

  beforeEach(async function() {
    this.webDriver = await getDriver('CHROME')
    this.eyes = await getEyes('VG')
    let conf = this.eyes.getConfiguration()
    conf.setTestName(`Top Sites - ${this.currentTest.title}`)
    conf.setAppName(`Top Sites`)
    conf.setBatch(batch)
    conf.addBrowser(800, 600, BrowserType.CHROME)
    conf.addBrowser(700, 500, BrowserType.FIREFOX)
    conf.addBrowser(1200, 800, BrowserType.IE_10)
    conf.addBrowser(1200, 800, BrowserType.IE_11)
    this.eyes.setConfiguration(conf)
    this.eyes.setSaveNewTests(false)
    await this.eyes.open(this.webDriver)
  })

  let testCase = testSetup(getCheckSettings, validateVG)
  let cases = [
    ['https://amazon.com', MatchLevel.Layout],
    ['https://applitools.com/docs/topics/overview.html', MatchLevel.Strict],
    ['https://applitools.com/features/frontend-development', MatchLevel.Strict],
    ['https://docs.microsoft.com/en-us/', MatchLevel.Strict],
  ]
  cases.forEach(testData => {
    it(testData[0], testCase(...testData))
  })
})

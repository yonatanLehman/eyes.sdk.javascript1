'use strict'
const path = require('path')
const cwd = process.cwd()
const spec = require(path.resolve(cwd, 'src/SpecWrappedDriver'))
const {getEyes, Browsers} = require('../util/TestSetup')
const {TestCheckLongOutOfBoundsIFrameModal} = require('./TestFluentApi_utils')

describe('Coverage tests', () => {
  let driver, eyes

  afterEach(async () => {
    await eyes.abortIfNotClosed()
    await spec.cleanup(driver)
  })

  beforeEach(async () => {
    driver = await spec.build({capabilities: Browsers.chrome()})
    await spec.visit(driver, 'https://applitools.github.io/demo/TestPages/FramesTestPage/')
    eyes = await getEyes({branchName: 'v2'})
    eyes.setMatchTimeout(0)
  })

  it('TestCheckLongOutOfBoundsIFrameModal_Scroll', () =>
    TestCheckLongOutOfBoundsIFrameModal({
      testName: 'TestCheckLongOutOfBoundsIFrameModal_Scroll',
      eyes,
      driver,
    }))
})

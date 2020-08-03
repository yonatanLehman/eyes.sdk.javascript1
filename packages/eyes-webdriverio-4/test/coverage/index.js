const {
  makeEmitter,
  makeTemplate,
  supportedTests,
} = require('@applitools/sdk-shared/coverage-tests/generic')

module.exports = {
  name: 'eyes.webdriverio.javascript4',
  out: './test/coverage/generic',
  ext: '.spec.js',
  initialize: makeEmitter,
  testFrameworkTemplate: makeTemplate,
  supportedTests,
}

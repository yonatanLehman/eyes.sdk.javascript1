const path = require('path')
const {readFileSync} = require('fs')
const {createReport} = require('../../report')
const {sendReport} = require('../../send-report')
const {logDebug} = require('../../log')

async function processReport(args) {
  const {name: sdkName, metaPath} = require(path.join(process.cwd(), args.path))
  const results = readFileSync(path.resolve(process.cwd(), 'coverage-test-report.xml'), {
    encoding: 'utf-8',
  })
  const metaDataFile = readFileSync(
    path.resolve(process.cwd(), metaPath || '', 'coverage-tests-metadata.json'),
  )
  const metaData = JSON.parse(metaDataFile)
  logDebug(metaData)
  const isSandbox = args.sendReport === 'sandbox'
  process.stdout.write(`\nSending report to QA dashboard ${isSandbox ? '(sandbox)' : ''}... `)
  const report = createReport({
    sdkName,
    xmlResult: results,
    sandbox: isSandbox,
    id: args.reportId,
    metaData,
  })
  logDebug(report)
  const result = await sendReport(report)
  process.stdout.write(result.isSuccessful ? 'Done!\n' : 'Failed!\n')
}

module.exports = {
  processReport,
}

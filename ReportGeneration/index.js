const reporter = require('cucumber-html-reporter');
const testRunMetadata = require('../reports/testRunMetadata.json');

const options = {
  theme: 'bootstrap',
  jsonFile: './reports/cucumber_report.json',
  output: './reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  launchReport: false,
  screenshotsDirectory: 'screenshots/',
  storeScreenshots: true,
  metadata: testRunMetadata,
};

reporter.generate(options);

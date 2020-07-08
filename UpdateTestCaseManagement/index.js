/* eslint-disable no-console */
const features = require('./modules/ParseFeatureFiles/readFeatureFiles.js');
const processing = require('./modules/ParseFeatureFiles/processFeatureFiles.js');
const results = require('./modules/ParseTestResults/addTestResults.js');
const jira = require('./modules/JiraClient/jiraProcessing.js');
const transition = require('./modules/JiraClient/transitionTicket.js');

const testResults = require('../reports/cucumber_report.json');

console.log(__dirname);
console.log(process.cwd());

const directory = `${process.cwd()}/features`;

// Read in feature files
const featureFiles = features.readFilesSync(directory);
// console.log(featureFiles);

// Process the feature files
const processedFeatureFiles = processing.processFeatureFiles(featureFiles);
// console.log(processedFeatureFiles);

// Add the results to the feature files
const withResults = results.addTestResults(processedFeatureFiles, testResults);
// console.log(withResults);

// at this point should have everything needed to process JIRA tickets

// Put LOOP of all tickets here
withResults.map(
  (test) => {
    const description = jira.constructDescription(test.steps, test.exampleHeader, test.examples);
    const fields = jira.constructFields(test.summary, description, test.failedSteps, test.tagline);
    jira.editTicketFields(test.ticket, fields);
    transition.transitionTicketToCorrectState(test.ticket, test.result);
    jira.assign(test.ticket);
  },
);
// Update consequetive pass and fail fields

// Check Epic

// End of LOOP all Jira process

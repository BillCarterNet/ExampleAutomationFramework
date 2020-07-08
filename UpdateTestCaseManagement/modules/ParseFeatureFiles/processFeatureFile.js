const ghelper = require('../../../features/support/generalHelper.js');
const line = require('./identifyLine.js');
const getTag = require('./getTicketFromTagLine.js');
const getFeature = require('./getFeatureFromFeatureLine.js');

module.exports = {
  /**
  *
  * Processes an individual feature file that has been read in
  * Output an array of scenario objects that can be used to update JIRA tickets
  *
  * @param { object } featureFile feature file text
  * @returns { array } array of scenarios from the feature file
  *
  */
  processFeatureFile(featureFile) {
    const scenarios = [];
    const text = ghelper.breakStringIntoArray(featureFile.content);
    let scenario = {};
    let feature = '';
    text.map(
      (featureFileLine, index) => {
        // Process Feature Line
        if (line.indentifyLine(featureFileLine) === 'feature') {
          feature = getFeature.getFeature(featureFileLine);
        }
        // Process Tag Lines
        if (line.indentifyLine(featureFileLine) === 'tag') {
          if (!ghelper.isObjectEmpty(scenario)) {
            scenarios.push(scenario);
            scenario = {};
          }
          scenario.feature = feature;
          scenario.tagline = featureFileLine;
          scenario.ticket = getTag.getTicket(featureFileLine);
          scenario.result = 'none';
        }
        // Process summary lines
        if (line.indentifyLine(featureFileLine) === 'summary') {
          scenario.summary = featureFileLine;
        }
        // Process step lines
        if (line.indentifyLine(featureFileLine) === 'step') {
          if (scenario.steps !== undefined) {
            scenario.steps.push(featureFileLine);
          } else {
            scenario.steps = [];
            scenario.steps.push(featureFileLine);
          }
        }
        // Process example header lines
        if (line.indentifyLine(featureFileLine) === 'exampleHeader') {
          scenario.exampleHeader = featureFileLine;
        }
        // Process example value lines
        if (line.indentifyLine(featureFileLine) === 'example') {
          if (scenario.examples !== undefined) {
            scenario.examples.push(featureFileLine);
          } else {
            scenario.examples = [];
            scenario.examples.push(featureFileLine);
          }
        }
        // Push the scenario
        if (index === text.length - 1) {
          scenarios.push(scenario);
        }
      },
    );
    return scenarios;
  },
};

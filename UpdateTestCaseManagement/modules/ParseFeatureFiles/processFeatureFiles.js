const processing = require('./processFeatureFile');

module.exports = {
  /**
  *
  * Processes the feature files that have been read in
  * Outputs them as an array of scenario objects
  * Which can then be used in the process of updating JIRA tickets
  *
  * @param { object } readFeatureFiles feature files read in from the solution
  * @returns { Array<Object> } an array of ALL scenarios from ALL feature files
  *
  */
  processFeatureFiles(readFeatureFiles) {
    let processedScenarios = [];
    readFeatureFiles.map(
      (feature) => {
        processedScenarios = processedScenarios.concat(processing.processFeatureFile(feature));
      },
    );
    return processedScenarios;
  },

};

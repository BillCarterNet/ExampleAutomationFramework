/* eslint-disable no-console */
const scan = require('./scanStepsForFail.js');

module.exports = {
  /**
  *
  * Add the test results to the scenarios
  *
  * @param { array } scenarios an array of scenarios (read from feature files)
  * @param { array } testResults results of the test execution
  * @returns { array } scenarios with tests results added
  *
  */
  addTestResults: (scenarios, testResults) => {
    // Loop through scenarios built from the feature files
    scenarios.map(
      (scenario) => {
        // get the ticket from the scenario
        const tag = `@${scenario.ticket}`;
        // loop through the testResults feature files for a match
        testResults.map(
          (feature) => {
            // Continue if the feature files match
            if (scenario.feature === feature.name) {
              // loop through the elements
              feature.elements.map(
                (element) => {
                  if (tag === element.tags[0].name) {
                    // Determine if any steps (that we care about) have failed?
                    if (scan.scanSteps(element.steps).length === 0) {
                    // If none have scenario is passed
                      scenario.result = 'passed';
                    } else {
                    // Otherwise there are failed steps
                      scenario.result = 'failed';
                      // scenario.failedSteps = scan.scanSteps(element.steps);
                      // scenario.failedSteps.push(scan.scanSteps(element.steps));
                      if (!scenario.failedSteps) {
                        scenario.failedSteps = [];
                      }
                      scenario.failedSteps.push(
                        {
                          example: element.name,
                          steps: scan.scanSteps(element.steps),
                        },
                      );
                    }
                  }
                },
              );
            }
          },
        );
        // If any failed steps (from any example in the scenario) mark the scenario as failed
        if (scenario.failedSteps) {
          scenario.result = 'failed';
        }
      },
    );
    return scenarios;
  },
};

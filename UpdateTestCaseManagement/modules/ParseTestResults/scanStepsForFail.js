const bdd = require('./isBddLine');

module.exports = {
  /**
  *
  * Scan through the steps for a scenario and look for fails
  *
  * @param { array } steps array of scenarios steps from result file
  * @returns { array } failed scenario steps
  *
  */
  scanSteps: (steps) => {
    const failedSteps = [];
    steps.map(
      (step) => {
        if ((step.result.status === 'failed') && bdd.includesKeyWord(step.keyword)) {
          failedSteps.push(step);
        }
      },
    );
    return failedSteps;
  },
};

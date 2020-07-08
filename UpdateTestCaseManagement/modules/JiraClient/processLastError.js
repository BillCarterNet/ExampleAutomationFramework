const gHelper = require('../../../features/support/generalHelper.js');

module.exports = {
  processLastError: (failedSteps) => {
    let lastError = '';
    // Loop through array of errors
    failedSteps.map(
      (failure) => {
        lastError += gHelper.addNewLineToString('[Example]');
        lastError += gHelper.addNewLineToString(failure.example);
        lastError += gHelper.addNewLineToString('[Failed Step]');
        lastError += gHelper.addNewLineToString(failure.steps[0].keyword + failure.steps[0].name);
        lastError += gHelper.addNewLineToString('[Code Line]');
        lastError += gHelper.addNewLineToString(failure.steps[0].match.location);
        lastError += gHelper.addNewLineToString('[Error]');
        lastError += gHelper.addNewLineToString(failure.steps[0].result.error_message);
        lastError += gHelper.addNewLineToString(' ');
      },
    );
    return lastError;
  },
};

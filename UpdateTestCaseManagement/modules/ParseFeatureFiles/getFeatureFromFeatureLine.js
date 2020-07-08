/* eslint-disable no-console */
module.exports = {
  /**
  *
  * Processes an feature line and extracts the feature
  *
  * @param { string } featureLine from a scenario
  * @returns { string } the feature
  *
  */
  getFeature: (featureLine) => {
    const searchString = 'Feature:';
    // console.log('In Here');
    // console.log('featureLine=', featureLine);
    const startIndex = featureLine.indexOf(searchString) + searchString.length;
    const feature = featureLine.substring(startIndex).trim();
    // console.log('feature=', feature);
    return feature;
  },
};

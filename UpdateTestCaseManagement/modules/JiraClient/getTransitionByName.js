const process = require('./jiraProcessing.js');

module.exports = {
  getTransitionByName: (transitionName, transitions) => {
    let matchedTransition = null;
    transitions.map(
      (transition) => {
        // console.log(transition.name, transitionName);
        if (transition.name === transitionName) {
          matchedTransition = transition;
        }
      },
    );
    if (!matchedTransition) {
      console.error('Unable to match [', transitionName, '] by name');
    }
    return matchedTransition;
  },
};

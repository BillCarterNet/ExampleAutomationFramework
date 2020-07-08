const scope = require('../support/scope');

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const testData = {

  getUniqueUsername: () => `${scope.testId}-UserName-${new Date().getTime().toString()}`,

  getUniqueFakeEmail: () => `${scope.testId}-Email-${new Date().getTime().toString()}@testing.co.uk`,

  loremIpsumLength: (n) => loremIpsum.substring(0,n), 

  phoneUs1: '+1-202-555-0191',
  phoneUs2: '+1-202-555-0198',

};

module.exports = testData;

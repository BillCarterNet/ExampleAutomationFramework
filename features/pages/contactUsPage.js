const scope = require('../support/scope');
const pHelper = require('../support/puppeteerHelper');
const testConfig = require('../support/testConfig');

const selectors = {

};

module.exports = {
    
    getH1: async () => {
        const h1 = await pHelper.getElementInnertext('h1');
        return h1.trim();
    },

};
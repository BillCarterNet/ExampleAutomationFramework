const scope = require('../support/scope');
const pHelper = require('../support/puppeteerHelper');
const testConfig = require('../support/testConfig');

const selectors = {
    myPersonalInformationButton: 'a[title="Information"]',
    myAddressesButton: 'a[title="Addresses"]',
};

module.exports = {
    
    getH1: async () => {
        const h1 = await pHelper.getElementInnertext('h1');
        return h1.trim();
    },

    clickMyPersonalInformationButton: async () => {
        await pHelper.clickButton(selectors.myPersonalInformationButton);
    },

    clickMyAddressesButton: async () => {
        await pHelper.clickButton(selectors.myAddressesButton);
    },

    waitForPersonalInformationButtonToDisappear: async () => {
        await pHelper.waitForElementToDisappear(selectors.myPersonalInformationButton);
    },

    waitForMyAddressesButtonToDisappear: async () => {
        await pHelper.waitForElementToDisappear(selectors.myAddressesButton);
    },

};
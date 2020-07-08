const scope = require('../support/scope');
const pHelper = require('../support/puppeteerHelper');
const testConfig = require('../support/testConfig');

const selectors = {

    signInButton: 'div.header_user_info',
    contactUsButton: 'div.contact_link',

};

module.exports = {

    goToHomePage: async () => {
        await scope.context.currentPage.goto(testConfig.homePageUrl);
    },

};
const scope = require('../support/scope');
const pHelper = require('../support/puppeteerHelper');
const testConfig = require('../support/testConfig');

const selectors = {

    signInButton: '#SubmitLogin',
    signInEmailInput: '#email',
    signInPasswordInput: '#passwd',
    createAnAccountButton: '#SubmitCreate',
    createAnAccountEmailInput: '#email_create',

};

module.exports = {
    
    clickCreateAccountButton: async () => {
        await pHelper.clickButton(selectors.createAnAccountButton);
    },

    clickSignInButton: async () => {
        await pHelper.clickButton(selectors.signInButton);
    },

    enterRegistrationEmail: async (email) => {
        await pHelper.inputText(selectors.createAnAccountEmailInput, email);
    },

    enterSignInEmail: async (email) => {
        await pHelper.inputText(selectors.signInEmailInput, email);
    },

    enterSignInPassword: async (password) => {
        await pHelper.inputText(selectors.signInPasswordInput, password);
    }

};
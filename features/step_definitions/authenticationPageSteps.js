// Cucumber, scope and helpers
const { Given, When, Then } = require('cucumber');
const pHelper = require('../support/puppeteerHelper');
const gHelper = require('../support/generalHelper');
const scope = require('../support/scope');

// Config and data
const testConfig = require('../support/testConfig');
const testData = require('../support/testData');

// Chai assertion library
const chai = require('chai');
const { expect } = chai;

// Pages
const authenticationPage = require('../pages/authenticationPage');

// Mailslurp
const mailSlurpHelper = require('../support/mailSlurpHelper');

//Steps

When('I enter and un-registered email', async () => {

    scope.registrationEmailFake = testData.getUniqueFakeEmail();
    console.log(scope.registrationEmailFake);
    await authenticationPage.enterRegistrationEmail(scope.registrationEmailFake);

});

When('I enter a registered email {string}', async (email) => {

    await authenticationPage.enterSignInEmail(email);

});

When('I enter a password {string}', async (password) => {

    await authenticationPage.enterSignInPassword(password);

})

When('I click Create an account', async () => {

    await authenticationPage.clickCreateAccountButton();

});

When('I click Sign in', async () => {

    await authenticationPage.clickSignInButton();

});






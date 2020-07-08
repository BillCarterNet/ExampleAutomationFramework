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
const myAccountPage = require('../pages/myAccountPage');

// Mailslurp
const mailSlurpHelper = require('../support/mailSlurpHelper');

//Steps

Then('I am taken to my account page', async () => {

    const actualH1 = await myAccountPage.getH1();
    const expectedH1 = 'My account';
    await expect(actualH1).to.equal(expectedH1);

});



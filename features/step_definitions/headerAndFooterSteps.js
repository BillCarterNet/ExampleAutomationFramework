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
const headerAndFooter = require('../pages/headerAndFooter');

// Mailslurp
const mailSlurpHelper = require('../support/mailSlurpHelper');

//Steps

When('I click "Sign in" in the header', async () => {

    await headerAndFooter.clickHeaderSignInButton();

});

When('I click Contact us in the {string}', async (location) => {

    switch (location) {
        case "header": 
            await headerAndFooter.clickHeaderContactUsButton();
            break;
        case "footer":
            await headerAndFooter.clickFooterContactUsButton();
            break;
        default:
            console.log(`Unable to find Contact Us button for ${location}`);
    }
});



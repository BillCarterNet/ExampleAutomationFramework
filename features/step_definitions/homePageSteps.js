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
const homePage = require('../pages/homePage');

// Mailslurp
const mailSlurpHelper = require('../support/mailSlurpHelper');

//Steps

Given('I am on the homepage', async () => {

    await homePage.goToHomePage();

});



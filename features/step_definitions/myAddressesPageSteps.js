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
const myAddressesPage = require('../pages/myAddressesPage');
const myAccountPage = require('../pages/myAccountPage');

// Mailslurp
const mailSlurpHelper = require('../support/mailSlurpHelper');

//Steps

Then('my entered address is displayed correctly on the my address page', async () => {

    // Get to page
    await myAccountPage.clickMyAddressesButton();
    await myAccountPage.waitForMyAddressesButtonToDisappear();

    // Verify I am on the my addresses page
    let actualH1 = await myAddressesPage.getH1();
    let expectedH1 = 'My addresses';
    await expect(actualH1).to.equal(expectedH1);

    // Get all the address from the page that was input during account creation
    const address = await myAddressesPage.getAddressForAlias(scope.registration_addressAlias.toUpperCase());

    //Verify information
    await expect(address.firstName).to.equal(scope.registration_firstName);
    await expect(address.lastName).to.equal(scope.registration_lastName);
    await expect(address.company).to.equal(scope.registration_company);
    await expect(address.addressLine1).to.equal(scope.registration_addressLine1);
    await expect(address.addressLine2).to.equal(scope.registration_addressLine2);
    await expect(address.city).to.equal(scope.registration_city);
    await expect(address.state).to.equal(scope.registration_state);
    await expect(address.zipPostcode).to.equal(scope.registration_zipPostalCode);
    await expect(address.country).to.equal(scope.registration_country);
    await expect(address.homePhone).to.equal(scope.registration_homePhone);
    await expect(address.mobilePhone).to.equal(scope.registration_mobilePhone);

    // Go back to my account page
    await myAddressesPage.clickBreadcrumbMyAccount();
    await myAddressesPage.waitForBreadcrumbCurrentPageToChange();

    // Verify I am on the my account page
    actualH1 = await myAccountPage.getH1();
    expectedH1 = 'My account';
    await expect(actualH1).to.equal(expectedH1);

});





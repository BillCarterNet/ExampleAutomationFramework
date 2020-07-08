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
const yourPersonalInformationPage = require('../pages/yourPersonalInformationPage');
const myAccountPage = require('../pages/myAccountPage');

// Mailslurp
const mailSlurpHelper = require('../support/mailSlurpHelper');

//Steps

Then('my entered personal information is displayed correctly on the my personal informtion page', async () => {

    // Get to page
    await myAccountPage.clickMyPersonalInformationButton();
    await myAccountPage.waitForPersonalInformationButtonToDisappear();

    // Verify I am on the your personal information page
    let actualH1 = await yourPersonalInformationPage.getH1();
    let expectedH1 = 'Your personal information';
    await expect(actualH1).to.equal(expectedH1);

    // Verify title
    const actualTitle = await yourPersonalInformationPage.getTitle();
    const expectedTitle = scope.registration_title;
    await expect(actualTitle).to.equal(expectedTitle);

    // Check first name
    const actualFirstName = await yourPersonalInformationPage.getFirstName();
    const expectedFirstName = scope.registration_firstName;
    await expect(actualFirstName).to.equal(expectedFirstName);

    // Check last name
    const actualLastName = await yourPersonalInformationPage.getLastName();
    const expectedLastName = scope.registration_lastName;
    await expect(actualLastName).to.equal(expectedLastName);

    // Check email
    const actualEmail = await yourPersonalInformationPage.getEmail();
    const expectedEmail = scope.registrationEmailFake;
    await expect(actualEmail).to.equal(expectedEmail);

    // Check date of birth
    const actualDay = await yourPersonalInformationPage.getSelectedDay();
    const expectedDay = scope.registration_dob_day;
    await expect(actualDay).to.equal(expectedDay);
    const actualMonth = await yourPersonalInformationPage.getSelectedMonth();
    const expectedMonth = scope.registration_dob_month;
    await expect(actualMonth).to.equal(expectedMonth);
    const actualYear = await yourPersonalInformationPage.getSelectedYear();
    const expectedYear = scope.registration_dob_year;
    await expect(actualYear).to.equal(expectedYear);

    // Check tickboxes
    const actualNewsletterCheckBoxState = await yourPersonalInformationPage.getNewsletterCheckBoxState();
    const expectedNewsletterCheckBoxState = scope.registration_newsletter;
    await expect(actualNewsletterCheckBoxState).to.equal(expectedNewsletterCheckBoxState);
    const actualSpecialOffersCheckBoxState = await yourPersonalInformationPage.getSpecialOffersCheckBoxState();
    const expectedSpecialOffersCheckBoxState = scope.registration_offers;
    await expect(actualSpecialOffersCheckBoxState).to.equal(expectedSpecialOffersCheckBoxState);

    // Go back to my account page
    await yourPersonalInformationPage.clickBreadcrumbMyAccount();
    await yourPersonalInformationPage.waitForBreadcrumbCurrentPageToChange();

    // Verify I am on the my account page
    actualH1 = await myAccountPage.getH1();
    expectedH1 = 'My account';
    await expect(actualH1).to.equal(expectedH1);

});





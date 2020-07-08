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
const createAccountPage = require('../pages/createAccountPage');

// Mailslurp
const mailSlurpHelper = require('../support/mailSlurpHelper');

//Steps

When('I fill in the registration form', async() => {

    await createAccountPage.enterPersonalInformationTitle('female');
    await createAccountPage.enterPersonalInformationFirstName('Minato');
    await createAccountPage.enterPersonalInformationLastName('Namikaze');
    // Email address is remembered from authentication page
    await createAccountPage.enterPersonalInformationPassword('Bill1984!');
    await createAccountPage.enterPersonalInformationDob('15', 'March', '1960');
    await createAccountPage.tickPersonalInformationNewsletter();
    await createAccountPage.tickPersonalInformationSpecialOffers();
    await createAccountPage.enterYourAddressFirstName('Minato');
    await createAccountPage.enterYourAddressLastName('Namikaze');
    await createAccountPage.enterYourAddressCompany('The Hokages');
    await createAccountPage.enterYourAddressAddressLine1('Flat 303 Roland Road');
    await createAccountPage.enterYourAddressAddressLine2('District 808');
    await createAccountPage.enterYourAddressCity('Konohagakure');
    await createAccountPage.enterYourAddressState('Texas');
    await createAccountPage.enterYourAddressZipPostCode('90210');
    await createAccountPage.enterYourAddressCountry();
    // Selecting Country blanks out the previously set State
    await createAccountPage.enterYourAddressState('Texas');
    await createAccountPage.enterYourAddressAdditionalInfo(testData.loremIpsumLength(300));
    await createAccountPage.enterYourAddressHomePhone(testData.phoneUs1);
    await createAccountPage.enterYourAddressMobilePhone(testData.phoneUs2);
    await createAccountPage.enterYourAddressAddressAlias('The 4th');

});

When('I click register', async () => {

    await createAccountPage.clickRegisterButton();
    await pHelper.takeSceenshot();

});

When('I enter my title as {string}', async (title) => {

    scope.registration_title = title;
    await createAccountPage.enterPersonalInformationTitle(title);

});

When('I enter my name as {string} and {string}', async (firstname, lastname) => {

    scope.registration_firstName = firstname;
    await createAccountPage.enterPersonalInformationFirstName(firstname);

    scope.registration_lastName = lastname;
    await createAccountPage.enterPersonalInformationLastName(lastname);

});

When('I enter my password as {string}', async (password) => {

    await createAccountPage.enterPersonalInformationPassword(password);

});

When('I enter my date of birth as {string}', async (dob) => {

    const dateArray = gHelper.breakStringIntoArraySpaces(dob);
    scope.registration_dob_day = dateArray[0];
    scope.registration_dob_month = dateArray[1];
    scope.registration_dob_year = dateArray[2];
    await createAccountPage.enterPersonalInformationDob(dateArray[0], dateArray[1], dateArray[2]);

});

When('I tick the mailing options for {string} and {string}', async (newsletter, offers) => {

    scope.registration_newsletter = newsletter;
    scope.registration_offers = offers;
    if (newsletter === 'ticked') {
        await createAccountPage.tickPersonalInformationNewsletter();
    };
    if (offers === 'ticked') {
        await createAccountPage.tickPersonalInformationSpecialOffers();
    }

});

When('I enter my company as {string}', async (company) => {

    scope.registration_company = company;
    await createAccountPage.enterYourAddressCompany(company);

});

When('I enter my address as {string}, {string}, {string}, {string}, {string}, {string}', async (address, address2, city, state, zipPostalCode, country) => {

    scope.registration_addressLine1 = address;
    await createAccountPage.enterYourAddressAddressLine1(address);

    scope.registration_addressLine2 = address2;
    await createAccountPage.enterYourAddressAddressLine2(address2);

    scope.registration_city = city;
    await createAccountPage.enterYourAddressCity(city);

    scope.registration_zipPostalCode = zipPostalCode;
    await createAccountPage.enterYourAddressZipPostCode(zipPostalCode);

    scope.registration_country = country;
    await createAccountPage.enterYourAddressCountry(country);

    // Have to enter state as slecting country clears it if previiously input
    scope.registration_state = state;
    await createAccountPage.enterYourAddressState(state);
    
});

When('I enter my additional info as {string}', async (info) => {

    if (info === 'lorem ipsum') {
        await createAccountPage.enterYourAddressAdditionalInfo(testData.loremIpsumLength(300));
    } else {
        await createAccountPage.enterYourAddressAdditionalInfo(info);
    }

});

When('I enter my phone numbers as {string} and {string}', async (home, mobile) => {

    scope.registration_homePhone = home;
    await createAccountPage.enterYourAddressHomePhone(home);

    scope.registration_mobilePhone = mobile;
    await createAccountPage.enterYourAddressMobilePhone(mobile);

});

When('I enter my address alias as {string}', async (alias) => {

    scope.registration_addressAlias = alias;
    await createAccountPage.enterYourAddressAddressAlias(alias);

});
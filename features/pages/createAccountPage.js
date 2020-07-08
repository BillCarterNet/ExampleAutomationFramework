const scope = require('../support/scope');
const pHelper = require('../support/puppeteerHelper');
const tdHelper = require('../support/timeAndDateHelper');
const stateHelper = require('../support/stateHelper');
const testConfig = require('../support/testConfig');

const selectors = {

    personalInformationMrRadioButton: '#id_gender1',
    personalInformationMrsRadioButton: '#id_gender2',
    personalInformationFirstNameInput: '#customer_firstname',
    personalInformationLastNameInput: '#customer_lastname',
    personalInformationEmailInput: '#email',
    personalInformationPassword: '#passwd',
    personalInformationDobDayDropdown: '#uniform-days',
    personalInformationDobMonthDropdown: '#uniform-months',
    personalInformationDobYearDropdown: '#uniform-years',
    personalInformationNewsletterCheckBox: '#newsletter',
    personalInformationSpecialOffersCheckBox: '#optin',

    yourAddressFirstNameInput: '#firstname',
    yourAddressLastNameInput: '#lastname',
    yourAddressCompanyInput: '#company',
    yourAddressAddressLine1Input: '#address1',
    yourAddressAddressLine2Input: '#address2',
    yourAddressCityInput: '#city',
    yourAddressStateDropdown: '#id_state',
    yourAddressZipPostCodeInput: '#postcode',
    yourAddressCountryDropdown: '#id_country',
    yourAddressAdditionalInformationInput: '#other',
    yourAddressHomePhoneInput: '#phone',
    yourAddressMobilePhoneInput: '#phone_mobile',
    yourAddressAddressAliasInput: '#alias',
    yourAddressRegisterButton: '#submitAccount',
    
};

module.exports = {
    
    enterPersonalInformationTitle: async(sex) => {
        if ((sex === 'male') || (sex === 'mr')) {
            await pHelper.clickButton(selectors.personalInformationMrRadioButton);
        }
        if ((sex === 'female') || (sex === 'mrs')) {
            await pHelper.clickButton(selectors.personalInformationMrsRadioButton);
        }
        if ((sex !== 'male') && (sex !== 'female') && (sex !== 'mr') && (sex !== 'mrs')) {
            console.log(`unknown sex:${sex}`);
        }
    },

    enterPersonalInformationFirstName: async(name) => {
        await pHelper.inputText(selectors.personalInformationFirstNameInput, name);
    },

    enterPersonalInformationLastName: async(name) => {
        await pHelper.inputText(selectors.personalInformationLastNameInput, name);
    },

    enterPersonalInformationEmail: async(email) => {
        await pHelper.inputText(selectors.personalInformationEmailInput, email);
    },

    enterPersonalInformationPassword: async(password) => {
        await pHelper.inputText(selectors.personalInformationPassword, password);
    },

    enterPersonalInformationDob: async(day, month, year) => {
        await scope.context.currentPage.select('#days', day);
        const monthNumber = tdHelper.convertMonthToNumber(month) + 1;
        await scope.context.currentPage.select('#months', monthNumber.toString());
        await scope.context.currentPage.select('#years', year);
    },

    tickPersonalInformationNewsletter: async() => {
        await pHelper.clickButton(selectors.personalInformationNewsletterCheckBox);
    },

    tickPersonalInformationSpecialOffers: async() => {
        await pHelper.clickButton(selectors.personalInformationSpecialOffersCheckBox);
    },

    enterYourAddressFirstName: async(name) => {
        await pHelper.clearInput(selectors.yourAddressFirstNameInput);
        await pHelper.inputText(selectors.yourAddressFirstNameInput, name);
    },

    enterYourAddressLastName: async(name) => {
        await pHelper.clearInput(selectors.yourAddressLastNameInput);
        await pHelper.inputText(selectors.yourAddressLastNameInput, name);
    },

    enterYourAddressCompany: async(company) => {
        await pHelper.inputText(selectors.yourAddressCompanyInput, company);
    },

    enterYourAddressAddressLine1: async(line1) => {
        await pHelper.inputText(selectors.yourAddressAddressLine1Input, line1);
    },

    enterYourAddressAddressLine2: async(line2) => {
        if (line2) {
            await pHelper.inputText(selectors.yourAddressAddressLine2Input, line2);
        }
    },

    enterYourAddressCity: async(city) => {
        await pHelper.inputText(selectors.yourAddressCityInput, city);
    },

    enterYourAddressState: async(state) => {
        const selector = '#id_state';
        const selectorNoHash = 'id_state';
        const xPath = `//*[@id=\"${selectorNoHash}\"]/option[text()=\"${state}\"]`;
        const option = (await scope.context.currentPage.$x(
            xPath
        ))[0];
        const value = await (await option.getProperty('value')).jsonValue();
        // console.log(`state:${state}`);
        // console.log(`selector:${selector}`);
        // console.log(`value:${value}`);
        await scope.context.currentPage.select(selector, value);
        //https://stackoverflow.com/questions/49116472/puppeteer-how-select-a-dropdown-option-based-from-its-text  
    },

    getSelectedState: async() => {
        const selectorSpan = '#uniform-id_state > span'; 
        const selectedState = await pHelper.getElementInnertext(selectorSpan);
        return selectedState;
    }, 

    enterYourAddressZipPostCode: async(zipPostCode) => {
        await pHelper.inputText(selectors.yourAddressZipPostCodeInput, zipPostCode);
    },

    enterYourAddressCountry: async() => {
        // Only option is United States
        await scope.context.currentPage.select('#id_country', "21");
    },

    getSelectedStateCountry: async() => {
        const selectorSpan = '#uniform-id_country > span'; 
        const selectedCountry = await pHelper.getElementInnertext(selectorSpan);
        return selectedCountry;
    },

    enterYourAddressAdditionalInfo: async(additionalInfo) => {
        await pHelper.inputText(selectors.yourAddressAdditionalInformationInput, additionalInfo);
    },

    enterYourAddressHomePhone: async(phone) => {
        await pHelper.inputText(selectors.yourAddressHomePhoneInput, phone);
    },

    enterYourAddressMobilePhone: async(phone) => {
        await pHelper.inputText(selectors.yourAddressMobilePhoneInput, phone);
    },

    enterYourAddressAddressAlias: async(addressAlias) => {
        await pHelper.clearInput(selectors.yourAddressAddressAliasInput);
        await pHelper.inputText(selectors.yourAddressAddressAliasInput, addressAlias);
    },

    clickRegisterButton: async() => {
        await pHelper.clickButton(selectors.yourAddressRegisterButton);
    },

};
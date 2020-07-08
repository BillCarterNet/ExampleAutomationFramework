const scope = require('../support/scope');
const pHelper = require('../support/puppeteerHelper');
const gHelper = require('../support/generalHelper');
const testConfig = require('../support/testConfig');

const selectors = {
    personalInformationMrRadioChecked: '#uniform-id_gender1 > span.checked',
    personalInformationMrsRadioChecked: '#uniform-id_gender2 > span.checked',
    firstNameInput: '#firstname', 
    lastNameInput: '#lastname',
    emailInput: '#email',
    dayDropdown: '',
    breadcrumbHome: '#columns > div.breadcrumb.clearfix > a.home',
    breadcrumbMyAccount: '#columns > div.breadcrumb.clearfix > a:nth-child(3)',
    breadcrumbCurrentPage: '#columns > div.breadcrumb.clearfix > span.navigation_page',
    checkedNewsletterCheckBox: '#uniform-newsletter > span.checked',
    checkedSpecialOffersCheckBox: '#uniform-optin > span.checked',
};

module.exports = {
    
    getH1: async () => {
        const h1 = await pHelper.getElementInnertext('h1');
        return h1.trim();
    },

    clickBreadcrumbMyAccount: async () => {
        await pHelper.clickButton(selectors.breadcrumbMyAccount);
    },

    waitForBreadcrumbCurrentPageToChange: async () => {
        let breadcrumbCurrentPage = await pHelper.getElementInnertext(selectors.breadcrumbCurrentPage);
        while (breadcrumbCurrentPage.trim() === 'Your personal information') {
            breadcrumbCurrentPage = await pHelper.getElementInnertext(selectors.breadcrumbCurrentPage);
        }
    },

    getTitle: async () => {
        let title = 'unticked';
        if (await pHelper.confirmElementIsPresentWait(selectors.personalInformationMrRadioChecked, 200)) {
            title = 'mr';
        }
        if (await pHelper.confirmElementIsPresentWait(selectors.personalInformationMrsRadioChecked, 200)) {
            title = 'mrs';
        }
        return title;
    },

    getFirstName: async () => {
        return await pHelper.getElementValue(selectors.firstNameInput);
    },

    getLastName: async () => {
        return await pHelper.getElementValue(selectors.lastNameInput);
    },

    getEmail: async () => {
        return await pHelper.getElementValue(selectors.emailInput);
    },

    getSelectedDay: async () => {
        const selectorSpan = '#uniform-days > span'; 
        const selectedDay = await pHelper.getElementInnertext(selectorSpan);
        const decodedSelectedDay = gHelper.decodeHTMLEntities(selectedDay);
        return decodedSelectedDay.trim();
    },
    
    getSelectedMonth: async () => {
        const selectorSpan = '#uniform-months > span';
        const selectedMonth = await pHelper.getElementInnertext(selectorSpan);
        const decodedSelectedMonth = gHelper.decodeHTMLEntities(selectedMonth);
        return decodedSelectedMonth.trim();
    },

    getSelectedYear: async () => {
        const selectorSpan = '#uniform-years > span';
        const selectedYear = await pHelper.getElementInnertext(selectorSpan);
        const decodedSelectedYear = gHelper.decodeHTMLEntities(selectedYear);
        return decodedSelectedYear.trim();
    },

    getNewsletterCheckBoxState: async () => {
        let state = 'not ticked';
        if (await pHelper.confirmElementIsPresentWait(selectors.checkedNewsletterCheckBox, 200)) {state = 'ticked';}
        return state;
    },

    getSpecialOffersCheckBoxState: async () => {
        let state = 'not ticked';
        if (await pHelper.confirmElementIsPresentWait(selectors.checkedSpecialOffersCheckBox, 200)) {state = 'ticked';}
        return state;
    },

};
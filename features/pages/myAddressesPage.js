// Includes
const scope = require('../support/scope');
const pHelper = require('../support/puppeteerHelper');
const testConfig = require('../support/testConfig');

// Selectors
const selectors = {

    breadcrumbHome: '#columns > div.breadcrumb.clearfix > a.home',
    breadcrumbMyAccount: '#columns > div.breadcrumb.clearfix > a:nth-child(3)',
    breadcrumbCurrentPage: '#columns > div.breadcrumb.clearfix > span.navigation_page',
    addressBox: 'ul.box',
    addressBoxList: 'ul.box > li > span',
    aliasTitles: 'h3',

};

// Private
const getNoOfAddresses = async () => {

    return await pHelper.getNoOfElements(selectors.addressBox);

};

const getAddressAliases = async () => {

    return await pHelper.getElementsInnertext(selectors.aliasTitles);

};

const getRawAddressInfo = async (alias) => {

    return await pHelper.getElementsClassAndInnerText(selectors.addressBoxList);

}; 

const findNth = (n, text, rawAddressInfo) => {

    let occurences = 0;

    let i = 0;
    while (occurences < n) {
        if (rawAddressInfo[i][1] === text) {
            occurences++;
        }
        i++;
    }

    return rawAddressInfo[i-1][0];

};

const fillInBlankClassNames = (rawAddressInfo) => {

    // Note these are all mandatory fields
    // So can be assumed to exist as blanks for each address

    let occurences = 0;
    for (i = 0; i < rawAddressInfo.length; i++) {
        if (rawAddressInfo[i][1] === '') {
            occurences++;
            switch (occurences%4) {
                case 1: rawAddressInfo[i][1] = 'address_city';
                break;
                case 2: rawAddressInfo[i][1] = 'address_state';
                break;
                case 3: rawAddressInfo[i][1] = 'address_zipPostcode';
                break;
                case 0: rawAddressInfo[i][1] = 'address_country';
            }
        }
    }
    return rawAddressInfo;

};

getAddressesInformation = async () => {

    // Process info from page
    const numberOfAddresses = await getNoOfAddresses();
    const addressAliases = await getAddressAliases();
    const rawAddressInfo = await getRawAddressInfo();
    const rawAddressInfoFiiledIn = fillInBlankClassNames(rawAddressInfo);

    // construct array of address objects
    let addresses = [];
    for (i = 0; i < numberOfAddresses; i++) {
        let address = {};
        address.alias = addressAliases[i];
        address.firstName = findNth(i * 2 + 1, 'address_name', rawAddressInfoFiiledIn).trim();
        address.lastName = findNth(i * 2 + 2, 'address_name', rawAddressInfoFiiledIn).trim();
        address.company = findNth(i + 1, 'address_company', rawAddressInfoFiiledIn).trim();
        address.addressLine1 = findNth(i + 1, 'address_address1', rawAddressInfoFiiledIn).trim();
        address.addressLine2 = findNth(i + 1, 'address_address2', rawAddressInfoFiiledIn).trim();
        address.city = findNth(i + 1, 'address_city', rawAddressInfoFiiledIn).trim().slice(0, -1); // Has a comma added by website
        address.state = findNth(i + 1, 'address_state', rawAddressInfoFiiledIn).trim();
        address.zipPostcode = findNth(i + 1, 'address_zipPostcode', rawAddressInfoFiiledIn).trim();
        address.country = findNth(i + 1, 'address_country', rawAddressInfoFiiledIn).trim();
        address.homePhone = findNth(i + 1, 'address_phone', rawAddressInfoFiiledIn).trim();
        address.mobilePhone = findNth(i + 1, 'address_phone_mobile', rawAddressInfoFiiledIn).trim();
        addresses.push(address);
    }

    return addresses;

};

// Public
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
        while (breadcrumbCurrentPage.trim() === 'My addresses') {
            breadcrumbCurrentPage = await pHelper.getElementInnertext(selectors.breadcrumbCurrentPage);
        }

    },

    getAddressForAlias: async (alias) => {

        // Aliases are unique so only have to look for the first
        const addresses = await getAddressesInformation();
        let address;
        let found = false;
        for (i = 0; i < addresses.length ; i++) {
            if (alias === addresses[i].alias) {
                address = addresses[i];
                found = true;
                console.log(alias);
                console.log(addresses[i].alias);
            }
        }
        if (!found) {
            console.log(`No matching alias for ${alias}`);
        } else {
            return address;
        }

    },

};
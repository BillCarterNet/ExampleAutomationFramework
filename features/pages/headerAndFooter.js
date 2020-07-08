const pHelper = require('../support/puppeteerHelper');
const scope = require('../support/scope');

const selectors = {

    headerSignInButton: 'div.header_user_info',
    headerContactUsButton: '#contact-link',
    footerContactUsButton: '#block_various_links_footer > ul li > a[title="Contact us"]',
    footerMobileInformationToggle: '#block_various_links_footer > h4',

};

module.exports = {

    clickHeaderSignInButton: async () => {
        await pHelper.clickButton(selectors.headerSignInButton);
    },

    clickHeaderContactUsButton: async () => {
        await pHelper.clickButton(selectors.headerContactUsButton);
    },

    clickFooterContactUsButton: async () => {
        if ((scope.deviceType === 'desktop') || (scope.deviceType === 'tablet')) {
            await pHelper.clickButton(selectors.footerContactUsButton);
        }
        if (scope.deviceType === 'mobile') {
            await pHelper.clickButton(selectors.footerMobileInformationToggle);
            await pHelper.clickButton(selectors.footerContactUsButton);  
        }
    },

};
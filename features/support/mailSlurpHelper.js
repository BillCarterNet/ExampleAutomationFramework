/* eslint-disable no-console */
const MailSlurp = require('mailslurp-client').default;
const apiConfig = require('../../apiConfig/apiConfig');
const api = new MailSlurp({ apiKey: apiConfig.mailSlurpApiKey });

module.exports = {

  // Used as constructor
  getInbox: async () => {
    let inbox = null;

    // This api can seemingly fail without hitting the catch
    // Speaking to support they believed they were experiencing scaling issues at the time
    try {
      inbox = await api.createInbox();
      console.log('Got inbox in <mailSlurpHelper.js>');
      console.log(`ID: ${inbox.id}`);
    } catch (err) {
      console.log('Unable to create inbox in <mailSlurpHelper.js>');
      console.log(err);
    }
    return inbox;
  },

  getEmailAddressFromInbox: (inbox) => {
    const { emailAddress } = inbox;

    if (!emailAddress) {
      console.log('-------------------------------------------------');
      console.log('Unable to get email address in mailSlurpHelper.js');
      console.log(`Email: ${emailAddress}`);
      console.log(`ID: ${inbox.id}`);
      console.log('-------------------------------------------------');
    } else {
      console.log('---------------------------------------');
      console.log('Got email address in mailSlurpHelper.js');
      console.log(`Email: ${emailAddress}`);
      console.log(`ID: ${inbox.id}`);
      console.log('---------------------------------------');
    }

    return emailAddress;
  },

  getFirstEmailFromInbox: async (inbox) => {
    const emails = await api.getEmails(inbox.id, { minCount: 1 });
    const email = await api.getEmail(emails[0].id);
    return email;
  },

  getVerificationCodeFromInbox: async (inbox) => {
    const emails = await api.getEmails(inbox.id, { minCount: 1 });
    const email = await api.getEmail(emails[0].id);
    const inputVerificationCode = email.body.match(/\d{6}/g);
    return inputVerificationCode;
  },

  getWelcomeEmailFromInbox: async (inbox) => {
    const emails = await api.getEmails(inbox.id, { minCount: 1 });
    const email = await api.getEmail(emails[0].id);
    const subject = await email.subject;
    const body = await email.body;
    return subject;
  }

};

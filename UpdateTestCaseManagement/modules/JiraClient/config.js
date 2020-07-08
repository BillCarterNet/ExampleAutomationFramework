const JiraClient = require('jira-connector');
const apiConfig = require('../../../apiConfig/apiConfig');

module.exports = {
  jira: new JiraClient({
    host: apiConfig.jiraHost,
    basic_auth: {
      email: apiConfig.jiraEmail,
      api_token: apiConfig.jiraApiToken,
    },
  }),
};

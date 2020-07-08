/* eslint-disable no-console */
const client = require('./config.js');
const error = require('./processLastError.js');
const gHelper = require('../../../features/support/generalHelper.js');

const { jira } = client;

module.exports = {

  getStatus: (ticketNumber, callback) => {
    jira.issue.getIssue(
      { issueKey: ticketNumber },
      callback,
    );
  },
  getTransitions: (ticketNumber, callback) => {
    jira.issue.getTransitions(
      { issueKey: ticketNumber },
      callback,
    );
  },
  editTicket: (ticketNumber, ticketSummary, ticketDescription) => {
    jira.issue.editIssue(
      {
        issueKey: ticketNumber,
        issue: {
          fields: {
            description: ticketDescription,
            summary: ticketSummary,
          },
        },
      },
      (err) => {
        console.log('Updating:', ticketNumber);
        if (err) {
          console.log(err);
        }
      },
    );
  },
  editTicketFields: (ticketNumber, ticketFields) => {
    jira.issue.editIssue(
      {
        issueKey: ticketNumber,
        issue: {
          fields: ticketFields,
        },
      },
      (err) => {
        console.log('Updating:', ticketNumber);
        if (err) {
          console.log(err);
        }
      },
    );
  },
  assign: (ticketNumber) => {
    jira.issue.assignIssue(
      {
        issueKey: ticketNumber,
        // This is the account ID of QA Automation user
        assignee: '',
      },
    );
  },
  constructDescription: (steps, exampleHeader, examples) => {
    let description = gHelper.constructStringFromArray(steps);
    const newLine = '\n';
    if (exampleHeader) {
      description = `
        ${description}
        ${newLine}
        ${gHelper.addNewLineToString(exampleHeader.trimStart())}
        ${gHelper.constructStringFromArray(examples)}
      `;
    }
    return description;
  },
  constructFields: (summary, description, lastError, tagLine) => {
    const fields = {};
    fields.summary = summary;
    fields.description = description;
    // Last Error (Custom field to hold test error description)
    if (lastError) {
      fields.customfield_12800 = error.processLastError(lastError);
    } else {
      fields.customfield_12800 = ' ';
    }
    const labels = gHelper.breakStringIntoArraySpaces(tagLine);
    fields.labels = labels;
    // AUTOMATED (Custom field to mark the scenario as automated)
    fields.customfield_13443 = {
      self: '<Url of custom field option>',
      value: '<Name of custom field>',
      id: '<id of cusom field>',
    };
    return fields;
  },
};

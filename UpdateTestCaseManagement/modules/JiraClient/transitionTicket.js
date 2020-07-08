/* eslint-disable no-console */
const client = require('./config.js');
const process = require('./jiraProcessing.js');
const trans = require('./getTransitionByName.js');

const { jira } = client;

const transitionFailure = (err) => { if (err) { console.error(err); } };

module.exports = {
  transitionTicketToCorrectState: (ticketNumber, result) => {
    // Welcome to callback hell!!!
    // Determine current status of ticket
    process.getStatus(
      ticketNumber,
      // getStatus callback
      (error, issue) => {
        const status = issue.fields.status.name;
        // Get current transitions of ticket
        process.getTransitions(
          ticketNumber,
          // getTransitions callback
          (error, transitions) => {
            // Make appropriate transition for status of ticket given test result
            switch (status) {
              case 'To Be Tested':
                if (result === 'passed') {
                  // Need to transition to PASSED TESTING
                  jira.issue.transitionIssue(
                    {
                      issueKey: ticketNumber,
                      transition: trans.getTransitionByName('Passed Automated Testing', transitions.transitions),
                    },
                    transitionFailure,
                  );
                }
                if (result === 'failed') {
                  // Need to transition to FAILED TESTING
                  jira.issue.transitionIssue(
                    {
                      issueKey: ticketNumber,
                      transition: trans.getTransitionByName('Failed Automated Testing', transitions.transitions),
                    },
                    transitionFailure,
                  );
                }
                break;
              case 'Passed Testing':
                if (result === 'failed') {
                  // Need to transition to TO BE TESTED
                  jira.issue.transitionIssue(
                    {
                      issueKey: ticketNumber,
                      transition: trans.getTransitionByName('Re-Test', transitions.transitions),
                    },
                    // Then transition to FAILED TESTING
                    // Executed as callback of above transition
                    // Need to get transitions for new status
                    () => {
                      process.getTransitions(
                        ticketNumber,
                        // Executed as callback of above get transitions
                        (error, transitions) => {
                          jira.issue.transitionIssue(
                            {
                              issueKey: ticketNumber,
                              transition: trans.getTransitionByName('Failed Automated Testing', transitions.transitions),
                            },
                            transitionFailure,
                          );
                        },
                      );
                    },
                  );
                }
                break;
              case 'Failed Testing':
                if (result === 'passed') {
                  // Need to transition to TO BE TESTED
                  jira.issue.transitionIssue(
                    {
                      issueKey: ticketNumber,
                      transition: trans.getTransitionByName('Re-Test', transitions.transitions),
                    },
                    // Then transition to PASSED TESTING
                    () => {
                      process.getTransitions(
                        ticketNumber,
                        (error, transitions) => {
                          jira.issue.transitionIssue(
                            {
                              issueKey: ticketNumber,
                              transition: trans.getTransitionByName('Passed Automated Testing', transitions.transitions),
                            },
                            transitionFailure,
                          );
                        },
                      );
                    },
                  );
                }
                break;
              case 'Not Finalised':
                if (result === 'passed') {
                  // Need to transition to TO BE TESTED
                  jira.issue.transitionIssue(
                    {
                      issueKey: ticketNumber,
                      transition: trans.getTransitionByName('Test Finalised', transitions.transitions),
                    },
                    // Then transition to PASSED TESTING
                    () => {
                      process.getTransitions(
                        ticketNumber,
                        (error, transitions) => {
                          jira.issue.transitionIssue(
                            {
                              issueKey: ticketNumber,
                              transition: trans.getTransitionByName('Passed Automated Testing', transitions.transitions),
                            },
                            transitionFailure,
                          );
                        },
                      );
                    },
                  );
                }
                if (result === 'failed') {
                  // Need to transition to TO BE TESTED
                  jira.issue.transitionIssue(
                    {
                      issueKey: ticketNumber,
                      transition: trans.getTransitionByName('Test Finalised', transitions.transitions),
                    },
                    // Then transition to FAILED TESTING
                    () => {
                      process.getTransitions(
                        ticketNumber,
                        (error, transitions) => {
                          jira.issue.transitionIssue(
                            {
                              issueKey: ticketNumber,
                              transition: trans.getTransitionByName('Failed Automated Testing', transitions.transitions),
                            },
                            transitionFailure,
                          );
                        },
                      );
                    },
                  );
                }
                break;
              default:
                console.error('Could not transition ticket:', ticketNumber, 'with status:', status, 'and result:', result);
                break;
            }
            // End of switch
          },
          // End of getTransitions callback
        );
      },
      // End of getStatus callback
    );
  },
};

# E2E automated test examples
Automation Framework using cucumber, puppeteer and inspired by the page object model
This runs on the automation practice site: http://automationpractice.com/index.php

## Installation
Run `npm install` to get the dependencies installed  
NOTE you may need to delete the `package-lock.json` to get the above command to complete successfully  

## Additional Installation / Configuration
If using JIRA integration ensure you have an `apiConfig.js` file in the `/apiConfig` directory (with auth details for Jira)
1. `jiraHost`
2. `jiraEmail`
3. `jiraApiToken`

If using mailslurp to test the recieving of emails you will need a key (not used in examples)
1. `mailSlurpApiKey`

## Execution
Run `npm test` to execute the UI tests  
Run `npm run-script report` to generate an HTML report (requires a test run has been completed)   
Run `npm run-script jira` to update the corresponding Jira tickets with the test results
This requires a test run has been completed and a correctly configured Jira project and workflow 

## Tags
Each scenario should have at least one associated tag in the feature file (above the scenario title) 
This is a unique identifier for the test and if using the Jira integration corresponds to a Jira ticket  
E.g. `@ID-4`
Any scenario with the `@ignore` tag will not run on a `npm test`

## Running a specific scenario
If the scenario has been correctly tagged in the feature file you can run just that one scenario with the following command  `./node_modules/.bin/cucumber-js --tags "@ID-4"`  
This will not generate a results.json you can add `-f json:./reports/cucumber_report.json"` if you wish to do this
This should be run from the working directory

## Devices
Any scenario with the `@mobile` tag will execute emulating confiugred device in the `hooks.js` file, similarly for `@tablet`
Each scenario should only have one of the following tags `@mobile`, `@tablet` or `@desktop`

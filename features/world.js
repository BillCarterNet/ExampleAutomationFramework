/* eslint-disable no-console */
// Dependencies
const { setWorldConstructor, setDefaultTimeout } = require('cucumber');

const puppeteer = require('puppeteer');
const scope = require('./support/scope');

const text = `
|------------------------------------------|
|---[Instantiating Cucumber world...]------|
|------------------------------------------|
`;

// Mailslurp and test Data
const testData = require('./support/testData');

const World = function init({ attach }) {
  console.log(text);

  // Completely initialise scope
  // scope = {};

  scope.driver = puppeteer;

  scope.context = {};
  // Create some objects for storing variables across scenario steps
  scope.createAccount = {};
  scope.generalOnboarding = {};
  scope.budgetOnboarding = {};
  scope.budgetOnboarding.weddingDetails = {};

  // Create a global inbox for scenarios that check email
  // Possibly only need this in the email hook
  scope.inbox = '';

  // For attaching screenshots to scenarios that fail
  scope.attach = attach;

};

setWorldConstructor(World);
setDefaultTimeout(30 * 1000);

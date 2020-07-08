/* eslint-disable no-console */

// Dependencies
const { After, Before, AfterAll, BeforeAll } = require('cucumber');
const puppeteer = require('puppeteer');
const os = require('os');
const fs = require('fs');
const path = require('path');
const scope = require('../support/scope');
const mailSlurpHelper = require('../support/mailSlurpHelper');
const testConfig = require('../support/testConfig');
const gHelper = require('../support/generalHelper');

// Before All

BeforeAll( async () => {

  // Clear out any screenshots
  const directory = `${process.cwd()}/screenshots`;
  console.log('Clearing out screenshot directory');
  console.log(`path: ${directory}`);

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      console.log(file);
      if (file.includes('.png')) {
        console.log(`Deleting: ${file}`);
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    }
    
  });

});

// Before

Before(async (scenario) => {
  scope.tags = scenario.pickle.tags;
  scope.testId = gHelper.getTag(scenario.pickle.tags);
  // Debug
  console.log(`ID - ${scope.testId}`);
  console.log(`Name - ${scenario.pickle.name}`);
  console.log('Tags');
  console.log(scenario.pickle.tags);
  console.log('');

  if (!scope.browser) {
    console.log('Starting Browser')
    scope.browser = await scope.driver.launch({
      headless: false,
      args: [
        '--window-size=1920,1080'
      ]
      // slowMo: 5 // slow down by 25ms
    });
  }
  scope.context.currentPage = await scope.browser.newPage();
});

// Before steps to set device/viewport

Before({ tags: '@mobile' }, async () => {
  scope.device = puppeteer.devices['iPhone 8'];
  scope.deviceType = 'mobile';
  await scope.context.currentPage.emulate(scope.device);
});

Before({ tags: '@tablet' }, async () => {
  scope.device = puppeteer.devices.iPad;
  scope.deviceType = 'tablet';
  await scope.context.currentPage.emulate(scope.device);
});

Before({ tags: '@desktop' }, async () => {
  scope.deviceType = 'desktop';
  await scope.context.currentPage.setViewport({ width: 1920, height: 1080 });
});

// Before step for scenarios that need a real email address

Before({ tags: '@email' }, async () => {
  console.log('@email hook code');

  await (async () => {
    try {
      scope.inbox = await mailSlurpHelper.getInbox();
      console.log('Got inbox in <hooks.js>');
      console.log(`ID: ${scope.inbox.id}`);
    } catch (err) {
      console.log('Unable to create inbox in <hooks.js>');
      console.log(err);
    }
  })();
});

// After

After({ tags: '@output' }, async (scenario) => {
  console.log(scenario);
  console.log(scenario.steps);
});


After(async (scenario) => {
  // Take a screenshot if scenario failed
  if (scenario.result.status === 'failed') {
  // screenShot is a base-64 encoded PNG
    const screenShot = await scope.context.currentPage.screenshot();
    scope.attach(screenShot, 'image/png');
  }

  // If we have a page clear out local storage as this is used in current (project)
  if (scope.context.currentPage) {
    await scope.context.currentPage.evaluate(
      () => { localStorage.removeItem('reduxPersist::appsync'); },
    );
    await scope.context.currentPage.evaluate(
      () => { localStorage.clear(); },
    );
  }

  // Here we check if a scenario has instantiated a browser and a current page
  if (scope.browser && scope.context.currentPage) {
    // if it has, find all the cookies, and delete them
    const cookies = await scope.context.currentPage.cookies();
    if (cookies && cookies.length > 0) {
      await scope.context.currentPage.deleteCookie(...cookies);
    }
    // close the web page down
    await scope.context.currentPage.close();
    // wipe the context's currentPage value
    scope.context.currentPage = null;
  }
  // If there is a browser window open, then close it
  // if (scope.browser) await scope.browser.close();

  console.log('Scope Objects [START]');
  console.log('Scope Objects [END]');
  console.log(`Device Type = ${scope.deviceType}`);

  // Debug
  console.log(`Scenario Result = ${scenario.result.status}`);
  console.log('-----');
  console.log('|END|');
  console.log('-----');
});

// After All

AfterAll(async () => {
  // Write some meta data for report
  const testRunMetaData = {};

  // App name, version and environment
  const pjson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  testRunMetaData.App_Name = pjson.name;
  testRunMetaData.App_Version = pjson.version;
  testRunMetaData.Environment = testConfig.getEnvironment();

  // Browser Version
  scope.context.currentPage = await scope.browser.newPage();
  testRunMetaData.Browser = await scope.context.currentPage.browser().version();
  await scope.context.currentPage.close();

  // Operating System version
  testRunMetaData.OS_Type = os.type();
  testRunMetaData.OS_Release = os.release();
  testRunMetaData.OS_Platform = os.platform();

  // Write JSON
  const testRunMetaDataString = JSON.stringify(testRunMetaData);
  const path = `${__dirname}/../../reports/testRunMetadata.json`;
  fs.writeFileSync(path, testRunMetaDataString);

  // If there is a browser window open, then close it
  if (scope.browser) await scope.browser.close();
});

const scope = require('../support/scope');
const tdHelper = require('../support/timeAndDateHelper');

module.exports = {

  getElementsInnertext: async (selector) => {
    
    const first = `${selector}:first-of-type`;
    const last = `${selector}:last-of-type`;

    // Wait for first element
    await scope.context.currentPage.waitForSelector(
      first,
      { visible: true },
    );

    // Wait for last element
    await scope.context.currentPage.waitForSelector(
      last,
      { visible: true },
    );

    // Get all the innertexts
    const elementsInnertext = await scope.context.currentPage.evaluate(
      (sel) => [...document.querySelectorAll(sel)].map((el) => el.innerText),
      selector,
    );

    // Returns an array of text for each page element that matches the selector
    // If the page element has multiple text
    // the array element will contain all the text in the page element seperated by a \n
    return elementsInnertext;
  },

  getElementInnertext: async (selector) => {
    // Wait for element
    const element = await scope.context.currentPage.waitForSelector(
      selector,
      { visible: true },
    );
    // Get text
    const text = await scope.context.currentPage.evaluate(
      (el) => el.textContent,
      element,
    );
    // Return text  
    return text;
  },

  getElementsClassAndInnerText: async (selector) => {
    const first = `${selector}:first-of-type`;
    const last = `${selector}:last-of-type`;

    // Wait for first element
    await scope.context.currentPage.waitForSelector(
      first,
      { visible: true },
    );

    // Wait for last element
    await scope.context.currentPage.waitForSelector(
      last,
      { visible: true },
    );

    // Get all the innertexts and class
    const elementsInnertext = await scope.context.currentPage.evaluate(
      (sel) => [...document.querySelectorAll(sel)].map((el) => [el.innerText, el.className]),
      selector,
    );

    return elementsInnertext;

  },

  getNoOfElements: async (selector) => {
    const elements = await scope.context.currentPage.evaluate(
      (sel) => [...document.querySelectorAll(sel)].map((el) => el.innerText),
      selector,
    );
    return elements.length;
  },

  getElementsAndText: async (selector) => {
    // Wait for first element
    await scope.context.currentPage.waitForSelector(
      selector,
      { visible: true },
    );

    const elementsInnertext = await scope.context.currentPage.evaluate(
      (sel) => [...document.querySelectorAll(sel)].map((el) => el.innerText),
      selector,
    );

    const elements = await scope.context.currentPage.$$(selector);    
  },

  waitForElementToDisappear: async (selector) => {
    await scope.context.currentPage.waitFor(
      (sel) => !document.querySelector(sel),
      {},
      selector,
    );
  },

  clearInput: async (selector) => {
    // wait for element
    await scope.context.currentPage.waitForSelector(
      selector,
      { visible: true },
    );
    // clear input
    await scope.context.currentPage.evaluate(
      (sel) => { document.querySelector(sel).value = ''; },
      selector,
    );
  },

  takeSceenshot: async (name) => {
    let path;
    if (!name) {
      path = `${process.cwd()}/screenshots/SS-[${scope.testId}]-${tdHelper.getTimeStamp()}.png`;
    } else {
      path = `${process.cwd()}/screenshots/SS-[${scope.testId}]-[${name}].png`;
    }
    console.log(`Taking Screenshot for ${scope.testId}`);
    console.log(`Path:${path}`);
    await scope.context.currentPage.screenshot({ path: path });
  },

  clickButton: async (selector) => {
    try {
      const button = await scope.context.currentPage.waitForSelector(
        selector,
        { visible: true },
      );
      await scope.context.currentPage.click(selector);   
    } catch (err) {
      console.log(`Unable to click element with selector = ${selector}`);
      console.log(err);
    }
  },

  clickButtonHard: async (selector) => {
    // This is less strict that the above method
    await scope.context.currentPage.evaluate(
      (sel) => document.querySelector(sel).click(),
      selector,
    );
  },

  inputText: async (selector, text) => {
    // if (!text) {text = '';}
    try {
      const input = await scope.context.currentPage.waitForSelector(
        selector,
        { visible: true },
      );
      await input.type(text);
    } catch (err) {
      console.log(`unable to get element with selector = ${selector}`);
      console.log(`unable to write text = ${text}`);
      console.log(err);
    }
  },

  // Possibly change this to take the wait as an argument and combine with below function 
  confirmElementIsPresent: async (selector) => {
    let isPresent = false;
    const timeout = 5000;
    try {
      await scope.context.currentPage.waitForSelector(
        selector,
        { 
          visible: true,
          timeout: timeout,
        },
      );
      isPresent = true;
    } catch {
      isPresent = false;
      console.log(`Element with selector ${selector} is not present after a wait of ${timeout}ms`);
    }
    return isPresent;
  },

  confirmElementIsPresentNoWait: async (selector) => {
    let isPresent = false;
    try {
      await scope.context.currentPage.waitForSelector(
        selector,
        { 
          visible: true,
        },
      );
      isPresent = true;
    } catch {
      isPresent = false;
      console.log(`Element with selector ${selector} is not present`);
    }
    return isPresent;
  },

  confirmElementIsPresentWait: async (selector, wait) => {
    let isPresent = false;
    try {
      await scope.context.currentPage.waitForSelector(
        selector,
        { 
          visible: true,
          timeout: wait,
        },
      );
      isPresent = true;
    } catch {
      isPresent = false;
      console.log(`Element with selector ${selector} is not present after a wait of ${wait}ms`);
    }
    return isPresent;
  },

  getRadioValues: async (selector) => {
    const radios = await scope.context.currentPage.$$eval(
      selector,
      inputs => { return inputs.map(input => input.value) }
    )
    return radios;
  },

  getElementValue: async (selector) => {
    // Wait for element
    await scope.context.currentPage.waitForSelector(
      selector,
      { visible: true },
    );
    const elementValue = await scope.context.currentPage.$eval(selector, el => el.value);
    return elementValue;
  },

};

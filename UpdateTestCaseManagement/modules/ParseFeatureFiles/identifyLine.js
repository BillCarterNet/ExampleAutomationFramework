/* eslint-disable no-console */
module.exports = {
  /**
  *
  * Processes an scenario line and determines what it is
  *
  * @param { string } scenarioLine a scenario line
  * @returns { string } what sort of line is it?
  *
  */
  indentifyLine(scenarioLine) {
    if (scenarioLine.includes('Feature:')) { return 'feature'; }
    if (scenarioLine.includes('@')) { return 'tag'; }
    if (scenarioLine.includes('Scenario')) { return 'summary'; }
    if (scenarioLine.includes('Given')) { return 'step'; }
    if (scenarioLine.includes('When')) { return 'step'; }
    if (scenarioLine.includes('Then')) { return 'step'; }
    if (scenarioLine.includes('And')) { return 'step'; }
    if (scenarioLine.includes('Examples:')) { return 'exampleHeader'; }
    if (scenarioLine.includes('|')) { return 'example'; }
    return `unknown scenario line : ${scenarioLine}`;
  },
};

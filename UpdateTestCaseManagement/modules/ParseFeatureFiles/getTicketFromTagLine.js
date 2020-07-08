/* eslint-disable no-console */
module.exports = {
  /**
  *
  * Processes an scenario line and determines what it is
  *
  * @param { string } tagLine from a scenario
  * @returns { string } the tag
  *
  */
  getTicket: (tagLine) => {
    const startIndex = tagLine.indexOf('@HTC-');
    let endIndex = tagLine.indexOf(' ', startIndex);
    if (endIndex === -1) {
      endIndex = tagLine.length + startIndex - 1;
    }
    let tag;
    if (startIndex === -1) {
      tag = 'Tag not founnd';
      console.error('Tag not founnd for : ', tagLine);
    } else {
      tag = tagLine.substring(startIndex + 1, endIndex);
    }
    return tag;
  },
};

module.exports = {
  /**
  *
  * * Check if a keyword is one from a BDD step:
  *
  * [ Given || Then || When || And ]
  *
  * @param { string } keyword
  * @returns { boolean }
  *
  */
  includesKeyWord: (keyword) => {
    const hasKeyWord = keyword.includes('Given') || (keyword.includes('Then')) || (keyword.includes('When')) || (keyword.includes('And'));
    return hasKeyWord;
  },

};

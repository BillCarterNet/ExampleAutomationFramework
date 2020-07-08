module.exports = {
  breakStringIntoArray: (stringToSplit) => {
    const array = [];
    let workString = stringToSplit;
    // While we have line breaks in the string
    while (workString.indexOf('\n') !== -1) {
      // Find the first line break
      const index = workString.indexOf('\n');
      // Read in first entry
      const element = workString.substring(0, index);
      // Check it is an entry we want
      if (element.length > 1) {
        // If it is add it to our array
        array.push(element);
      }
      // Cut it out of our workstring
      workString = workString.substring(index + 1, workString.length);
    }
    return array;
  },

  breakStringIntoArraySpaces: (stringToSplit) => {
    const array = stringToSplit.trim().split(' ');
    return array;
  },

  getTextUpToNewLine: (fullString) => {
    const index = fullString.indexOf('\n');
    return fullString.substring(0, index);
  },

  isObjectEmpty: (obj) => Object.keys(obj).length === 0,

  consoleLogObjectProperties: (obj) => console.log(Object.keys(obj)),

  consoleLogObjectPropertiesWithValues: (obj) => {
    console.log(obj);
    for(var key in obj) {
      console.log(`${key} = ${obj[key]}`);
    }
    console.log('');
  },

  constructStringFromArray: (array) => {
    let string = '';
    array.map(
      (str) => {
        string = `${string}${str.trimStart()}\n`;
      },
    );
    return string;
  },

  addNewLineToString: (string) => `${string}\n`,

  getTag: (tags) => {
    let idTag = '';

    tags.map(
      (tag) => {
        if (tag.name.indexOf('@ID-')!= -1) {
          idTag = tag.name.trim();
        }
      },
    );
    
    if (idTag != '') {
      idTag = idTag.substring(1); // strip @
      return idTag;
    }
    else {
      console.log('No tag containing @ID- found in tags');
      console.log(tags);
    }
  },

  decodeHTMLEntities: (text) => {
    var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"']
    ];

    for (var i = 0, max = entities.length; i < max; ++i) {
        text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);
    }
    
    return text;
}
  
};

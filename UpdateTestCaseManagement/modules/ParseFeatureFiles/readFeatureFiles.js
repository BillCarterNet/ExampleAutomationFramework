/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

module.exports = {
  /**
  *
  * Read in the project's feature files
  *
  * @param { string } dir directory of feature files
  * @returns { Array } Array of feature files objects
  *
  */
  readFilesSync(dir) {
    const files = [];

    fs.readdirSync(dir).forEach(
      (filename) => {
        const { name } = path.parse(filename);
        const { ext } = path.parse(filename);
        const filepath = path.resolve(dir, filename);
        const stat = fs.statSync(filepath);
        const isFile = stat.isFile();
        const isFeatureFile = filename.includes('.feature');

        let content = null;
        if (isFile && isFeatureFile) {
          try {
            content = fs.readFileSync(filepath, 'utf8');
          } catch (err) {
            console.error(err);
          }
          files.push({
            filepath,
            name,
            ext,
            content,
            stat,
          });
        }
      },
    );

    return files;
  },
};

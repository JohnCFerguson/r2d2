const fs = require('fs');
const path = require('path');

module.exports = {
    getCurrentDirectoryBase: () => {
      return path.basename(process.cwd());
    },

    getCurrentDirectory: () => {
      return path.dirname(process.cwd());
    },

    directoryExists: (filePath) => {
      return fs.existsSync(filePath);
    },

    mkDir: (folderName) => {
        return fs.mkdirSync(folderName, { recursive: true }, (err) => {
            if (err) throw err;
        });
    }
};
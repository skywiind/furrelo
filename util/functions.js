/*****************************************************
 * functions.js
 * Defines some useful utility stuff.
 *****************************************************/

const fs = require("fs");

//Gets all files in a directory with the matching filetype.
const getFiles = (path, ending) => {
    return fs.readdirSync(path).filter(f=> f.endsWith(ending));
}

module.exports = {
    getFiles
};
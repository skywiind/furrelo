/*****************************************************
 * functions.js
 * Defines some useful utility stuff.
 *****************************************************/

const fs = require("fs");

//Gets all files in a directory with the matching filetype.
const getFiles = (path, ending) => {
    return fs.readdirSync(path).filter(f=> f.endsWith(ending));
}

//Message filter that returns true if the new message is a reply to the input message.
const dialogFilter = (reply) => {
    if (reply.type != 19) {
        return false;
    }
    return true;
}

module.exports = {
    getFiles,
    dialogFilter
};
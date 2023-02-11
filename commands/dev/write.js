/*****************************************************
 * write.js
 * Defines the write command and its deployment script.
 *****************************************************/
const fs = require('fs');

module.exports = {
    name: "write",
    category: "dev",
    permissions: [],
    devOnly: true,
    run: async ({client, message, args}) => {
        let author = String(message.author);
        fs.appendFile(`./test/${author.slice(1, author.length - 1)}.txt`, `${message.author.toString()}: ${args}\n`, err => {
            if (err) {
                console.error(err);
            }
        });
    }
}
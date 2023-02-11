/*****************************************************
 * commands.js
 * Generic command handler. Loads commands into the client property
 * of the bot. Reads commands from /commands/ directory.
 *****************************************************/

const { getFiles } = require("../util/functions");
const fs = require("fs");

module.exports = (bot, reload) => {
    const {client} = bot;

    console.log(`Loading command handlers...`);

    //Use fs here because the commands are in categorical subfolders. 
    fs.readdirSync("./commands/").forEach((category) => {
        let commands = getFiles(`./commands/${category}`, ".js");

        commands.forEach((f) => {
            if (reload) {
                delete require.cache[require.resolve(`../commands/${category}/${f}`)];
            }
            const command = require(`../commands/${category}/${f}`);
            client.commands.set(command.name, command);
        });
    });

    if (client.commands.size === 0) {
        console.log("Unable to load commands.");
    }
    client.commands.forEach((command) => {
        console.log(`Loaded ${command.name}.`);
    });
    console.log(`Loaded ${client.commands.size} commands.`);
    console.log("-".repeat(20));
}
/*****************************************************
 * messageCreate.js
 * Defines the messageCreate event handler and checks for 
 * bot commands in the message content and calls command handlers appropriately.
 *****************************************************/

const Discord = require("discord.js");

module.exports = {
    name: "messageCreate",
    run: async function runAll(bot, message) {
        const {client, prefix, owners} = bot;

        //Confirm message is not a DM
        if (!message.guild) return;

        //Confirm the author is not a bot
        if (message.author.bot) return;

        //Confirm the message is a command
        if (!message.content.startsWith(prefix)) return;

        //Slice off prefix, trim whitespace, split into array of command and args
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmdstr = args.shift().toLowerCase();

        let command = client.commands.get(cmdstr);
        console.log(cmdstr);
        console.log(command);
        
        if (!command) return;

        let member = message.member;

        //Dev-only check
        if (command.devOnly && !owners.includes(member.id)) {
            console.log(`${message.author.id} tried to run ${cmdstr}.`);
            return message.reply("Dev only command!");
        }

        //Permissions check
        if (command.permissions && member.permissions.missing(command.permissions).length !== 0) {
            return message.reply("You do not have permission to use this command");
        }

        //Run the command
        try {
            await command.run({...bot, message, args})
        }
        catch(err) {
            let errMsg = err.toString();
            
            if (errMsg.startsWith("?")) {
                errMsg = errMsg.slice(1);
                await message.reply(errMsg);
            }
            else {
                console.error(err);
            }
        }
    }
}
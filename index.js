/*****************************************************
 * index.js
 * Contains the meat of the bot. Intents, bot properties, and loading of 
 * event and command handlers live here.
 *****************************************************/

const Discord = require("discord.js");

require("dotenv").config();

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers,
    ]
});

let bot = {
    client,
    prefix: "fe.",
    owners: ["176540223927353344"]
};

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload);
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload);

client.loadEvents(bot, false);
client.loadCommands(bot, false);

module.exports = bot;

/* client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
    if (message.content == "hi") {
        message.reply("Hello World");
    }
});*/

client.login(process.env.TOKEN);
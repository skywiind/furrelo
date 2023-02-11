/*****************************************************
 * index.js
 * Contains the meat of the bot. Intents, bot properties, and loading of 
 * event and command handlers live here.
 *****************************************************/

const Discord = require("discord.js");
const Keyv = require("keyv");
require("dotenv").config();

const dbUser = process.env.dbUser;
const dbPass = process.env.dbPass;
const dbIP   = process.env.dbIP;
const dbPath = process.env.dbPath;

const dbo = new Keyv(`mysql://${dbUser}:${dbPass}@${dbIP}/${dbPath}`);
dbo.on("error", err => console.error("Keyv connection error:", err));



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
    dbo,
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

client.login(process.env.TOKEN);
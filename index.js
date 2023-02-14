/*****************************************************
 * index.js
 * Contains the meat of the bot. Intents, bot properties, and loading of 
 * event and command handlers live here.
 *****************************************************/

const Discord = require("discord.js");
const Keyv = require("keyv");
const KeyvMySQL = require("@keyv/mysql");
require("dotenv").config();

const dbUser = process.env.dbUser;
const dbPass = process.env.dbPass;
const dbIP   = process.env.dbIP;
const dbPath = process.env.dbPath;

const players = new Keyv({ store: new KeyvMySQL(`mysql://${dbUser}:${dbPass}@${dbIP}/${dbPath}`), namespace: 'players'})
players.on("error", err => console.error("Keyv connection error:", err));

const games = new Keyv({ store: new KeyvMySQL(`mysql://${dbUser}:${dbPass}@${dbIP}/${dbPath}`), namespace: 'games'})
games.on("error", err => console.error("Keyv connection error:", err));



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
    players,
    games,
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
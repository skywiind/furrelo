/*****************************************************
 * player.js
 * Defines the player command and its deployment script.
 *****************************************************/
const { Player } = require("../../util/player");

module.exports = {
    name: "player",
    category: "dev",
    devOnly: true,
    run: async ({client, players, message, args}) => {
        const testplayer = new Player('12345', 'Testy Test', 1000, .5);
        console.log(await players.has(String(message.content)));
        if (! await players.has(String(message.content))) {
            await players.set(String(message.content), testplayer);
            message.reply(`Player ${message.content} added.`);
        }
        else {
            const p = new Player().fromObject(await players.get(String(message.content)));
            console.log(p);
            message.reply(p.toString());
            
        }
    }
}
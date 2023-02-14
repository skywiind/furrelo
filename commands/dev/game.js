/*****************************************************
 * game.js
 * Defines the game command and its deployment script.
 *****************************************************/
const { Game } = require("../../util/game");

module.exports = {
    name: "game",
    category: "dev",
    permissions: [],
    devOnly: true,
    run: async ({client, players, games, message, args}) => {
        const testgame = new Game([1,2,3,4,5], [6,7,8,9,0], false, new Date(), "League");
        if (! await games.has(String(message.content))) {
            //this is writing to the wrong table wtf
            await games.set(String(message.content), testgame);
            message.reply(`Game ${message.content} added.`);
        }
        else {
            const g = new Game().fromObject(await games.get(String(message.content)));
            console.log(g);
            message.reply(g.toString());
        }
        
    }
}
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
    run: async ({client, dbo, message, args}) => {
        const testgame = new Game([1,2,3,4,5], [6,7,8,9,0], false, "TBD", "League");
        const g = new Game().fromObject(await dbo.get(String(message.content)));
        console.log(g);
        if (!g) {
            await dbo.set(String(message.content), testgame);
            message.reply(`Game ${message.content} added.`);
        }
        else {
            message.reply(g.toString());
        }
        
    }
}
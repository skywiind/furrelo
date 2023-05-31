/*****************************************************
 * game.js
 * Defines the game command and its deployment script.
 *****************************************************/
const { Game } = require("../../util/game");
const utils = require("../../util/functions");

//accepts the client gameDBO and a Game object.
//Returns 1 on successful insertion, returns 0 otherwise.
async function writeGame(gameDBO, game) {
    if (!(game instanceof Game)) {
        console.log("writeGame input only accepts Games! Dumbass.");
        return 0;
    }
    if (!await gameDBO.has(String(message.content))) {
        await gameDBO.set(String(message.content), game);
        return 1;
    }
    else {
        const g = new Game().fromObject(await gameDBO.get(String(message.content)));
        console.log(g);
        return 0;
    }
}

async function awaitReply(message) {
    var collectedResponses = await message.channel.awaitMessages({filter: utils.dialogFilter, max: 1})
    return collectedResponses.first();
}

async function validateTeamInput(message) {
    if (message.mentions.users.length != 5) {
        message.reply(`Error, team size must be 5.`);
        return false;
    }
    return true;
}

module.exports = {
    name: "game",
    category: "dev",
    permissions: [],
    devOnly: true,
    run: async ({client, players, games, message, args}) => {
        //args are 0 indexed array starting with the first word after the command
        
        //Changing this to take the name of the game as the argument of the original command,
        //  then the bot will begin a dialog with the user that will fill in the rest of the information.

        var success = false;
        var lastMessage = message;
        var dialogLength = 0;
        const gameName = args[0];

        while (!success) {
            let response = await awaitReply(lastMessage);

            //TODO: Fix team validation because it's Not Fucking Working
            if (!validateTeamInput(response)) {
                continue;
            } else if (dialogLength == 0) {
                var teamA = [response.mentions.users[0].id,
                             response.mentions.users[1].id,
                             response.mentions.users[2].id,
                             response.mentions.users[3].id,
                             response.mentions.users[4].id,];
                response.reply(`Team A saved. Now enter Team B.`);
                
            } else if (dialogLength == 1) {
                var teamB = [response.mentions.users[0].id,
                             response.mentions.users[1].id,
                             response.mentions.users[2].id,
                             response.mentions.users[3].id,
                             response.mentions.users[4].id,];
            }
        
            const game = new Game(teamA, teamB, false, new Date(), args[10]);
            writeGame(games, game);
        }

        
    }
}
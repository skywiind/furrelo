/*****************************************************
 * ready.js
 * Defines the ready event handler and prints login confirmation.
 * Simple!
 *****************************************************/

module.exports = {
    name: "ready",
    run: async (bot) => {
        console.log(`Logged in as ${bot.client.user.tag}`);
    }
}
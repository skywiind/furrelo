/*****************************************************
 * ready.js
 * Defines the ready event handler and prints login confirmation.
 * Simple!
 *****************************************************/

module.exports = {
    name: "ready",
    run: async (bot) => {
        console.log("Login successful. :) ");
        console.log(`Username: ${bot.client.user.tag}`);
        console.log(`ID: ${bot.client.user.id}`);
        console.log("-".repeat(20));
    }
}
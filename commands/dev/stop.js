/*****************************************************
 * stop.js
 * Defines the stop command and its deployment script.
 *****************************************************/

module.exports = {
    name: "stop",
    category: "dev",
    permissions: [],
    devOnly: true,
    run: async () => {
        process.exit();
        
    }
}
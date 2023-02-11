/*****************************************************
 * write.js
 * Defines the write command and its deployment script.
 *****************************************************/

module.exports = {
    name: "write",
    category: "dev",
    permissions: [],
    devOnly: true,
    run: async ({client, dbo, message, args}) => {
        console.log(args);
        console.log("\n");
        await dbo.set(String(message.author), args);
        const reply = await dbo.get(String(message.author));
        console.log(reply);
        message.reply(reply.toString());
    }
}
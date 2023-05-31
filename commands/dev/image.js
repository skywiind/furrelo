/*****************************************************
 * image.js
 * Defines the image command and its deployment script.
 *****************************************************/
const { Image } = require("../../util/image");

module.exports = {
    name: "image",
    category: "dev",
    devOnly: true,
    run: async ({client, players, games, message, args}) => {
        const image = new Image(args[0], args[1], args[2]);
        image.generateImage();

    }
}
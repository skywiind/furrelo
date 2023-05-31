const Canvas = require("canvas");
const fs = require("fs");
const fsp = require("fs/promises");

class Image {
    constructor(name, user, color) {
        this.name = name;
        this.user = user;
        this.file = `D:/Documents/C/furrelo/images/${user}`;
        this.color = color;
    }

    fromObject(obj) {
        if (!obj) {
            return undefined;
        }
        obj && Object.assign(this, obj);
        return this;
    }

    async resizeImage(width, height) {
        const canvas = Canvas.createCanvas(500,500);
        const ctx = canvas.getContext("2d");
        const image = await Canvas.loadImage(`${this.file}.jpg`);
        const oWidth = image.width;
        const oHeight = image.height;
        var scale = 0.0;

        if (oWidth > oHeight) {
            scale = Number(height / oHeight); 
        }
        else {
            scale = Number(width / oWidth);
        }

        ctx.drawImage(image, 0, 0, oWidth * scale, oHeight * scale);
        ctx.save();
        
        const imgURL = canvas.toDataURL();
        const data = imgURL.replace(/^data:image\/\w+;base64,/, "");
        const img = Buffer.from(data, "base64");
        await fsp.writeFile(`${this.file}_r.png`, img);

        return Canvas.loadImage(`${this.file}_r.png`);
    }

    async generateImage() {
        const colorLUT = {
                    twink: '#0000ff',
                    htwink: '#003cbe',
                    twunk: '#007d7d',
                    thunk: '#00be3c',
                    hunk: '#00ff00',
                    bhunk: '#3cbe00',
                    bunk: '#7d7d00',
                    hbear: '#be3c00',
                    bear: '#ff0000',
                    tbear: '#be003c',
                    bink: '#7d007d',
                    btwink: '#3c00be',
                    bwunk: '#595959'
                }
        const typeLUT = {
                    twink: 'Twink',
                    htwink: 'Hunkish Twink',
                    twunk: 'Twunk',
                    thunk: 'Twinkish Hunk',
                    hunk: 'Hunk',
                    bhunk: 'Bearish Hunk',
                    bunk: 'Bunk',
                    hbear: 'Hunkish Bear',
                    bear: 'Bear',
                    tbear: 'Twinkish Bear',
                    bink: 'Bink',
                    btwink: 'Bearish Twink',
                    bwunk: 'Bwunk'
                }

        const canvas = Canvas.createCanvas(1000, 1000);
        const ctx = canvas.getContext("2d");

        //draw color bg
        ctx.fillStyle = colorLUT[this.color];
        ctx.fillRect(0, 0, 1000, 1000);
        ctx.save();

        //draw overlay
        ctx.fillStyle = "rgba(0,0,0,0.75)";
        ctx.fillRect(100, 100, 800, 800);
        ctx.save();

        //draw image
        const image = await this.resizeImage(500, 500);
        ctx.drawImage(image, 250, 125);
        ctx.save();

        //write text
        ctx.fillStyle = "white";
        ctx.textAlign = "center";

        //heading
        ctx.font = "80px 'Helvetica Rounded'"
        ctx.fillText(`${this.name}`, 500, 725);

        //subheading
        ctx.fillStyle = colorLUT[this.color];
        ctx.font = "50px 'Helvetica Rounded'";
        ctx.fillText(typeLUT[this.color], 500, 825);
        ctx.save()

        //watermark
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.font = "10px 'Helvetica Rounded'";
        ctx.fillText("Videl's Valentines Stream 2023 | twitch.tv/prof_dong", 500, 975);
        ctx.save()

        const imgURL = canvas.toDataURL();
        const data = imgURL.replace(/^data:image\/\w+;base64,/, "");
        const img = Buffer.from(data, "base64");
        var stream = fs.createWriteStream(`D:/Documents/C/furrelo/images/results/${this.user}.png`)
        stream.write(img);

        setTimeout(function(){ 

            let foo = 'bar';
        }, 3000); 
        stream.close(); 

        console.log(`${this.user} result generated.`);
    }
}

module.exports = {
    Image: Image
}
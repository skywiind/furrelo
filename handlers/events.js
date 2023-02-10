/*****************************************************
 * events.js
 * Generic event handler. Loads events into the client property
 * of the bot. Reads events from /events/ directory.
 *****************************************************/
const { getFiles } = require("../util/functions");

module.exports = (bot, reload) => {
    const {client} = bot
    let events = getFiles("./events/", ".js");

    if (events.length === 0) {
        console.log("No events found");
    }

    events.forEach((f, i) => {

        if (reload) {
            delete require.cache[require.resolve(`../event/${f}`)];
        }
        const event = require(`../events/${f}`);
        client.events.set(event.name, event);

        if (!reload) {
            console.log(`${i + 1}, ${f} loaded`);
        }
    });

    if (!reload) {
        initEvents(bot);
    }
}

//Checks if an event has a handler defined and runs it
function triggerEventHandler(bot, event, ...args) {
    const {client} = bot;
    
    try {
        if (client.events.has(event)) {
            client.events.get(event).run(bot, ...args);
        }
        else {
            throw new Error(`Event ${event} does not exist`);
        }
    }
    catch(err) {
        console.error(err);
    }
}

//Calls triggerEventHandler on events. How? Not really sure lmfao
function initEvents(bot) {
    const {client} = bot;

    client.events.forEach((e) => {
        client.on(e.name, (...args) => {
            triggerEventHandler(bot, e.name, ...args);
        });
    });

    //old non-generic logic
    /* client.on("ready", () => {
        triggerEventHandler(bot, "ready");
    });

    client.on("messageCreate", (message) => {
        triggerEventHandler(bot, "messageCreate", message);
    }); */
}
const fs = require("node:fs");
const path = require("node:path");

// Cette fonction charge les événements
module.exports = client => {
    const eventsPath = path.join(process.cwd(), "events");
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));
    
    for(const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
};
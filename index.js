// Importation de discord.js et des fichiers nécessaires
const { Client, Collection, GatewayIntentBits, ActivityType } = require("discord.js");
const { token } = require("./config.json");
const loadCommands = require("./loaders/loadCommands");
const loadEvents = require("./loaders/loadEvents");

// Création le client Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildWebhooks
    ],
    presence: {
        activities: [{
            name: "vos serveurs !",
            type: ActivityType.Watching
        }]
    }
});

// Création de la collection pour contenir les commandes
client.commands = new Collection();

// Charge les commandes & événements
loadCommands(client);
loadEvents(client);

// Connexion à Discord
client.login(token);
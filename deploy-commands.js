// Ce script charge vos commandes et les déploies à Discord.

const fs = require("node:fs");
const path = require("node:path");
const { REST, Routes } = require("discord.js");
const { clientId, token } = require("./config.json");

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for(const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for(const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if("data" in command && "execute" in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] La commande au chemin "${filePath}" n'a pas la propriété "data" ou "execute".`);
        }
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
    try {
        console.log(`Déploiement des ${commands.length} slash commandes.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log(`Les ${data.length} slash commandes ont bien été déployées.`);
    } catch(error) {
        // And of course, make sure you catch and log any errors!
        console.error("Une erreur est survenue lors du déploiement des slash commandes", error);
    }
})();
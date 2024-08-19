const { Events } = require("discord.js");

module.exports = {
	name: Events.ClientReady,
	execute(client) {
		console.log(`Bot connecté avec le compte \x1B[31m${client.user.tag}\x1b[0m !`);

		// Déploie les commandes en important le fichier "deploy-commands"
		// Note: Idéalement, il faut déployer les commandes uniquement lorsque vous les avez modifier.
		require("../deploy-commands");
	}
};
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Affiche le ping du bot."),
	async execute(interaction) {
		await interaction.reply(`La latence du bot est de ${interaction.client.ws.ping}ms !`);
	}
};
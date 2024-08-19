const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("server-info")
		.setDescription("Affiche des informations sur ce serveur."),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor("#007afc")
			.setAuthor({
				name: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL()
			})
			.setDescription(`Ce serveur est **${interaction.guild.name}** et possède **${interaction.guild.memberCount}** membres.`)
			.setThumbnail(interaction.guild.iconURL());

		await interaction.reply({ embeds: [embed] });
	}
};
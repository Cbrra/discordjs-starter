const { Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if(!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if(!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch(error) {
            console.error(`Une erreur est survenue en exécutant la commande "${command.data.name}":`, error);

            if(interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: "Une erreur est survenue lors de l'exécution de la commande !", ephemeral: true });
            } else {
                await interaction.reply({ content: "Une erreur est survenue lors de l'exécution de la commande !", ephemeral: true });
            }
        }
    }
};
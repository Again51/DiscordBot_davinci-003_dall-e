module.exports = (client, interaction) => {
    if (interaction.isCommand()) {

        const command = client.interactions.get(interaction.commandName);

        if (!command) return interaction.reply({
            content: "An issue has arisen.",
            ephemeral: true
        });

        command.run(client, interaction);
    }
}
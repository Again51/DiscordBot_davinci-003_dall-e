require("dotenv").config();
const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: 'help',
    description: 'See available commands.',
    run: async (client, interaction) => {
        const embed = new EmbedBuilder()
            .setTitle(`Commands list`)
            .setColor(process.env.DISCORD_COLOR)
            .setAuthor({name: 'IAgain', iconURL : 'https://i.imgur.com/5OjcASu.png'})
            .setDescription("> **/help** → See available commands.\n> \n> **/chat** → Allows you to chat with AI.\n> \n> **/img**  → Allows you to generate an image using AI.")
            .setTimestamp()
            .setFooter({
                text: `----`,
            })
        await interaction.reply({ embeds: [embed]});
    }
}

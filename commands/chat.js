require("dotenv").config();
const { EmbedBuilder } = require("discord.js")
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG,
});

const openai = new OpenAIApi(configuration);

module.exports = {
    name: 'chat',
    description: 'Allows you to chat with AI.',
    options: [
        {
            name: 'message',
            description: 'Message to send.',
            type: 3,
            required: true
        }
    ],
    run: async (client, interaction) => {
        const prompt = interaction.options.getString('message');
        console.log(prompt)
        if (!prompt) {
            interaction.reply('No message to send.')
            console.log(prompt)
            return;
        }

        await interaction.reply("https://i.gifer.com/origin/0d/0dea0c59cbf084d981fc5b55643cb6e6.gif");
        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `Respond to : ${prompt}`,
                temperature: 0.9,
                max_tokens: 4000,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.6,
                stop: [" Human:", " AI:"],
            });
            const embed = new EmbedBuilder()
                .setColor(process.env.DISCORD_COLOR)
                .setTitle(`En réponse à ${interaction.member.user.username}`)
                .setAuthor({name: 'IAgain', iconURL : 'https://i.imgur.com/5OjcASu.png'})
                .setDescription("```" + response.data.choices[0].text + "```")
                .setTimestamp()
                .setFooter({
                    text: `using Davinci-003`,
                })
            await interaction.editReply({ embeds: [embed],content:""});
        } catch (err) {
            console.log(err);
        }
    }
}

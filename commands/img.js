require("dotenv").config();
const { EmbedBuilder} = require("discord.js")
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG,
});

const openai = new OpenAIApi(configuration);

module.exports = {
    name: 'img',
    description: 'Allows you to generate an image using AI.',
    options: [
        {
            name: 'image',
            description: "Image to generate.",
            type: 3,
            required: true
        }
    ],
    run: async (client, interaction) => {
        const prompt = interaction.options.getString('image');
        console.log(prompt)
        if (!prompt) {
            interaction.reply("No image to generate.");
            return;
        }
        await interaction.reply("https://i.gifer.com/origin/0d/0dea0c59cbf084d981fc5b55643cb6e6.gif");
        try {
            const response = await openai.createImage({
                prompt: `${prompt}`,
                n: 1,
                size: "1024x1024",
            });
            const embed = new EmbedBuilder()
                .setColor(process.env.DISCORD_COLOR)
                .setTitle(`En réponse à ${interaction.member.user.username}`)
                .setAuthor({
                    name: 'IAgain',
                    iconURL: 'https://i.imgur.com/5OjcASu.png'
                })
                .setImage(response.data.data[0].url)
                .setTimestamp()
                .setFooter({
                    text: `using DALL-E 2`,
                })
            await interaction.editReply({embeds: [embed],content:""});
        } catch (err) {
            console.log(err);
            await interaction.editReply("An error occurred while generating the image, please try again later.");
        }
    }
}

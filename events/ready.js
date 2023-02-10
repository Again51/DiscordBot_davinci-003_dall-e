const  register  = require("../utils/cmdSync");
const {ActivityType} = require("discord.js");

module.exports = async (client) => {
    await register(client, client.register_arr.map((command) => ({
        name: command.name,
        description: command.description,
        options: command.options,
        type: command.type
    })),{
        debug: true
    });
    console.log("Bot is ready!");
    client.user.setPresence({
        activities: [
            {
                name: "/help",
                type: ActivityType.Watching,
            },
        ],
        status: "idle",
    });
}
require("dotenv").config();
const fs = require("fs");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

fs.readdir("./events", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Loaded: ${eventName}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});
// Let commands be a new collection ( message commands )
client.interactions = new Collection();
// creating an empty array for registering commands
client.register_arr = []
/* Load all commands  */
fs.readdir("./commands/", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.interactions.set(commandName, {
      name: commandName,
      ...props
    });
    client.register_arr.push(props)
  });
});

client.login(process.env.DISCORD_KEY);
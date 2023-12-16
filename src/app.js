require("dotenv/config");

const { Client, IntentsBitField } = require("discord.js");
const eventHandler = require("./handlers/eventHandler");

if (process.env.BRANCH === "test") {
  var token = process.env.DISCORD_TOKEN_TESTING;
} else if (process.env.BRANCH === "live") {
  var token = process.env.DISCORD_TOKEN;
}

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent
  ],
});

eventHandler(client);

client.login(token);

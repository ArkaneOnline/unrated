const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Test connectivity between the bot and the Discord API.")
    .setDMPermission(false)
    .toJSON(),
  userPermissions: [PermissionFlagsBits.SendMessages],
  botPermissions: [PermissionFlagsBits.SendMessages],

  run: (client, interaction) => {
    return interaction.reply(`Pong! 🏓 \nLatency is **${Date.now() - interaction.createdTimestamp}ms**. API Latency is **${Math.round(client.ws.ping)}ms**`);
  },
};

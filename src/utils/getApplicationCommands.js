module.exports = async (client, guildId) => {
  let applicationCommands;
  if (process.env.BRANCH === "live") {
    guildId = "global"
  }

  if (guildId !== "global") {
    const guild = await client.guilds.fetch(guildId);
    applicationCommands = guild.commands;
  } else {
    applicationCommands = client.application.commands;
  }

  await applicationCommands.fetch();
  return applicationCommands;
};

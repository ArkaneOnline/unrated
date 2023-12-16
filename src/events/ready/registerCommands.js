require("colors");

if (process.env.BRANCH === "test") {
  var testServerId = process.env.GUILD_ID_TESTING;
} else if (process.env.BRANCH === "live") {
  var testServerId = process.env.GUILD_ID;
}

const commandComparing = require("../../utils/commandComparing");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client) => {
  try {
    const [localCommands, applicationCommands] = await Promise.all([
      getLocalCommands(),
      getApplicationCommands(client, testServerId),
    ]);

    for (const localCommand of localCommands) {
      const { data, deleted } = localCommand;
      const {
        name: commandName,
        description: commandDescription,
        options: commandOptions,
      } = data;

      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === commandName
      );

      if (deleted) {
        if (existingCommand) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`[INFO] Deleted command ${commandName}`.yellow);
        } else {
          console.log(`[INFO] Skipped command ${commandName}`.yellow);
        }
      } else if (existingCommand) {
        if (commandComparing(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            name: commandName,
            description: commandDescription,
            options: commandOptions,
          });
          console.log(`[INFO] Updated command ${commandName}`.yellow);
        }
      } else {
        await applicationCommands.create({
          name: commandName,
          description: commandDescription,
          options: commandOptions,
        });
        console.log(`[SUCCESS] Created command ${commandName}`.green);
      }
    }
  } catch (error) {
    console.log(
      `[ERROR] An error occured in registerCommands.js: \n${error}`.red
    );
  }
};

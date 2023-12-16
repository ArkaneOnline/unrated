require('dotenv').config();

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

if (process.env.BRANCH === "live") {
    var token = process.env.DISCORD_TOKEN;
    var clientId = process.env.CLIENT_ID;
    var guildId = process.env.GUILD_ID;
} else if (process.env.BRANCH === "test") {
    var token = process.env.DISCORD_TOKEN_TESTING;
    var clientId = process.env.CLIENT_ID_TESTING;
    var guildId = process.env.GUILD_ID_TESTING;
}

    
const rest = new REST({ version: '10' }).setToken(token);
rest.get(Routes.applicationGuildCommands(clientId, guildId))
    .then(data => {
        const promises = [];
        for (const command of data) {
            const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
    });

console.log(`Guild Slash Commands for guildId: '${guildId}' have been removed for client: '${clientId}'`);
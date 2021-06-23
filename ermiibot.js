const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const { prefix, token } = require('./settings.json');
const client = new Discord.Client();
//client.music = new require("discord.js-musicbot-addon");

module.exports =
{
    reload(message) {
        logger("reloading");
        message.channel.send("Reloading files...");
        loadCommandFiles(true);
        logger("reloaded");
        message.channel.send("Reload successful!");
    },
    getCommands() {
        return client.commands;
    }
}

/////////////////////// Command Loader /////////////////////////////
var commandFiles;
function loadCommandFiles(reload) {
    client.commands = new Discord.Collection();
    commandFiles = fs.readdirSync(path.resolve(__dirname, 'commands')).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        if (reload) {
            //clears the require cache
            delete require.cache[require.resolve(`./commands/${file}`)];
        }
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }
}
loadCommandFiles(false);
////////////////////////////////////////////////////////////////////

function logger(type, message, commandName, error) {
    var now = new Date();
    if (type == "ready") {
        console.log(`[${now.toLocaleDateString()} ${now.toLocaleTimeString()}] [INFO] ErmiiBot is ready`);
    }
    else if (type == "reloading") {
        console.log(`[${now.toLocaleDateString()} ${now.toLocaleTimeString()}] [INFO] Reloading command files...`);
    }
    else if (type == "reloaded") {
        console.log(`[${now.toLocaleDateString()} ${now.toLocaleTimeString()}] [INFO] Commands files have been reloaded`);
    }
    else if (type == "command" || type == "commanderror") {
        var origin = message.guild != null ? message.guild.name : "Direct Message";

        if (type == "command") {
            console.log(`[${now.toLocaleDateString()} ${now.toLocaleTimeString()}] [INFO] [${origin}] ${message.author.username} issued command: ${commandName}`);
        }
        if (type == "commanderror") {
            console.log(`[${now.toLocaleDateString()} ${now.toLocaleTimeString()}] [ERROR] [${origin}] An error has occured while ${message.author.username} tried executing the command: ${commandName}:`);
            console.error(error);
        }
    }
    else if (type == "error") {
        console.log(`[${now.toLocaleDateString()} ${now.toLocaleTimeString()}] [ERROR] A fatal error has occured!`);
    }
}

function waterInit() {
    var water = require("./other/water.js");
    setInterval(() => {
        water.checkWaterHour(client);
    }, 60000);
}

//var ms = require("./other/mcping.js");

client.once('ready', () => {
    client.user.setActivity(`${prefix}help`);
    logger("ready");

    waterInit();
});


client.on('message', message => {
    //Message interpreter
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.disabled != null && command.disabled) return;

    logger("command", message, command.name);

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    try {
        command.execute(message, args);
    }
    catch (error) {
        logger("commanderror", message, commandName, error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.on("error", () => {
    logger("error");
});

client.login(token);
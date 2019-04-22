const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const { prefix, token } = require('./settings.json');
const client = new Discord.Client();

module.exports = 
{
	reload(message)
	{
		message.channel.send("Reloading files...");
		loadCommandFiles(true);
		message.channel.send("Reload successful!");
	},
	getCommands()
	{
		return client.commands;
	}
}

/////////////////////// Command Loader /////////////////////////////
var commandFiles;
function loadCommandFiles(reload)
{
	client.commands = new Discord.Collection();
	commandFiles = fs.readdirSync(path.resolve(__dirname, 'commands')).filter(file => file.endsWith('.js'));

	for (const file of commandFiles)
	{
		if (reload)
		{
			//clears the require cache
			delete require.cache[require.resolve(`./commands/${file}`)];
		}
		const command = require(`./commands/${file}`);
		client.commands.set(command.name, command);
	}
}
loadCommandFiles(false);
////////////////////////////////////////////////////////////////////

client.once('ready', () => 
{
	client.user.setActivity(`${prefix}help`);
	console.log('Ready!');
});


client.on('message', message => 
{
	//Message interpreter
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

    if (command.guildOnly && message.channel.type !== 'text') 
    {
			return message.reply('I can\'t execute that command inside DMs!');
		}

    if (command.args && !args.length) 
    {
			let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) 
        {
					reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
				}

			return message.channel.send(reply);
		}

    try 
    {
			command.execute(message, args);
    } 
    catch (error) 
    {
			console.error(error);
			message.reply('there was an error trying to execute that command!');
		}
});

client.login(token);
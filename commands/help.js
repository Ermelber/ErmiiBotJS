module.exports = {
    name: 'help',
    aliases: ['h'],
	description: 'Shows the list of commands',
    execute(message, args) 
    {
        var ermiibot = require("./../ermiibot.js");
        var commands = ermiibot.getCommands();

        var fields = [];

        commands.tap(command =>
        {
            fields.push(
            {
                name: `${command.name} (${command.aliases})`,
                value: command.description
            });
        });

        message.channel.send({
            embed: 
            {
                color: 3447003,
                title: "These are the available commands:",
                fields: fields
            }
        });
	},
};
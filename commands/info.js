const { description } = require('../settings.json');

module.exports = {
    name: 'info',
    aliases: ['i'],
	description: 'Information about this bot',
    execute(message, args)
    {
		message.channel.send(description);
	},
};
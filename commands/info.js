module.exports = {
    name: 'info',
    aliases: ['i'],
	description: 'Information about this bot',
    execute(message, args)
    {
		message.channel.send('This bot was made by Ermelber. Not Anymore Hosted on Szymmy\'s Pi.');
	},
};
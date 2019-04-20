module.exports = {
    name: 'description',
    aliases: ['d'],
	description: 'Description',
    execute(message, args)
    {
		message.channel.send('This bot was made by Ermelber. Hosted on Szymmy\'s Pi.');
	},
};
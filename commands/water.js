module.exports = {
    name: 'water',
    aliases: ['w'],
    description: 'When is the real water hours?',
    disabled: false,
    execute(message, args) 
    {
        message.reply("it's at 23:29 (Italian Time)")
	},
};
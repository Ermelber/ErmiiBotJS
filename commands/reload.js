const { adminUserIds } = require('../settings.json');

module.exports = {
    name: 'reload',
    aliases: ['r'],
	description: 'Dynamically reloads bot\'s files',
    execute(message, args) 
    {
        if (!adminUserIds || !adminUserIds.includes(message.author.id))
        {
            message.reply("you don't have permission for this!");
            return;
        }

        var ermiibot = require("./../ermiibot.js");
        ermiibot.reload(message);
	},
};
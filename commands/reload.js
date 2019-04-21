module.exports = {
    name: 'reload',
    aliases: ['r'],
	description: 'Dynamically reloads bot\'s files',
    execute(message, args) 
    {
        var ermiibot = require("./../ermiibot.js");
        ermiibot.reload(message);
	},
};
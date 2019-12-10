module.exports = {
    name: 'reload',
    aliases: ['r'],
	description: 'Dynamically reloads bot\'s files',
    execute(message, args) 
    {
        //Owners are hardcoded for now
        if (message.author.id != "188650807120494592" /*Ermelber*/ && message.author.id != "177432416959332353" /*Szymbar*/)
        {
            message.reply("you don't have permission for this!");
            return;
        }

        var ermiibot = require("./../ermiibot.js");
        ermiibot.reload(message);
	},
};
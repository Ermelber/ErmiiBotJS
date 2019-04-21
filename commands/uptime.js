module.exports = {
    name: 'uptime',
    aliases: ['u'],
	description: 'Server uptime (only works on linux)',
    execute(message, args) 
    {
        var exec = require('child_process').exec;

        dir = exec("uptime", function(err, stdout, stderr) 
        {
            message.reply(`\`\`${stdout}\`\``);
        });
	},
};
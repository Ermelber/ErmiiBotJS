module.exports = {
    name: 'mcstatus',
    aliases: ['m'],
	description: 'Minecraft server status',
    execute(message, args) 
    {
        var ms = require("./../other/minestat.js");
        ms.init("127.0.0.1", 25565, function(result)
        {
            if(ms.online)
            {
                message.channel.send(`${ms.motd} (Version ${ms.version})\nCurrently playing: ${ms.current_players}/${ms.max_players} players`);
            }
            else
            {
                message.reply("The server is offline.");
            }
        });
	},
};
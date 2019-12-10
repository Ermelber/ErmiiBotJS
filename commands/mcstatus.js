module.exports = {
    name: 'mcstatus',
    aliases: ['mc'],
	description: 'Minecraft Server Status',
    execute(message, args) 
    {
        getInfo(message, args[0], args[1]);
	},
};

function getInfo(message, hostname, port)
{
    var ms = require("./../other/mcping.js");

    hostname = hostname == null ? "dshack.ddns.net" : hostname;
    port = port == null ? 25565 : port;

    ms.getServerData(hostname, port, (response, data) =>
    {
        if(response == "ok")
        {
            fields = 
            [
                {
                    name: `Message of the day`,
                    value: data.description.text
                },
                {
                    name: `Server Version`,
                    value: data.version.name
                },
                {
                    name: `Currently playing`,
                    value: `${data.players.online}/${data.players.max}`
                }
            ];

            if (data.players.sample != null)
            {
                var playerList = "";

                for (var i = 0; i < data.players.sample.length; i++)
                {
                    var player = data.players.sample[i];
                    playerList += player.name + "\n";
                }

                fields.push({
                    name: `Players`,
                    value: playerList
                });
            }

            message.channel.send({
                embed: 
                {
                    author: 
                    {
                        name : "Minecraft Server Status",
                        url : `https://eu.mc-api.net/v3/server/favicon/${hostname}:${port}`,
                        icon_url : `https://eu.mc-api.net/v3/server/favicon/${hostname}:${port}`
                    },
                    color: 3447003,
                    fields: fields
                }
            });
        }
        else
        {
            message.reply("couldn't reach the server.");
        }
    });
}
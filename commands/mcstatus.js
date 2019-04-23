module.exports = {
    name: 'mcstatus',
    aliases: ['mc'],
	description: 'Minecraft Server Status',
    execute(message, args) 
    {
        getInfo(message);
	},
};

function getInfo(message)
{
    var ms = require("./../other/mcping.js");
    ms.getServerData("127.0.0.1", 25565, (response, data) =>
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
                    color: 3447003,
                    title: "Minecraft Server Status",
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
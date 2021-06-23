
const { mcHostName } = require('../settings.json');

module.exports = {
    name: 'mcstatus',
    aliases: ['mc'],
	description: 'Minecraft Server Status',
    execute(message, args) 
    {
        getInfo(message, args[0]);
	},
};


function ping(hostname, complete)
{
    var http = require("https");

    var options = {
        "method": "GET",
        "hostname": "eu.mc-api.net",
        "port": null,
        "path": "/v3/server/ping/" + hostname,
        "headers": {}
    };

    var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        var body = Buffer.concat(chunks);
        
        if (complete)
        {
            complete(JSON.parse(body.toString()));
        }
    });
    });

    req.end();
}



function getInfo(message, hostname)
{
    hostname = hostname == null ? mcHostName : hostname;

    ping(hostname, (data) => {
        if(data.status && data.online)
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
                        url : data.favicon,
                        icon_url : data.favicon
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
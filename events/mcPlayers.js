const { mcHostName } = require('../settings.json');

module.exports =
{
    init(client) {
        let timer = require("../other/timer.js");
        let mc = require("../other/minecraft.js");

        let players = [];

        timer.create(60000 * 5, () => {
            let channel = client.channels.get("394899930587856896"); //microsofts_minecraft (Haroohie MK Pals)

            mc.ping(mcHostName, (data) => {
                var currentPlayers = data.players.sample == null ? [] : data.players.sample;

                if (isDifferent(players, currentPlayers)) {
                    fields =
                        [
                            {
                                name: `Currently playing`,
                                value: `${data.players.online}/${data.players.max}`
                            }
                        ];

                    if (data.players.sample != null) {
                        var playerList = "";

                        for (var i = 0; i < data.players.sample.length; i++) {
                            var player = data.players.sample[i];
                            playerList += player.name + "\n";
                        }

                        fields.push({
                            name: `Players`,
                            value: playerList
                        });
                    }

                    channel.send({
                        embed:
                        {
                            author:
                            {
                                name: "Player joined/left",
                                url: data.favicon,
                                icon_url: data.favicon
                            },
                            color: 3447003,
                            fields: fields
                        }
                    });
                }

                players = currentPlayers;
            });
        });
    }
}

function isDifferent(arr1, arr2) {
    return JSON.stringify(arr1) != JSON.stringify(arr2);
}
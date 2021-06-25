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
                if (data.status && data.online) {
                    var currentPlayers = data.players.sample == null ? [] : data.players.sample;

                    console.log("Checking players...")
                    console.log(currentPlayers);

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
                                    name: "Player(s) joined/left",
                                    url: data.favicon,
                                    icon_url: data.favicon
                                },
                                color: 3447003,
                                fields: fields
                            }
                        });
                    }

                    players = currentPlayers;
                }
            });

        });

    }
}

function compareName(a, b) {
    // converting to uppercase to have case-insensitive comparison
    const name1 = a.name.toUpperCase();
    const name2 = b.name.toUpperCase();

    let comparison = 0;

    if (name1 > name2) {
        comparison = 1;
    } else if (name1 < name2) {
        comparison = -1;
    }
    return comparison;
}

function isDifferent(arr1, arr2) {
    if (arr1.length != arr2.length)
        return true;

    arr1 = arr1.sort(compareName);
    arr2 = arr2.sort(compareName);

    return JSON.stringify(arr1) != JSON.stringify(arr2);
}
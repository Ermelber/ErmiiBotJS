module.exports =
{
    init(client) {
        let waterHour = require("./waterHour.js");
        let mcPlayers = require("./mcPlayers.js");

        waterHour.init(client);
        mcPlayers.init(client);
    }
}
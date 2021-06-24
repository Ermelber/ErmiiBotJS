module.exports =
{
    init(client) {
        let utcWaterHour = "21:29";
        let timer = require("../other/timer.js");

        timer.create(60000, () => {
            var element = getWaterHourData();

            var channel = client.channels.get("475377868738920448"); //shitpost-realm (Strobetano)
            channel.send(element.message + element.url);

            // var canale = client.channels.get("562374071212572704"); //comun-uffizio
            // canale.send("@everyone\n\n:exclamation::exclamation:A V V E R T E N Z A:exclamation::exclamation:\n\nÈ giunto l'attimo d'abbeverarsi d'acqva, poichè l'istante de l'idratazione è benuto! :potable_water: \nhttps://i.imgur.com/sLT5wTm.png`");
        }, utcWaterHour);
    }
}

function getDayOfTheWeek() {
    var date = new Date();
    return (date.toLocaleString('en-US', { weekday: 'short' }));
}

function getWaterHourData() {
    const { list } = require('../assets/json/waterHour.json');

    var filtered = list.filter(f => f.days.includes(getDayOfTheWeek()));

    return filtered[Math.floor(Math.random() * filtered.length)];
}
module.exports =
{
    checkWaterHour(client) {
        if (isWaterHour()) {
            /*var channel = client.channels.get("475377868738920448"); //shitpost-realm
            channel.send(`<@&572540171678121984>\n\n:exclamation::exclamation:W A R N I N G:exclamation::exclamation:\n\nIt's real water hours. :potable_water:\n\nTake a glass of water as fast as possible!\nhttp://pluspng.com/img-png/water-glass-hd-png-water-glass-png-1200.png`);*/

            //var channel = client.channels.get("475377868738920448"); //shitpost-realm
            //channel.send(`<@&572540171678121984>\n\n:exclamation::exclamation:W A R N I N G:exclamation::exclamation:\n\nIt's real water hours. :potable_water:\n\nTake a glass of water as fast as possible!\nhttps://cdn.discordapp.com/attachments/475377868738920448/632546413733085195/unknown.png`);

            var element = getWaterHourData();

            var channel = client.channels.get("475377868738920448"); //shitpost-realm
            channel.send(element.message + element.url);

            var canale = client.channels.get("562374071212572704"); //comun-uffizio
            canale.send("@everyone\n\n:exclamation::exclamation:A V V E R T E N Z A:exclamation::exclamation:\n\nÈ giunto l'attimo d'abbeverarsi d'acqva, poichè l'istante de l'idratazione è benuto! :potable_water: \nhttps://i.imgur.com/sLT5wTm.png`")
        }
    }
}

function isWaterHour() {
    var date = new Date();
    return date.getHours() == 21 && date.getMinutes() == 29;
}

function getDayOfTheWeek() {
    var date = new Date();
    return (date.toLocaleString('en-US', { weekday: 'short' }));
}

function getWaterHourData() {
    const { list } = require('./water.json');

    var filtered = list.filter(f => f.days.includes(getDayOfTheWeek()));

    return filtered[Math.floor(Math.random() * filtered.length)];
}
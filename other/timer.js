module.exports =
{
    create(milliseconds, callback, time) {
        setInterval(() => {
            //console.log("checking...");
            if (time == null || checkTime(time)) {
                //console.log("triggering...");
                callback();
            }
        }, milliseconds);
    }
}

function checkTime(time) {
    var date = new Date();

    var currentHours = date.getUTCHours();
    var currentMinutes = date.getUTCMinutes();

    var targetHours = parseInt(time.split(':')[0]);
    var targetMinutes = parseInt(time.split(':')[1]);

    //console.log({currentHours: currentHours, currentMinutes: currentMinutes, targetHours: targetHours, targetMinutes: targetMinutes})

    return currentHours == targetHours && currentMinutes == targetMinutes;
}
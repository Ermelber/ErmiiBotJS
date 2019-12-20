function getDayOfTheWeek(){
    var date = new Date();
    return (date.toLocaleString('en-US', { weekday: 'short'}));
}

function getWaterHourData(){
    const { list } = require('./other/water.json');

    var filtered = list.filter(f => f.days.includes(getDayOfTheWeek()));

    return filtered[Math.floor(Math.random() * filtered.length)];
}

console.log(getWaterHourData())
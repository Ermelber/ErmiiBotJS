module.exports = {
    name: 'water',
    aliases: ['w'],
    description: 'When is the real water hours?',
    disabled: false,
    execute(message, args) 
    {
        message.reply("it's at 23:29 (Italian Time)")

            // const { list } = require('./../other/water.json'); //require('./water.json');

            // var element = list[Math.floor(Math.random() * list.length)];
    
            // message.reply(element.message + element.url);

	},
};
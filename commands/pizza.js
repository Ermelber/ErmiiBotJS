module.exports = {
    name: 'pizza',
    aliases: ['p'],
    description: 'Sends pizza pictures',
    execute(message, args) {
        const { list } = require('../assets/json/pizza.json');

        message.reply("Te piace accussì?\n" + list[Math.floor(Math.random() * list.length)].url);
    },
};
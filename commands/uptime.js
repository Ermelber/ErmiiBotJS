module.exports = {
    name: 'uptime',
    aliases: ['u'],
    description: 'Server uptime',
    disabled: true,
    execute(message, args) 
    {
        var exec = require('child_process').exec;
        dir = exec("uptime", function(err, stdout, stderr)
        {
            var info = parseUptimeString(stdout);
            message.channel.send({
                embed: 
                {
                    color: 3447003,
                    title: "Server Uptime",
                    fields:
                    [
                        {
                            name: `Current Time`,
                            value: info.time
                        },
                        {
                            name: `Uptime`,
                            value: info.uptime
                        },
                        {
                            name: `Active users`,
                            value: info.users
                        },
                        {
                            name: `Load average`,
                            value: info.loadAverage
                        }
                    ]
                }
            });
        });

        
	},
};

function parseUptimeString(str)
{
    var info2 = str.split("up")[1].split("user")[0].split(",");

    var time = str.split(" ")[1];
    var uptime = info2.length == 3 ? `${info2[0]}, ${info2[1]}` : `${info2[0]}`;
    var users = info2[info2.length - 1].replace(/\s/g,'');
    var loadAverage = str.split("load average: ")[1];

    return { time: time, uptime: uptime, users: users, loadAverage: loadAverage };
}
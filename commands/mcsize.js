module.exports = {
    name: 'mcsize',
    aliases: ['s'],
    description: 'Minecraft Server Disk Usage',
    disabled: true,
    execute(message, args) 
    {
        getInfo(message);
	},
};

function readableBytes(bytes) 
{
    var i = Math.floor(Math.log(bytes) / Math.log(1024)),
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + sizes[i];
}

function parseDiskUsage(str)
{
    return readableBytes(parseInt(str) * 1024);
}

function getInfo(message)
{
    var overworld;
    var nether;
    var end;

    var exec = require('child_process').exec;
    dir = exec("du /home/pi/world/region", function (err, stdout, stderr)
    {
        overworld = stdout;
        dir = exec("du /home/pi/world_nether/DIM-1/region", function (err, stdout, stderr) 
        {
            nether = stdout;
            dir = exec("du /home/pi/world_the_end/DIM1/region", function (err, stdout, stderr) 
            {
                end = stdout;
                message.channel.send({
                    embed: 
                    {
                        color: 3447003,
                        title: "Minecraft Server Disk Usage",
                        fields:
                        [
                            {
                                name: "Overworld",
                                value: parseDiskUsage(overworld),
                            },
                            {
                                name: "Nether",
                                value: parseDiskUsage(nether),
                            },
                            {
                                name: "The End",
                                value: parseDiskUsage(end),
                            }
                        ]
                    }
                });
            });
        });
    });
}
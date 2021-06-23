//DEPRECATED - I now use eu.mc-api.net instead

//MC Server Ping
//2019 - Made by Ermelber

function writeHexByte(value)
{
    return value.toString(16).length == 1 ? `0${value.toString(16)}` : value.toString(16);
}

function writeHexShort(value)
{
    return writeHexByte(value >> 8 & 0xFF) + writeHexByte(value & 0xFF);
}

function writeVarInt(value)
{
    var str = "";
    do
    {
        var temp = value & 0b01111111;
        value >>>= 7;
        if (value != 0)
        {
            temp |= 0b10000000;
        }
        str += writeHexByte(temp);
    }
    while (value != 0);

    return str;
}

function writeString(value)
{
    var str = "";

    for (var i = 0; i < value.length; i++)
        str += writeHexByte(value.charCodeAt(i));

    str = writeVarInt(str.length / 2) + str;
    
    return str;
}

const PROTOCOL_VERSION = 404;

function getHandshakePacket(address, port)
{
    var data = 
        writeVarInt(0x00) + //Handshake Packet ID
        writeVarInt(PROTOCOL_VERSION) + //Protocol Version
        writeString(address) + //Server Address
        writeHexShort(port) + //Server Port
        writeVarInt(0x01); //Next State (0x01 = Status)

    return Buffer.from(
        writeVarInt(data.length / 2) + //Packet Length
        data
        ,"hex");
}

function getRequestPacket()
{
    return Buffer.from(
        writeVarInt(1) + //Packet Length
        writeVarInt(0x00),
        "hex");
}

function readResponse(data)
{
    var str = data.toString();
    str = str.substr(str.indexOf("\"description\"") - 1, str.length - 1);

    return JSON.parse(str);
}

module.exports =
{
    getServerDataFromMcApi(address, port, callback)
    {
        var http = require('http');

        return http.get(
        {
            host: 'eu.mc-api.net',
            path: `/v3/server/ping/${address}:${port}`
        }, 
        function(response) 
        {
            // Continuously update stream with data
            var body = '';
            
            response.on('data', function(d) {
                body += d;
            });

            response.on('end', function()
            {
                console.log(body);

                var parsed = JSON.parse(body);
                callback("ok", parsed);
            });

            response.on('error', function()
            {
                callback("error");
            });
        });
    },
    getServerData(address, port, callback)
    {
        const net = require("net");
    
        var client = net.connect(port, address, () =>
        {
            try
            {
                //Connect Listener
                client.write(getHandshakePacket(address, port));
                client.write(getRequestPacket());
            }
            catch (ex)
            {
                
            }
        });

        client.on('data', (data) =>
        {
            try
            {
                callback("ok", readResponse(data));
                client.end();
            }
            catch (ex)
            {
                
            }
        });

        client.on("error", () =>
        {
            callback("error");
        });
    }
}
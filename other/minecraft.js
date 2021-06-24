module.exports =
{
    ping(hostname, complete) {
        var http = require("https");

        var options = {
            "method": "GET",
            "hostname": "eu.mc-api.net",
            "port": null,
            "path": "/v3/server/ping/" + hostname,
            "headers": {}
        };

        var req = http.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                var body = Buffer.concat(chunks);

                if (complete) {
                    complete(JSON.parse(body.toString()));
                }
            });
        });

        req.end();
    }
}
var http = require("http");
const APP_ID = "ZIVLB8BLBM";
var hostname = ".algolia.net";
var options = {
    "method": "GET",
    "hostname": "",
    "path": "/1/isalive",
    "headers": {
        "Content-Type": "application/json"
    }
};



function pingServer() {
    options.hostname = `${APP_ID}${hostname}`
    //console.log(options)
    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = JSON.parse(Buffer.concat(chunks));
            if (body.message && body.message === "server is alive") {
                return true;
            } else {
                return false;
            }
        });
        res.on("error", function (error) {
            return false;
        });
    });
    req.end();
}


pingServer();
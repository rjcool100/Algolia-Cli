var algoliasearch = require('algoliasearch');
var pretty = require('./prettyprint');
const APP_ID = process.env.APP_ID;
const APP_KEY = process.env.APP_KEY;
var fs = require('fs');

function testCreds() {
    if (APP_ID === undefined || APP_KEY === undefined) {
        console.log("Credentials not set, run with --help to know how to set them");
        return false;
    }
    return true;
}

var QueryIndex = async (params) => {
    if (testCreds()) {
        var client = algoliasearch(APP_ID, APP_KEY);
        var index = client.initIndex(params.index);
        if (!params.limit || params.limit < 5) {
            params.limit = 5;
        }

        var options = {
            query: params.query,
            hitsPerPage: params.limit
        };
        if (params.attributes) {
            options.attributesToRetrieve = params.attributes;
        }

        try {
            const content = await index.search(options);
            var hits = content.nbHits;
            if (hits > 0) {
                console.log(hits + " Matches found");
                var results = content.hits;
                var headers = [];
                if (params.attributes) {
                    headers = params.attributes;
                } else {
                    var temp = results[0];
                    for (var key in temp) {
                        if (key === 'objectID' || key === '_highlightResult')
                            continue;
                        headers.push(key)
                    }
                }
                pretty.printpretty(headers, results, params);
            } else {
                console.log("sorry nothing found");
            }
        } catch (err) {
            console.log("err, check logs");
            //console.log(err.debugData);
            writeToFile("error.txt", err)
        }
    }
};

function writeToFile(filename, data) {

    fs.writeFile(filename, JSON.stringify(data), 'utf8', () => {
        console.log("Content saved to file " + filename);
    });
}

module.exports.QueryIndex = QueryIndex
var fs = require('fs');

function printpretty(headers, data, params) {
    var line = "";
    headers.forEach(header => {
        line = line + "\t|" + header + "|\t"
    });
    console.log(line);
    data.forEach(element => {
        var output = "";
        for (var key in element) {
            if (key === 'objectID' || key === '_highlightResult')
                continue;
            output = output + "\t" + element[key] + "\t"
        }
        console.log(output);
    })
    if (params.save) {
        writeToFile(params.save, data);
    }
}

function writeToFile(filename, data) {

    fs.writeFile(filename + '.json', JSON.stringify(data), 'utf8', () => {
        console.log("Content saved to file " + filename);
    });
}
module.exports.printpretty = printpretty
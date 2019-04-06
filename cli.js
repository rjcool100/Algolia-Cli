#!/usr/bin/env node

var search = require('./modules/search');
var help = require('./modules/help');
var validargs = ["--help", "--index", "--query", "--attributes", "--limit", "--save"]



if (process.argv.length === 2)
    console.log("missing parameters, run with --help to know more");
else if (process.argv.length === 3) {
    var arg = process.argv[2].split("=");
    if (arg[0] !== validargs[0] || arg.length != 1) {
        console.log("invalid parameters, run with --help to know more");
    } else {
        help.printhelp();
    }
} else {
    var exit = false;
    var params = {};
    for (let j = 2; j < process.argv.length; j++) {
        var arg = process.argv[j].split("=");
        if (arg.length < 2) {
            console.log("invalid parameters, run with --help to know more");
            exit = true;
            break;
        } else {
            var param = arg[0];
            var value = arg[1];
            if (!validargs.includes(param)) {
                console.log(`invalid parameter ${param}, run with --help to know more`);
                exit = true;
                break;
            } else {
                var exactParam = param.split("--")[1];
                params[exactParam] = value;
            }
        }
    }
    if (!exit)
        parseParams(params);

    //search.QueryIndex('Dragon', ['age']);
}

function parseParams(params) {
    if (!params.index || !params.index) {
        console.log('insufficient parameter value, exiting');
    } else if (params.limit && isNaN(params.limit)) {
        console.log('invalid parameter value for limit, exiting');
    } else {
        if (params.attributes) {
            params.attributes = params.attributes.split(",");
        }
        search.QueryIndex(params);
    }
}
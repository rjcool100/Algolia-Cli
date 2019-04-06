function printhelp() {
    console.log("Welcome to the help section");
    console.log("use --index=<index> to specify the index");
    console.log("use --query=<text> to search for in the index specified by --index paramter");
    console.log("use --attributes=<a>,<b>,<c> to provide a list of attributes to be fetched for the matched query results");
    console.log("use --limit=<limit> to specify the search limit");
    console.log("use --save=<filename> to save the query results as a json file");
}

module.exports.printhelp = printhelp
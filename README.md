# Algolia-Cli
A cli to search and query the algolia search engine
set the APP_ID and AP_KEY environment variables before running


use --index=<index> to specify the index
use --query=<text> to search for in the index specified by --index paramter
use --attributes=<a>,<b>,<c> to provide a list of attributes to be fetched for the matched query results
use --limit=<limit> to specify the search limit
use --save=<filename> to save the query results as a json file



run npm link to test it locally and then test by using algolia-cli

example: algolia-cli --index=Mangaka --query=Dragon


I have yet to make the text and the table pretty , it will need more time i guess


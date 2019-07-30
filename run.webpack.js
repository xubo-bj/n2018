let arg = process.argv[2]
const note = require("./config/note.webpack.config")
const configMap = {
    note
}

const webpack = require('webpack');

const compiler = webpack(configMap[arg]);

const watching = compiler.watch({
    // Example watchOptions
    aggregateTimeout: 300,
    poll: undefined
}, (err, stats) => { // Stats Object
    // Print watch/build result here...
    console.log("stats",stats);
});

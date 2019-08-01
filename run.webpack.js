let arg = process.argv[2]
const note = require("./config/note.webpack.config")
const baidu= require("./config/baidu.webpack.config")
const configMap = {
    note,
    baidu
}

const webpack = require('webpack');

const compiler = webpack(configMap[arg]);

const watching = compiler.watch({
    // Example watchOptions
    aggregateTimeout: 300,
    poll: undefined
}, (err, stats) => { // Stats Object
    // Print watch/build result here...
    // console.log("err :",err)
    // console.log("stats :",Object.keys(stats))
    // console.log("stats :",Object.keys(stats.compilation))

    console.log("=====================================")
    console.log("Hash :",stats.compilation.hash)
    console.log("stats :",stats.compilation.errors)
    console.log("\n")
});

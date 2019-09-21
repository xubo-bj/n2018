/*
** node run.webpack.js "project_name"
*/

let project_name = process.argv[2]
const webpack = require('webpack');
const compiler = webpack(require(`./config/${project_name}.webpack.config`))


const watching = compiler.watch({
    // Example watchOptions
    aggregateTimeout: 300,
    poll: undefined
}, (err, stats) => { // Stats Object
    // Print watch/build result here...
    // console.log("err :",err)
    // console.log("stats :",Object.keys(stats))
    // console.log("stats :",Object.keys(stats.compilation))
    console.log("Hash :",stats.compilation.name)
    console.log("=====================================")
    console.log("Hash :",stats.compilation.hash)
    console.log("error:",stats.compilation.errors)
    console.log("\n")
});

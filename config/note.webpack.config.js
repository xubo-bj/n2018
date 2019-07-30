const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode:"development",
    devtool:"source-map",
    entry: {
        main: path.resolve('src/note/es6/main.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/note/es5')
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: '[local]__[hash:base64]'
                            // localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        },
                    }, {
                        loader: "sass-loader",
                        // options: {
                        //     includePaths: [path.join(__dirname, "src/note/sass")]
                        // }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};

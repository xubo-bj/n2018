var path = require('path')
var webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
    entry: {
        main: path.resolve('src/blog/index.ts')
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/blog/es5')
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude:/node_modules/,
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude:/node_modules/,
                options: {
                    onlyCompileBundledFiles:true,
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            //   {
            //     test: /\.(png|jpg|gif|svg)$/,
            //     loader: 'file-loader',
            //     options: {
            //       name: '[name].[ext]?[hash]'
            //     }
            //   },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },

            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
                // use: [{
                //         loader: MiniCssExtractPlugin.loader,
                //         options: {
                //             // you can specify a publicPath here
                //             // by default it use publicPath in webpackOptions.output
                //             publicPath: '../'
                //         }
                //     },
                //     {
                //         loader: "css-loader",
                //         options: {
                //             // modules: true,
                //             // localIdentName: '[local]__[hash:base64]'
                //             // localIdentName: '[path][name]__[local]--[hash:base64:5]'
                //         },
                //     }, {
                //         loader: "sass-loader",
                //         // options: {
                //         //     includePaths: [path.join(__dirname, "src/note/sass")]
                //         // }
                //     }
                // ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    //   devServer: {
    //     historyApiFallback: true,
    //     noInfo: true
    //   },
    //   performance: {
    //     hints: false
    //   },

    //   devtool: '#eval-source-map',
    devtool: "source-map",
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
}

/*
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

*/
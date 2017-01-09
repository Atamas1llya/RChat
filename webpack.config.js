var path = require('path');
var ExtractTextPlugin = require ('extract-text-webpack-plugin');
module.exports = {
    entry: "./app/index.js",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['babel']},
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    },
    plugins: [
    new ExtractTextPlugin('bundle.css')
    ]
};

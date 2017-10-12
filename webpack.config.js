const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/scripts/entry.js',
    output: {
        filename: 'bundle.min.js',
    },
    module: {
        rules: [
            {
                test: /\.tag$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'riot-tag-loader',
                        options: {
                            debug: true,
                            template: 'pug',
                        },
                    },
                ],
            },
            {
                test: /\.js$|\.tag/,
                enforce: 'post',
                exclude: /node_modules/,
                use: ['buble-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.tag'],
    },
    plugins: [
        new UglifyJSPlugin(),
        new webpack.ProvidePlugin({
            riot: 'riot',
            Lockr: 'lockr',
        }),
    ],
    devtool: 'source-map',
};

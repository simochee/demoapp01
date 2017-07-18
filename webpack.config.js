const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
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
        extensions: ['', '.js', '.tga'],
    },
    plugins: [
        new UglifyJSPlugin(),
        new webpack.ProvidePlugin({
            riot: 'riot',
        }),
    ],
    devtool: 'source-map',
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
    mode: 'development',
    watch: false,
    entry: './src/index.js',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env',
                        {'plugins': ['@babel/plugin-proposal-class-properties']}]
                }
            }
        }
        ],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Sourdough Hydration',
            // Load a custom template (lodash by default)
            template: 'index.html',
        }),
        new ScriptExtHtmlWebpackPlugin({
            // sync: 'first.js',
            defaultAttribute: 'async'
        })
    ]
};
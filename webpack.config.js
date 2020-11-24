const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

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
        },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
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
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/images", to: "." },
                { from: "src/site.webmanifest", to: "." },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: '[id].css'
        }),
    ]

};
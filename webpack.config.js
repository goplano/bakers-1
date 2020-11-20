const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
    mode: 'development',
    watch: true,
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
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        index: 'index.html', liveReload: true,
        hotOnly: true,
        compress: true,
        port: 8000
    }
};
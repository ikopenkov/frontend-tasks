const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/app.ts',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /index.html/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'index.html',
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                exclude: /(node_modules|index.html)/,
                loader: 'html-loader',
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader?modules=true&localIdentName=[name]__[local]--[hash:base64:5]',
                ],
            },
            {
                test: /\.(png|jp(e*)g|gif|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[name]_[hash].[ext]'
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};

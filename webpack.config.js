const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const source = path.resolve(__dirname, 'src');
const dest = path.resolve(__dirname, 'dist');
const appDirectory = path.resolve(__dirname, 'app');

module.exports = {
    devtool: 'source-map',
    context: source,
    entry: [
        './index.ts',
        './styles.css'
    ],
    output: {
        filename: 'index.js',
        path: dest
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module:{
        rules: [{
            test: /\.ts$/,
            loaders:[
                'awesome-typescript-loader',
                'angular2-template-loader'
            ]
        }, {
                test: /\.css$/,
                exclude: appDirectory,
                loader: ExtractTextPlugin.extract({ 
                    fallback: 'style-loader', 
                    use: 'css-loader?sourceMap' 
                })
            },
            {
                test: /\.(css|html)$/, 
                include: appDirectory,
                loader: 'raw-loader'
            }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new ExtractTextPlugin('styles.css')
    ],
    devServer: {
        historyApiFallback: true
    }
};
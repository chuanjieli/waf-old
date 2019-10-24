const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
module.exports = {
    // mode: "production",
    entry: path.join(__dirname, '/src/main.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html'
        }),
        new VueLoaderPlugin(),
        new CompressionPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'] //一般安装node-sass安装不上，使用  SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass -D
        }, {
            test: /\.(jpg|png|gif|bmp|jpeg)$/, //引入图片loader     npm i file-loader url-loader -D
            use: 'url-loader?limit=1&name=[hash:8]-[name].[ext]'
            // limit 给定的值， 是图片的大小， 单位是byte， 如果我们引入的图片大于或等于limit的值， 则不会转为base64格式的字符串（ limit = 1 不会转为base64格式的字符串）
        }, {
            test: /\.(ttf|eot|svg|woff|woff2)$/, //引入字体loader
            use: 'url-loader'
        }, {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/ //配置babel 来转换高级的ES语法
        }, {
            test: /\.vue$/,
            use: 'vue-loader' //处理.vue 文件
        },
            // {
            // test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            // use: [{
            //     loader: "url-loader",
            //     options: {
            //         name: "[name]-[hash:5].min.[ext]",
            //         limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
            //         publicPath: "fonts/",
            //         outputPath: "fonts/"
            //     }
            // }],
            // exclude: /node_modules/
            // }
        ]
    }

}
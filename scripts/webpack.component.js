const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const loader = require('sass-loader');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const Components =  require('../components.json');

const jsexclude = /node_modules/;

// 多入口文件, 根据组件入口文件, 输出commonjs2形式的lib/组件.js文件
module.exports = {
    mode: 'production',
    entry: Components,
    output: {
        path: path.resolve(process.cwd(), './lib'),
        filename: '[name].js',
        chunkFilename: '[id].js',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: ['node_modules'],
    },
    // 配置如何展示性能提示
    performance: {
        hints: false, // 关闭提示
    },
    // 优化构建时显示日志
    stats: {
        children: false
    },
    optimization: {
        minimize: false,
    },
    module: {
        rules: [
            {
                // 对js文件的处理
                test: /\.(jsx?|babel|es6)$/,
                include: process.cwd(),
                exclude: jsexclude,
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                      preserveWhitespace: false
                    }
                }
            },
            {
                // 处理字体图片文件
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new VueLoaderPlugin(),
    ]
}
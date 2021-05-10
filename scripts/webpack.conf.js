const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const jsexclude = /node_modules/;

// 单入口文件, 根据src/index.js, 输出default形式的lib/index.js文件
// 作用: 有什么作用吗？
module.exports = {
    mode: 'production',
    entry: {
        app: ['./src/index.js'],
    },
    output: {
        path: path.resolve(process.cwd(), './lib'),
        filename: 'index.js',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        globalObject: 'typeof self !== \'undefined\' ? self : this',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
    },
    module: {
        rules: [
            {
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
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new VueLoaderPlugin(),
    ]
}
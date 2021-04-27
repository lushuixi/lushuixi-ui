
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const jsexclude = /node_modules/;

// 单入口文件, 根据src/index.js, 输出commonjs2形式的lib/yulongyi-ui.common.js文件
// 作用: 全局导入
module.exports = {
    mode: 'production',
    // 入口
    entry: {
        app: ['./src/index.js'],
    },
    // 输出
    output: {
        path: path.resolve(process.cwd(), './lib'), // 指定输出路径
        filename: 'lushuixi-ui.common.js', // 输出文件名
        chunkFilename: '[id].js',
        libraryExport: "default",
        // library: "YULONGYI",
        libraryTarget: 'commonjs2',
    },
    // webpack在启动后会从配置的入口模块触发找出所有依赖的模块, resolve配置webapck如何寻找模块对应的依赖
    resolve: {
        // 在导入语句中没有带文件后缀时, webpack会自动带上后缀去尝试访问文件是否存在, 用于配置在尝试过程中用到的后缀列表
        extensions: ['.js', '.vue', '.json'],
        // 配置webpck去哪里找第三方模块
        modules: ['node_modules'],
    },
    // 优化
    optimization: {
        minimize: false, // 不压缩js代码，默认是true
    },
    // 配置如何展示性能提示
    performance: {
        hints: false, // 关闭提示
    },
    // 优化构建时显示日志
    stats: {
        children: false
    },
    // loader, 对源代码进行转换
    module: {
        rules: [
            {
                // 对js文件的处理
                test: /\.(jsx?|babel|es6)\$/,
                include: process.cwd(),
                exclude: jsexclude,
                loader: 'babel-loader',
            },
            {
                // 对vue文件的处理
                test: /\.vue$/,
                loader: 'vue-loader',
            }
        ]
    },
    plugins: [
        // webpack构建进度条
        new ProgressBarPlugin(),
        // vue转js
        new VueLoaderPlugin(),
    ]
}

console.log('webpack', path.resolve(process.cwd(), './lib'))
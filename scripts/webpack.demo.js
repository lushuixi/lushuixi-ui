const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    mode: 'development',
    entry: {
        demo: path.resolve(process.cwd(), './examples/entry.js'),
    },
    output: {
        // 输出目录
        path: path.resolve(process.cwd(), './examples/dist/'),
        // 如果入口文件为path.resolve(process.cwd(), './main.js'), 资源引用路径为''
        publicPath: '',
        // publicPath: path.resolve(process.cwd(), './examples/dist/'),
        //生成的js文件名称
        filename: '[name].[hash:7].js',
        //生成的chunk名称
        chunkFilename: '[name].[hash:7].js',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: ['node_modules']
    },
    performance: {
        hints: false, // 关闭提示
    },
    stats: {
        children: false, // Tells stats whether to add information about the children.
    },
    devServer: {
        port: 9000,
        publicPath: '/',
        hot: true
    },
    module: {
        rules: [
            {
                // 将js|jsx|babel|es6文件语法由es6转为es5
                test: /\.(jsx?|babel|es6)$/,
                include: process.cwd(),
                exclude: jsexclude,
                loader: 'babel-loader'
            },
            {
                // vue
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                // scss|css
                test: /\.(scss|css)$/,
                use: [
                  isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                  'css-loader',
                  'sass-loader'
                ]
              },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // 打包后的文件名，默认是index.html 
            template: path.resolve(process.cwd(), './examples/index.html') // 导入被打包的文件模板
        }),
        new ProgressBarPlugin(),
        new VueLoaderPlugin(),
    ]
}
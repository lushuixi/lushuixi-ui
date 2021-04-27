'use strict';

// 作用: 在该目录下生成lib目录
const {series, src, dest} = require('gulp');
// 将sass转为css
const scss = require('gulp-sass');
// gulp-autoprefixer 浏览器兼容, 根据设置浏览器版本自动处理浏览器前缀
// const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

function compile() {
    return src('./src/*.scss')
        .pipe(scss.sync()) // 同步4
        // .pipe(autoprefixer({
        //     browsers: ['ie > 9', 'last 2 versions'], // 浏览器版本支持
        //     cascade: false // 是否美化属性值, 不美化
        // }))
        .pipe(cssmin()) // 压缩css
        .pipe(dest('./lib')); // 输出到lib目录下
}

// gulp.series 串行执行任务，series(compile, copyfont) 先执行compile，后执行copyfont
// gulp.parallel 并行执行任务
exports.build = series(compile)
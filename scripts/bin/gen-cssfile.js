// 作用: 使用fs创建theam-chalk/src/index.css文件
const path = require('path');
const fs = require('fs');
const Components = require('../../components.json');
const librayStyle = 'theme-chalk';
const basepath = path.resolve(__dirname, '../../packages/')

// 判断文件是否存在
function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    }catch(err) {
        return false;
    }
}

let isSCSS = librayStyle !== 'theme-default';
let indexContent = isSCSS ? '@import "./base.scss";\n' : '@import "./base.css";\n';

Object.keys(Components).forEach(key => {
    let fileName = key + (isSCSS ? '.scss' : '.css');
    let filePath = path.resolve(basepath, librayStyle, 'src', fileName);
    indexContent += '@import "./' + fileName + '";\n';
    // 如果文件不存在, 则创建该文件
    if(!fileExists(filePath)) {
        fs.writeFileSync(filePath, '', 'utf8');
        console.log('创建遗漏的', fileName, '文件');
    }
})

// 创建index.scss
fs.writeFileSync(path.resolve(basepath, librayStyle, 'src', isSCSS ? 'index.scss' : 'index.css'), indexContent)

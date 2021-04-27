## package.json
* 入口文件为src/index.js

## 目录结构
* packages为组件包目录
* srcipts为自动化脚本目录

## 发布步骤
> 参考:https://zhuanlan.zhihu.com/p/136603951
* 第一次发包 npm adduser 输入Username、Password、Email, 响应时间可能有点长
* 第二次发包 npm login
* 第二步发包, npm publish

## 安装webpack
* npm install webpack webpack-cli --save-dev

## 注意
* 发布的时候，通过.gitignore过滤掉node_modules和scripts目录下的内容

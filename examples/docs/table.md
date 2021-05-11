## Table 表格
常用的表格

### 结构分析

表格是对数据进行按行和列进行展示, 所以表格的基础结构便是行和列。
传统的表格标签tr(包含行),td(单元格),th(标题)即表头thead和标体tbody
那么elemnt是如何实现行和列的表格呢?

#### 原生表格

```
<table border>
    <thead>
        <tr>
            <th>姓名</th>
            <th>性别</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>露水晰</td>
            <td>女</td>
        </tr>
    </tbody>
</table>
```

#### 思路阐述

表格有行和列
table 属性

- data 数组类型 表体的数据源,默认为[]
- border 布尔值 边框,默认为false
- showHeader 布尔值 是否显示表头,默认为true

table-colummn 属性
- prop/property 字符串类型 data数据项的名
- label 字符串类型 标题

```vue
<template>
    <el-table :data="tableData">
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </template>
```

#### table的整体架构

##### table.vue:table入口, 整个表格的渲染
  > table.vue 有子组件, 但是不是通过template来渲染的
  - table-column.js: 处理列相关的属性和方法并将其保存到table公共池(table会展示原生的列,但是在视图上是不可见的)
    ```
    render(h) {
       return h('div', this.$slots.default);
    }
    ```

  - table-header.js: 表头的渲染（JSX）
    ```vue
    render(h) {
    	let columnRows = convertToRows(this.columns);
        return (
        	<table
            	class="y-table__header"
                cellspacing="0"
                cellpadding="0"
                border="0">
                	<colgroup>
                    	{
                    		this.columns.map(column => <col name={column.id} key={column.id} />)
                        }
                    </colgroup>
                    <thead>
                        <tr>
                           {
                              this._l(columnRows, (column, cellIndex) => (
                                  <th
                                      key={cellIndex}
                                      colspan={column.colspan}
                                      rowspan={column.rowspan}>
                                      <div
                                          class="cell">
                                          {column.label}
                                      </div>
                                   </th>
                                ))
                             }
                         </tr>
                    </thead>
                </table>
            )
    }
    ```
  
  - table-body.js: 表体的渲染（JSX）
    ```vue
    render(h) {
            const data = this.data || [];
            const columns = this.columns || [];
            return (
                <table
                    class="y-table__body"
                    cellspacing="0"
                    cellpadding="0"
                    border="0">
                    <colgroup>
                        {
                            columns.map(column => <col name={column.id} key={column.id} />)
                        }
                    </colgroup>
                    <tbody>
                        {
                            data.reduce((acc, row) => {
                                return acc.concat(this.wrappedRowRender(row, acc.length))
                            }, [])
                        }
                    </tbody>
                </table>
            )
        }
    ```

##### table-observer.js

> 为了让table-header和table-body保持同步, 将table-observer混入到这两个组件中

##### table-layout.js

  > 表格的整体属性和方法, 比如页面窗口尺寸发生变化后更新表格的单元格的宽度

[注]: 以上几个文件各司其职

#### 问题
##### element如何将el-table-column渲染到el-table里面的呢？
element创建了一个表格公共数据池store,使table可以共享这部分数据。table-column组件将该列的相关属性和方法都插入到store.states.columns中, 这样table-header和table-body可以共享columns,从而渲染

##### element中el-table-column组件没有tamplate结构,是如何渲染的呢？
render函数和JSX渲染

##### 表头和表体的单元格的宽度如何保持一致?
通过table的colgroup下的col标签, 设置其width属性, 便可以实现了

#### Vue有三种html创建方式

##### 模板创建
```
<h1>{{ blogTitle }}</h1>
```

##### 渲染函数创建render
```
render: function (createElement) {
  return createElement('h1', this.blogTitle)
}
```

##### JSX
> 需要插件支持:babel-plugin-transform-vue-jsx,babel-plugin-syntax-jsx, 并配置.babelrc文件
```
render(h) {
  return (
    <span>123</span>
  )
}
```
渲染函数使用场景

### 支持嵌套表格

#### 原生实现
```
<table border>
    <thead>
        <tr>
            <th colspan="1" rowspan="2">姓名</th>
            <th colspan="2" rowspan="1">个人信息</th>
        </tr>
        <tr>
            <th colspan="1" rowspan="1">职位</th>
            <th colspan="1" rowspan="1">性别</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="1" rowspan="1">路飞</td>
            <td colspan="1" rowspan="1">船长</td>
            <td colspan="1" rowspan="1">男</td>
        </tr>
    </tbody>
</table>
```

#### 实现思路
- 表格支持嵌套子列, 先考虑常见的几种表格结构。
- 常见表格机构:
    - 参考:http://www.doc88.com/p-7758454847013.html
    - 参考:https://blog.csdn.net/Li_dengke/article/details/103357921
- 有一下几种形式:
    - 一种是只是在表头中, 嵌套子列展示
    - 一种是只在表体中, 嵌套展示数据项
    - 一种既在表头, 也在表体

##### 表头嵌套子列
先来考虑实现表头中, 首先表现在表头table-header中, 从原生实现嵌套结构中可以看到,嵌套子列需要多行展示且需计算列的colspan和rowspan值。
- table-column
    - 如果该列有父列,则将该列push到父列的children,形成一个树状结构(states.originColumns)
- table-header
    - colspan:如果有嵌套子列,则取自嵌套子列的长度;否则取1
    - rowspan:列所在的层(包括自身层)到最底层的深度
    - level:列所在的层级
    - col单元格展示叶子层的列(states.columns)
    - thead标题展示多行嵌套子列(convertToRows(originColumns))
    - 将states.originColumns由树状结构处理成要展示的多行数据形成的数组(convertToRows(originColumns))
- table-body
    - colspan:1
    - rowspan:1
    - 单元格展示叶子层的列(states.columns)
- states.columns
    - table-header单元格展示叶子层的列
    - table-body单元格展示叶子层的列

#### 最终实现结构
```
<y-table 
    :data="tableData">
    <y-table-column prop="name" label="姓名"></y-table-column>
    <y-table-column label="介绍">
        <y-table-column label="个人信息">
            <y-table-column prop="position" label="职位"></y-table-column>
            <y-table-column prop="sex" label="性别"></y-table-column>
            <y-table-column prop="home" label="家乡"></y-table-column>
        </y-table-column>
        <y-table-column label="个人喜好">
            <y-table-column prop="likes" label="爱好"></y-table-column>
            <y-table-column prop="value" label="悬赏金"></y-table-column>
        </y-table-column>
    </y-table-column>
</y-table>
```

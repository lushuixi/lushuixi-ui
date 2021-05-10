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


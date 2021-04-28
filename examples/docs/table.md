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

#### 表格属性

表格有行和列, 表格属性
- data 数组类型 表体的数据源,默认为[]
- border 布尔值 边框,默认为false
- showHeader 布尔值 是否显示表头,默认为true

table-colummn 属性
- prop 字符串类型 data数据项的名
- label 字符串类型 标题

```
<template>
    <el-table :data="tableData">
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </template>
```

问题
- element如何将el-table-column渲染到el-table里面的呢？
- element中el-table-column组件没有tamplate结构,是如何渲染的呢？

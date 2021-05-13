/**
 * 列的循环渲染
 * 根据children字段无限循环下去,生成子树
 * 
 * 使用render函数创建组件
 * 
 * 函数式组件(理解:同React的函数组件)-无状态,无实例
 * 官方文档:https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6
 * 轻量,渲染性能高,适合只依赖于外部数据传递而变化的组件
 * 入参是渲染上下文(render context)，返回值是渲染好的HTML
 * 
 * 没有管理任何状态,没有监听任何传递给它的状态,也没有生命周期方法。
 * 实际上,它只是一个接受一些prop的函数(没有响应式数据,没有实例[没有this上下文])。
 * 
 * 函数式组件只是函数,所以渲染开销也低很多
 * 常用于包装组件(包装组件什么意思?为什么会比较适合用在此呢?)
 * 
 * 由于函数组件拥有无状态、无实例(没有this)的两个特性,我们就可以把它用作高阶组件(所谓高阶组件,就是可以生成其他组件的组件)
 * 
 * 创建函数组件模板:
 * export default {name: 'func-component', functional: true, render(createElement, context) {...}}
 * 
 * 因为函数式组件没有this,参数靠context(Object类型)来传递了
 * Reander context 属性:
 * - props
 * - children
 * - slots
 * - parent
 * - listeners
 * - injections
 * - data
 * 
 * creatElement:官方文档:https://cn.vuejs.org/v2/guide/render-function.html
 * 
 * 函数式组件没有实例,事件只能由父组件传递:
 * creatElement里事件属性:on
 * 属性集成在data里:第二个参数
 * export default {name: 'func-component', functional: true, render(createElement, {children}) {...}}
 * 
 */

export default {
    name: 'YCollapseTransition',

    // 函数式组件标识,只有该值为true,render的第二个参数才有意义
    functional: true,

    render(h, context) {
        console.log('context', context);
        const {children} = context;
        return h(
            'transition',  // 标签名
            children, // 子级虚拟节点
        );
    }
}

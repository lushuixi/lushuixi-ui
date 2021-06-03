<template>
    <div>
        <h3>生命周期</h3>
        {{name}}
    </div>
</template>

<script>
export default {

    /**
     * 组件注册
     */
    // components: {

    // },

    /**
     * mixins 类型: Array<Object>
     * mixins 选项接收一个混入对象的数组。
     * 这些混入对象可以像正常的实例对象一样包含实例选项，
     * 这些选项将会被合并到最终的选项中，
     * 使用的是和 Vue.extend() 一样的[选项合并逻辑]。
     * 也就是说，如果你的混入包含一个 created 钩子，而创建组件本身也有一个，那么两个函数都会被调用。
     * Mixin 钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用.
     * 
     * 混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的[可复用功能]。
     * 一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。
     * 
     * 选项合并（注意：Vue.extend() 也使用同样的策略进行合并）
     *  - 当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”
     *  - 比如，【数据对象】在内部会进行递归合并，并【在发生冲突时以组件数据优先】。
     *  -【同名钩子函数】将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用
     *  -【值为对象的选项】，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
     *  - 还可以【自定义选项合并策略】
     * 
     * 全局混入
     * 混入也可以进行全局注册。使用时格外小心！一旦使用全局混入，它将影响每一个之后创建的 Vue 实例。
     * 使用恰当时，这可以用来为自定义选项注入处理逻辑。
     * 【注意】请谨慎使用全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。
     * 大多数情况下，只应当应用于自定义选项，就像上面示例一样。推荐将其作为插件发布，以避免重复应用混入。
     * 
     */
    // mixins: ['']

    /**
     * 定义响应式的数据
     * 响应式的数据放在data里
     */
    // data() {
    //     return {
    //         name: 'lushuixi'
    //     }
    // },

    /**
     * 定义计算属性
     * 有缓存之功效
     * 有两个方法
     *  - get(默认有的)
     *  - set, name:{get:function(){...},set:function(newValue){...}}
     * 可以访问data里面的值
     * 
     * template 模板内的表达式非常便利，但是设计它们的初衷是用于[简单运算]的。
     * 在模板中放入太多的逻辑会让模板过重且难以维护。
     * <div id="example">
     *    {{ message.split('').reverse().join('') }}
     * </div>
     * 在这个地方，模板不再是[简单的声明式逻辑]。
     * 你必须看一段时间才能意识到，这里是想要显示变量 message 的翻转字符串。
     * [当你想要在模板中的多处包含此翻转字符串时，就会更加难以处理。]
     * 
     * 所以，对于任何复杂逻辑，都应当使用计算属性。
     * 计算属性是基于它们的响应式依赖进行缓存的(如果你不希望有缓存，请用方法来替代)
     * 
     * 计算属性默认只有 getter，不过在需要时你也可以提供一个 setter
     */
    // computed() {

    // },

    /**
     * 侦听属性
     * Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：侦听属性
     * 当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 watch——特别是如果你之前使用过 AngularJS。
     * 然而，通常更好的做法是使用计算属性而不是命令式的 watch 回调。
     * 
     * 三种使用方法:
     *  - 如果 `question` 发生改变，这个函数就会运行 question(newValue) {...}
     *  - handler-immediate, 监听立即执行, question:{immediate:true,handler(){...}}
     *  - handler-deep, 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深, question:{deep:true,handler(){...}}
     */
    // watch() {

    // },

    /**
     * 定义方法
     * methods 将被混入到 Vue 实例中。
     * 可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。
     * 方法中的 this 自动绑定为 Vue 实例。
     * 
     * 注意，不应该使用箭头函数来定义 method 函数 (例如 plus: () => this.a++)。
     * 理由是箭头函数绑定了父级作用域的上下文，
     * 所以 this 将不会按照期望指向 Vue 实例，this.a 将是 undefined。
     */
    // methods: {
        // 不建议写法
        // plus: () => {...}
        // 建议写法
        // plush(){...}
    // },

    // 生命周期
    /**
     * 在实例初始化之后，
     *  数据观测 (data observer) 和 event/watcher 事件配置之前被调用
     * 
     * 主要功能:做一些初始化的操作（定义一些变量什么的--创建）
     * 
     * 在该声明周期中定义的变量是非响应式的
     */
    // beforeCreate() {
    //     // console.log('beforeCreate', this);
    //     this.xing = "蔚龙艺";
    //     // debugger;
    // },

    /**
     * 在实例创建完成后被立即调用。
     * 在这一步，实例已完成以下的配置：
     *  - 数据观测 (data observer)，
     *  - property 和方法的运算，
     *  - watch/event 事件回调。
     * 然而，挂载阶段还没开始，$el property 目前尚不可用。
     * 
     * 主要功能:做一些初始化的操作（根据事件和数据做的一些初始化操作【不创建新的东西】--组合）
     * 但是不能访问和操作真实的dom，因为真实dom还没有生成
     */
    // created() {
    //     console.log('created', this, this.xing);
    //     this.prefix = "准备";
    //     // debugger;
    // },

    /**
     * 在挂载开始之前被调用：相关的 render 函数首次被调用。
     * 该钩子在服务器端渲染期间不被调用。
     * 
     * 主要功能:真实dom渲染前的操作
     */
    // beforeMount() {
        // console.log('beforeMount', this, this.$el);
        // debugger;
    // },

    /**
     * 实例被挂载后调用，这时 el 被新创建的 vm.$el 替换了。
     * 如果根实例挂载到了一个文档内的元素上，当 mounted 被调用时 vm.$el 也在文档内。
     * 注意 mounted 不会保证[所有的子组件]也都一起被挂载。
     * 如果你希望等到整个视图都渲染完毕，可以在 mounted 内部使用 vm.$nextTick
     * 该钩子在服务器端渲染期间不被调用。
     * 
     * 主要功能:真实dom已经渲染完毕后的一些操作
     */
    // mounted() {
        // console.log('mounted', this);
        // debugger;
        // setTimeout(()=>{
        //     this.name = "路飞";
        // }, 1000)
    // },

    /**
     * 数据更新时调用，发生在虚拟 DOM 打补丁之前。
     * 这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
     * 
     * 该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务端进行。
     * 
     * 主要功能:访问现有的dom，并对其进行一些解绑的操作
     * 
     * 什么操作会触发更新呢? --- 虚拟 DOM 打补丁
     *  - 更改template里面的内容
     *  - data里面的内容发生改变
     *  - 
     */
    // beforeUpdate() {
        // console.log('beforeUpate', this);
        // debugger;
    // },

    /**
     * 由于[数据更改]导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
     * 
     * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
     * 然而在大多数情况下，你应该避免在此期间更改状态。
     * 如果要相应状态改变，通常最好使用计算属性 computed 或 watcher 取而代之。
     * 
     * 注意 updated 不会保证所有的子组件也都一起被重绘。
     * 如果你希望等到整个视图都重绘完毕，可以在 updated 里使用 vm.$nextTick
     * 
     * 该钩子在服务器端渲染期间不被调用。
     * 
     */
    // updated() {
    //     console.log('updated', this);
    //     // debugger;
    // },

   /**
    * 被 keep-alive 缓存的组件激活时调用。
    * 该钩子在服务器端渲染期间不被调用。
    * 也就是说，该组件被 keep-alive 缓存了，那么每次调用该组件的时候都会触发
    * 主要功能:可以做一些初始化操作
    */
    // activated() {
    //     console.log('activated', this);
    //     // debugger;
    // },

    /**
     * 被 keep-alive 缓存的组件停用时调用。
     * 该钩子在服务器端渲染期间不被调用。
     * 主要功能:可以做一些重置化操作
     */
    // deactivated() {
    //     console.log('deactivated', this);
    //     // debugger;
    // },

    /**
     * 实例销毁之前调用。在这一步，实例仍然完全可用。
     * 该钩子在服务器端渲染期间不被调用。
     */
    // beforeDestroy() {
    //     console.log('beforeDestory', this);
    //     // debugger;
    // },

    /**
     * 实例销毁后调用。
     * 该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。
     * 主要功能:做一些实例销毁后的操作
     */
    destroyed() {
        console.log('destroyed', this);
        // debugger;
    },
}
</script>
<template>
    <!-- 进入/离开 & 列表过渡
        Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果
        官方文档:https://cn.vuejs.org/v2/guide/transitions.html

        添加过度组件
        类型:单元素/组件的过渡
        Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加【进入/离开】过渡
            - 条件渲染 (使用 v-if)
            - 条件展示 (使用 v-show)
            - 动态组件
            - 组件根节点
        钩子函数
        css过渡
     -->
    <transition name="y-message-fade" @after-leave="handleAfterLeave">
        <div 
            :class="[
                'y-message',
                type && `y-message--${type}`,
            ]"
            :style="positionStyle"
            v-show="visible"
            role="alert">
            <slot>
                <p v-if="!dangerouslyUseHTMLString" class="y-message__content">{{message}}</p>
                <p v-else v-html="message" class="y-message__content">{{message}}</p>
            </slot>
        </div>
    </transition>
</template>

<script type="text/babel">
// 为什么要加上 type="text/babel" ?
// 这样写会带来什么?
// message类型
const typeMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error',
};
export default {
    data() {
        return {
            // 是否将 message 属性作为 HTML 片段处理
            // 为什么会要这样的设置呢?
            // v-html 指令 更新元素的 innerHTML
            // 注意：内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译
            dangerouslyUseHTMLString: false,

            // 该message是否可见
            visible: false,

            // 关闭时的回调函数
            onClose: null,

            // 是否已经关闭
            closed: false,

            // 该message显示持续时间,毫秒
            // 设为 0 则不会自动关闭
            duration: 3000,

            // 定时器
            timer: null,

            // 定义距离顶部的高度值
            verticalOffset: 20,

            // 默认message类型
            type: 'info',

        }
    },

    // 计算属性
    computed: {
        // 定义相对定位的属性
        positionStyle() {
            return {
                'top': `${this.verticalOffset}px`
            };
        },
    },

    // 侦听属性
    watch: {
        // 侦听closed状态变化
        closed(newVal) {
            // 如果为true,则将该message设置为不可见
            if(newVal) {
                this.visible = false;
            }
        },
    },

    methods: {

        // 该message离开时()
        handleAfterLeave() {
            console.log('handleAfterLeave', this);
            // 移除该dom对应的真实dom节点,分两步实现

            // vm.$destroy
            // 完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器
            // 会触发 beforeDestroy 和 destroyed 的钩子
            // 销毁虚拟dom节点
            this.$destroy(true);

            // 销毁对应的真实dom节点
            // removeChild 删除指定元素的某个指定的子节点
            // 返回被删除的元素或null
            this.$el.parentNode.removeChild(this.$el);

        },

        // 关闭message
        close() {
            // 置message关闭标志为true
            this.closed = true;

            // 如果onClose是函数则执行
            // 在执行之前判断是否是函数
            if(typeof this.onClose === 'function') {
                this.onClose(this);
            }
        },

        // 设置定时器
        // 在一定时间后销毁该message
        startTimter() {
            // 如果duration为0则永不关闭
            if(this.duration > 0) {
                this.timer = setTimeout(() => {
                    // 判断是否在关闭
                    if(!this.closed) {
                        this.close();
                    }
                }, this.duration)
            }
        }
    },

    // 使用created还是mounted?
    // 目的是在duration时间后销毁该message
    // 从目的出发,为实现该目的,是从渲染成真实dom节点后开始计时的,所以用了mounted
    mounted() {
        // 开启定时器
        this.startTimter();
    },

    beforeDestroy() {
        console.log('beforeDestor', this);
    },
}
</script>
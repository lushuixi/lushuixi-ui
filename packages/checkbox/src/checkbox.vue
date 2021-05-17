<template>
    <!-- checkbox选中状态: 选中, 不选中, 半选
        单独使用checkbox，如何判断选中状态呢?
        prop接收的value值类型需为布尔类型: true选中, false不选中
        半选中状态如何处理?
        半选中状态下，如果再次点击，将indeterminate置为false, 便可以选中和取消选中了
        但是只能在父组件中控制indeterminate的值（因为子组件不能更改父组件prop传进来的值） -->
    <label
        class="y-checkbox"
        role="checkbox">
        <!-- checkbox分两部分, 一部分是多选框，一部分是标签 -->
        <span
            class="y-checkbox__input"
            :class="{
                'is-checked': isChecked,
                'is-indeterminate': indeterminate,
            }"
            >
            <!-- y-checkbox__inner 替换了原生多选框的样式，原生多选框只有两种状态，通过自定义的样式可定义第三种半选状态-->
            <span class="y-checkbox__inner"></span>
            <!-- 原生多选框, 如果value和labl都没有传, 则选中状态变化后, model值为true或false 
                定义ref以便获取该dom元素从而通知该原生多选框的选中状态
                自定义属性 aria-hidden 可直观明白该html是否展示
            -->
            <input
                ref="checkbox"
                class="y-checkbox__original"
                type="checkbox"
                :value="label"
                aria-hidden="false"
                v-model="model"
                @change="handleChange"/>    
        </span>
        <!-- 标签, 如果子元素存在则展示子元素, 否则标签为label -->
        <span 
            class="y-checkbox__label">
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>

<script>
import Emitter from '../../../src/mixins/emitter';
export default {
    name: 'YCheckbox',
    props: {
        value: {},
        // label选中状态的值, 只有在checkbox-group或者value为数组类型的时候方可有效
        label: {},
        // 半选中状态
        indeterminate: Boolean,
    },
    // 混入dispatch方法
    mixins: [Emitter],
    computed: {
        // 判断是否是group组件
        // vm.$parent, 父实例，如果当前实例有的话 https://cn.vuejs.org/v2/api/#vm-parent
        // vm.$options, 用于当前 Vue 实例的初始化选项。需要在选项中包含自定义 property 时会有用处 https://cn.vuejs.org/v2/api/#vm-options
        isGroup() {
            let parent = this.$parent;
            // 查找父节点, 判断是否是checkbox-group
            while (parent) {
                if(parent.$options.componentName !== 'YCheckboxGroup') {
                    parent = parent.$parent;
                }else {
                    // 保留父组件checkbox-group的数据
                    this._checkboxGroup = parent;
                    // console.log('_checkboxGroup', this._checkboxGroup);
                    return true;
                }
            }
            return false;
        },
        // 原生多选框值的选中状态
        model: {
            get() {
                // return this.value;
                return this.isGroup ? this._checkboxGroup.value : this.value;
            },
            set(val) {
                /**
                 * 通知父组件value值发生了变化
                 * v-model双向绑定, 手动通知父组件吗？这是因为并非是value值发生了变化，
                 * 而是另一个依赖变量model发生了变化, model发生变化后value也要变, 所以需要手动触发
                 * 为什么val会自动增删呢？
                 */
                if(this.isGroup) {
                    // console.log('通知父组件更新数据', val, this.model);
                    // 由于父组件的value是数组类型, 则更新即删除和添加，如何做到的呢？
                    // console.log('model发生了变化', val, this.label);
                    this.dispatch('YCheckboxGroup', 'input', [val]);
                }else {
                    this.$emit('input', val);
                }
                this.$refs.checkbox && (this.$refs.checkbox.checked = this.isChecked);
            }
        },
        /**
         * 选中状态的判定
         * 如何判定选中状态？
         * 这里分三种情况，一种是单个使用(value为布尔类型, label为undefined)
         * 一种情况是单个使用(value为数组类型, label为数组中的某一项)
         * 一种情况是父组件为checkbox-group(value为undefined, label有值)
         */
        isChecked() {
            // this.model.toString(), {}.toString.call(this.model)有什么区别？
            // 若this.model=true, 则 this.model.toString()->true, {}.toString.call(this.model)->[object Boolean]
            // console.log('第一种情况', {}.toString.call(this.model), {}.toString.call(this.model) === '[object Boolean]')
            
            // 如果是第一种情况, 单独使用多选框且value值为布尔类型
            if({}.toString.call(this.model) === '[object Boolean]') {
                // console.log('hhhh', this.model);
                return this.model;
            }

            // 如果是第二种情况，单独使用且value为数组类型
            // 数组的判定类型有几种？
            // console.log('第二种情况', this.model, Array.isArray(this.model), this.model.indexOf(this.label), this.model.includes(this.label));
            else if(Array.isArray(this.model)) {
                // console.log(this.model, this.label);
                // 判断值是否存在于数组中
                // indexOf和includes的区别
                return this.model.indexOf(this.label) > -1;
            }

            // 第三种情况，父组件是checkbox-group, 则this.model为数组类型
            // 如何判断是否选中呢？
            // console.log('第三种情况，父组件是checkbox-group', this._checkboxGroup.value, this.label);
        }
    },
    methods: {
        /**
         * 父组件可能有change事件，即选中状态变化后的回调
         * 因为这是由原生多选框选中状态变化后的回调，需要等视图更新后方可获取到新值，并将新值传给回调函数
         */
        handleChange(ev) {
            // console.log('原生checkbox发生了变化', this.model);
            this.$nextTick(()=>{
                this.$emit('change', this.model, ev);
                if(this.isGroup) {
                    // 组件checkbox-group绑定的change事件
                    this.dispatch('YCheckboxGroup', 'change', [this._checkboxGroup.value]);
                }
            })
        },
    },
    mounted() {
        // console.log('checkbox', this.value, this.label);
        // console.log(this.model.toString(), {}.toString.call(this.model), {}.toString.call(this.model) === '[object Boolean]')
        // 如果是半选中状态, 添加aria-controls属性, 为什么？
        // if(this.indeterminate) {
        //     this.$el.setAttribute('aria-controls', this.controls);
        // }
        // console.log('isChecked', this.isChecked);
    },
    watch: {
        // isChecked() {
        //     console.log('watchisChecked', this.isChecked)
        // }
    }
}
</script>
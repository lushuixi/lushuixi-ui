<template>
    <!-- 由于父组件传递v-model的双向绑定, 
        传入了value和input事件, 其中input事件用于更新value值到父组件
        model是根据label来匹配的, 不管$slots.default是否有内容 
        class="[{ active: isActive }, errorClass]-->
    <label
        class="l-radio"
        :class="[
            {'is-focus': focus},
            {'is-checked': model === label}
        ]"
        role="radio"
        :aria-checked="model === label">
        <!-- 分两部分, 一部分是原点, 一部分是标签名 -->
        <span 
            class="l-radio__input"
            :class="{
                'is-checked': model === label
            }">
            <!-- 展示原点, 通过原生的input展示
                如果不想要原生的单选框, 则使用相对定位和绝对定位
                由于v-mdoel机制, 对于单选框相当于
                checkbox 和 radio 使用 checked property 和 change 事件
                change事件用于更新model值
                未知 @change="handleChange"的存在意义？
             -->
            <span class="l-radio__inner"></span>
            <input
                ref="radio"
                class="l-radio__original"
                :value="label"
                type="radio"
                aria-hidden="false"
                v-model="model"
                @focus="focus = true"
                @blur="focus = false"
                @change="handleChange" />
        </span>
        <span class="l-radio__label">
            <!-- vue插槽 v-if="$slots.default"-->
            <!-- 如果有子数据,则展示子数据, 否则展示label -->
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>

<script>
import Emitter from '../../../src/mixins/emitter';
export default {

    name: 'LRadio',

    // 混入，增加dispath方法，将事件向上派发给父组件
    mixins: [Emitter],

    // 接收父组件传递的数据
    props: {
        value: {}, // 父组件v-model
        label: {}, // 父组件label
    },

    computed: {
        /**
         * 向上追溯父组件是否为radio-group
         * 不能通过name来判断，所以需要定义componentName
         */
        isGroup() {
            let parent = this.$parent;
            while(parent) {
                // console.log('radio下的父组件', parent, parent.$options.componentName);
                if(parent.$options.componentName !== 'LRadioGroup') {
                    parent = parent.$parent;
                }else {
                    // 保留radio-group组件的数据
                    this._radioGroup = parent;
                    return true;
                }
            }
            return false;
        },
        /**
         * 因为model值是绑定到原生的input框中的
         * 只要该input框
         * 如果是父组件radio-group下的radio, 则isGroup为true, model取radio-group组件上的value
         * 如何去通知父组件radio-group更新value值呢？
         */
        model: {
            get() {
                // return this.value;
                return this.isGroup ? this._radioGroup.value : this.value;
            },
            set(val) {
                console.log('model值发生了变化', val);
                // 通知父组件更新v-model对应的value值
                // this.$emit('input', val)
                if(this.isGroup) {
                    // this.dispatch('YRadioGroup', 'input', [val]);
                    // this.dispatch 是混入进来的, 通知父组件radio-group更新
                    this.dispatch('LRadioGroup', 'input', [val]);
                }else {
                    this.$emit('input', val);
                }
                // 同步到原生单选框的选中状态
                this.$refs.radio && (this.$refs.radio.checked = this.model === this.label);
            }
        }
    },

    data() {
        return {
            focus: false,
        }
    },

    methods: {
        handleChange() {
            // input改变后, 需要等视图的更新, 更新后方可获取该值, 为label对应的值
            this.$nextTick(()=>{
                console.log('handleChange', this.model);
                // 这句话有什么意义, 通知父组件选中状态变化后的回调
                this.$emit('change', this.model);
                // 如果是父组件是radio-group组件, 则调用父组件的handleChange, 以更新model值
                this.isGroup && this.dispatch('LRadioGroup', 'handleChange', this.model);
            })
        },
    },

    mounted() {
        // console.log('111', this.$slots, Boolean(this.$slots.default), this.value, this.label, this.model === this.label);
        // 测试: label值为1，如果加冒号，表示传入的是数字类型，1+1=1；如果不加冒号，表示传入的是字符串类型，1+1=11
        // console.log('222', this.label, this.label + 1);
        console.log('333', this.model)
    }

}
</script>
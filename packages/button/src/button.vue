<template>
    <button 
        class="y-button"
        @click="handleClick"
        :disabled="buttonDisabled"
        :class="[
            type ? 'y-button--' + type : '',
            {
                'is-disabled': buttonDisabled,
            }
        ]">
        <span v-if="$slots.default">
            <slot></slot>
        </span>
    </button>
</template>

<script>
export default {

    name: 'YButton',

    // button支持的传参
    props: {
        // 类型
        type: {
            type: String,
            default: 'default',
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false,
        }
    },

    computed: {
        buttonDisabled() {
            return this.disabled;
        }
    },

    methods: {
        handleClick(evt) {
            console.log('handleClick', evt);
            this.$emit('click', evt)
        }
    },

    mounted() {
        console.log('type', this.type)
    }

}
</script>
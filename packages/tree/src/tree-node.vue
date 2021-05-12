<template>
    <!-- 如何渲染子树? -->
    <div>
        tree-node
    </div>
</template>

<script>
export default {
    props: {
        /**
         * 两种写法
         */
        // node: {
        //     type: Object,
        //     default: function() {
        //         return {};
        //     }
        // },
        node: {
            default() {
                return {};
            }
        }
    },

    mounted() {
        console.log('node', this.node)
    }
}
</script>
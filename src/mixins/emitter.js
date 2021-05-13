/**
 * mixin混入,可以混入到所使用的组件本身的实例对象，两个对象的融合
 * 例如，radio组件使用了混入，且该混入对象中有radio组件没有的方法，则混入后radio组件便有了这个方法
 * 使用场景：如果多个组件公用同一个方法或什么的，可以抽离出来，混入进去
 * 官方文档: https://cn.vuejs.org/v2/guide/mixins.html
 */

export default {

    methods: {

        /**
         * 实现子组件向父组件派发事件, 子组件通知父组件
         * @param {*} componentName 组件名, 用来查找拥有该组件名的组件(当前的父组件)
         * @param {*} eventName 事件名, 字符串类型
         * @param {*} params 参数
         */
        dispatch(componentName, eventName, params) {

            // console.log('混入文件emitter', componentName, eventName, params, this);
            let parent = this.$parent;
            let name = parent.$options.componentName;

            // 查找组件名为componentName的父组件
            while(parent && (!name || name !== componentName)) {
                parent = parent.$parent;
                if(parent) {
                    name = parent.$options.componentName;
                }
            }

            /**
             * emit官方文档: https://cn.vuejs.org/v2/api/#vm-emit
             * vm.$emit( eventName, […args] ), 接收的参数有两种形式, 一种是this.$emit(eventName, 参数), 一种是this.$emit([事件名, 参数])
             * concat 连接两个数组 ['input'].concat(['1']) => ['input', '1'], ['input'].concat('1') => ['input', '1']
             * 语法: arrayObject.concat(arrayX,arrayX,......,arrayX) 必需。该参数可以是具体的值，也可以是数组对象。可以是任意多个。
             * 返回值: 返回一个新的数组。该数组是通过把所有 arrayX 参数添加到 arrayObject 中生成的。如果要进行 concat() 操作的参数是数组，那么添加的是数组中的元素，而不是数组。
             * apply 修改this.$emit中的this指向
             * this.$emit([事件名， 参数]) 会有什么样的效果？会报错的，不能这样写的
             * 之所以可以这样写(this.$emit(parent, [eventName].concat(params))), 是因为js中修改this指向，如果使用apply方法接受数组形式的参数(call方法分别接受参数)
             * 所以 this.$emit(parent, ['input', '1']) 会被译成 vm.$emit('input', '1') 这种形式
             */
            // console.log('父亲节点', parent, name, [eventName].concat('1'));
            // apply 修改this.$emit中的this指向
            this.$emit.apply(parent, [eventName].concat(params))
            
        }

    }

}
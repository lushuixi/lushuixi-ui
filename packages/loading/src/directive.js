/**
 * 指令
 * 自定义指定: https://cn.vuejs.org/v2/guide/custom-directive.html#ad
 * 
 * 钩子函数
 * 一个指令定义对象可以提供如下几个钩子函数
 * bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
 * inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
 * update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
 * componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
 * unbind：只调用一次，指令与元素解绑时调用。
 * 
 * 钩子函数参数
 * 指令钩子函数会被传入以下参数：
 * el：指令所绑定的元素，可以用来直接操作 DOM。
 * binding：一个对象，包含以下 property
 *      name：指令名，不包括 v- 前缀。
 *      value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
 *      oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
 *      expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
 *      arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
 *      modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
 * vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
 * oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
 * 
 * 
 */

import Vue from 'vue';
import Loading from './loading.vue';
import afterLeave from '../../../src/utils/after-leave';
import {
    addClass,
    removeClass,
    getStyle,
} from '../../../src/utils/dom';

// 创建Vue构造器
const Mask = Vue.extend(Loading);

const DefaultZIndex = 2000;

const loadingDirective = {};

loadingDirective.install = Vue => {
    // console.log('注册loadingDirective');

    /**
     * 打开或关闭loading
     * 
     * (binding.modifiers 一个包含修饰符的对象
     * v-directive.body.fullscreen => binding.modifiers = {body: true, fullscreen: true}
     * 
     * @param {*} el
     * @param {*} binding
     */
    const toggleLoading = (el, binding) => {
        if(binding.value) {
            // 打开loading
            // console.log('打开loading', binding);

            Vue.nextTick(() => {
                if(binding.modifiers.fullscreen) {
                    // console.log('有fullscreen修饰符,全局loading');

                    el.originalPosition = getStyle(document.body, 'position');
                    el.originalOverflow = getStyle(document.body, 'overflow');
                    
                    el.maskStyle.zIndex = DefaultZIndex;

                    // 添加类名
                    addClass(el.mask, 'is-fullscreen');

                    // 全局loading, 渲染真实dom
                    insertDom(document.body, el, binding);

                } else {
                    // console.log('暂无fullscreen修饰符,局部loading', el.mask);
                    // 移出类名is-fullscreen
                    removeClass(el.mask, 'is-fullscreen');

                    if(binding.modifiers.body) {
                        // console.log('有body修饰符但是fullscreen为false,局部loading');

                        // 获取父元素的position属性
                        el.originalPosition = getStyle(el, 'position');

                        // el.getBoundingClientRect(): 返回元素的大小及其相对于视口的位置
                        // 兼容性较好
                        ['top', 'left'].forEach(property => {
                            const scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
                            el.maskStyle[property] = el.getBoundingClientRect()[property] +
                                document.body[scroll] +
                                document.documentElement[scroll] -
                                parseInt(getStyle(document.body, `margin-${property}`), 10) +
                                'px';
                        });

                        ['height', 'width'].forEach(property => {
                            el.maskStyle[property] = el.getBoundingClientRect()[property] + 'px';
                        });

                        // console.log('body', el.maskStyle);

                        insertDom(document.body, el, binding);

                    } else {
                        // console.log('无body修饰符,局部loading');

                        // 获取父元素的position属性
                        el.originalPosition = getStyle(el, 'position');

                        // 局部loaing, 渲染真实dom
                        insertDom(el, el, binding);

                    }
                }
            });
        } else {
            // 关闭loading
            // console.log('关闭loading');

            // 后执行, 定时器,在300+100毫秒后执行第二个参数回调
            afterLeave(el.instance, _ => {
                // console.log('我爱你，你爱我，蜜雪冰城甜蜜蜜9', el.instance.hiding);
                if(!el.instance.hiding) return;

                el.domVisible = false;

                const target = (binding.modifiers.fullscreen || binding.modifiers.body) ? document.body : el;
                
                removeClass(target, 'y--loading-parent--relative');
                removeClass(target, 'y-loading-parent--hidden');
                
                el.instance.hiding = false;
            }, 300, true);

            // 先执行
            el.instance.visible = false; // 触发after-leave事件监听器
            el.instance.hiding = true; // display:none
        }
    };

    /**
     * 渲染真实dom节点
     * 
     * @param {Node} parent
     * @param {Node} el
     * @param {Object} binding
     */
    const insertDom = (parent, el, binding) => {
        console.log('insertDom', parent, el, binding, el.domVisible);
        // getStyle(el, 'moz---ABC:::.style::.');
        // console.log('getStyle', getStyle(el, 'display'));

        if(!el.domVisible && getStyle(el, 'display') !== 'none' && getStyle(el, 'visible') !== 'hidden') {
            // 如果loading组件显示中(display:none;visible:hidden)

            // 定义样式
            Object.keys(el.maskStyle).forEach(property => {
                el.mask.style[property] = el.maskStyle[property];
            });

            // 添加样式
            if(el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
                addClass(parent, 'y--loading-parent--relative');
            }
            if(binding.modifiers.fullscreen && binding.modifiers.lock) {
                addClass(parent, 'y-loading-parent--hidden');
            }

            el.domVisible = true;

            parent.appendChild(el.mask);
            Vue.nextTick(() => {
                if(el.instance.hiding) {
                    el.instance.$emit('after-leave');
                } else {
                    el.instance.visible = true;
                }
            });

            // 标识符,说明该节点已经被渲染成真实dom
            el.domInserted = true;
        } else if(el.domVisible && el.instance.hiding === true) {
            el.instance.visible = true;
            el.instance.hiding = false;
        }
    };


    // 注册自定义指令
    Vue.directive('loading', {
        bind: function(el, binding, vnode) {
            // 获取跟指令对应的参数
            const textExr = el.getAttribute('loading-text');
            const spinnerExr = el.getAttribute('loading-spinner');
            const backgroundExr = el.getAttribute('loading-background');
            
            const vm = vnode.context;
            
            // Vue构造器实例化
            const mask = new Mask({
                el: document.createElement('div'),
                data: {
                    text: vm && vm[textExr] || textExr,
                    spinner: vm && vm[spinnerExr] || spinnerExr,
                    backgrond: vm && vm[backgroundExr] || backgroundExr,
                    fullscreen: !!binding.modifiers.fullscreen,
                },
            });

            // 保存实例
            el.instance = mask;
            el.mask = mask.$el;
            // 保存样式
            el.maskStyle = {};

            // console.log('el', el, binding);

            // 打开loading
            binding.value && toggleLoading(el, binding);
        },

        // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前
        // 指令的值可能发生了改变，也可能没有
        update: function(el, binding) {
            el.instance.setText(el.getAttribute('loading-text'));
            // 新值与旧值是否相等
            if(binding.oldValue !== binding.value) {
                toggleLoading(el, binding);
            }
        },

        // 指令与元素解除绑定?何时解除绑定呢?
        unbind: function(el, binding) {
            // console.log('解除绑定', this.domInserted);
            if(el.domInserted) {
                el.mask &&
                el.mask.parentNode &&
                el.mask.parentNode.removeChild(el.mask);

                toggleLoading(el, {
                    value: false,
                    modifiers: binding.modifiers,
                });
            }
            // 销魂vue实例
            el.instance && el.instance.$destroy();
        },
    });
}

export default loadingDirective;
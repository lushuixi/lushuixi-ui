/**
 * dom操作
 * 
 */

import Vue from 'vue';

const isServer = Vue.prototype.$isServer;

// document.documentMode 属性返回浏览器渲染文档的模式
const isVersion = isServer ? 0 : Number(document.documentMode)

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;

const MOZ_HACK_REGEXP = /^moz([A-Z])/;

/**
 * 去除头和尾的空格
 * \s 匹配任何空格字符
 * \uFEFF 空格，字节次序标记字符（Byte Order Mark），也就是BOM,它是es5新增的空白符
 * @param {String} string 
 * @returns 
 */
const trim = function(string) {
    // |[\s\uFEFF]+$
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

/**
 * replace
 * 第二个参数可接收一个函数
 *      第一个参数是匹配到的字符串
 *      第二个参数是匹配到的字符串
 *      第三个参数是
 *      第四个参数是匹配到的开始索引位置
 * 
 * @param {*} name 
 * @returns 
 */
const camelCase = function(name) {
    if(!name) return;
    
    // 涉及到正则: .replace(MOZ_HACK_REGEXP, 'Moz$1') 表示第一个圆括号里的内容
    return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
        // console.log('888', _, separator, letter, offset);
        return offset ? letter.toUpperCase() : letter
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}

/**
 * 判断指定节点是否存在指定类名
 * @param {Node} el 元素节点
 * @param {String} cls class名
 * 
 * @returns boolean
 * false:不存在
 * true:存在
 * 
 * jQuery
 * $.contains(container, contained): 判断指定元素内是否包含另一个元素
 * 
 * 为什么Vue可以使用contains方法呢?
 * 难道是因为Vue本身已引入jQuery了吗？
 * 
 * className属性与classList属性:
 * className属性与classList属性同为Dom属性且都管理class类的值，
 * 不同的是classList属性值为特殊的DOMTokenList对象，
 * 而className属性的值为普通的字符串
 * 
 * 考虑到兼容性问题,两者同时使用
 * 铁打的IE从9之前完全不支持classList属性，从版本10开始支持该属性，但不支持add与remove方法
 * 
 */
export function hasClass(el, cls) {
    // 参数不为空的校验
    if(!el || !cls) return false;

    // 类名cls是否包含空格符
    if(cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');

    // 判断节点el是否存在cls的类名
    // 如何判断
    // 两种方式: el.className.split(' ') | el.classList
    console.log('hasClass', el, cls, el.className, el.classList);
    
    // classList属性的值为DOMTokenList对象，关于DOMTokenList官方解释是一组空格分隔的标记，与Array一样具有length属性，且索引从0开始，但无法使用Array对象的方法。
    // 不过DOMTokenList对象内置了add，remove，contains等方法，用于增删改查等操作；所以我们可以使用add，remove像JQ中addClass与removeClass方法一样操作class类
    if(el.classList) {
        // classList自带的contains
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}

/**
 * 对指定元素节点添加类名(若有多个,以空格分割)
 * 
 * el.classList 支持add, remove
 * 
 * @param {Node} el 元素节点
 * @param {String} cls class类名
 */
export function addClass(el, cls) {
    if(!el) return;
    let curClass = el.className;
    let classes = (cls || '').split(' ');
    
    for(let i = 0, j = classes.length; i < j; i++) {
        let className = classes[i];
        if(!className) return;

        if(el.classList) {
            el.classList.add(className);
        } else if(!hasClass(el, className)) {
            curClass += ' ' + className;
        }
    }

    if(!el.classList) {
        el.className = curClass;
    }
}

/**
 * 移出指定节点的指定class(可添加多个)
 * @param {Node} el 元素节点
 * @param {String} cls class名(单个或多个,多个以空格为分隔符)
 */
export function removeClass(el, cls) {
    // 参数不为空的校验
    if(!el || !cls) return;

    let classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';

    // console.log('removeClass', el, cls, classes, curClass);

    // 判断节点el是否存在cls的类名
    // 如果存在,则移除
    // 如果不存在,则返回

    for(let i = 0, j = classes.length; i < j; i++) {
        let clsName = classes[i];

        if(!clsName) continue;

        if(el.classList) {
            // 如果浏览器兼容classList
            el.classList.remove(clsName);
        } else if(hasClass(el, clsName)) {
            // 如果浏览器不兼容classList
            // 去除指令的类名
            curClass = curClass.replace(' ' + clsName + ' ', '');
        }
    }

    if(!el.classList) {
        // 如果浏览器不兼容classList
        el.className = trim(curClass);
    }
}

/**
 * 获取指定元素的指定样式值
 * 
 * JS中float的兼容性写法
 * ie6~8下：style.styleFloat
 * FF/chrome 以及ie9以上：style.cssFloat
 * 
 * @param {*} el 
 * @param {*} styleName 
 */
export function getStyle(el, styleName) {
    if(isServer) return;
    if(!el || !styleName) return null;

    // 样式名处理
    styleName = camelCase(styleName);

    if(styleName === 'float') {
        // 处理兼容性
        styleName = isVersion < 9 ? 'styleFloat' : 'cssFloat';
    }

    try {
        if(isVersion < 9) {
            // ie6~8下
            switch(styleName) {
                case 'opacity':
                    try {
                        return el.filters.item('alpha').opacity / 100;
                    } catch(e) {
                        return 1.0;
                    }
                default:
                    return el.style[styleName] || el.currentStyle ? el.currentStyle[styleName] : null
            }
        } else {
            // FF/chrome 以及ie9以上
            // document.defaultView属性返回当前 document 对象所关联的 window 对象，如果没有，会返回 null。IE9以下不支持
            // getComputedStyle() 方法用于获取指定元素的 CSS 样式
            let computed = document.defaultView.getComputedStyle(el, '');
            
            // console.log('computed', document.defaultView);
            return el.style[styleName] || computed ? computed[styleName] : null;
        }
 
    } catch(e) {
        // console.log('第一级捕获异常', e);
        return el.style[styleName];
    }

}
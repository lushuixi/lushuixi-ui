module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.6.12
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (false) { var repeat, classify, classifyRE, hasConsole; }

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if (false) {}
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (false) {}
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (false
  ) {}
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     false && false;
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (false
  ) {}
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     false && false;
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (false) {}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       false && false;

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     false && false;
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (false) {}
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "production" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (false) {}
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (false) {}
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (false) {}
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (false) {}

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (false) {}
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    false
  ) {}
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (false) {}
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (false) {}
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var isUsingMicroTask = false;

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (false) { var getHandler, hasHandler, isBuiltInModifier, hasProxy, warnReservedPrefix, warnNonPresent, allowedGlobals; }

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (false) { var perf; }

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       false && false;
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (false) { var keyInLowerCase; }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (false) {} else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (false) {}
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (false) {}
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       false && false;
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       false && false;
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if (false) {}
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (false) {}
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (false) {}
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     false && false;
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (false
  ) {}
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if (false) {}
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (false) {} else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (false) {} else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (false) {}
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       false && false;
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 false
                  ? (undefined)
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (false) { var lowerCaseEvent; }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (false) {}
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (false) {} else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (false) {}

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (false) {}
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (false) {}
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (false) {}
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if (false) {}
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  false
    ? undefined
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       false && false;
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (false) { var hyphenatedKey; } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     false && false;
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (false) {}
    if (props && hasOwn(props, key)) {
       false && false;
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (false) {}

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (false) {}
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if (false) {}
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (false) {}
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (false) {}
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (false) {}

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (false) {} else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (false) {}

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if (false
  ) {}
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (false) {}

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (false) {}
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (false) {}
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.12';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    // allow arbitrary string value for contenteditable
    : key === 'contenteditable' && isValidContentEditableValue(value)
      ? value
      : 'true'
};

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
       false && false;
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (false) {}

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (false) {}
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (false) {}
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (false) {}

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (false) {}
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (false) {}
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (false
              ) {}
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (false
              ) {}
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (false) {}
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && value !== '' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

/*  */

/*  */

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1 (event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1 (
  name,
  handler,
  capture,
  passive
) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;
    handler = original._wrapper = function (e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget ||
        // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp ||
        // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 ||
        // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original.apply(this, arguments)
      }
    };
  }
  target$1.addEventListener(
    name,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  name,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

var svgContainer;

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
      // skip the update if old and new VDOM state is the same.
      // `value` is handled separately because the DOM value may be temporarily
      // out of sync with VDOM state due to focus, composition and modifiers.
      // This  #4521 by skipping the unnecessary `checked` update.
      cur !== oldProps[key]
    ) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (false) {}

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (false) {}

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
     false && false;
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

var isVShowDirective = function (d) { return d.name === 'show'; };

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (false) {}

    var mode = this.mode;

    // warn invalid mode
    if (false
    ) {}

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount () {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(
        this$1._vnode,
        this$1.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (false) { var name, opts; }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        false
      ) {}
    }
    if (false
    ) {}
  }, 0);
}

/*  */

/* harmony default export */ __webpack_exports__["a"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1), __webpack_require__(4).setImmediate))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }
    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;
        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;
                return true;
            }
            return false;
        });
        return result;
    }
    return /** @class */ (function () {
        function class_1() {
            this.__entries__ = [];
        }
        Object.defineProperty(class_1.prototype, "size", {
            /**
             * @returns {boolean}
             */
            get: function () {
                return this.__entries__.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {*} key
         * @returns {*}
         */
        class_1.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];
            return entry && entry[1];
        };
        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        class_1.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);
            if (~index) {
                this.__entries__[index][1] = value;
            }
            else {
                this.__entries__.push([key, value]);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);
            if (~index) {
                entries.splice(index, 1);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };
        /**
         * @returns {void}
         */
        class_1.prototype.clear = function () {
            this.__entries__.splice(0);
        };
        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        class_1.prototype.forEach = function (callback, ctx) {
            if (ctx === void 0) { ctx = null; }
            for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                var entry = _a[_i];
                callback.call(ctx, entry[1], entry[0]);
            }
        };
        return class_1;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }
    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }
    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }
    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }
    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
function throttle (callback, delay) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;
            callback();
        }
        if (trailingCall) {
            proxy();
        }
    }
    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }
    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();
        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }
            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        }
        else {
            leadingCall = true;
            trailingCall = false;
            setTimeout(timeoutCallback, delay);
        }
        lastCallTime = timeStamp;
    }
    return proxy;
}

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;
// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserverController.
     *
     * @private
     */
    function ResizeObserverController() {
        /**
         * Indicates whether DOM listeners have been added.
         *
         * @private {boolean}
         */
        this.connected_ = false;
        /**
         * Tells that controller has subscribed for Mutation Events.
         *
         * @private {boolean}
         */
        this.mutationEventsAdded_ = false;
        /**
         * Keeps reference to the instance of MutationObserver.
         *
         * @private {MutationObserver}
         */
        this.mutationsObserver_ = null;
        /**
         * A list of connected observers.
         *
         * @private {Array<ResizeObserverSPI>}
         */
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */
    ResizeObserverController.prototype.addObserver = function (observer) {
        if (!~this.observers_.indexOf(observer)) {
            this.observers_.push(observer);
        }
        // Add listeners if they haven't been added yet.
        if (!this.connected_) {
            this.connect_();
        }
    };
    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    ResizeObserverController.prototype.removeObserver = function (observer) {
        var observers = this.observers_;
        var index = observers.indexOf(observer);
        // Remove observer if it's present in registry.
        if (~index) {
            observers.splice(index, 1);
        }
        // Remove listeners if controller has no connected observers.
        if (!observers.length && this.connected_) {
            this.disconnect_();
        }
    };
    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */
    ResizeObserverController.prototype.refresh = function () {
        var changesDetected = this.updateObservers_();
        // Continue running updates if changes have been detected as there might
        // be future ones caused by CSS transitions.
        if (changesDetected) {
            this.refresh();
        }
    };
    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *      dimensions of it's elements.
     */
    ResizeObserverController.prototype.updateObservers_ = function () {
        // Collect observers that have active observations.
        var activeObservers = this.observers_.filter(function (observer) {
            return observer.gatherActive(), observer.hasActive();
        });
        // Deliver notifications in a separate cycle in order to avoid any
        // collisions between observers, e.g. when multiple instances of
        // ResizeObserver are tracking the same element and the callback of one
        // of them changes content dimensions of the observed target. Sometimes
        // this may result in notifications being blocked for the rest of observers.
        activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
        return activeObservers.length > 0;
    };
    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.connect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already added.
        if (!isBrowser || this.connected_) {
            return;
        }
        // Subscription to the "Transitionend" event is used as a workaround for
        // delayed transitions. This way it's possible to capture at least the
        // final state of an element.
        document.addEventListener('transitionend', this.onTransitionEnd_);
        window.addEventListener('resize', this.refresh);
        if (mutationObserverSupported) {
            this.mutationsObserver_ = new MutationObserver(this.refresh);
            this.mutationsObserver_.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }
        else {
            document.addEventListener('DOMSubtreeModified', this.refresh);
            this.mutationEventsAdded_ = true;
        }
        this.connected_ = true;
    };
    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.disconnect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already removed.
        if (!isBrowser || !this.connected_) {
            return;
        }
        document.removeEventListener('transitionend', this.onTransitionEnd_);
        window.removeEventListener('resize', this.refresh);
        if (this.mutationsObserver_) {
            this.mutationsObserver_.disconnect();
        }
        if (this.mutationEventsAdded_) {
            document.removeEventListener('DOMSubtreeModified', this.refresh);
        }
        this.mutationsObserver_ = null;
        this.mutationEventsAdded_ = false;
        this.connected_ = false;
    };
    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
        var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
        // Detect whether transition may affect dimensions of an element.
        var isReflowProperty = transitionKeys.some(function (key) {
            return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
            this.refresh();
        }
    };
    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    ResizeObserverController.getInstance = function () {
        if (!this.instance_) {
            this.instance_ = new ResizeObserverController();
        }
        return this.instance_;
    };
    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
}());

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var key = _a[_i];
        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];
        return size + toFloat(value);
    }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
        var position = positions_1[_i];
        var value = styles['padding-' + position];
        paddings[position] = toFloat(value);
    }
    return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width), height = toFloat(styles.height);
    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }
        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }
    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;
        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }
        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }
    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
        typeof target.getBBox === 'function'); };
})();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(_a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });
    return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObservation.
     *
     * @param {Element} target - Element to be observed.
     */
    function ResizeObservation(target) {
        /**
         * Broadcasted width of content rectangle.
         *
         * @type {number}
         */
        this.broadcastWidth = 0;
        /**
         * Broadcasted height of content rectangle.
         *
         * @type {number}
         */
        this.broadcastHeight = 0;
        /**
         * Reference to the last observed content rectangle.
         *
         * @private {DOMRectInit}
         */
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
    }
    /**
     * Updates content rectangle and tells whether it's width or height properties
     * have changed since the last broadcast.
     *
     * @returns {boolean}
     */
    ResizeObservation.prototype.isActive = function () {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return (rect.width !== this.broadcastWidth ||
            rect.height !== this.broadcastHeight);
    };
    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function () {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
    };
    return ResizeObservation;
}());

var ResizeObserverEntry = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObserverEntry.
     *
     * @param {Element} target - Element that is being observed.
     * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
     */
    function ResizeObserverEntry(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        // According to the specification following properties are not writable
        // and are also not enumerable in the native implementation.
        //
        // Property accessors are not being used as they'd require to define a
        // private WeakMap storage which may cause memory leaks in browsers that
        // don't support this type of collections.
        defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
}());

var ResizeObserverSPI = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback function that is invoked
     *      when one of the observed elements changes it's content dimensions.
     * @param {ResizeObserverController} controller - Controller instance which
     *      is responsible for the updates of observer.
     * @param {ResizeObserver} callbackCtx - Reference to the public
     *      ResizeObserver instance which will be passed to callback function.
     */
    function ResizeObserverSPI(callback, controller, callbackCtx) {
        /**
         * Collection of resize observations that have detected changes in dimensions
         * of elements.
         *
         * @private {Array<ResizeObservation>}
         */
        this.activeObservations_ = [];
        /**
         * Registry of the ResizeObservation instances.
         *
         * @private {Map<Element, ResizeObservation>}
         */
        this.observations_ = new MapShim();
        if (typeof callback !== 'function') {
            throw new TypeError('The callback provided as parameter 1 is not a function.');
        }
        this.callback_ = callback;
        this.controller_ = controller;
        this.callbackCtx_ = callbackCtx;
    }
    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.observe = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is already being observed.
        if (observations.has(target)) {
            return;
        }
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        // Force the update of observations.
        this.controller_.refresh();
    };
    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.unobserve = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is not being observed.
        if (!observations.has(target)) {
            return;
        }
        observations.delete(target);
        if (!observations.size) {
            this.controller_.removeObserver(this);
        }
    };
    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.disconnect = function () {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
    };
    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.gatherActive = function () {
        var _this = this;
        this.clearActive();
        this.observations_.forEach(function (observation) {
            if (observation.isActive()) {
                _this.activeObservations_.push(observation);
            }
        });
    };
    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.broadcastActive = function () {
        // Do nothing if observer doesn't have active observations.
        if (!this.hasActive()) {
            return;
        }
        var ctx = this.callbackCtx_;
        // Create ResizeObserverEntry instance for every active observation.
        var entries = this.activeObservations_.map(function (observation) {
            return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });
        this.callback_.call(ctx, entries, ctx);
        this.clearActive();
    };
    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
    };
    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */
    ResizeObserverSPI.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
}());

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback that is invoked when
     *      dimensions of the observed elements change.
     */
    function ResizeObserver(callback) {
        if (!(this instanceof ResizeObserver)) {
            throw new TypeError('Cannot call a class as a function.');
        }
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        var controller = ResizeObserverController.getInstance();
        var observer = new ResizeObserverSPI(callback, controller, this);
        observers.set(this, observer);
    }
    return ResizeObserver;
}());
// Expose public methods of ResizeObserver.
[
    'observe',
    'unobserve',
    'disconnect'
].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        var _a;
        return (_a = observers.get(this))[method].apply(_a, arguments);
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }
    return ResizeObserver;
})();

/* harmony default export */ __webpack_exports__["a"] = (index);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(5);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1), __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/button/src/button.vue?vue&type=template&id=ca859fb4&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    {
      staticClass: "y-button",
      class: [
        _vm.type ? "y-button--" + _vm.type : "",
        {
          "is-disabled": _vm.buttonDisabled
        }
      ],
      attrs: { disabled: _vm.buttonDisabled },
      on: { click: _vm.handleClick }
    },
    [_vm.$slots.default ? _c("span", [_vm._t("default")], 2) : _vm._e()]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/button/src/button.vue?vue&type=template&id=ca859fb4&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/button/src/button.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import debonce from '../../../src/utils/debonce';
/* harmony default export */ var buttonvue_type_script_lang_js_ = ({

    name: 'YButton',

    // button支持的传参
    props: {
        // 类型
        type: {
            type: String,
            default: 'default'
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        buttonDisabled: function buttonDisabled() {
            return this.disabled;
        }
    },

    methods: {
        handleClick: function handleClick(evt) {
            console.log('handleClick', evt);
            // 给其增加防抖
            this.$emit('click', evt);
            // debonce(this.$emit('click', evt), 1000);
        }
    },

    mounted: function mounted() {
        console.log('type', this.type);
    }
});
// CONCATENATED MODULE: ./packages/button/src/button.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_buttonvue_type_script_lang_js_ = (buttonvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./packages/button/src/button.vue





/* normalize component */

var component = normalizeComponent(
  src_buttonvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/button/src/button.vue"
/* harmony default export */ var src_button = (component.exports);
// CONCATENATED MODULE: ./packages/button/index.js


/* istanbul ignore next */
// 在Vue.use(Button) 时调用组件上的intall
src_button.install = function (Vue) {
    // 全局注册组件
    // react与vue不同的是, vue组件必须注册(或全局注册,或局部注册)
    Vue.component(src_button.name, src_button);
};

/* harmony default export */ var packages_button = (src_button);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/radio/src/radio.vue?vue&type=template&id=69cd6268&
var radiovue_type_template_id_69cd6268_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "label",
    {
      staticClass: "l-radio",
      class: [
        { "is-focus": _vm.focus },
        { "is-checked": _vm.model === _vm.label }
      ],
      attrs: { role: "radio", "aria-checked": _vm.model === _vm.label }
    },
    [
      _c(
        "span",
        {
          staticClass: "l-radio__input",
          class: {
            "is-checked": _vm.model === _vm.label
          }
        },
        [
          _c("span", { staticClass: "l-radio__inner" }),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.model,
                expression: "model"
              }
            ],
            ref: "radio",
            staticClass: "l-radio__original",
            attrs: { type: "radio", "aria-hidden": "false" },
            domProps: {
              value: _vm.label,
              checked: _vm._q(_vm.model, _vm.label)
            },
            on: {
              focus: function($event) {
                _vm.focus = true
              },
              blur: function($event) {
                _vm.focus = false
              },
              change: [
                function($event) {
                  _vm.model = _vm.label
                },
                _vm.handleChange
              ]
            }
          })
        ]
      ),
      _c(
        "span",
        { staticClass: "l-radio__label" },
        [
          _vm._t("default"),
          !_vm.$slots.default ? [_vm._v(_vm._s(_vm.label))] : _vm._e()
        ],
        2
      )
    ]
  )
}
var radiovue_type_template_id_69cd6268_staticRenderFns = []
radiovue_type_template_id_69cd6268_render._withStripped = true


// CONCATENATED MODULE: ./packages/radio/src/radio.vue?vue&type=template&id=69cd6268&

// CONCATENATED MODULE: ./src/mixins/emitter.js
/**
 * mixin混入,可以混入到所使用的组件本身的实例对象，两个对象的融合
 * 例如，radio组件使用了混入，且该混入对象中有radio组件没有的方法，则混入后radio组件便有了这个方法
 * 使用场景：如果多个组件公用同一个方法或什么的，可以抽离出来，混入进去
 * 官方文档: https://cn.vuejs.org/v2/guide/mixins.html
 */

/* harmony default export */ var emitter = ({

    methods: {

        /**
         * 实现子组件向父组件派发事件, 子组件通知父组件
         * @param {*} componentName 组件名, 用来查找拥有该组件名的组件(当前的父组件)
         * @param {*} eventName 事件名, 字符串类型
         * @param {*} params 参数
         */
        dispatch: function dispatch(componentName, eventName, params) {

            // console.log('混入文件emitter', componentName, eventName, params, this);
            var parent = this.$parent;
            var name = parent.$options.componentName;

            // 查找组件名为componentName的父组件
            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;
                if (parent) {
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
            this.$emit.apply(parent, [eventName].concat(params));
        }
    }

});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/radio/src/radio.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var radiovue_type_script_lang_js_ = ({

    name: 'LRadio',

    // 混入，增加dispath方法，将事件向上派发给父组件
    mixins: [emitter],

    // 接收父组件传递的数据
    props: {
        value: {}, // 父组件v-model
        label: {} // 父组件label
    },

    computed: {
        /**
         * 向上追溯父组件是否为radio-group
         * 不能通过name来判断，所以需要定义componentName
         */
        isGroup: function isGroup() {
            var parent = this.$parent;
            while (parent) {
                // console.log('radio下的父组件', parent, parent.$options.componentName);
                if (parent.$options.componentName !== 'LRadioGroup') {
                    parent = parent.$parent;
                } else {
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
            get: function get() {
                // return this.value;
                return this.isGroup ? this._radioGroup.value : this.value;
            },
            set: function set(val) {
                console.log('model值发生了变化', val);
                // 通知父组件更新v-model对应的value值
                // this.$emit('input', val)
                if (this.isGroup) {
                    // this.dispatch('YRadioGroup', 'input', [val]);
                    // this.dispatch 是混入进来的, 通知父组件radio-group更新
                    this.dispatch('LRadioGroup', 'input', [val]);
                } else {
                    this.$emit('input', val);
                }
                // 同步到原生单选框的选中状态
                this.$refs.radio && (this.$refs.radio.checked = this.model === this.label);
            }
        }
    },

    data: function data() {
        return {
            focus: false
        };
    },


    methods: {
        handleChange: function handleChange() {
            var _this = this;

            // input改变后, 需要等视图的更新, 更新后方可获取该值, 为label对应的值
            this.$nextTick(function () {
                console.log('handleChange', _this.model);
                // 这句话有什么意义, 通知父组件选中状态变化后的回调
                _this.$emit('change', _this.model);
                // 如果是父组件是radio-group组件, 则调用父组件的handleChange, 以更新model值
                _this.isGroup && _this.dispatch('LRadioGroup', 'handleChange', _this.model);
            });
        }
    },

    mounted: function mounted() {
        // console.log('111', this.$slots, Boolean(this.$slots.default), this.value, this.label, this.model === this.label);
        // 测试: label值为1，如果加冒号，表示传入的是数字类型，1+1=1；如果不加冒号，表示传入的是字符串类型，1+1=11
        // console.log('222', this.label, this.label + 1);
        console.log('333', this.model);
    }
});
// CONCATENATED MODULE: ./packages/radio/src/radio.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_radiovue_type_script_lang_js_ = (radiovue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/radio/src/radio.vue





/* normalize component */

var radio_component = normalizeComponent(
  src_radiovue_type_script_lang_js_,
  radiovue_type_template_id_69cd6268_render,
  radiovue_type_template_id_69cd6268_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var radio_api; }
radio_component.options.__file = "packages/radio/src/radio.vue"
/* harmony default export */ var src_radio = (radio_component.exports);
// CONCATENATED MODULE: ./packages/radio/index.js


src_radio.install = function (Vue) {
    Vue.component(src_radio.name, src_radio);
};

/* harmony default export */ var packages_radio = (src_radio);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/radio/src/radio-group.vue?vue&type=template&id=818a704c&
var radio_groupvue_type_template_id_818a704c_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "l-radio-group", attrs: { role: "rolegroup" } },
    [_vm._t("default")],
    2
  )
}
var radio_groupvue_type_template_id_818a704c_staticRenderFns = []
radio_groupvue_type_template_id_818a704c_render._withStripped = true


// CONCATENATED MODULE: ./packages/radio/src/radio-group.vue?vue&type=template&id=818a704c&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/radio/src/radio-group.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var radio_groupvue_type_script_lang_js_ = ({

    name: 'LRadioGroup',

    componentName: 'LRadioGroup',

    props: {
        value: {}
    },

    created: function created() {
        var _this = this;

        /**
         * this.$on 监听当前实例上的自定义事件。
         * 事件可以由 this.$emit 触发。
         * 回调函数会接收所有传入事件触发函数的额外参数。
         * 事实上, 子组件radio在调用的父组件radio-group的handleChange方法, 在radio-group没有显示定义
         */
        this.$on('handleChange', function (value) {
            console.log('radio-group监听handleChange发生了变化', value);
            // 通知父组件更新双向绑定的值
            _this.$emit('input', value);
        });
    },
    mounted: function mounted() {
        console.log('变化了', this.value, this.$slots);
    }
});
// CONCATENATED MODULE: ./packages/radio/src/radio-group.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_radio_groupvue_type_script_lang_js_ = (radio_groupvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/radio/src/radio-group.vue





/* normalize component */

var radio_group_component = normalizeComponent(
  src_radio_groupvue_type_script_lang_js_,
  radio_groupvue_type_template_id_818a704c_render,
  radio_groupvue_type_template_id_818a704c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var radio_group_api; }
radio_group_component.options.__file = "packages/radio/src/radio-group.vue"
/* harmony default export */ var radio_group = (radio_group_component.exports);
// CONCATENATED MODULE: ./packages/radio-group/index.js


radio_group.install = function (Vue) {
    Vue.component(radio_group.name, radio_group);
};

/* harmony default export */ var packages_radio_group = (radio_group);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/checkbox/src/checkbox.vue?vue&type=template&id=d0387074&
var checkboxvue_type_template_id_d0387074_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "label",
    { staticClass: "y-checkbox", attrs: { role: "checkbox" } },
    [
      _c(
        "span",
        {
          staticClass: "y-checkbox__input",
          class: {
            "is-checked": _vm.isChecked,
            "is-indeterminate": _vm.indeterminate
          }
        },
        [
          _c("span", { staticClass: "y-checkbox__inner" }),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.model,
                expression: "model"
              }
            ],
            ref: "checkbox",
            staticClass: "y-checkbox__original",
            attrs: { type: "checkbox", "aria-hidden": "false" },
            domProps: {
              value: _vm.label,
              checked: Array.isArray(_vm.model)
                ? _vm._i(_vm.model, _vm.label) > -1
                : _vm.model
            },
            on: {
              change: [
                function($event) {
                  var $$a = _vm.model,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false
                  if (Array.isArray($$a)) {
                    var $$v = _vm.label,
                      $$i = _vm._i($$a, $$v)
                    if ($$el.checked) {
                      $$i < 0 && (_vm.model = $$a.concat([$$v]))
                    } else {
                      $$i > -1 &&
                        (_vm.model = $$a
                          .slice(0, $$i)
                          .concat($$a.slice($$i + 1)))
                    }
                  } else {
                    _vm.model = $$c
                  }
                },
                _vm.handleChange
              ]
            }
          })
        ]
      ),
      _c(
        "span",
        { staticClass: "y-checkbox__label" },
        [
          _vm._t("default"),
          !_vm.$slots.default ? [_vm._v(_vm._s(_vm.label))] : _vm._e()
        ],
        2
      )
    ]
  )
}
var checkboxvue_type_template_id_d0387074_staticRenderFns = []
checkboxvue_type_template_id_d0387074_render._withStripped = true


// CONCATENATED MODULE: ./packages/checkbox/src/checkbox.vue?vue&type=template&id=d0387074&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/checkbox/src/checkbox.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var checkboxvue_type_script_lang_js_ = ({
    name: 'YCheckbox',
    props: {
        value: {},
        // label选中状态的值, 只有在checkbox-group或者value为数组类型的时候方可有效
        label: {},
        // 半选中状态
        indeterminate: Boolean
    },
    // 混入dispatch方法
    mixins: [emitter],
    computed: {
        // 判断是否是group组件
        // vm.$parent, 父实例，如果当前实例有的话 https://cn.vuejs.org/v2/api/#vm-parent
        // vm.$options, 用于当前 Vue 实例的初始化选项。需要在选项中包含自定义 property 时会有用处 https://cn.vuejs.org/v2/api/#vm-options
        isGroup: function isGroup() {
            var parent = this.$parent;
            // 查找父节点, 判断是否是checkbox-group
            while (parent) {
                if (parent.$options.componentName !== 'YCheckboxGroup') {
                    parent = parent.$parent;
                } else {
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
            get: function get() {
                // return this.value;
                return this.isGroup ? this._checkboxGroup.value : this.value;
            },
            set: function set(val) {
                /**
                 * 通知父组件value值发生了变化
                 * v-model双向绑定, 手动通知父组件吗？这是因为并非是value值发生了变化，
                 * 而是另一个依赖变量model发生了变化, model发生变化后value也要变, 所以需要手动触发
                 * 为什么val会自动增删呢？
                 */
                if (this.isGroup) {
                    // console.log('通知父组件更新数据', val, this.model);
                    // 由于父组件的value是数组类型, 则更新即删除和添加，如何做到的呢？
                    // console.log('model发生了变化', val, this.label);
                    this.dispatch('YCheckboxGroup', 'input', [val]);
                } else {
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
        isChecked: function isChecked() {
            // this.model.toString(), {}.toString.call(this.model)有什么区别？
            // 若this.model=true, 则 this.model.toString()->true, {}.toString.call(this.model)->[object Boolean]
            // console.log('第一种情况', {}.toString.call(this.model), {}.toString.call(this.model) === '[object Boolean]')

            // 如果是第一种情况, 单独使用多选框且value值为布尔类型
            if ({}.toString.call(this.model) === '[object Boolean]') {
                // console.log('hhhh', this.model);
                return this.model;
            }

            // 如果是第二种情况，单独使用且value为数组类型
            // 数组的判定类型有几种？
            // console.log('第二种情况', this.model, Array.isArray(this.model), this.model.indexOf(this.label), this.model.includes(this.label));
            else if (Array.isArray(this.model)) {
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
        handleChange: function handleChange(ev) {
            var _this = this;

            // console.log('原生checkbox发生了变化', this.model);
            this.$nextTick(function () {
                _this.$emit('change', _this.model, ev);
                if (_this.isGroup) {
                    // 组件checkbox-group绑定的change事件
                    _this.dispatch('YCheckboxGroup', 'change', [_this._checkboxGroup.value]);
                }
            });
        }
    },
    mounted: function mounted() {
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
});
// CONCATENATED MODULE: ./packages/checkbox/src/checkbox.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_checkboxvue_type_script_lang_js_ = (checkboxvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/checkbox/src/checkbox.vue





/* normalize component */

var checkbox_component = normalizeComponent(
  src_checkboxvue_type_script_lang_js_,
  checkboxvue_type_template_id_d0387074_render,
  checkboxvue_type_template_id_d0387074_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var checkbox_api; }
checkbox_component.options.__file = "packages/checkbox/src/checkbox.vue"
/* harmony default export */ var src_checkbox = (checkbox_component.exports);
// CONCATENATED MODULE: ./packages/checkbox/index.js


src_checkbox.install = function (Vue) {
    Vue.component(src_checkbox.name, src_checkbox);
};

/* harmony default export */ var packages_checkbox = (src_checkbox);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/checkbox/src/checkbox-group.vue?vue&type=template&id=7289a290&
var checkbox_groupvue_type_template_id_7289a290_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "ycheckbox-group", attrs: { role: "checkboxgroup" } },
    [_vm._t("default")],
    2
  )
}
var checkbox_groupvue_type_template_id_7289a290_staticRenderFns = []
checkbox_groupvue_type_template_id_7289a290_render._withStripped = true


// CONCATENATED MODULE: ./packages/checkbox/src/checkbox-group.vue?vue&type=template&id=7289a290&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/checkbox/src/checkbox-group.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var checkbox_groupvue_type_script_lang_js_ = ({
    name: 'YCheckboxGroup',
    componentName: 'YCheckboxGroup',
    props: {
        value: {}
    }
});
// CONCATENATED MODULE: ./packages/checkbox/src/checkbox-group.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_checkbox_groupvue_type_script_lang_js_ = (checkbox_groupvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/checkbox/src/checkbox-group.vue





/* normalize component */

var checkbox_group_component = normalizeComponent(
  src_checkbox_groupvue_type_script_lang_js_,
  checkbox_groupvue_type_template_id_7289a290_render,
  checkbox_groupvue_type_template_id_7289a290_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var checkbox_group_api; }
checkbox_group_component.options.__file = "packages/checkbox/src/checkbox-group.vue"
/* harmony default export */ var checkbox_group = (checkbox_group_component.exports);
// CONCATENATED MODULE: ./packages/checkbox-group/index.js


checkbox_group.install = function (Vue) {
    Vue.component(checkbox_group.name, checkbox_group);
};

/* harmony default export */ var packages_checkbox_group = (checkbox_group);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/table/src/table.vue?vue&type=template&id=493fe34e&
var tablevue_type_template_id_493fe34e_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "y-table",
      class: [
        {
          "y-table__border": _vm.border,
          "y-table__scrollable-y": _vm.layout.scrollY
        },
        _vm.align ? "y-table__" + _vm.align : ""
      ],
      style: {
        height: _vm.height || ""
      }
    },
    [
      _c(
        "div",
        { ref: "hiddenColumns", staticClass: "hidden-columns" },
        [_vm._t("default")],
        2
      ),
      _vm.showHeader
        ? _c(
            "div",
            { ref: "headerWrapper", staticClass: "y-table__header-wrapper" },
            [
              _c("table-header", {
                ref: "tableHeader",
                style: {
                  width: _vm.bodyWidth
                },
                attrs: { store: _vm.store }
              })
            ],
            1
          )
        : _vm._e(),
      _c(
        "div",
        {
          ref: "bodyWrapper",
          staticClass: "y-table__body-wrapper",
          style: [_vm.bodyHeight]
        },
        [
          _c("table-body", {
            style: {
              width: _vm.bodyWidth
            },
            attrs: { store: _vm.store }
          })
        ],
        1
      ),
      !_vm.data || _vm.data.length === 0
        ? _c(
            "div",
            { ref: "emptyBolck", staticClass: "y-table__empty-block" },
            [
              _c(
                "span",
                { staticClass: "y-table__empty-text" },
                [_vm._t("empty", [_vm._v(_vm._s(_vm.emptyText))])],
                2
              )
            ]
          )
        : _vm._e()
    ]
  )
}
var tablevue_type_template_id_493fe34e_staticRenderFns = []
tablevue_type_template_id_493fe34e_render._withStripped = true


// CONCATENATED MODULE: ./packages/table/src/table.vue?vue&type=template&id=493fe34e&

// CONCATENATED MODULE: ./node_modules/throttle-debounce/esm/index.js
/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {number}    delay -          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {boolean}   [noTrailing] -   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset).
 * @param  {Function}  callback -       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {boolean}   [debounceMode] - If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @returns {Function}  A new, throttled, function.
 */
function throttle (delay, noTrailing, callback, debounceMode) {
  /*
   * After wrapper has stopped being called, this timeout ensures that
   * `callback` is executed at the proper times in `throttle` and `end`
   * debounce modes.
   */
  var timeoutID;
  var cancelled = false; // Keep track of the last time `callback` was executed.

  var lastExec = 0; // Function to clear existing timeout

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  } // Function to cancel next exec


  function cancel() {
    clearExistingTimeout();
    cancelled = true;
  } // `noTrailing` defaults to falsy.


  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }
  /*
   * The `wrapper` function encapsulates all of the throttling / debouncing
   * functionality and when executed will limit the rate at which `callback`
   * is executed.
   */


  function wrapper() {
    for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
      arguments_[_key] = arguments[_key];
    }

    var self = this;
    var elapsed = Date.now() - lastExec;

    if (cancelled) {
      return;
    } // Execute `callback` and update the `lastExec` timestamp.


    function exec() {
      lastExec = Date.now();
      callback.apply(self, arguments_);
    }
    /*
     * If `debounceMode` is true (at begin) this is used to clear the flag
     * to allow future `callback` executions.
     */


    function clear() {
      timeoutID = undefined;
    }

    if (debounceMode && !timeoutID) {
      /*
       * Since `wrapper` is being called for the first time and
       * `debounceMode` is true (at begin), execute `callback`.
       */
      exec();
    }

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      /*
       * In throttle mode, if `delay` time has been exceeded, execute
       * `callback`.
       */
      exec();
    } else if (noTrailing !== true) {
      /*
       * In trailing throttle mode, since `delay` time has not been
       * exceeded, schedule `callback` to execute `delay` ms after most
       * recent execution.
       *
       * If `debounceMode` is true (at begin), schedule `clear` to execute
       * after `delay` ms.
       *
       * If `debounceMode` is false (at end), schedule `callback` to
       * execute after `delay` ms.
       */
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  }

  wrapper.cancel = cancel; // Return the wrapper function.

  return wrapper;
}

/* eslint-disable no-undefined */
/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param  {number}   delay -         A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {boolean}  [atBegin] -     Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
 *                                  after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                  (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 * @param  {Function} callback -      A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                  to `callback` when the debounced-function is executed.
 *
 * @returns {Function} A new, debounced function.
 */

function debounce (delay, atBegin, callback) {
  return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
}


//# sourceMappingURL=index.js.map

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/table/src/utils.js
/**
 * 判断对象obj自身是否包含key属性(非继承过来的)
 * @param {Object} obj 
 * @param {String} key 
 * @returns Boolean
 * obj.hasOwnProperty(key)
 */
function hasOwn(obj, key) {
    // console.log(obj)
    return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * 合并两个对象
 * @param {Object} defaults 
 * @param {Object} config 
 * @returns Object
 */
function mergeOptions(defaults, config) {
    // console.log('mergeOptions', defaults, config);
    // 定义新值保存处理结果(因为更改对象参数会更改原值,对象传参是按地址传的)
    var options = {};
    var key = void 0;
    for (key in defaults) {
        // console.log('ke', key)
        options[key] = defaults[key];
    }
    for (key in config) {
        // console.log('ke', key, hasOwn(config, key))
        if (hasOwn(config, key)) {
            var value = config[key];
            if (typeof value !== 'undefined') {
                // 新值会覆盖旧值
                options[key] = value;
            }
        }
    }
    return options;
}

/**
 * 转为数字类型
 * width: undefined -> undefined
 * width: 非undefined -> 数字 -> 数字
 *                    -> 非数字 -> null
 * parseInt() 函数可解析一个字符串，并返回一个整数。
 * parseInt(string, radix) 进制转换（接收两个参数），parseInt方法还可以接受第二个参数（2到36之间），表示被解析的值的进制，返回该值对应的十进制数。默认情况下，parseInt的第二个参数为10，即默认是十进制转十进制。超出这个范围，则返回NaN
 * 使用 isNaN() 来判断一个值是否是数字。原因是 NaN 与所有值都不相等，包括它自己
 * @param {String} width 
 * @returns width
 */
function parseWidth(width) {
    if (width !== undefined) {
        width = parseInt(width, 10);
        // 如果转十进制后是非数字,则为null
        if (isNaN(width)) {
            width = null;
        }
    }
    return width;
}

/**
 * 数字化最小宽度
 * parseWidth
 * @param {Number} minWidth 
 * @returns Number
 */
function parseMinWidth(minWidth) {
    if (typeof minWidth !== 'undefined') {
        minWidth = parseWidth(minWidth);
        if (isNaN(minWidth)) {
            minWidth = 80;
        }
    }
    return minWidth;
}

/**
 * 数字化处理高度
 * @param {Number/String} height 
 * 正则知识补充:
 * (?:) 非捕获括号 参考:https://segmentfault.com/q/1010000010302799
 * 比较(X)和(?:X)，前者是捕获分组，后者不捕获，区别在于正则表达式匹配输入字符串之后所获得的匹配的（数）组当中没有(?:X)匹配的部分
 * +: 前面字符出现一次或更多次
 * ?: 前面字符出现零次或一次
 * \d: 数字字符
 */
function parseHeight(height) {
    // number 类型
    if (typeof height === 'number') {
        return height;
    }

    // string类型
    if (typeof height === 'string') {
        // 150px /^\d+(?:px)?$/
        var reg = /^\d+(?:px)?$/;
        console.log('正则匹配', height, reg.test(height));

        if (reg.test(height)) {
            // parseInt可将带有px的也给过滤掉
            return parseInt(height, 10);
        } else {
            return height;
        }
    }

    // 其他类型
    return null;
}

/**
 * 前提:fun[n](column){...return column}
 * 调用时:compose(fun1, fun2, fun3)
 * 使用时:compose(...funcs) 则funcs为数组形式
 * funcs.reduce((a, b) => (...args) => a(b(...args))) 分析
 *  第一步: a为fun1, b为fun2, 则fun1(func2(...args))
 *  第二步: a为fun1(func2(...args)), b为fun3, 则fun1(func2(...args))(fun3(...args))
 *  于是乎, 返回一个组成函数, 即fun1,fun2,fun3相互依赖, 执行顺序为fun3,fun2,fun1即从右至左
 * @param  {...any} funcs
 * 
 * reduce使用合集:
 * 参考:https://www.cnblogs.com/amujoe/p/11376940.html
 * array.reduce(function(prev, cur, currentIndex, array), init)
 * 解释:
 * array:表示原数组
 * prev:表示上一次调用回调时的返回值，或者初始值 init
 * cur:表示当前正在处理的数组元素
 * currentIndex:表示当前正在处理的数组元素的索引，若提供 init 值，则索引为0，否则索引为1
 * init:表示初始值
 * 用法三:redux compose源码实现
 * 这里是它的高阶使用: 作为一个高阶函数，用于函数的 compose
 * return funcs.reduce((a, b) => (...args) => a(b(...args)));
 * 返回值是一个函数
 * 
 * 用法一: 也是平常最常使用的
 * [1,2,3,4].reduce((prev,cur)=> prev+cur) 1+2=3,3+3=6,6+4=10
 * 
 * 用法二: 带初值的
 * [1,2,3,4].reduce((prev,cur) => prev+cur, 10) 10+1=11, 11+2=13, 13+3=16, 16+4=20
 * 
 */
function compose() {
    for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
        funcs[_key] = arguments[_key];
    }

    // 长度为0
    if (funcs.length === 0) {
        return function (arg) {
            return arg;
        };
    }

    // 长度为1
    if (funcs.length === 1) {
        return funcs[0];
    }

    // 函数二次嵌套
    // a要的是b的参数 -> 上一个要下一个的参数
    return funcs.reduce(function (a, b) {
        return function () {
            return a(b.apply(undefined, arguments));
        };
    });
}

/**
 * 获取行的唯一标识
 * 如果rowKey是String类型,则以.为分割点,去最后一个
 * @param {*} row 
 * @param {*} rowKey [String, Function]
 * @returns 
 */
var getRowIdentity = function getRowIdentity(row, rowKey) {
    if (!row) throw new Error('row is required when get row identity');

    if (typeof rowKey === 'string') {
        if (rowKey.indexOf('.') < 0) {
            return row[rowKey];
        }

        var key = rowKey.split('.');
        var current = row;
        // 这不就相当于取最后一个吗?为什么要这么写?
        for (var i = 0; i < key.length; i++) {
            current = current[key[i]];
        }
        return current;
    } else if (typeof rowKey === 'function') {
        return rowKey.call(null, row);
    }
};
// CONCATENATED MODULE: ./packages/table/src/table-layout.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





/**
 * TableLayout 定义表格的整体相关属性和方法
 * 用于table.vue整体控制table
 */

var table_layout_TableLayout = function () {
    // 构造器
    function TableLayout(options) {
        _classCallCheck(this, TableLayout);

        console.log('tableLayout', options);
        this.table = null;
        this.store = null;
        this.showHeader = true;

        this.fit = true; // 何意?

        this.bodyWidth = null;

        this.observers = [];

        this.height = null;
        this.tableHeight = null;
        this.headerHeight = null;
        this.bodyHeight = null; // table height - table-header height

        this.scrollX = false;
        this.scrollY = false;

        // 赋值
        for (var name in options) {
            if (options.hasOwnProperty(name)) {
                this[name] = options[name];
            }
        }

        if (!this.table) {
            throw new Error('table is required for Table Layout');
        }

        if (!this.store) {
            throw new Error('store is required for Table Layout');
        }
    }

    /**
     * 公共的表格处理方法
     * 如: setHeight设置高度等等
     */

    /**
     * Vue.$refs 数组
     * 可以解构
     * 
     * js获取dom节点的高度
     * 参考:https://blog.csdn.net/qq_35430000/article/details/80277587
     * clientHeight:包括padding,但不包括border、水平滚动条、margin的元素的高度(对于inline的元素该属性一直是0,单位px)
     * offsetHeight:包括padding、border、水平滚动条,但不包括margin的元素的高度(对于inline的元素该属性一直是0,单位px)
     * scrollHeight:子元素比父元素稿,父元素不想被子元素撑的一样高就显示出了滚动条,在滚动的过程中本元素有部分被隐藏.scrollHeight>=clientHeight恒成立
     *  - 表示当前不可见部分的元素的高度, 而可见部分的高度是clientHeight
     *  - 有滚动条时讨论scrollHeight才有意义,在没有滚动条时scrollHeight==clientHeight恒成立,单位px
     * scrollTop:有滚动条时,滚动条向下滚动的距离也就是顶部被遮住部分的高度。在没有滚动条时scrollTop==0恒成立
     * offsetTop:当前元素顶部距离最近父元素顶部的距离,和没有滚动条没有关系
     */


    TableLayout.prototype.updateElsHeight = function updateElsHeight() {
        var _this = this;

        // 如果table还没有渲染出真实dom节点, 则等其渲染完再调用
        if (!this.table.$ready) return vue_runtime_esm["a" /* default */].nextTick(function () {
            return _this.updateElsHeight();
        });
        // console.log('更新高度', this.table.$ready);

        var headerWrapper = this.table.$refs.headerWrapper;

        // console.log('更新高度', this);

        if (this.showHeader && !headerWrapper) return;

        // 获取header高度
        // 但是此时,table-header可能还没有完全渲染出来,所以此时头部高度是0
        // 所以使用Vue.nextTick等更新后再执行该方法
        var headerHeight = this.headerHeight = headerWrapper.offsetHeight;
        if (this.showHeader && headerWrapper.offsetWidth > 0 && (this.table.columns || []).length > 0 && headerHeight < 2) {
            return vue_runtime_esm["a" /* default */].nextTick(function () {
                return _this.updateElsHeight();
            });
        }

        // 整体表格高度
        // 并计算出表体的高度
        var tableHeight = this.tableHeight = this.table.$el.clientHeight;
        if (this.height !== null) {
            this.bodyHeight = tableHeight - headerHeight;
            // console.log('高度', tableHeight, headerHeight, this.bodyHeight)
        }

        // console.log('高度', this.height, this.bodyHeight)

        // 纵向滚动更新
        this.updateScrollY();

        // 通知观察器-滚动
        this.notifyObservers('scrollable');
    };

    /**
     * 更新this.scrollY:是否需要滚动
     * @returns 
     */


    TableLayout.prototype.updateScrollY = function updateScrollY() {
        var height = this.height;

        // 如果高度为null,则无需设置滚动
        if (height === null) return false;

        var bodyWrapper = this.table.bodyWrapper;
        if (this.table.$el && bodyWrapper) {
            var body = bodyWrapper.querySelector('.y-table__body');
            var prevScrollY = this.scrollY;
            // 是否滚动
            var scrollY = body.offsetHeight > this.bodyHeight;
            this.scrollY = scrollY;
            return prevScrollY !== scrollY;
        }

        return false;
    };

    /**
     * 设置表格高度
     * 设置了表格的固定高度,则如果表体的高度过高,则出现表体滚动条,从而使表头固定
     * @param {Number/String} height 
     */


    TableLayout.prototype.setHeight = function setHeight(value) {
        var _this2 = this;

        var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'height';

        // console.log('setHeight', height, parseHeight(height));
        if (vue_runtime_esm["a" /* default */].prototype.$isServer) return;

        var el = this.table.$el;

        value = parseHeight(value);
        // 不管prop是height还是max-height, 都设置给this.height
        this.height = value;

        // console.log('el', el, this.table.$ready);

        // 获取table真实的dom节点
        // 此时,table节点可能还没有渲染出真实的dom节点
        // 怎么赋值呢? -- Vue.nextTick 在下次 DOM 更新循环结束之后执行延迟回调
        if (!el && (value || value === 0)) return vue_runtime_esm["a" /* default */].nextTick(function () {
            return _this2.setHeight(value, prop);
        });

        if (typeof value === 'number') {
            el.style[prop] = value + 'px';
        } else if (typeof value === 'string') {
            el.style[prop] = value;
        }

        // 更新高度
        this.updateElsHeight();
    };

    /**
     * 设置表格最大高度
     * @param {Number/String} value 
     */


    TableLayout.prototype.setMaxHeight = function setMaxHeight(value) {
        this.setHeight(value, 'max-height');
    };

    /**
     * Vue.prototype.$isServer 是什么意思?
     * Vue实例是否运行与服务器上, 属性值为true标识实例运行于服务器, 每个Vue实例都可以通过该属性判断。该属性一般用于服务器渲染, 用以区分代码是否在服务器上运行。
     * 
     * 动态计算宽度(没有分配width的列)
     * 如果这样的列只有一个, 则把剩余的宽度都分给它
     * 如果这样的列有多个, 则按照最小宽度的比例分配剩余的宽度(而非平均分配)
     * 
     * 更新columns的realWidth值
     * 更新之后, 表头和表尾dom都需要相应的发生变化
     */


    TableLayout.prototype.updateColumnsWidth = function updateColumnsWidth() {

        // console.log('updateColumnsWidth', this.table.columns, Vue.prototype.$isServer);
        // console.log('updateColumnsWidth', this.table.$el);

        // 如果在服务器上运行,则返回
        if (vue_runtime_esm["a" /* default */].prototype.$isServer) return;

        var fit = this.fit;

        var bodyWidth = this.table.$el.clientWidth;
        var bodyMinWidth = 0;

        var flattenColumns = this.table.columns;
        // filter不改变原数组,且返回数组的指针指向原数组相对应的数组项的地址
        // 所以改变返回的数组值, 原数组值也会发生相应的改变
        var flexColumns = flattenColumns.filter(function (column) {
            return typeof column.width !== 'number';
        });

        // 如果width存在且realWidth也存在, 则设置realWdith为null
        flattenColumns.forEach(function (column) {
            if (typeof column.width === 'number' && column.realWidth) column.realWidth = null;
        });

        if (flexColumns.length > 0 && fit) {
            flattenColumns.forEach(function (column) {
                bodyMinWidth += column.width || column.minWidth || 80;
            });

            var scrollYWidth = 0;

            // 如果没有滚动条
            // 通过bodyMinWidth来判断
            // console.log('999', bodyMinWidth <= bodyWidth - scrollYWidth)
            if (bodyMinWidth <= bodyWidth - scrollYWidth) {

                // 没有分配宽度的列的总宽
                var totalFlexWidth = bodyWidth - scrollYWidth - bodyMinWidth;

                if (flexColumns.length === 1) {
                    flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth;
                } else {
                    // 计算所有没有宽度的列的最小宽度之和
                    var allColumnsWidth = flexColumns.reduce(function (prev, column) {
                        return prev + (column.minWidth || 80);
                    }, 0);
                    // console.log('allColumnsWidth', flexColumns, allColumnsWidth)

                    // 计算倍数
                    var flexWidthPerPixel = totalFlexWidth / allColumnsWidth;
                    // console.log('3333', flexWidthPerPixel, allColumnsWidth, totalFlexWidth);

                    // 非第一个列的宽度
                    var noneFirstWidth = 0;

                    flexColumns.forEach(function (column, index) {
                        if (index === 0) return;
                        // console.log('7', column, index)

                        // 取不大于该值的整数,这样会把多余的宽度都分配到第一列上
                        var flexWidth = Math.floor((column.minWidth || 80) * flexWidthPerPixel);
                        // console.log('7', flexWidth, flexWidthPerPixel)

                        noneFirstWidth += flexWidth;
                        // console.log('7', noneFirstWidth)

                        column.realWidth = (column.minWidth || 80) + flexWidth;
                    });

                    // 计算第一个的realWidth
                    flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth - noneFirstWidth;
                }
            }

            this.bodyWidth = Math.max(bodyMinWidth, bodyWidth);
            this.table.resizeState.width = this.bodyWidth;

            // console.log('999', this.table.columns)
            // console.log('999', bodyWidth, scrollYWidth, bodyMinWidth, bodyWidth - scrollYWidth - bodyMinWidth)
        } else {}
            // 有水平滚动条

            // console.log('888', flattenColumns, flexColumns)

        this.notifyObservers('columns');
    };

    /**
     * 没有设置观察器:
     * table.vue 设置页面窗口尺寸变化的监听器
     * 如果页面窗口宽度发生变化, 便会触发table-layout.updateColumnsWidth方法,以更新列的realWidth即states.columns发生变化
     * 但是这个变化可能不会触及table-header和table-body的col的变化(只有table-body下的col变化了,table-header并没有变化)
     * 不知道是为什么? 什么变化会触发dom的更新?
     * 
     * 设置观察器, 便可以保证通知到dom更新
     * table-header和table-body分别使用layout-observer进行混入, 分别创建一个观察器, 插入到观察器数组
     * 如果页面窗口宽度发生变化, 便会触发table-layout.updateColumnsWidth方法,以更新列的realWidth即states.columns发生变化
     * 从而触发观察器以通知dom更新(onColumnsChange更新col的width值)
     * 
     * @param {VNode} observer 
     */

    /**
     * 添加观察器
     * @param {VNode} observer 
     */


    TableLayout.prototype.addObserver = function addObserver(observer) {
        // console.log('添加观察器', observer);

        this.observers.push(observer);
    };

    /**
     * 移出观察器
     * @param {VNode} observe 
     */


    TableLayout.prototype.removeObserver = function removeObserver(observe) {
        // console.log('移出观察器', observe, this.observers);
        var index = this.observers.indexOf(observe);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    };

    /**
     * 通知观察器处理
     * @param {String} event 
     */


    TableLayout.prototype.notifyObservers = function notifyObservers(event) {
        var _this3 = this;

        var observers = this.observers;
        // console.log('notifyObservers', event, this.observers);

        observers.forEach(function (observe) {
            switch (event) {
                case 'columns':
                    // 更新列的dom
                    observe.onColumnsChange(_this3);
                    break;
                case 'scrollable':
                    // console.log('观察器', observe);
                    observe.onScrollableChange(_this3);
                    break;
                default:
                    throw new Error('Table Layout don\'t have event ' + event);
            }
        });
    };

    return TableLayout;
}();

/* harmony default export */ var table_layout = (table_layout_TableLayout);
// CONCATENATED MODULE: ./packages/table/src/store/watcher.js


/**
 * 拍平数组
 * 解构数组实现:
 * - 使用三点运算符
 * - 使用apply
 * @param {Array} columns 
 * @returns Array
 */
var doFlattenColumns = function doFlattenColumns(columns) {
    var result = [];
    columns.forEach(function (column) {
        if (column.children) {
            // 解构数组
            // 使用三点运算符:result.push(...doFlattenColumns(column.children));
            // 使用apply:因为apply接受数组形式的参数(传入的参数是一个一个数组项)
            result.push.apply(result, doFlattenColumns(column.children));
        } else {
            result.push(column);
        }
    });
    return result;
};

/**
 * Vue.extend 扩展实例构造器,构建组件
 * new出来的对象也就默认有构造函数中的模块
 * 为什么呢?Vue.extend到底什么意思?
 * Vue.extend是对Vue的扩展?
 * 如果再使用$mount便可以挂载到dom上了?
 */
/* harmony default export */ var watcher = (vue_runtime_esm["a" /* default */].extend({
    data: function data() {
        return {
            // 公共数据
            states: {
                // 渲染的数据来源
                data: [],

                // 列属性
                _columns: [],
                // columns 保存叶子列
                columns: [],
                // originColumns
                originColumns: []
            }
        };
    },


    methods: {
        // 更新列
        updateColumns: function updateColumns() {
            var states = this.states;

            var _columns = states._columns || [];

            var notFixedColumns = doFlattenColumns(_columns);

            states.originColumns = _columns;

            states.columns = [].concat(notFixedColumns);

            // console.log('更新列999999',_columns, states.columns);
            // console.log('7', states.columns)
        }
    }
}));
// CONCATENATED MODULE: ./packages/table/src/store/index.js



// 手工模拟Store

/**
 * 定义设置属性的方法
 */
watcher.prototype.mutations = {
    /**
     * 给公共数据池stores赋值data
     */
    setData: function setData(states, data) {
        // console.log('setData', states, data);
        states.data = data;
    },


    /**
     * 向公共数据池中的columns插入列属性
     * splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目(会改变原有数组)
     * arrayObject.splice(index,howmany,item1,.....,itemX) howmany为0则添加
     * 
     * 知道了parent, 标识到
     * 如果有父组件,则将其插入到父组件的children?但是此时父组件还没有加载呢,怎么办呢?
     * 
     * table-header和table-body都需要这个columns来计算colspan和rowspan值
     * table-header:columns中的colspan和rowspan
     * table-body:动态计算
     * 
     * @param {Object} states 
     * @param {String} column 
     * @param {String} index 
     * @param {Vnode} parent 
     */
    insertColumn: function insertColumn(states, column, index, parent) {
        // console.log('insertColumn', states, column, index, parent);
        var array = states._columns;

        if (parent) {
            array = parent.children;
            if (!array) array = parent.children = [];
        }
        // console.log('insert', column, parent, array);

        if (typeof index !== 'undefined') {
            array.splice(index, 0, column);
        } else {
            array.push(column);
        }

        // console.log('array', array, states)
        // console.log('8', array, this.table.$ready);
        // if(this.table.$ready) {
        //     // 更新列
        //     this.updateColumns();
        //     // 更新 DOM
        //     this.scheduleLayout();
        // }
    }
};

/**
 * 原型增加commit方法
 * @param {String} name 
 * @param  {...any[String]} args(Array)
 * 函数里的this指向谁?-this指向Watcher
 * apply 改变this的指向,且参数为数组形式call(name, [arg1,arg2,arg3,...])
 * call 改变this的指向,且参数为非数组形式, call(name, arg1,arg2,arg3, ...)
 */
watcher.prototype.commit = function (name) {
    // console.log('Watcher', name, args, this, [this.states].concat(args));
    // console.log('Watcher', this)
    var mutations = this.mutations;
    if (mutations[name]) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        // 第一个参数为states, 后面的参数为args
        mutations[name].apply(this, [this.states].concat(args));
    } else {
        throw new Error('Action not found: ' + name);
    }
};

/* harmony default export */ var src_store = (watcher);
// CONCATENATED MODULE: ./packages/table/src/store/helper.js


/**
 * 创建公共池并设置公共池中的数据初始化
 * @param {Object} table 
 * @param {Object} initialState 
 * @returns 
 */
function createStore(table) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // 如果不存在,则抛错
    if (!table) {
        throw new Error('Table is required.');
    }

    var store = new src_store();
    store.table = table;

    Object.keys(initialState).forEach(function (key) {
        var value = initialState[key];
        if (typeof value !== 'undefined') {
            store.states[key] = initialState[key];
        }
    });

    return store;
}

/**
 * 实现同时定义多个computed属性
 * 但是只能在computed中执行 ...mapStates({columns: 'columns'})
 * 换到mounted()中便不可以了
 * @param {Object} mapper 
 * @returns Object
 */
function mapStates(mapper) {
    var res = {};
    // console.log('mapStates', mapper, res);
    Object.keys(mapper).forEach(function (key) {
        var value = mapper[key];
        var fn = void 0;
        if (typeof value === 'string') {
            fn = function fn() {
                return this.store.states[value];
            };
        } else if (typeof value === 'function') {
            fn = function fn() {
                return value.call(this, this.store.states);
            };
        } else {
            console.error('invalid value type');
        }

        if (fn) {
            res[key] = fn;
        }
    });

    // console.log('r', res);
    return res;
}
// CONCATENATED MODULE: ./packages/table/src/layout-observer.js
/**
 * 混入布局观察器
 * LayoutObserver布局观察器
 * 用于表格布局组件: table-header和table-body
 */
/* harmony default export */ var layout_observer = ({

    computed: {
        // 表格布局属性
        tableLayout: function tableLayout() {
            var layout = this.layout;
            // console.log('tableLayout', layout);

            if (!layout && this.table) {
                layout = this.table.layout;
            }

            // 如果还是没有则抛出错误
            if (!layout) {
                throw new Error('Can not find table layout.');
            }

            return layout;
        }
    },

    methods: {
        /**
         * 设置colgroup中的col的width属性
         * 通过控制colgroup中的col的宽度来绑定table单元格的宽度
         * 通过使用colgroup标签, 向整个列应用样式, 而不需要重复为每个单元格或每一行设置样式
         * col属性:
         * - width:规定单元格的宽度
         * th/td属性高:
         * - colspan:规定单元格可横跨的列数
         * - rowspan:规定单元格可横跨的行数
         * 
         * vue:获取当前组件所在的真实dom this.$el
         * js:获取dom节点方式之一
         * js:获取匹配指定css选择器的所有元素 querySelectorAll (querySelector获取匹配到的第一个元素)
         * js:获取dom属性 getAttribute
         * js:设置dom属性 setAttribute
         * @param {Object} layout 
         * @returns undefined
         */
        onColumnsChange: function onColumnsChange(layout) {
            // console.log('layout', layout);

            // 获取真实dom, 通过querySelectorAll筛选
            // querySelectorAll方法返回文档中匹配指定 CSS 选择器的所有元素，返回 NodeList 对象
            var cols = this.$el.querySelectorAll('colgroup > col');
            // console.log('77', cols, this.columns);

            var flattenColumns = this.columns;
            var columnsMap = {};

            flattenColumns.forEach(function (column) {
                columnsMap[column.id] = column;
            });
            // console.log('flatcolumnsMaptenColumns', columnsMap)

            if (!cols.length) return;

            for (var i = 0, j = cols.length; i < j; i++) {
                var col = cols[i];
                var name = col.getAttribute('name');
                var column = columnsMap[name];
                // console.log(i, col, name, columnsMap, column);

                if (column) {
                    col.setAttribute('width', column.realWidth || column.width);
                }
            }
        },
        onScrollableChange: function onScrollableChange(layout) {
            console.log('onScrollableChange', layout);
        }
    },

    created: function created() {
        // console.log('cr', this.tableLayout);

        // 添加观察器
        this.tableLayout.addObserver(this);
    },
    mounted: function mounted() {
        // console.log('哈喽', this.tableLayout, this);

        this.onColumnsChange(this.tableLayout);
    },
    updated: function updated() {
        // console.log('模块更新', this.$el);
        this.onColumnsChange(this.tableLayout);
    },


    /**
     * 为什么要destoryed?
     * 
     * Vue中父子组件的生命周期?
     */
    destroyed: function destroyed() {
        // 移出观察器
        this.tableLayout.removeObserver(this);
    }
});
// CONCATENATED MODULE: ./packages/table/src/table-header.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * table-header:table子组件,表头
 */




/**
 * th和td标签中属性colspan和rowspan有什么意义吗?
 * - colspan 规定单元格横跨列数
 * - rowspan 规定单元格横跨行数
 */

/**
 * 将带有children字段的数组, 拉出来(但是不将children字段砍掉)
 * @param {Array} columns 
 * @returns Array
 */
var getAllColumns = function getAllColumns(columns) {
    var result = [];

    columns.forEach(function (column) {
        result.push(column);
        if (column.children) {
            // 解构数组
            // 三点运算符:result.push(...getAllColumns(columns.children));
            // 利用apply接收数组形式的传参
            result.push.apply(result, getAllColumns(column.children));
        }
    });

    return result;
};

/**
 * 将列数组扁平化
 * maxLevel:列的最大深度
 * level:列所在第几层
 * rowspan:列所在的层到最底层的深度
 * colspan:如果有嵌套子列,则取自嵌套子列的长度;否则取1
 * 对象赋值传入的是地址, 所以不需要renturn
 * @param {Array} originColumns 
 * @returns Array
 */
var convertToRows = function convertToRows(originColumns) {
    // console.log('originColumns', originColumns);
    /**
     * 如果有children字段, rowspan = children.length === 0 ? 1 : chldren.length
     * 还需要将这样的列给整成一个数组,扁平的数组
     */

    // 记录最大深度
    var maxLevel = 1;

    var traverse = function traverse(column, parent) {
        // 定义自己的列深度
        if (parent) {
            column.level = parent.level + 1;
            if (maxLevel < column.level) {
                maxLevel = column.level;
            }
        }

        // 定义自己的colspan
        if (column.children) {
            var colspan = 0;
            column.children.forEach(function (subColumn) {
                traverse(subColumn, column);
                colspan += subColumn.colspan;
            });
            column.colspan = colspan;
        } else {
            column.colspan = 1;
        }
    };

    // 遍历一级的,一级没有父列
    originColumns.forEach(function (column) {
        column.level = 1;
        traverse(column);
    });

    /**
     * 定义一个空数组,即返回的数组的初始化
     * maxLevel 记录嵌套列的深度, 也是返回数组的长度
     * 
     * 根据column的level来保存
     * 如果某列的level为2,则将其push到rows[1]中
     * 所以需要将嵌套的子列磨平
     */
    var rows = [];
    for (var i = 0; i < maxLevel; i++) {
        rows.push([]);
    }

    /**
     * 由于数组originColumns可能是
     * 如果是嵌套列, 则originColumns项中有children(子列)
     * 需要将其变成一维的(树型->一维数组)
     */
    var allColumns = getAllColumns(originColumns);

    // 计算列的rowspan
    allColumns.forEach(function (column) {
        // 定义列的rowspan
        if (!column.children) {
            // 这里是取自该列所在层(包括自身层)到最底层的深度
            column.rowspan = maxLevel - column.level + 1;
        } else {
            // 叶子层, 最底层
            column.rowspan = 1;
        }

        // 保存至rows, 根据列层level
        rows[column.level - 1].push(column);
        // console.log('8', column, rows);
    });
    // console.log('col', originColumns, maxLevel, getAllColumns(originColumns));

    return rows;
};

/* harmony default export */ var table_header = ({
    name: "YTableHeader",

    mixins: [layout_observer],

    props: {
        store: {
            required: true
        }
    },

    computed: _extends({
        table: function table() {
            return this.$parent;
        }
    }, mapStates({
        columns: 'columns'
    })),

    // watch: {
    //     columns(newValue) {
    //         console.log('header-监听columns变化', newValue)
    //     },
    // },

    methods: {},

    // created() {
    // console.log('created-header', this);
    // },

    // updated() {
    //     console.log('table-header', this.$el)
    // },

    render: function render(h) {
        // console.log('YTableHeader-render函数', this._l);
        // return h('span');
        var originColumns = this.store.states.originColumns;
        var columnRows = convertToRows(originColumns);
        // console.log('columnRows', originColumns);

        /**
         * JSX支持
         * 官方文档:https://cn.vuejs.org/v2/guide/render-function.html#JSX
         * 需要安装插件:npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props
         * babel-plugin-syntax-jsx, babel-plugin-transform-vue-jsx
         * 配置.babelrc: {"plugins": ["transform-object-rest-spread","transform-vue-jsx"]}
         * 
         * this._l 是一个渲染列表的函数renderList
         * 可以通过打印this._l, 查看具体函数
         * 接收两个值,第一个值是列表,第二个是渲染函数
         * 渲染函数接收两个参数: 第一个值是一列属性,第二个值是索引
         */

        return h(
            'table',
            {
                'class': 'y-table__header',
                attrs: { cellspacing: '0',
                    cellpadding: '0',
                    border: '0' }
            },
            [h('colgroup', [this.columns.map(function (column) {
                return h('col', {
                    attrs: { name: column.id },
                    key: column.id });
            })]), h('thead', [this._l(columnRows, function (columns, rowIndex) {
                return h(
                    'tr',
                    {
                        key: rowIndex },
                    [columns.map(function (column, cellIndex) {
                        var style = [column.align ? { 'text-align': column.align } : ''];
                        return h(
                            'th',
                            {
                                attrs: {
                                    colspan: column.colspan,
                                    rowspan: column.rowspan
                                },
                                key: column.id },
                            [h(
                                'div',
                                {
                                    'class': 'cell',
                                    style: style },
                                [column.label]
                            )]
                        );
                    })]
                );
            })])]
        );
    }
});
// CONCATENATED MODULE: ./packages/table/src/table-body.js
var table_body_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * table-body:table子组件,表体
 */





/* harmony default export */ var table_body = ({
    name: 'YTableBody',

    mixins: [layout_observer],

    props: {
        store: {
            required: true
        }
    },

    computed: table_body_extends({
        table: function table() {
            return this.$parent;
        }
    }, mapStates({
        data: 'data',
        columns: 'columns'
    })),

    methods: {
        /**
         * 获取行的key
         * @param {*} row 
         * @param {*} index 
         * @returns 
         */
        getKeyOfRow: function getKeyOfRow(row, index) {
            var rowKey = this.table.rowKey;
            // console.log('rowKey', rowKey, row)

            if (rowKey) {
                return getRowIdentity(row, rowKey);
            }
            return index;
        },


        /**
         * 
         * @param {Number} index 索引 
         */
        isColumnHidden: function isColumnHidden(index) {
            console.log('isColumnHidden', index);
        },


        /**
         * 获取span值
         * @param {*} row 
         * @param {*} column 
         * @param {*} rowIndex 
         * @param {*} columnIndex 
         * @returns 
         */
        getSpan: function getSpan(row, column, rowIndex, columnIndex) {
            // console.log('getSpan', row, column, rowIndex, columnIndex);
            var rowspan = 1;
            var colspan = 1;
            return {
                rowspan: rowspan, colspan: colspan
            };
        },


        /**
         * 
         * @param {Object} row 行数据
         * @param {Number} $index 索引
         */
        rowRender: function rowRender(row, $index) {
            var _this = this;

            var h = this.$createElement;

            // console.log('rowRender', row, $index, this);
            var columns = this.columns;
            // const columnsHidden = columns.map((column, index) => this.isColumnHidden(index));

            return h(
                'tr',
                {
                    key: this.getKeyOfRow(row, $index) },
                [columns.map(function (column, cellIndex) {
                    var _getSpan = _this.getSpan(row, column, $index, cellIndex),
                        rowspan = _getSpan.rowspan,
                        colspan = _getSpan.colspan;

                    if (!rowspan || !colspan) {
                        return null;
                    }
                    var columnData = table_body_extends({}, column);
                    // console.log('里面', column, columnData)
                    var data = {
                        store: _this.store,
                        column: columnData,
                        row: row,
                        $index: $index
                    };
                    return h(
                        'td',
                        {
                            attrs: {
                                rowspan: rowspan,
                                colspan: colspan }
                        },
                        [column.renderCell.call(_this._renderProxy, // 何意?
                        _this.$createElement, // 何意?
                        data // 接受的参数
                        )]
                    );
                })]
            );
        },


        /**
         * 
         * @param {Object} row 行数据
         * @param {Number} $index 索引
         */
        wrappedRowRender: function wrappedRowRender(row, $index) {
            // console.log('wrappedRowRender', row, $index);
            return this.rowRender(row, $index);
        }
    },

    // watch: {
    //     columns(newValue) {
    //         console.log('body-监听columns变化', newValue)
    //     },
    // },

    // updated() {
    //     console.log('table-body', this.$el)
    // },

    render: function render(h) {
        var _this2 = this;

        // console.log('table-body', this.columns);
        var data = this.data || [];
        var columns = this.columns || [];
        // data.reduce((acc, row) => {
        //     console.log(acc, row)
        // }, [])
        return h(
            'table',
            {
                'class': 'y-table__body',
                attrs: { cellspacing: '0',
                    cellpadding: '0',
                    border: '0' }
            },
            [h('colgroup', [columns.map(function (column) {
                return h('col', {
                    attrs: { name: column.id },
                    key: column.id });
            })]), h('tbody', [data.reduce(function (acc, row) {
                return acc.concat(_this2.wrappedRowRender(row, acc.length));
            }, [])])]
        );
    }
});
// EXTERNAL MODULE: ./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js
var ResizeObserver_es = __webpack_require__(2);

// CONCATENATED MODULE: ./src/utils/resize-event.js


var isServer = typeof window === 'undefined';

/**
 * 监听器调用方法以响应监听事件变化
 * @param {Array} entries 
 */
var resizeHandler = function resizeHandler(entries) {
    // console.log('resizeHandler', entries);

    for (var _iterator = entries, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var entry = _ref;

        // console.log(entry);

        var listeners = entry.target.__resizeListeners__ || [];

        if (listeners.length) {
            listeners.forEach(function (fn) {
                fn();
            });
        }
    }
};

/**
 * 添加监听事件
 * @param {Object} element 
 * @param {Function} fn 
 */
var resize_event_addResizeListener = function addResizeListener(element, fn) {
    // console.log('设置监听事件', element, fn, isServer);

    // console.log('8', !element.__resizeListeners__);

    if (!element.__resizeListeners__) {
        element.__resizeListeners__ = [];

        element.__ro__ = new ResizeObserver_es["a" /* default */](resizeHandler);

        element.__ro__.observe(element);
    }

    element.__resizeListeners__.push(fn);

    // console.log('e', element.__resizeListeners__);
};

/**
 * 移出指定的监听事件
 * @param {Object} element 
 * @param {Function} fn 
 * @returns 
 */
var removeEventListener = function removeEventListener(element, fn) {

    if (!element || !element.__resizeListeners__) return;

    // 删除
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);

    if (!element.__resizeListeners__.length) {
        element.__ro__.disconnect();
    }
};
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/table/src/table.vue?vue&type=script&lang=js&
var tablevue_type_script_lang_js_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * debounce去抖动
 * 参考:https://www.cnblogs.com/songyz/p/10310491.html
 */








var tableIdSeed = 1;
/* harmony default export */ var tablevue_type_script_lang_js_ = ({

    name: 'YTable',

    components: {
        TableHeader: table_header,
        TableBody: table_body
    },

    props: {

        // data需为数组类型Array, 且默认值为空数组[]
        data: {
            // 指定data的数组类型, 如果传入的data不是数组类型, 则vue会报错
            type: Array,
            // 对象或数组默认值必须从一个工厂函数获取
            default: function _default() {
                return [];
            }
        },

        // border需为布尔类型Boolean
        border: {
            type: Boolean,
            default: false
        },

        // 是否显示表头, 布尔类型, 默认为true
        showHeader: {
            type: Boolean,
            default: true
        },

        // 行数据的key,用来优化table的渲染
        rowKey: [String, Function],

        // 列的宽度是否自动撑开
        fit: {
            type: Boolean,
            default: true
        },

        /**
         * 表格数据为空时的文字
         * 空数据时显示的文本内容，也可以通过 slot="empty" 设置
         */
        emptyText: {
            type: String,
            default: '暂无数据'
        },

        // 文本对齐方式
        align: String,

        /**
         * 表格固定高度(固定数字,单位px), 默认auto
         * 如果设置了height, 且容器高度超过了该值, 则固定表头
         * 首先:height作用于整个table
         * 其次:整个表格实际高度超过了height值, 则固定表头table-header
         */
        height: [String, Number],

        /**
         * 流体高度
         * 若表格所需的高度大于最大高度，则会显示一个滚动条
         * 调用处:max-height
         */
        maxHeight: [String, Number]

    },

    computed: tablevue_type_script_lang_js_extends({
        bodyWidth: function bodyWidth() {
            var bodyWidth = this.layout.bodyWidth;
            // console.log('55', bodyWidth + 'px')

            return bodyWidth + 'px';
        },
        bodyHeight: function bodyHeight() {
            var _layout = this.layout,
                headerHeight = _layout.headerHeight,
                bodyHeight = _layout.bodyHeight;
            // 如果高度存在

            if (this.height) {
                return {
                    height: bodyHeight ? bodyHeight + 'px' : ''
                };
            } else if (this.maxHeight) {
                var maxHeight = parseHeight(this.maxHeight);
                if (typeof maxHeight === 'number') {
                    return {
                        // 'max-height': (maxHeight - headerHeight) + 'px',
                        'max-height': bodyHeight ? bodyHeight + 'px' : ''
                    };
                }
            }
            return {};
        },
        bodyWrapper: function bodyWrapper() {
            return this.$refs.bodyWrapper;
        }
    }, mapStates({
        columns: 'columns',
        tableData: 'data'
    })),

    data: function data() {
        this.store = createStore(this, {
            rowKey: this.rowKey
        });
        // TableLayout 设置表格的相关属性
        var layout = new table_layout({
            store: this.store,
            table: this,
            showHeader: this.showHeader
        });
        return {
            layout: layout,
            resizeState: {
                width: null,
                height: null
            }
        };
    },


    methods: {
        /**
         * throttle 节流
         * 滚动监听回调
         */
        syncPostion: throttle(20, function () {
            var _bodyWrapper = this.bodyWrapper,
                scrollLeft = _bodyWrapper.scrollLeft,
                scrollTop = _bodyWrapper.scrollTop,
                offsetWidth = _bodyWrapper.offsetWidth,
                scrollWidth = _bodyWrapper.scrollWidth;

            console.log('syncPosition', scrollLeft, scrollTop, offsetWidth, scrollWidth);
        }),

        // 监听窗口尺寸变化的响应的事件
        resizeListener: function resizeListener() {
            if (!this.$ready) return;

            // 页面窗口尺寸变化,是否需要更新布局
            var shouldUpdateLayout = false;

            var el = this.$el;

            var _resizeState = this.resizeState,
                oldWidth = _resizeState.width,
                oldHeight = _resizeState.height;
            // console.log('old', oldWidth, oldHeight, el.offsetWidth);

            var width = el.offsetWidth;
            if (oldWidth !== width) {
                shouldUpdateLayout = true;
            }

            // console.log('shouldUpdateLayout', shouldUpdateLayout)

            if (shouldUpdateLayout) {
                this.resizeState.width = width;
                // this.resizeState.height = height;

                this.doLayout();
            }
        },


        // 绑定事件
        bindEvents: function bindEvents() {
            // console.log('999', this.bodyWrapper);
            // 监听滚动
            this.bodyWrapper.addEventListener('scroll', this.syncPostion, { passive: true });

            // 如果列是自动撑开,则添加窗口尺寸的监听事件
            if (this.fit) {
                resize_event_addResizeListener(this.$el, this.resizeListener);
            }
        },


        // 取消绑定
        unbindEvents: function unbindEvents() {
            if (this.fit) {
                removeEventListener(this.$el, this.resizeListener);
            }
        },
        doLayout: function doLayout() {
            this.layout.updateColumnsWidth();
        }
    },

    /**
     * 官方文档:https://cn.vuejs.org/v2/api/?#watch
     * 三种使用形式
     * - 普通(第一次data赋值不会被调用): data(value) {...}
     * - immediate和handler(第一次data赋值后便会被调用): data: {immediate: true, handler(value){...}}
     * - deep对象内部的属性监听(也叫深度监听): data: {deep: true, handler(value, oldValue){...}}
     */
    watch: {
        // 监听data
        data: {
            // 立即监听
            immediate: true,
            handler: function handler(value) {
                // 提交data到公共数据池
                this.store.commit('setData', value);
            }
        },

        // 立即监听高度
        height: {
            immediate: true,
            handler: function handler(value) {
                this.layout.setHeight(value);
            }
        },

        // 立即监听最大高度
        maxHeight: {
            immediate: true,
            handler: function handler(value) {
                this.layout.setMaxHeight(value);
            }
        }
    },

    /**
     * 子组件: table-header和table-body
     * $children: [] 空数组
     */
    created: function created() {
        // debugger;
        this.tableId = 'y-table_' + tableIdSeed++;

        // this.debouncedUpdateLayout = debounce(50, () => this.doLayout());
    },
    beforeMount: function beforeMount() {
        // debugger;
    },


    /**
     * $children: [table-column组件, table-header组件, table-body组件]
     */
    mounted: function mounted() {
        // debugger;
        // console.log('6666', this);
        // 在这里试是不行的
        // let res = mapStates.call(this, {
        //     columns: 'columns',
        //     tableData: 'data',
        // })
        console.log('88888888', this, this.layout);

        // 绑定监听页面尺寸变化事件
        this.bindEvents();

        // 更新列
        this.store.updateColumns();

        // 布局
        this.doLayout();

        this.resizeState = {
            width: this.$el.offsetWidth,
            height: this.$el.offsetHeight

            // 监听窗口尺寸的变化,更新col的宽度

        };this.$ready = true;
    },
    destroyed: function destroyed() {
        this.unbindEvents();
    }
});
// CONCATENATED MODULE: ./packages/table/src/table.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_tablevue_type_script_lang_js_ = (tablevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/table/src/table.vue





/* normalize component */

var table_component = normalizeComponent(
  src_tablevue_type_script_lang_js_,
  tablevue_type_template_id_493fe34e_render,
  tablevue_type_template_id_493fe34e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var table_api; }
table_component.options.__file = "packages/table/src/table.vue"
/* harmony default export */ var src_table = (table_component.exports);
// CONCATENATED MODULE: ./packages/table/index.js


src_table.install = function (Vue) {
    Vue.component(src_table.name, src_table);
};

/* harmony default export */ var packages_table = (src_table);
// CONCATENATED MODULE: ./packages/table/src/config.js


function defaultRenderCell(h, _ref) {
    var row = _ref.row,
        column = _ref.column,
        $index = _ref.$index;


    var property = column.property;

    var value = property && row[property];

    // console.log('defaultRenderCell', row, column, $index, value)

    return value;
}
// CONCATENATED MODULE: ./packages/table/src/table-column.js
/**
 * table-column:table子组件,列
 * 
 * 注意: 该文件不是vue文件,而是js文件
 * 使用jsx语言渲染dom(需要安装相应的插件以支持JSX)
 * 官方文档: https://cn.vuejs.org/v2/guide/render-function.html
 * 该js是table-column组件,那么在使用该组件时,会传递过来两个属性prop和label
 * 这两个属性要如何处理才能往columns中添加该列的属性呢？
 * 
 * 如何实现多级表头?
 *  - table-column中嵌套table-column
 * 
 * 例如:
 * - 调用结构:
 * <y-table>
 *     <y-table-column prop="name" label="姓名"></y-table-column>
 *     <y-table-column label="个人信息">
 *         <y-table-column prop="position" label="职位"></y-table-column>
 *         <y-table-column prop="sex" label="性别"></y-table-column>
 *     </y-table-column>
 * </y-table>
 * 
 * 如何实现多级表头?
 * 
 * - 先看要实现的目标结构,
 * <table>
 *     <thead>
 *          <tr>
 *             <th colspan="2" rowspan="1">姓名</th>
 *             <th colspan="2" rowspan="1">个人信息</th>
 *          </tr>
 *          <tr>
 *             <th colspan="1" rowspan="1">职位</th>
 *              <th colspan="1" rowspan="1">性别</th>
 *          </tr>
 *     </thead>
 *     <tbody>
 *         <tr>
 *             <td colspan="2" rowspan="1">路飞</td>
 *             <td colspan="1" rowspan="1">船长</td>
 *             <td colspan="1" rowspan="1">男</td>
 *          </tr>
 *     </tbody>
 * </table>
 * 
 * - 再看调用结构:
 * 第一列:没有子列,所以colspan=1,rowspan=1
 * 第二列:有两个子列,需要计算
 *     第二列的第一个子列:没有子列,所以colspan=1,rowspan=1
 *     第二列的第二个子列:没有子列,所以colspan=1,rowspan=1
 *     第二列:有两个子列,所以colspan=2,rowspan=1
 * 但是呢?第二个列有两个子列,那么它的前面那一列的colspan因该为2,这一步要如何实现呢?
 * 实际上,只有有嵌套子列,那么所有子列的colspan值等于有嵌套子列的最大值
 * 
 * - col该如何渲染?
 * 
 * 
 * - 看了element的实现:发现element中的表体下的td,colspan都是1
 * 转变思路
 * 第一列:没有子列,所以colspan=1,rowspan=1 -> col
 * 第二列:有两个子列
 *      第二列的第一个子列:没有子列,所以colspan=1,rowspan=1 -> col
 *      第二列的第二个子列:没有子列,所以colspan=1,rowspan=1 -> col
 * 但是呢?第二列有两个子列,则colspan=2,rowspan=1
 * 
 * <table>
 *     <thead>
 *          <tr>
 *             <th colspan="1" rowspan="2">姓名</th>
 *             <th colspan="2" rowspan="1">个人信息</th>
 *          </tr>
 *          <tr>
 *             <th colspan="1" rowspan="1">职位</th>
 *              <th colspan="1" rowspan="1">性别</th>
 *          </tr>
 *     </thead>
 *     <tbody>
 *         <tr>
 *             <td colspan="1" rowspan="1">路飞</td>
 *             <td colspan="1" rowspan="1">船长</td>
 *             <td colspan="1" rowspan="1">男</td>
 *          </tr>
 *     </tbody>
 * </table>
 * 
 * 这样的话,col也好渲染
 * col渲染的是没有嵌套子列的列
 * 
 * 下面开始计算colspan和rowspan,并将其保存到该列中
 * 
 * table-header 和 table-body 的 colspan 和 rowspan 是不一样的
 * 处理:单独计算
 * 如何单独计算?
 * table-column:需要保存列的信息?如何嵌套保存呢?
 */





/**
 * 特点: 同一批组件调用,该值会发生变化
 */
var columnIdSeed = 1;

/* harmony default export */ var table_column = ({
    name: 'YTableColumn',

    // prop传值
    props: {
        // 表格数据项字段名
        prop: String,
        property: String,
        // 标题
        label: String,
        // 列宽
        width: {},
        minWidth: {},
        // 文本对齐方式
        align: String
    },

    data: function data() {
        return {
            isSubColumn: false,
            columns: []
        };
    },


    // 计算属性,有缓存作用
    computed: {
        // owner汉语意为主人,即父级的table组件
        owner: function owner() {
            var parent = this.$parent;
            while (parent && !parent.tableId) {
                parent = parent.$parent;
            }
            return parent;
        },

        /**
         * 该table-column的父级组件是table还是table-column
         * 如果是table-column,因该是要做单元格合处理的
         */
        columnOrTableParent: function columnOrTableParent() {
            var parent = this.$parent;
            while (parent && !parent.tableId && !parent.columnId) {
                parent = parent.$parent;
            }
            return parent;
        },


        // 宽度
        realWidth: function realWidth() {
            return parseWidth(this.width);
        },


        // 最小宽度
        realMinWidth: function realMinWidth() {
            return parseMinWidth(this.minWidth);
        }
    },

    methods: {
        // reduce 两两比较操作,数组之间的拼接
        getPropsData: function getPropsData() {
            var _this = this;

            for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
                props[_key] = arguments[_key];
            }

            return props.reduce(function (prev, cur) {
                if (Array.isArray(cur)) {
                    cur.forEach(function (key) {
                        prev[key] = _this[key]; // 将数据中的key对应的值赋值
                    });
                }
                return prev;
            }, {});
        },


        // 获取child在children的位置
        getColumnElIndex: function getColumnElIndex(children, child) {
            // console.log('getColumnElIndex', children, child);
            return [].indexOf.call(children, child);
        },


        // 设置列宽
        setColumnWidth: function setColumnWidth(column) {
            if (this.realWidth) {
                column.width = this.realWidth;
            }

            if (this.realMinWidth) {
                column.minWidth = this.realMinWidth;
            }

            if (!column.minWidth) {
                column.minWidth = 80;
            }

            column.realWidth = column.width === undefined ? column.minWidth : column.width;

            return column;
        },


        /**
         * 在table-column中设置列的渲染函数
         * 列的渲染是通过table-header调用的
         * @param {Object} column 
         * @returns column
         */
        setColumnRenders: function setColumnRenders(column) {
            var _this2 = this;

            var h = this.$createElement;

            // console.log('setColumnRenders', column);
            var originRenderCell = column.renderCell;
            // console.log('setColumnRenders', originRenderCell, defaultRenderCell)

            originRenderCell = originRenderCell || defaultRenderCell;

            // 对renderCell进行包装
            column.renderCell = function (h, data) {
                var children = null;
                // console.log('renderCell', h, data, this.$scopeSlots);

                // console.log('renderCell', this.$scopedSlots, this)

                // 如果该列存在默认插槽, 则渲染默认插槽, 这样的话便使得每列的自定义渲染方式整理到table-body的每列上
                // 充分说明, table-body中单元格的渲染需要单独分离出来, 调用每列的渲染函数, 这样便使table-column中每列的自定义同步到table-body下
                // 否则只展示该列对应的数据值
                if (_this2.$scopedSlots.default) {
                    // vm.$scopedSlots 范文作用域插槽, 并传入数据
                    children = _this2.$scopedSlots.default(data);
                } else {
                    children = originRenderCell(h, data);
                }

                var props = {
                    class: 'cell',
                    style: [column.align ? { 'text-align': column.align } : '']
                };

                return h(
                    'div',
                    props,
                    [children]
                );
            };

            return column;
        }
    },

    /**
     * 此时,this.data和this.$el都还没有值,为undefined, 也可以进行一些初始化
     * 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
     * beforeCreate里定义的变量不会出现在this.$data里, 相当于新建了变量
     */
    beforeCreate: function beforeCreate() {
        // console.log('beforeCreate', this.$data);
        // debugger;
        this.column = {};
        this.columnId = '';
    },


    /**
     * 在模板被渲染成html之前被调用, 即通常初始化某些属性值, 然后再渲染成视图
     * this.$el -> undefined
     * this.$data -> data的初始化值, 属性和方法的运算一级watch/event事件回调的配置均已完成
     * 此时,虚拟dom节点已生成,但是还没有渲染成真是的dom节点
     * 在执行data()方法前props属性有数据已经可以访问，watch和computed监听函数此时为null，此时this.computed里的计算属性值为undefined。data函数执行完后，watch和computed监听函数才可用，因为data函数执行完后，data函数return的属性这时才可用。然而，挂载阶段还没开始，$el 属性目前不可见。
     * 
     * 注意: 如果table下有两个table-column,则第一个table-column时,columnIdSeed值为1,
     * 但是到第二个table-column时,columnIdSeed值为2,这是为什么呢?
     * 测试了下,发现无论第几个table-column,在export default外打印值都为1且只在第一次打印了
     * 也就类似缓存下来了,export default外面定义的变量会被缓存下来,无论定义了几遍table(里面包含table-column)
     * 保证每个table-column都会有一个唯一的columnId
     * 
     * beforeCreate 
     * created:
     *  - props、data里面的变量也可以访问(均已完成初始化)
     *  - computed中的变量, 如果依赖于data里面的变量, 则为undefined; 否则可以访问
     * mounted 初始化事件操作
     * 
     * 生命周期的调试:debugger
     * 例如:
     * beforeCreate() {debugger;}
     * 参考:https://blog.csdn.net/weixin_30616969/article/details/94973817
     */
    created: function created() {
        // debugger;
        // console.log('cre', this)
        // 定义table-column组件的columnId
        var parent = this.columnOrTableParent;
        // 是否是子列, 如果两者不相等,则是子列(直接父组件也是table-column)
        this.isSubColumn = this.owner !== parent;
        this.columnId = (parent.tableId || parent.columnId) + '_column_' + columnIdSeed++;
        // console.log('create', this.columnId);

        // 定义默认属性,暂时只有id
        var defaults = {
            id: this.columnId,
            // 对应列内容的字段名, 也可以使用 property 属性
            property: this.prop || this.property

            // 基础属性
            // const basicProps = ['label', 'prop',];
        };var basicProps = ['label', 'align'];

        // 收集column属性
        var column = this.getPropsData(basicProps);
        column = mergeOptions(defaults, column);
        // console.log('ccc', column);

        // 注意compose(组成,构成)执行顺序是从右到左,现在chains就相当于一个函数
        // const chains = compose(this.setColumnRenders, this.setColumnWidth, this.setColumnForcedProps);
        var chains = compose(this.setColumnRenders, this.setColumnWidth);
        column = chains(column);
        // console.log('chains', chains, column, chains(column));

        // console.log('chanins', column, column.renderCell())

        this.columnConfig = column;
    },


    /**
     * 在模板被渲染成html之后被调用,即通常初始化页面完成后,再对html的dom节点进行一些需要的操作
     * this.$el -> undefined
     * this.$data -> data的初始化值
     * el被新创建的vm.$el替换, 并挂载到实例上去之后调用该钩子
     * 此时,虚拟dom节点已生成,且已经渲染成真实的dom节点
     * 可对dom进行初始化相关的操作
     * 但是不承诺所有的子组件也都一起被挂载。如果希望等到整个视图都渲染完毕, 可以使用$nextTick
     */
    mounted: function mounted() {
        // debugger;
        // console.log('table-column传递的属性', this.prop, this.label);
        var owner = this.owner;
        var parent = this.columnOrTableParent;

        // vm.$children 当前实例的直接子组件(虚拟节点)
        // vm.$el.children 当前dom节点的直接子节点(真实dom节点)
        // 如果直父组件是table-column
        var children = this.isSubColumn ? parent.$el.children : parent.$refs.hiddenColumns.children;

        var columnIndex = this.getColumnElIndex(children, this.$el);
        // 甚为关键,将该列的属性存入到table的公共池中
        // 父组件table的store
        // console.log('父组件table的store', owner, owner.store);
        // console.log('columnConfig', this.columnConfig);
        owner.store.commit('insertColumn', this.columnConfig, columnIndex, this.isSubColumn ? parent.columnConfig : null);
        // console.log('888888888888', owner, parent, children, columnIndex);
        // console.log('777777777', children, parent.$refs.hiddenColumns.children)

        console.log('777777777', this);
    },


    // render渲染
    render: function render(h) {
        // console.log('table-column', h,  this.$slots);
        // 默认插槽,替子元素占位
        // slots 也要渲染，需要计算合并表头
        // 结构比较简单, 就不用jsx了
        // 默认插槽如何渲染到table-body?
        return h('div', this.$slots.default);
    }
});
// CONCATENATED MODULE: ./packages/table-column/index.js


table_column.install = function (Vue) {
    Vue.component(table_column.name, table_column);
};

/* harmony default export */ var packages_table_column = (table_column);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/tree/src/tree.vue?vue&type=template&id=547575a6&
var treevue_type_template_id_547575a6_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "y-tree" },
    _vm._l(_vm.root.childNodes, function(child) {
      return _c("y-tree-node", {
        key: _vm.getNodeKey(child),
        attrs: { node: child, "show-checkbox": _vm.showCheckbox }
      })
    }),
    1
  )
}
var treevue_type_template_id_547575a6_staticRenderFns = []
treevue_type_template_id_547575a6_render._withStripped = true


// CONCATENATED MODULE: ./packages/tree/src/tree.vue?vue&type=template&id=547575a6&

// CONCATENATED MODULE: ./src/utils/merge.js
/**
 * 合并多个对象到第一个参数
 * arguments:函数传入的参数集
 * @param {*} target 第一个参数
 * @returns 
 */
/* harmony default export */ var merge = (function (target) {
    // console.log('merge', target, arguments)
    // 从第二个参数开始取,因为target是第一个参数
    for (var i = 1, j = arguments.length; i < j; i++) {
        var scource = arguments[i] || {};
        // console.log('scource', scource)
        for (var prop in scource) {
            // 如果prop是scource的自身属性,而非继承而来的
            if (scource.hasOwnProperty(prop)) {
                var value = scource[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }
    return target;
});
// CONCATENATED MODULE: ./packages/tree/src/model/utils.js
/**
 * tree工具函数
 */

var NODE_KEY = '$treeNodeId';

/**
 * 给node.data添加属性NODE_KEY,值为节点的id(node.id)
 * node.js:markNodeData(this, data);
 * 
 * Object.defineProperty(obj, prop, descriptor) 会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
 * 参考:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 * obj:要定义属性的对象
 * prop:要定义或修改的属性的名称或 Symbol
 * descriptor:要定义或修改的属性描述符
 * 
 * 
 * @param {treeNode} node 
 * @param {Object} data 
 * @returns 
 */
var markNodeData = function markNodeData(node, data) {
  if (!data || data[NODE_KEY]) return;

  // 给data添加属性NODE_KEY,值为节点的id
  Object.defineProperty(data, NODE_KEY, {
    /**
     * 对象data属性NODE_KEY对应的值
     */
    value: node.id,

    /**
     * 是否展示在可枚举对象中,默认false
     * true:可枚举,for..let...in可以获取到该键值;
     * false:否则不可获取到该键值
     */
    enumerable: false,

    /**
     * 是否可配置,默认为false
     * 当且仅当该属性为true时,该属性的描述符才能被改变,同时该属性也能被删除
     * configurable为false:不可删,执行delete $treeNodeId会报错
     * configurable为true:可删除,执行delete $treeNodeId不报错
     */
    configurable: true,

    /**
     * 是否允许改写,默认为false
     * 当且仅当该属性值为true时,该属性值即value对应的值才能被赋值运算符改变
     * writable为false:不可写入,执行赋值运算符(例如item.$treeNodeId = 33)会报错
     * writable为true:可以写入
     */
    writable: true
  });
};

/**
 * 获取节点的key
 * 
 * tree.vue:getNodeKey(this.nodeKey, node.data)
 * this.nodeKey:是树prop得的key(整体自定义的)
 * 如果nodeKey不存在,则返回该node.data定义的NODE_KEY
 * 如果nodeKey存在,则返回data[nodeKey]
 * 
 * @param {String} key 
 * @param {Object} data 
 * @returns 
 */
var utils_getNodeKey = function getNodeKey(key, data) {
  // console.log('获取nodeKey', key, data);

  // 不建议写法
  // if(!key) return data[NODE_KEY]
  // else return data[key];

  // 建议写法
  if (!key) return data[NODE_KEY];
  return data[key];
};
// CONCATENATED MODULE: ./packages/tree/src/model/node.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function node_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * node.js
 * 树节点的属性和方法
 * 
 */




/**
 * 根据子节点的选中状态判断父节点的选中状态
 * all - 表示子节点被选中checked
 * none - 表示子节点没有被选中cancel
 * half:!all && !none - 表示子节点的半选, all为false,则为true | all为true
 * 这种实现方式有点接收不了,于是就来模拟一下
 * 
 * 子节点 - [
 *  选中(checked:true,indeterminate:false),
 *  不选中(checked:false,indeterminate:false),
 *  半选中(checked:false,indeterminate:true),
 * ]
 * 默认all=true,none=true
 * 第一个子节点,选中,则none=false -> all:true,none:false,half:false 即如果只有这一个子节点则父节点选中
 * 第二个子节点,不选中,则all=false -> all:false,none:false,half:true 即如果只有这两个子节点的则父节点半选中
 * 第三个子节点,半选中,则all=false,none=false -> all:false,none:false,half:true 即如果只有这三个子节点则父节点半选中
 * 结果 -> 父节点半选中
 * ---------------------------------------------------
 * 评价:从父节点的选中状态出发,父节点的选中状态只有三种(选中|取消选中|半选中),实现相对简洁
 * 记录父节点根据前面子节点的选中状态的选中状态
 * 一个一个拆
 * 
 * 
 * 自己的写法是统计该节点的子节点的选中状态:
 * ---------------------------------------------------
 * status.checked 记录选中的个数
 * status.cancel 记录取消选中的个数
 * status.indeterminate 记录半选中的个数
 * 如果status.checked等于子节点的个数,则父节点选中
 * 如果status.cancel等于子节点的个数,则父节点取消选中
 * 否则,父节点半选中
 * 自评:我是从所有子节点的选中状态出发,这种实现方式相对繁琐
 * 
 *
 * 
 * @param {Array} node 
 */
var getChildState = function getChildState(node) {
    // console.log('getChildState', node);
    // 设置初值
    var all = true;
    var none = true;

    for (var i = 0, j = node.length; i < j; i++) {
        var n = node[i];
        // checked: false | indeterminate:true
        // 子节点没有选中
        if (n.checked !== true || n.indeterminate) {
            all = false;
        }
        // checked:true | indeterminate:true
        // 字节点选中
        if (n.checked !== false || n.indeterminate) {
            none = false;
        }
    }
    // console.log('getChildState', all, none, !all && !none);
    return {
        all: all,
        none: none,
        half: !all && !none
    };
};

/**
 * 向上走,设置父节点的选中状态
 * @param {Node} node 
 */
var reInitChecked = function reInitChecked(node) {
    // console.log('reInitChecked', node);
    // 如果该节点没有子节点, 也就不用设置父节点选中状态了
    if (node.childNodes.length === 0) return;

    // 获取父节点的选中状态

    var _getChildState = getChildState(node.childNodes),
        all = _getChildState.all,
        none = _getChildState.none,
        half = _getChildState.half;
    // console.log('res', all, none, half);

    // 设置节点的选中状态
    // 应为是三个不同的值,所以没有办法拆成两行去设置


    if (all) {
        node.checked = true;
        node.indeterminate = false;
    } else if (half) {
        node.checked = false;
        node.indeterminate = true;
    } else if (none) {
        node.checked = false;
        node.indeterminate = false;
    }

    var parent = node.parent;
    if (!parent || parent.level === 0) return;

    // 递归调用,往上走
    if (!node.store.checkStrictly) {
        reInitChecked(parent);
    }
};

/**
 * getPropertyFromData(this, 'children')
 * node.store为tree-store中的this
 * node.store.children: 函数 | 字符串 | undefined
 * 从node.data中获取prop对应的值
 * 
 * store.props 是树的配置项
 * 
 * @param {*} node 
 * @param {*} prop 
 */
var getPropertyFromData = function getPropertyFromData(node, prop) {
    var props = node.store.props;

    var data = node.data || {};

    var config = props && props[prop];
    // console.log('888', props, config, data[config]);

    if (typeof config === 'function') {
        return config(data, node);
    } else if (typeof config === 'string') {
        return data[config];
    } else if (typeof config === 'undefined') {
        var dataProp = data[prop];
        // console.log('children', dataProp)
        return dataProp === undefined ? '' : dataProp;
    }
};

// 树节点的id
var nodeIdSeed = 0;

var node_Node = function () {
    function Node(options) {
        node_classCallCheck(this, Node);

        this.id = nodeIdSeed++;

        // 节点data
        this.data = null;

        // 是否选中,默认false:取消选中(true:选中)
        this.checked = false;

        // 半选中,默认false
        this.indeterminate = false;

        // 父亲节点
        this.parent = null;

        // 是否展开
        this.expanded = false;

        // 是否是当前节点
        this.isCurrent = false;

        // 赋初值
        for (var option in options) {
            if (options.hasOwnProperty(option)) {
                this[option] = options[option];
            }
        }

        // internal
        // 该节点的层级,默认为0
        this.level = 0;
        // 该节点的子节点
        this.childNodes = [];

        // 计算层级 根节点层级为0
        if (this.parent) {
            this.level = this.parent.level + 1;
        }

        var store = this.store;
        if (!store) {
            throw new Error('[Node]store is required!');
        }

        // 构建子树
        this.setData(this.data);

        // 设置节点的展开属性
        // console.log('store', this.store.defaultExpandAll);
        if (store.defaultExpandAll) {
            this.expanded = true;
        }

        // 节点注册,为什么会在tree-store中呢?为什么要注册?
        // 因为需要节点的地图以找节点的时候方便些
        store.registerNode(this);

        // console.log('Node', this, options);
    }

    /**
     * 通过 node.label 调用(即执行get方法)
     */


    /**
     * 设置节点的isLeaf状态
     * 是否是叶子节点
     */
    Node.prototype.updateLeafState = function updateLeafState() {
        var childNodes = this.childNodes;
        this.isLeaf = !childNodes || childNodes.length === 0;
    };

    /**
     * A instanceof B:A是否是B的实例
     * 设置该节点的data和childNodes
     * 根节点下的data是一个数组,其子节点便是根据此生成的
     * @param {*} data 
     */


    Node.prototype.setData = function setData(data) {
        // console.log('setData', Array.isArray(data), data instanceof Array);

        // 如果data不是数组即非根节点,则需要给节点标记id
        if (!Array.isArray(data)) {
            markNodeData(this, data);
        }

        this.data = data;
        this.childNodes = [];

        var children = void 0;
        // 如果该节点的层级为0,且该data为数组类型
        // 根节点下的data是一个数组,其子节点便是根据此生成的
        if (this.level === 0 && this.data instanceof Array) {
            children = this.data;
        } else {
            // 非根节点,看其children字段是否还存在
            children = getPropertyFromData(this, 'children') || [];
        }

        // 子节点的生成
        for (var i = 0, j = children.length; i < j; i++) {
            this.insertChild({ data: children[i] });
        }

        // console.log('ndoe', this);

        this.updateLeafState();
    };

    /**
     * 插入子节点childNodes
     * @param {*} child 
     * @param {*} index 
     */


    Node.prototype.insertChild = function insertChild(child, index) {
        // console.log('insertChild', child, child instanceof Node);

        // 如果child不是Node的实例对象
        if (!(child instanceof Node)) {
            // 将后面的对象值添加到child
            merge(child, {
                parent: this,
                store: this.store
            });

            // 创建child节点
            child = new Node(child);
            // console.log('chi', child);
        }

        child.level = this.level + 1;
        // console.log('ch', child, index);

        /**
         * typeof index !== 'undefined'
         * index !== undefined
         * 
         * 将child插入到childNodes
         */
        if (typeof index === 'undefined' || index < 0) {
            // console.log(typeof index !== 'undefined')
            this.childNodes.push(child);
        } else {
            // console.log(index, index === undefined)
            this.childNodes.splice(index, 0, child);
        }
    };

    /**
     * 子树收缩
     * 设置展开属性
     * node.expanded = false
     */


    Node.prototype.collapse = function collapse() {
        this.expanded = false;
        // console.log('collapse', this, this.expanded);
    };

    /**
     * 展开子树
     * 设置节点的展开属性
     * node.expanded = true
     * 
     * 注意:树上的每个节点都具有展开和伸缩子树的方法,而不是将这两个方法共享
     * 保证了树节点的独立性质
     */


    Node.prototype.expand = function expand() {
        // console.log('展开子树', this);
        this.expanded = true;
    };

    /**
     * 设置节点的选中状态
     * (key/data, checked, deep) 
     * @param {*} value 
     * @param {*} deep 
     * @param {*} recursion 递归
     * @param {*} passValue 
     */


    Node.prototype.setChecked = function setChecked(value, deep, recursion, passValue) {
        var _this = this;

        // console.log('设置节点的选中状态', value, deep, recursion, passValue, this.data.id);

        // 1.设置节点自身的选中状态
        this.indeterminate = value === 'half';
        this.checked = value === true;

        // 如果是严格模式即父子节点的选中状态是互不关联的
        if (this.store.checkStrictly) return;

        var handleDescendants = function handleDescendants() {
            // console.log('deep', deep);
            if (deep) {
                var childNodes = _this.childNodes;
                for (var i = 0, j = childNodes.length; i < j; i++) {
                    var child = childNodes[i];
                    // 意思就是取passValue
                    // 如果passValue为true,则为true
                    // 如果passValue为false,则看value与false取异
                    // value为true,则为true;value为false,则为false
                    // passValue = passValue || value
                    passValue = passValue || value !== false;
                    var isCheck = passValue;
                    // console.log('child', child);
                    child.setChecked(isCheck, deep, true, passValue);
                }
            }
        };

        // 2.设置子孙节点的选中状态
        handleDescendants();

        // console.log('recursion', recursion);

        // 3.设置父节点的选中状态(recursion:false)
        var parent = this.parent;
        // 如果父节点不存在或为根节点,则说明已经找到根了
        if (!parent || parent.level === 0) return;

        // 如果recursion不存在或为false,则设置父节点的选中状态(根据子节点的选中状态)
        if (!recursion) {
            reInitChecked(parent);
        }
    };

    _createClass(Node, [{
        key: 'label',
        get: function get() {
            return getPropertyFromData(this, 'label');
        }

        /**
         * 获取key
         */

    }, {
        key: 'key',
        get: function get() {
            var nodeKey = this.store.key;
            if (this.data) return this.data[nodeKey];
            return null;
        }
    }]);

    return Node;
}();

/* harmony default export */ var model_node = (node_Node);
// CONCATENATED MODULE: ./packages/tree/src/model/tree-store.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function tree_store_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * tree-store.js
 * 树的属性和方法
 * 
 * ES6 class(类)
 * https://es6.ruanyifeng.com/#docs/class
 * constructor:构造方法
 * this关键字则代表实例对象
 * 构造函数的prototype属性，在ES6的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面
 * 在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为
 * 参考:https://blog.csdn.net/weixin_44691513/article/details/108416033
 * 
 */



var tree_store_TreeStore = function () {
    /**
     * 构造方法,类的默认执行方法
     * 且默认放回this(实例对象)
     * @param {*} options 
     */
    function TreeStore(options) {
        tree_store_classCallCheck(this, TreeStore);

        // 赋值初始化:options是对象,遍历使用for...in...
        for (var option in options) {
            if (options.hasOwnProperty(option)) {
                this[option] = options[option];
            }
        }

        this.nodesMap = {};

        /**
         * 实例化根节点Node
         * 根节点实例化
         * 由根节点开始生成树
         * 根节点->根节点的childNodes->...
         */
        this.root = new model_node({
            data: this.data,
            store: this
        });

        // console.log('treeStore', this, options);

        // 设置默认节点的选中
        this._initDefaultCheckedNodes();
    }

    /**
     * 注册node节点
     * 生成nodesMap数组(将树节点拍平存储以查找树节点)
     * @param {*} node 
     * @returns 
     */


    TreeStore.prototype.registerNode = function registerNode(node) {
        var key = this.key;

        // console.log('88noderegisterNode', node, this, key);

        // 如果不存在则返回
        if (!key || !node || !node.data) return;

        var nodeKey = node.key;
        if (nodeKey !== undefined) this.nodesMap[node.key] = node;

        // console.log('注册node节点', nodeKey !== undefined, this.nodesMap);
    };

    /**
     * 设置节点的默认选中状态
     */


    TreeStore.prototype._initDefaultCheckedNodes = function _initDefaultCheckedNodes() {
        var _this = this;

        // 笔者思路
        // 设置默认节点选中
        // this.defaultCheckedNodes要选中的节点的key所组成的数组
        // 遍历this.defaultCheckedKeys, 根据this.nodesMap获取节点,设置节点的选中
        // console.log('defaultCheckedKeys', this.defaultCheckedKeys, this.nodesMap);
        // this.defaultCheckedKeys.forEach((key) => {
        //     const node = this.nodesMap[key];
        //     if(node) {
        //         node.setChecked(true, true);
        //     }
        // })

        // 源码写法
        // 源码写法与自己不同的是:把用到的参数this.defaultCheckedKeys和this.nodesMap分别给赋值给了对应的变量
        var defaultCheckedKeys = this.defaultCheckedKeys;
        if (!defaultCheckedKeys || !defaultCheckedKeys.length) return;
        var nodesMap = this.nodesMap;

        defaultCheckedKeys.forEach(function (checkedKeys) {
            var node = nodesMap[checkedKeys];

            if (node) {
                node.setChecked(true, !_this.checkStrictly);
            }
        });
    };

    /**
     * 获取选中状态[全选中|半选中]的节点
     * node.checked:false
     * node.indeterminte:false
     * 
     * 入参:
     * Boolean:leafOnly:是否只是叶子节点,默认值为false
     * Boolean:includeHalfChecked:是否包含半选节点,默认值为false
     * 
     * 返回值:
     * Array:返回目前选中或半选中节点的数据所组成的数组
     * 
     * 应用场景:
     * 需要选中节点或者半选中节点所组成的数据
     */


    TreeStore.prototype.getCheckedNodes = function getCheckedNodes() {
        var leafOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var includeHalfChecked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var checkedNodes = [];
        // console.log('checkedNodes', checkedNodes, leafOnly, includeHalfChecked, this);

        // tranverse:翻转
        var tranverse = function tranverse(node) {
            // 如果传进来的是根节点,则取自根节点的childNodes(说明是第一次进来的), 否则取自节点的childNodes
            var childNodes = node.root ? node.root.childNodes : node.childNodes;

            // console.log('childNodes', childNodes);

            // forEach回过滤掉空数组的(如果是空数组,则不执行回调函数)
            childNodes.forEach(function (child) {

                // 筛选条件:
                // 如果child.leaf === leafOnly || child.indeterminate === includeHalfChecked

                // 节点本身
                if ((child.checked || includeHalfChecked && child.indeterminate) && (!leafOnly || leafOnly && child.isLeaf)) {
                    checkedNodes.push(child.data);
                }

                // 如果节点有子节点, 这里没有取判断是否有子节点
                // 有条件判断
                // if(child.childNodes.length) tranverse(child);

                tranverse(child);
            });
        };

        tranverse(this);

        return checkedNodes;
    };

    /**
     * 获取节点的key所组成的数组
     * 前提:节点可被选, 且设置了节点的key
     * 
     * 入参:
     * leafOnly:是否只是叶子节点,默认值为false
     * 
     * 返回值:
     * Boolean:
     */


    TreeStore.prototype.getCheckedKeys = function getCheckedKeys() {
        var _this2 = this;

        var leafOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        // 笔者写法 -- 繁杂,太直白
        // // console.log('获取选中状态下的节点的', this.getCheckedNodes(leafOnly));
        // const checkedKeys = [];
        // this.getCheckedNodes(leafOnly)
        //     .forEach(item => {
        //         // console.log('item', item, this.key, item[this.key]);
        //         if(this.key && item[this.key]) {
        //             checkedKeys.push(item[this.key]);
        //         }
        //     })
        // return checkedKeys;

        // 源码 -- 简洁
        // console.log({}[this.key]) // undefined
        // 如果this.key存在但data[this.key]不存在,则为undefined
        // 如果this.key不存在则this.key为undefined
        // 此时data[this.key]仍未undefined
        // console.log(88, {}[this.lushuixi]);
        // 所以如果this.key不存在或者data不存在则返回值未undefined
        return this.getCheckedNodes(leafOnly).map(function (data) {
            return (data || {})[_this2.key];
        });
    };

    /**
     * 根据key值或者data获取节点
     * 前提条件:设置了节点的key(node-key)
     * 如果没有设置key怎么办?每个节点设置了$treeNodeId
     * 如果node-key值没有设置,则key取自$treeNodeId
     * 但是如果node-key没有设置,则this.nodesMap是空对象
     * 则this.nodesMap[key]为undefined
     * 
     * 入参:
     * Node|Object|String|Number: data | key
     * 如果是Object类型怎么怎么做
     * 如果data是树节点Node类型,则直接将其返回
     * 如果是对象或字符串或数组,则从nodesMap中获取对应key的节点
     * 
     * 返回值:
     * Node节点
     * 如果data的key值不存在或树的node-key没有定义,则返回null
     */


    TreeStore.prototype.getNode = function getNode(data) {
        // 笔者写法-繁琐-命令式编程
        // 自己还在想如何根据对象还是字符串或数字类型的data获取node
        // 自己的想法:先遍历节点,再根据判断条件(如果是对象,怎么怎么办?如果式字符串或数字类型,怎么怎么办)
        // 判断条件结束后,再根据节点的childNodes去调用自身
        // 看了源码的写法,想想都好难受,自己的好复杂啊------------------

        // if(dataOrKey === undefined || dataOrKey === null) return;
        // 分对象类型和非对象类型
        // console.log('获取节点', dataOrKey, typeof dataOrKey, this);
        // const nodes = this.root && this.root.childNodes;
        // for(let i = 0, j = nodes.length; i < j; i++) {
        //     const node = nodes[i];
        //     const data = node.data;
        //     // 判断条件
        //     if(typeof dataOrKey !== 'object') {
        //         if(data[this.key] === dataOrKey) {
        //             console.log('找到了', node);
        //             return node;
        //         } else {
        //             this.getNode(node.childNodes);
        //         }
        //     } else {
        //         console.log('dataOrKey', dataOrKey, data);
        //     }
        // }

        // 源码-清晰明了-声明式编程
        // 无论data是对象类型或字符串|数字类型,都要根据key来获取节点
        // 首先要做的是根据data获取节点的key
        // 接着根据key获取节点 ---------------------------- 
        // 如何根据key获取节点?遍历节点吗?这时候,this.nodesMap便上场了
        // 源码中使用的是对象,将节点根据key生成一个节点地图
        if (data instanceof model_node) return data;
        var key = (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object' ? data : utils_getNodeKey(this.key, data);
        // console.log('key', key, this.nodesMap, this.nodesMap[key]);
        // 这里知道了nodesMap的用处(根据key获取节点)
        return this.nodesMap[key] || null;
    };

    /**
     * 获取半选中节点的数组
     * 
     * 入参:
     * 没有
     * 
     * 返回值:
     * 半选中节点所组成的数组(是节点的data而非节点所组成的数组) || []
     */


    TreeStore.prototype.getHalfCheckedNodes = function getHalfCheckedNodes() {
        // console.log('选中半选节点的数组');
        // 笔者写法
        // 遍历树节点,筛选条件为节点处于半选中状态,返回符合条件的节点所组成的数组
        // 看了源码后,发现自己的很多不足
        // 首先,变量命名不够清晰明了,因为返回值是半选中节点所组成的数组,将res改为nodes会更加直白
        // 其次,因为最外层调用getHalfCheckedNodes方法并没有传入参数,也就是无传参,但是自己调用自己时,传入了参数,会造成歧义
        // 好好学习,天天向上 ----------------------------------------

        // const res = [];
        // nodes = nodes || this.root.childNodes;
        // nodes.forEach(node => {
        //     if(node.indeterminate === true && node.checked === false) {
        //         res.push(node);
        //     }
        //     this.getHalfCheckedNodes(node.childNodes);
        // })
        // return res;

        // 源码
        // 变量命名直白清晰明了
        // 把具体的判断逻辑写在tranverse里面了 -------------------
        var nodes = [];

        var tranverse = function tranverse(node) {
            var childNodes = node.root ? node.root.childNodes : node.childNodes;
            childNodes.forEach(function (child) {
                if (child.indeterminate) {
                    nodes.push(child.data);
                }
                tranverse(child);
            });
        };

        tranverse(this);

        return nodes;
    };

    /**
     * 获取半选中节点的key所组成的数组
     * 
     * 入参:
     * 没有
     * 
     * 返回值:
     * 半选中节点的key所组成的数组(是节点的key) || []
     */


    TreeStore.prototype.getHalfCheckedKeys = function getHalfCheckedKeys() {
        var _this3 = this;

        // console.log('getHalfCheckedKeys', '获取节点的key所组成的数组');
        // 笔者写法
        // 获取节点的key
        // 先获取节点,筛选条件半选中,将符合条件的节点的key
        // 写到一半的时候,突然想到,可以借用它法
        // 因为getHalfCheckedNodes方法是获取半选中节点所组成的数组的,那么可以根据该方法的返回值筛选得到key所组成的数组
        // 恭喜自己又进了一步
        // const keys = [];
        // const traverse = function(node) {
        //     const childNodes = node.root ? node.root.childNodes : node.childNdoes;
        //     childNodes.forEach((child) => {
        //         if(child.indeterminate) {
        //             keys.push(child[this.key]);
        //         }
        //         tranverse(child);
        //     })
        // }
        // traverse(this);
        // return keys;

        // 笔者写法二
        return this.getHalfCheckedNodes().map(function (data) {
            return (data || {})[_this3.key];
        });
    };

    /**
     * 获取所有的节点
     */


    TreeStore.prototype._getAllNodes = function _getAllNodes() {
        // 自己写法
        // 看了源码自己的评价-----------
        // 变量定义不明确
        // nodes -> allNodes
        // key -> nodeKey
        // console.log('_getAllNodes', this.nodesMap);
        // let nodes = [];
        // let nodesMap = this.nodesMap;
        // for(let key in nodesMap) {
        //     if(nodesMap.hasOwnProperty(key)) {
        //         nodes.push(nodesMap[key]);
        //     }
        // }
        // console.log('哈喽', nodes);
        // Object.keys(nodesMap).forEach((key) => {
        //     if(nodesMap.hasOwnProperty(key))
        //         nodes.push(nodesMap[key]);
        // });
        // console.log('哈喽', nodes);

        // 源码写法
        var allNodes = [];
        var nodesMap = this.nodesMap;
        for (var nodeKey in nodesMap) {
            if (nodesMap.hasOwnProperty(nodeKey)) {
                allNodes.push(nodesMap[nodeKey]);
            }
        }
        return allNodes;
    };

    /**
     * 设置key在checkedKeys中的节点选中
     * 其余节点不选中
     * 
     * Object.create:创建一个新对象
     * 
     * @param {*} key 
     * @param {*} leafOnly 
     * @param {*} checkedKeys 
     */


    TreeStore.prototype._setCheckedKeys = function _setCheckedKeys(key) {
        var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var checkedKeys = arguments[2];

        // console.log('设置选中的节点', key, leafOnly, checkedKeys);
        // const allNodes = this._getAllNodes();
        // 非常重要:节点根据node.level从小到大排列,
        // 这样可以保证父节点在前,子节点在后
        var allNodes = this._getAllNodes().sort(function (a, b) {
            return b.level - a.level;
        });
        var cache = Object.create(null);
        var keys = Object.keys(checkedKeys);
        // console.log('hello lusuix', cache, keys);

        // 首先设置所有节点取消选中状态
        allNodes.forEach(function (node) {
            return node.setChecked(false, false);
        });

        for (var i = 0, j = allNodes.length; i < j; i++) {
            var node = allNodes[i];
            var nodeKey = node.data[key].toString();
            // 判断指定的key是否在数组keys中
            var checked = keys.indexOf(nodeKey) > -1;

            // console.log(node.data.id, node);

            // 如果不在,设置非选中
            if (!checked) {
                console.log('不在', node.data.id, checked, node, cache, cache[nodeKey]);
                if (node.checked && !cache[nodeKey]) {
                    node.setChecked(false, false);
                }
                continue;
            }

            // console.log('在', node.data.id, checked, node, cache, cache[nodeKey])

            // 如果在,则设置选中
            var parent = node.parent;
            while (parent && parent.level > 0) {
                // console.log('parent8888', parent)
                cache[parent.data[key]] = true;
                parent = parent.parent;
            }
            // console.log('在', cache);

            // 如果是叶子节点
            if (node.isLeaf || this.checkStrictly) {
                node.setChecked(true, false);
                continue;
            }
            // 如果是非叶子节点
            node.setChecked(true, true);

            // 如果leafOnly为true,也就是只是设置该节点下的子树中的叶子节点为选中状态
            if (leafOnly) {
                (function () {
                    // console.log('le', leafOnly)
                    // 先设置非选中
                    node.setChecked(false, false);
                    // 递归设置非叶子节点为取消选中
                    var tranverse = function tranverse(node) {
                        var childNodes = node.childNodes;
                        childNodes.forEach(function (child) {
                            if (!child.isLeaf) {
                                child.setChecked(false, false);
                            }
                            tranverse(child);
                        });
                    };
                    tranverse(node);
                })();
            }
        }
    };

    /**
     * 设置节点为选中状态
     * 使用此方法必须设置 node-key 属性
     * 
     * 入参:
     * nodes:勾选节点数据的数组
     * leafOnly:是否是叶子节点
     */


    TreeStore.prototype.setCheckedNodes = function setCheckedNodes(nodes) {
        var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        // 自己的思路
        // 想着可以调用setCheckedKeys来实现
        // console.log('设置节点为选中状态', nodes);
        // const keys = [];
        // nodes.forEach((node) => {
        //     const nodeKey = getNodeKey(this.key, node);
        //     keys.push(nodeKey);
        // });
        // this.setCheckedKeys(keys, leafOnly);

        // 源码写法
        var key = this.key;
        var checkedKeys = {};
        nodes.forEach(function (item) {
            checkedKeys[(item || {})[key]] = true;
        });

        this._setCheckedKeys(key, leafOnly, checkedKeys);
    };

    /**
     * 通过key设置目前勾选的节点
     * 前提条件:设置node-key
     * 
     * 入参:
     * data:要选中节点的key
     * leafOnly:是否仅设置叶子节点(如果leafOnly为true,则仅设置该节点的叶子节点为选中状态,且自己的状态为半选中状态或选中状态)
     * 
     */


    TreeStore.prototype.setCheckedKeys = function setCheckedKeys() {
        var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        // 笔者思路 
        // setCheckedKeys(keys = [], leafOnly = true)
        // 根据节点的key设置勾选
        // 筛选条件:根据key获取节点,节点的isLeaf与leafOnly比较
        // 将符合条件的节点设置选中状态(checked:true,indeterminate:false)
        // console.log('设置节点的key', data, leafOnly, this.nodesMap);
        // data.forEach((key) => {
        //     const node = this.nodesMap[key];
        //     console.log('key', key, this.nodesMap[key], node.isLeaf);
        //     // 如果leafOnly为false,则选中node节点
        //     // 否则,再对node进行筛选,看node.isLeaf是否为true,如果为true,则设置选中,否则不设置
        //     if(!leafOnly || (leafOnly && node.isLeaf)) {
        //         node.setChecked(true, true);
        //     }
        // })

        // 源码写法
        // 设置默认选中节点的key
        this.defaultCheckedKeys = keys;
        var key = this.key;
        var checkedKeys = {};
        keys.forEach(function (key) {
            checkedKeys[key] = true;
        });

        // console.log('checkedKeys', checkedKeys, leafOnly);
        this._setCheckedKeys(key, leafOnly, checkedKeys);
    };

    /**
     * 获取当前被选中节点的key
     * 使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null
     * 无需在这里实现
     */
    // getCurrentKey() {
    //     // 自己的思路
    //     // 要获取当前选中节点的key,那么首先要知道的是当前选中的节点
    //     // 如何获取当前选中的节点呢?
    //     console.log('获取当前被选中节点的key');
    // }

    /**
     * 获取当前选中的节点
     * 如何获取呢?
     * 节点在tree-node.vue
     */


    TreeStore.prototype.getCurrentNode = function getCurrentNode() {};

    /**
     * 设置当前节点
     */


    TreeStore.prototype.setCurrentNode = function setCurrentNode(currentNode) {
        console.log('currentNode', currentNode);
    };

    return TreeStore;
}();

/* harmony default export */ var tree_store = (tree_store_TreeStore);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/tree/src/tree-node.vue?vue&type=template&id=3ba3ef0e&
var tree_nodevue_type_template_id_3ba3ef0e_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "y-tree-node",
      attrs: { "aria-expanded": _vm.expanded },
      on: {
        click: function($event) {
          $event.stopPropagation()
          return _vm.handleClick($event)
        }
      }
    },
    [
      _c(
        "div",
        {
          staticClass: "y-tree-node__content",
          style: {
            "padding-left": (_vm.node.level - 1) * _vm.treeC.indent + "px"
          }
        },
        [
          _vm.showCheckbox
            ? _c("y-checkbox", {
                attrs: { indeterminate: _vm.node.indeterminate },
                on: { change: _vm.handleCheckChange },
                nativeOn: {
                  click: function($event) {
                    $event.stopPropagation()
                  }
                },
                model: {
                  value: _vm.node.checked,
                  callback: function($$v) {
                    _vm.$set(_vm.node, "checked", $$v)
                  },
                  expression: "node.checked"
                }
              })
            : _vm._e(),
          _c("node-content", { attrs: { node: _vm.node } })
        ],
        1
      ),
      _c("y-collapse-transition", [
        _vm.childNodeRendered
          ? _c(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.expanded,
                    expression: "expanded"
                  }
                ],
                staticClass: "y-tree-node__children",
                attrs: { "aria-expanded": _vm.expanded }
              },
              _vm._l(_vm.node.childNodes, function(child) {
                return _c("y-tree-node", {
                  key: _vm.getNodeKey(child),
                  attrs: { node: child, "show-checkbox": _vm.showCheckbox }
                })
              }),
              1
            )
          : _vm._e()
      ])
    ],
    1
  )
}
var tree_nodevue_type_template_id_3ba3ef0e_staticRenderFns = []
tree_nodevue_type_template_id_3ba3ef0e_render._withStripped = true


// CONCATENATED MODULE: ./packages/tree/src/tree-node.vue?vue&type=template&id=3ba3ef0e&

// CONCATENATED MODULE: ./src/transitions/collapse-transition.js
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

/* harmony default export */ var collapse_transition = ({
    name: 'YCollapseTransition',

    // 函数式组件标识,只有该值为true,render的第二个参数才有意义
    functional: true,

    render: function render(h, context) {
        // console.log('context', context);
        var children = context.children;

        return h('transition', // 标签名
        children // 子级虚拟节点
        );
    }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/tree/src/tree-node.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var tree_nodevue_type_script_lang_js_ = ({
    name: 'YTreeNode',
    componentName: 'YTreeNode',

    // 组件注册
    components: {
        YCollapseTransition: collapse_transition,

        /**
         * 官方文档
         * 组件是可复用的Vue的实例
         * 所以它们接收与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等，仅有的例外是像 el 这样根实例特有的选项。
         * 
         * 创建html
         * - 使用template
         * - 使用render函数(利用js的编程能力, createElement)
         * - JSX(其实安装支持JSX的babel,使render函数里可以写JSX以代替createElement)
         */
        NodeContent: {
            props: {
                node: {
                    required: true
                }
            },
            render: function render(h) {
                var parent = this.$parent;
                var treeC = parent.treeC;
                var node = this.node;
                var data = node.data,
                    store = node.store;
                // console.log('node', node, parent, treeC, data, store);
                // this: proxy:
                // [[Handler]]: Object
                // [[Target]]: VueComponent
                // [[IsRevoked]]: false

                // console.log('88', this, node, typeof node);
                // 增加自定义节点显示内容(插槽)

                return treeC.$scopedSlots.default ? treeC.$scopedSlots.default({ node: node, data: data }) : h(
                    'span',
                    { 'class': 'y-tree-node__label' },
                    [node.label]
                );
            }
        }
    },

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
            default: function _default() {
                return {};
            }
        },

        showCheckbox: {
            type: Boolean,
            default: false
        }
    },

    data: function data() {
        return {
            /**
             * 表示父组件是否是树根,如果是则表示父组件,如果不是则表示父组件的tree
             * tree :null,
             * 树上所有节点共享的属性和方法(通过treeC一级一级的传递下去)
             */
            treeC: null,

            // 该节点是否展开,作用是html需要
            expanded: false,

            /**
             * 子树是否渲染(是否展开子树)
             * 表示子树是否已经被渲染过了
             * 如果被渲染过了
             * - expanded为true则隐藏子树(display:none)
             * - expanded为false则显示子树(display:block)
             */
            childNodeRendered: false,

            // 节点原来的选中状态
            oldChecked: null,
            oldIndeterminate: null
        };
    },


    /**
     * 监听属性,
     * 不仅可以监听属性自己,还可监听对象
     * 监听对象(深度监听对象的属性|监听该对象指定属性)
     * 
     */
    watch: {
        /**
         * 监听node.expanded的更新
         * 如果原节点的expand是false
         * 点击节点行 -> hangleClick -> 调用node.expand -> node.expand为true -> 可以监听到该值的变化
         * 再次点击节点行 -> handleClick -> 
         */
        'node.expanded': function nodeExpanded(val) {
            var _this = this;

            // console.log('监听node.expanded', val);

            // 等视图更新后再去调用,否则可能会出现只监听到一次,便不打印值了
            this.$nextTick(function () {
                return _this.expanded = val;
            });
            if (val) {
                this.childNodeRendered = true;
            }
            // console.log('监听node.expanded', this);
        },


        /**
         * 监听节点选中状态之checked变化
         */
        'node.checked': function nodeChecked(val) {
            // console.log('监听节点选中状态', val);
            this.handleSelectChange(val, this.node.indeterminate);
        },


        /**
         * 监听节点半选中状态之indeterminate
         */
        'node.indeterminate': function nodeIndeterminate(val) {
            // console.log('监听节点半选中状态', val);
            this.handleSelectChange(this.node.checked, val);
        }
    },

    methods: {

        /**
         * 获取节点的key
         */
        getNodeKey: function getNodeKey(node) {
            // console.log('treeC', this.treeC)
            return utils_getNodeKey(this.treeC.nodeKey, node.data);
        },


        /**
         * 点击展开|收缩
         */
        handleClick: function handleClick() {
            // console.log('点击了', this.expanded);
            // this.handleExpandIconClick();

            if (this.expanded) {
                // 如果已经展开了,则收缩
                this.node.collapse();
            } else {
                // 如果没有展开,则展开
                this.node.expand();
            }

            // console.log('ending');
        },


        /**
         * 更改节点的选中状态
         * 当节点的选中状态发生变化后的回调
         */
        handleCheckChange: function handleCheckChange(value, ev) {
            // console.log('handleCheckChange', value, ev);
            // 设置节点自身的选中状态
            // setChecked (key/data, checked, deep) 
            // 通过 key / data 设置某个节点的勾选状态, 使用此方法必须设置 node-key 属性
            // 如果是严格模式下, 即父子节点的选中状态互不关联, 默认为false
            this.node.setChecked(ev.target.checked, !this.treeC.checkStrictly);
        },


        /**
         * 当节点的复选框选中状态变化后的回调
         * 该节点的选中状态
         * check-change:节点的复选框选中状态变化后的回调
         *  - data:该节点的数据
         *  - checked:该节点是否选中
         *  - indeterminate:节点的子树是否被选中(说明:该节点本身是否是半选中状态)
         */
        handleSelectChange: function handleSelectChange(checked, indeterminate) {
            // console.log('当复选框节点选中后', checked, indeterminate);
            // console.log('原来的选中状态', this.oldChecked, this.oldIndeterminate);
            // 判断新值与旧值是否相同
            // 与写法
            if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
                // 如果选中状态发生变化,则调用祖先组件树的check-change方法
                this.treeC.$emit('check-change', this.node.data, // 节点本身的数据
                checked, // 节点的选中状态
                indeterminate // 节点的半选中状态
                );
            }
            // 给旧状态赋新值
            this.oldChecked = checked;
            // 为什么要再次设置半选中状态呢?
            // 为什么不更新旧的半选中状态呢?
            this.indeterminate = indeterminate;

            // 或写法
            // if(this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
            //     this.treeC.$emit('check-change', this.node.data, checked, indeterminate);
            // }
            // this.oldChecked = checked; this.oldIndeterminate = indeterminate;
        }
    },

    created: function created() {
        /**
         * 为什么这里只要将
         * const parent = parent.isTree ? parent : parent.tree
         * this.tree = parent.isTree ? parent : parent.tree
         * 报错:说是循环引用了
         * Error in render: "TypeError: Converting circular structure to JSON
         * 
         * this.$parent是tree.vue组件的虚拟节点,是因为命名不可同吗?
         * this.tree 与 tree.vue 都是 tree
         */
        // const parent = this.$parent;
        // console.log(this, parent);

        var parent = this.$parent;
        this.treeC = parent.isTree ? parent : parent.treeC;
        // console.log(this, parent, this.treeC);
        // console.log('tree-node', this.node, this.node.childNodes);

        var treeC = this.treeC;
        if (!treeC) {
            console.warn('Can not find node\'s tree.');
        }
        // console.log('created', tree, tree.indent, this.node.level, tree.indent * (this.node.level-1))

        var props = treeC.props || {};
        var childrenKey = props['children'] || 'children';
        // console.log('props', props, childrenKey);

        /**
         * created:this.$data是空对象,则在created中赋值的变量在虚拟节点的根部
         * 但是如果赋值的变量也在data中,则也回保存到data中
         * 组件下的data是响应式的数据(更新视图)
         * 因为expanded和childNodeRendered需要是响应式的,所以需要在data中定义
         * 否则非响应式的数据便不需要保存到data中
         */
        if (this.node.expanded) {
            this.expanded = true;
            this.childNodeRendered = true;
        }

        // console.log('88', this.node.expanded);
    },
    mounted: function mounted() {
        // console.log('node', this.node, this.showCheckbox, this.treeC.showCheckbox)
    }
});
// CONCATENATED MODULE: ./packages/tree/src/tree-node.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_tree_nodevue_type_script_lang_js_ = (tree_nodevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/tree/src/tree-node.vue





/* normalize component */

var tree_node_component = normalizeComponent(
  src_tree_nodevue_type_script_lang_js_,
  tree_nodevue_type_template_id_3ba3ef0e_render,
  tree_nodevue_type_template_id_3ba3ef0e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var tree_node_api; }
tree_node_component.options.__file = "packages/tree/src/tree-node.vue"
/* harmony default export */ var tree_node = (tree_node_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/tree/src/tree.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var treevue_type_script_lang_js_ = ({
    name: 'YTree',

    components: {
        YTreeNode: tree_node
    },

    props: {
        /**
         * 树要展示的数据
         */
        data: {
            type: Array
        },

        /**
         * 指定节点的key
         */
        nodeKey: String,

        /**
         * 节点是否可被选择
         * 树节点共享该值 show-checkbox
         */
        showCheckbox: {
            type: Boolean,
            default: false
        },

        /**
         * 是否默认展开所有节点
         * 默认值false
         * 树节点共享值 default-expand-all
         * 存到store
         */
        defaultExpandAll: {
            type: Boolean,
            default: false
        },

        /**
         * 配置项
         */
        props: {
            type: Object,
            default: function _default() {
                return {
                    children: 'children', // 指定子树为节点某个对象的值即"children"对应值表示子节点的数据
                    label: 'label' // 指定节点标签为节点对象的某个属性的值
                };
            }
        },

        /**
         * 相邻级节点间的水平缩进
         */
        indent: {
            type: Number,
            default: 18
        },

        // 是否严格选中(不涉及父子节点的选中状态)
        checkStrictly: Boolean,

        // 是否更改子孙节点的选中状态
        checkDescendants: {
            type: Boolean,
            default: false
        },

        // 默认选中节点的key组成的数组
        defaultCheckedKeys: Array

    },

    data: function data() {
        return {
            store: null,
            root: null
        };
    },


    watch: {
        data: function data(newVal) {
            console.log('监听data发生变化', newVal);
        }
    },

    methods: {
        /**
         * 外部在调用tree组件时,需要通过refs来访问该组件的方法
         * 例如:this.$refs.treeRef.getCheckedNodes()
         * 但是呢?
         */

        // 获取节点的key
        getNodeKey: function getNodeKey(node) {
            return utils_getNodeKey(this.nodeKey, node.data);
        },


        /**
         * 获取选中节点
         * leafOnly:是否只是叶子节点,默认值为false
         * includeHalfChecked:是否包含半选节点,默认值为false
         */
        getCheckedNodes: function getCheckedNodes(leafOnly, includeHalfChecked) {
            return this.store.getCheckedNodes(leafOnly, includeHalfChecked);
        },


        /**
         * 获取选中状态下节点的key所组成的数据
         * leafOnly:是否只是叶子节点,默认值为false
         */
        getCheckedKeys: function getCheckedKeys(leafOnly) {
            return this.store.getCheckedKeys(leafOnly);
        },


        /**
         * 根据key或者data获取节点
         */
        getNode: function getNode(data) {
            return this.store.getNode(data);
        },


        /**
         * 获取半选中节点
         * 没有入参
         * 返回半选中节点
         */
        getHalfCheckedNodes: function getHalfCheckedNodes() {
            return this.store.getHalfCheckedNodes();
        },


        /**
         * 获取半选中节点的key
         * 没有入参
         * 返回半选中节点的key所组成的数组
         */
        getHalfCheckedKeys: function getHalfCheckedKeys() {
            return this.store.getHalfCheckedKeys();
        },


        /**
         * 设置节点为选中状态
         * 入参:
         * nodes:要设置为选中状态的节点的数据所组成的数组
         * leafOnly:是否仅设置叶子节点
         */
        setCheckedNodes: function setCheckedNodes(nodes, leafOnly) {
            return this.store.setCheckedNodes(nodes, leafOnly);
        },


        /**
         * 根据节点的keys设置勾选的节点
         * 入参:
         * 节点key组成的数组,默认值为[]
         * 是否只设置叶子节点的选中状态,默认值为false
         * 
         * const setCheckedKeys = this.$refs.yTreeRef.setCheckedKeys([22, 19], true);
         * console.log('setCheckedKeys', setCheckedKeys)
         */
        setCheckedKeys: function setCheckedKeys(keys, leafOnly) {
            // console.log('leee', keys, leafOnly)
            return this.store.setCheckedKeys(keys, leafOnly);
        },


        /**
         * 获取当前选中的节点
         */
        getCurrentNode: function getCurrentNode() {
            var currentNode = this.store.getCurrentNode();
            return currentNode ? currentNode.data : null;
        },


        /**
         * 获取当前被选中节点的key
         */
        getCurrentKey: function getCurrentKey() {
            // 自己的思路:写到store里
            // return this.store.getCurrentKey();
            // 抛出错误
            if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getCurrentKey');
            var currentNode = this.getCurrentNode();
            return currentNode ? currentNode[this.nodeKey] : null;
        }
    },

    created: function created() {
        // 给子树判断父组件是否为树
        this.isTree = true;

        // 创建树的store
        this.store = new tree_store({
            key: this.nodeKey,
            data: this.data,
            props: this.props,
            // showCheckbox: this.showCheckbox,
            checkStrictly: this.checkStrictly,
            checkDescendants: this.checkDescendants,
            defaultExpandAll: this.defaultExpandAll,
            defaultCheckedKeys: this.defaultCheckedKeys
        });

        // 树的根节点
        this.root = this.store.root;
    },
    mounted: function mounted() {
        // console.log('tree', this.root, this.showCheckbox);
        // this.getCheckedNodes();
        // console.log('tree', this, this.$slots);
        // console.log('defaultCheckedKeys', this.defaultCheckedKeys)
    }
});
// CONCATENATED MODULE: ./packages/tree/src/tree.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_treevue_type_script_lang_js_ = (treevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/tree/src/tree.vue





/* normalize component */

var tree_component = normalizeComponent(
  src_treevue_type_script_lang_js_,
  treevue_type_template_id_547575a6_render,
  treevue_type_template_id_547575a6_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var tree_api; }
tree_component.options.__file = "packages/tree/src/tree.vue"
/* harmony default export */ var tree = (tree_component.exports);
// CONCATENATED MODULE: ./packages/tree/index.js


tree.install = function (Vue) {
    Vue.component(tree.name, tree);
};

/* harmony default export */ var packages_tree = (tree);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/message/src/main.vue?vue&type=template&id=455b9f60&
var mainvue_type_template_id_455b9f60_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition",
    {
      attrs: { name: "y-message-fade" },
      on: { "after-leave": _vm.handleAfterLeave }
    },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.visible,
              expression: "visible"
            }
          ],
          class: ["y-message", _vm.type && "y-message--" + _vm.type],
          style: _vm.positionStyle,
          attrs: { role: "alert" }
        },
        [
          _vm._t("default", [
            !_vm.dangerouslyUseHTMLString
              ? _c("p", { staticClass: "y-message__content" }, [
                  _vm._v(_vm._s(_vm.message))
                ])
              : _c(
                  "p",
                  {
                    staticClass: "y-message__content",
                    domProps: { innerHTML: _vm._s(_vm.message) }
                  },
                  [_vm._v(_vm._s(_vm.message))]
                )
          ])
        ],
        2
      )
    ]
  )
}
var mainvue_type_template_id_455b9f60_staticRenderFns = []
mainvue_type_template_id_455b9f60_render._withStripped = true


// CONCATENATED MODULE: ./packages/message/src/main.vue?vue&type=template&id=455b9f60&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/message/src/main.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// 为什么要加上 type="text/babel" ?
// 这样写会带来什么?
// message类型
var typeMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error'
};
/* harmony default export */ var mainvue_type_script_lang_js_ = ({
    data: function data() {
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
            type: 'info'

        };
    },


    // 计算属性
    computed: {
        // 定义相对定位的属性
        positionStyle: function positionStyle() {
            return {
                'top': this.verticalOffset + 'px'
            };
        }
    },

    // 侦听属性
    watch: {
        // 侦听closed状态变化
        closed: function closed(newVal) {
            // 如果为true,则将该message设置为不可见
            if (newVal) {
                this.visible = false;
            }
        }
    },

    methods: {

        // 该message离开时()
        handleAfterLeave: function handleAfterLeave() {
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
        close: function close() {
            // 置message关闭标志为true
            this.closed = true;

            // 如果onClose是函数则执行
            // 在执行之前判断是否是函数
            if (typeof this.onClose === 'function') {
                this.onClose(this);
            }
        },


        // 设置定时器
        // 在一定时间后销毁该message
        startTimter: function startTimter() {
            var _this = this;

            // 如果duration为0则永不关闭
            if (this.duration > 0) {
                this.timer = setTimeout(function () {
                    // 判断是否在关闭
                    if (!_this.closed) {
                        _this.close();
                    }
                }, this.duration);
            }
        }
    },

    // 使用created还是mounted?
    // 目的是在duration时间后销毁该message
    // 从目的出发,为实现该目的,是从渲染成真实dom节点后开始计时的,所以用了mounted
    mounted: function mounted() {
        // 开启定时器
        this.startTimter();
    },
    beforeDestroy: function beforeDestroy() {
        console.log('beforeDestor', this);
    }
});
// CONCATENATED MODULE: ./packages/message/src/main.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_mainvue_type_script_lang_js_ = (mainvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/message/src/main.vue





/* normalize component */

var main_component = normalizeComponent(
  src_mainvue_type_script_lang_js_,
  mainvue_type_template_id_455b9f60_render,
  mainvue_type_template_id_455b9f60_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var main_api; }
main_component.options.__file = "packages/message/src/main.vue"
/* harmony default export */ var main = (main_component.exports);
// CONCATENATED MODULE: ./packages/message/src/main.js



/**
 * 1. Vue.extend(options) 全局API
 * options:Object
 * 这个方法返回实例自身，因而可以链式调用其它实例方法
 * 使用基础 Vue 构造器,创建一个“子类”
 * 参数是一个包含组件选项的对象
 * 
 * 使用步骤:
 *  - 创建构造器:let MessageConstructor = Vue.extend(Main);
 *  - 创建MessageConstructor的实例:let instance = new MessageConstructor();
 *  - 如果想要挂载到真实dom上,使用vm.$mount
 * 
 * 2. vm.$mount([elementOrSelector])
 * elementOrSelector可选参数
 * 
 * 如果 Vue 实例在实例化时没有收到 el 选项，
 * 则它处于“未挂载”状态,
 * 没有关联的 DOM 元素
 * 可以使用 vm.$mount() 手动地挂载一个未挂载的实例
 * 
 * 如果没有提供 elementOrSelector 参数,
 * 模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中
 * 
 * var MyComponent = Vue.extend({ // 创建构造器
 *     template: '<div>Hello!</div>'
 * })
 * new MyComponent().$mount('#app') // 创建并挂载到 #app (会替换 #app)
 * 
 * 或者在文档之外渲染并且随后挂载
 * var component = new MyComponent().$mount() // 生成一个el选项->虚拟dom节点
 * document.getElementById('app').appendChild(component.$el) -> 真实dom节点
 */
var MessageConstructor = vue_runtime_esm["a" /* default */].extend(main);

var main_instance = void 0;
var instances = [];
var seed = 1;
var initZIndex = 2000;

/**
 * 定义Message
 * @param {String|Object} options 
 * @returns 
 */

var main_Message = function Message(options) {
    // debugger;
    // console.log('Message', options, this);

    // 收到参数,如何将其写入到main.vue中生成一个组件呢?
    // 这个问题会在后面提到

    // 如果当前Vue实例运行于服务器,则返回
    if (vue_runtime_esm["a" /* default */].prototype.$isServer) return;

    // 如果options不存在则为空对象
    // 目的:给options设置默认值(空对象{})
    options = options || {};

    // 如果options是字符串
    // 把该值作为message的值
    // 也就是说,如果传入进来的options是一个字符串则为message内容
    if (typeof options === 'string') {
        options = {
            message: options
        };
    }

    // 这里使用id是为了可能有多个message被调用来保证唯一性
    // 为什么在外面这些message会共用一个seed呢?
    // 根据js作用域链原理，这些message共在一个词法环境
    // 这样的话, export default Message 相当于立即执行该函数Message(每次message调用都是立即执行message函数)
    // 类似下面的代码
    // function testSeed() { // 同在一个词法作用域
    //     let seed = 0;
    //     function fun1() { // 相当于Message
    //       console.log(seed++);
    //     }
    //     fun1(); // 相当于message
    //     fun1();
    //     fun1();
    //     fun1();
    // }
    // testSeed();
    var id = 'message_' + seed++;

    // 用户自定义的关闭message的回调函数
    var userOnClose = options.onClose;

    // 定义message关闭的回调函数
    options.onClose = function () {
        // 调用自身
        // 为什么在Message内部还可以使用Message外部定义的方法呢?
        // js执行上下文?
        Message.close(id, userOnClose);
    };

    // 创建MessageConstructor(vue构造器)的实例
    main_instance = new MessageConstructor({
        data: options
    });
    // 为什么要定义id呢?
    main_instance.id = id;

    // 生成el选项->虚拟dom节点,在文档之外渲染并且随后挂载
    main_instance.$mount();

    // 挂载到真实的dom节点
    document.body.appendChild(main_instance.$el);

    // 定义距离顶部的高度值以形成垂直排列的布局
    // offsetHeight=实际内容的高度+padding+border
    // clientHeight=实际内容的高度+padding(不包括水平滚动条)
    var verticalOffset = options.offset || 20;
    instances.forEach(function (item) {
        console.log('item', item.$el.offsetHeight);
        verticalOffset += item.$el.offsetHeight + 16;
    });
    main_instance.verticalOffset = verticalOffset;

    console.log('id', id, main_instance, verticalOffset);

    // 设置该message可见
    // 为什么可以在这里更改该message的状态呢?
    // 因为此时instance相当于是一个vue组件(一个虚拟dom节点),所以可以更改
    main_instance.visible = true;

    // 因为message使用了fixed定位,所以还需要设置message的zIndex
    // 依次递增以不至于被盖到下面
    // 个人使用方法
    main_instance.$el.style.zIndex = initZIndex++;

    // 将实例保存起来
    // 目的:设置这些message的高度偏移量以垂直排列展示,不至于叠加显示
    instances.push(main_instance);

    // 返回该实例(一个vue组件,一个虚拟dom节点)
    return main_instance;
};

// 如果我们想通过Message.success的形式访问呢?
// 定义Message的类型
['success', 'warning', 'info', 'error'].forEach(function (type) {
    main_Message[type] = function (options) {
        // 为什么要重复判断options的类型呢?(Message内部也判断了)
        // 因为要设置该message的type
        // 如果是字符串,直接设置type会报错
        if (typeof options === 'string') {
            options = {
                message: options
            };
        }

        // 定义该message的类型
        options.type = type;

        return main_Message(options);
    };
});

/**
 * 关闭message
 * @param {String} id
 * @param {Function} userOnClose (可选)
 * @returns 
 */
main_Message.close = function (id, userOnClose) {
    var len = instances.length;
    var index = -1;
    var removedHeight = void 0;

    for (var i = 0; i < len; i++) {

        console.log(i, id);

        // 如果找到对应的message, 则执行关闭后的回调
        if (id === instances[i].id) {
            // 保存销毁的message的offsetHeight
            removedHeight = instances[i].$el.offsetHeight;

            // index保存当前销毁的message
            index = i;

            // 在执行函数之前先判断是否是函数
            if (typeof userOnClose === 'function') {
                // 关闭message的回调
                userOnClose(instances[i]);
            }

            // 删除该message
            instances.splice(i, 1);

            // 退出for循环
            break;
        }
    }

    // console.log('888', len, instances,);
    // 如果len小于等于1即message队列只有一个message -> 因为只有一个,所以销毁后,不用再去更新后面的top
    // 如果index为-1,也就是message队列中没有该message -> 无需处理后面的
    // 如果index>instances.length - 1,即销毁的message是最后一个 -> 无需处理后面的
    if (len <= 1 || index === -1 || index > instances.length - 1) {
        return;
    }

    // 如果有多个message
    // 第一个message销毁后,后面的message的top值仍是原来的
    // 所以需要修改后面的top为上一个message的top
    for (var _i = index; _i < len - 1; _i++) {
        var dom = instances[_i].$el;
        // 更新该message的top
        dom.style['top'] = parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px';
    }
};

// 关闭所有的messsage
main_Message.closeAll = function () {
    // 倒着关闭message(依次关闭倒数第一个,这样无需去设置后面的top)
    for (var i = instances.length - 1; i >= 0; i--) {
        instances[i].close();
    }
};

/* harmony default export */ var src_main = (main_Message);
// CONCATENATED MODULE: ./packages/message/index.js
/**
 * 第一批写法
 * 这样的话,便是把YMessage当作一个组件来引入注册导出
 * 但是前台在使用的时候是YMessage(options)的形式即函数形式
 * 便会报错:YMessage不是一个函数
 */

// import YMessage from './src/main'; // 引入的是vue文件

// /* istanbul ignore next */
// // 在Vue.use(Message) 时调用组件上的intall
// YMessage.install = function(Vue) {
//     Vue.component(YMessage.name,YMessage);
// };

// export default YMessage;

/**
 * 第二批写法
 * 引入一个js文件，并导出
 * 这样的话，便可以把YMessage当作一个函数而非组件了
 * 
 * 相当于我们之前写的暴漏出来一个函数
 * 通过YMessage(options)使用
 */


/* harmony default export */ var message = (src_main);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/loading/src/loading.vue?vue&type=template&id=eee0a7ac&
var loadingvue_type_template_id_eee0a7ac_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition",
    {
      attrs: { name: "y-loading-fade" },
      on: { "after-leave": _vm.handleAfterLeave }
    },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.visible,
              expression: "visible"
            }
          ],
          staticClass: "y-loading-mask lushuixi",
          class: [
            _vm.customClass,
            {
              "is-fullscreen": _vm.fullscreen
            }
          ],
          style: { backgroundColor: _vm.background || "" }
        },
        [
          _c("div", { staticClass: "y-loading-spinner" }, [
            !_vm.spinner
              ? _c(
                  "svg",
                  {
                    staticClass: "circular",
                    attrs: { viewBox: "25 25 50 50" }
                  },
                  [
                    _c("circle", {
                      staticClass: "path",
                      attrs: { cx: "50", cy: "50", r: "20", fill: "none" }
                    })
                  ]
                )
              : _vm._e(),
            _vm.text
              ? _c("p", { staticClass: "y-loading-text" }, [
                  _vm._v(_vm._s(_vm.text))
                ])
              : _vm._e()
          ])
        ]
      )
    ]
  )
}
var loadingvue_type_template_id_eee0a7ac_staticRenderFns = []
loadingvue_type_template_id_eee0a7ac_render._withStripped = true


// CONCATENATED MODULE: ./packages/loading/src/loading.vue?vue&type=template&id=eee0a7ac&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/loading/src/loading.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var loadingvue_type_script_lang_js_ = ({
    data: function data() {
        return {
            visible: false,
            text: null,
            customClass: '', // 自定义的class
            spinner: null, // 自定义加载图标的类名
            background: null, // 遮罩背景色
            fullscreen: true // 是否是全局加载,默认是
        };
    },

    watch: {
        visible: {
            immediate: true,
            handler: function handler(newValue) {
                console.log('加载中...', newValue);
            }
        }
    },
    methods: {
        handleAfterLeave: function handleAfterLeave() {
            console.log('我爱你，你爱我，蜜雪冰城甜蜜蜜');
            this.$emit('after-leave');
        },
        setText: function setText(text) {
            this.text = text;
        }
    },
    mounted: function mounted() {
        // console.log('ths', this.close());
    }
});
// CONCATENATED MODULE: ./packages/loading/src/loading.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_loadingvue_type_script_lang_js_ = (loadingvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/loading/src/loading.vue





/* normalize component */

var loading_component = normalizeComponent(
  src_loadingvue_type_script_lang_js_,
  loadingvue_type_template_id_eee0a7ac_render,
  loadingvue_type_template_id_eee0a7ac_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var loading_api; }
loading_component.options.__file = "packages/loading/src/loading.vue"
/* harmony default export */ var loading = (loading_component.exports);
// CONCATENATED MODULE: ./src/utils/dom.js
/**
 * dom操作
 * 
 */



var dom_isServer = vue_runtime_esm["a" /* default */].prototype.$isServer;

// document.documentMode 属性返回浏览器渲染文档的模式
var isVersion = dom_isServer ? 0 : Number(document.documentMode);

var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;

var MOZ_HACK_REGEXP = /^moz([A-Z])/;

/**
 * 去除头和尾的空格
 * \s 匹配任何空格字符
 * \uFEFF 空格，字节次序标记字符（Byte Order Mark），也就是BOM,它是es5新增的空白符
 * @param {String} string 
 * @returns 
 */
var trim = function trim(string) {
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
var camelCase = function camelCase(name) {
    if (!name) return;

    // 涉及到正则: .replace(MOZ_HACK_REGEXP, 'Moz$1') 表示第一个圆括号里的内容
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        // console.log('888', _, separator, letter, offset);
        return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

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
function hasClass(el, cls) {
    // 参数不为空的校验
    if (!el || !cls) return false;

    // 类名cls是否包含空格符
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');

    // 判断节点el是否存在cls的类名
    // 如何判断
    // 两种方式: el.className.split(' ') | el.classList
    console.log('hasClass', el, cls, el.className, el.classList);

    // classList属性的值为DOMTokenList对象，关于DOMTokenList官方解释是一组空格分隔的标记，与Array一样具有length属性，且索引从0开始，但无法使用Array对象的方法。
    // 不过DOMTokenList对象内置了add，remove，contains等方法，用于增删改查等操作；所以我们可以使用add，remove像JQ中addClass与removeClass方法一样操作class类
    if (el.classList) {
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
function addClass(el, cls) {
    if (!el) return;
    var curClass = el.className;
    var classes = (cls || '').split(' ');

    for (var i = 0, j = classes.length; i < j; i++) {
        var className = classes[i];
        if (!className) return;

        if (el.classList) {
            el.classList.add(className);
        } else if (!hasClass(el, className)) {
            curClass += ' ' + className;
        }
    }

    if (!el.classList) {
        el.className = curClass;
    }
}

/**
 * 移出指定节点的指定class(可添加多个)
 * @param {Node} el 元素节点
 * @param {String} cls class名(单个或多个,多个以空格为分隔符)
 */
function removeClass(el, cls) {
    // 参数不为空的校验
    if (!el || !cls) return;

    var classes = cls.split(' ');
    var curClass = ' ' + el.className + ' ';

    // console.log('removeClass', el, cls, classes, curClass);

    // 判断节点el是否存在cls的类名
    // 如果存在,则移除
    // 如果不存在,则返回

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];

        if (!clsName) continue;

        if (el.classList) {
            // 如果浏览器兼容classList
            el.classList.remove(clsName);
        } else if (hasClass(el, clsName)) {
            // 如果浏览器不兼容classList
            // 去除指令的类名
            curClass = curClass.replace(' ' + clsName + ' ', '');
        }
    }

    if (!el.classList) {
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
function getStyle(el, styleName) {
    if (dom_isServer) return;
    if (!el || !styleName) return null;

    // 样式名处理
    styleName = camelCase(styleName);

    if (styleName === 'float') {
        // 处理兼容性
        styleName = isVersion < 9 ? 'styleFloat' : 'cssFloat';
    }

    try {
        if (isVersion < 9) {
            // ie6~8下
            switch (styleName) {
                case 'opacity':
                    try {
                        return el.filters.item('alpha').opacity / 100;
                    } catch (e) {
                        return 1.0;
                    }
                default:
                    return el.style[styleName] || el.currentStyle ? el.currentStyle[styleName] : null;
            }
        } else {
            // FF/chrome 以及ie9以上
            // document.defaultView属性返回当前 document 对象所关联的 window 对象，如果没有，会返回 null。IE9以下不支持
            // getComputedStyle() 方法用于获取指定元素的 CSS 样式
            var computed = document.defaultView.getComputedStyle(el, '');

            // console.log('computed', document.defaultView);
            return el.style[styleName] || computed ? computed[styleName] : null;
        }
    } catch (e) {
        // console.log('第一级捕获异常', e);
        return el.style[styleName];
    }
}
// CONCATENATED MODULE: ./packages/loading/src/directive.js
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





// 创建Vue构造器
var Mask = vue_runtime_esm["a" /* default */].extend(loading);

var DefaultZIndex = 2000;

var loadingDirective = {};

loadingDirective.install = function (Vue) {
    console.log('注册loadingDirective');

    /**
     * 打开或关闭loading
     * 
     * (binding.modifiers 一个包含修饰符的对象
     * v-directive.body.fullscreen => binding.modifiers = {body: true, fullscreen: true}
     * 
     * @param {*} el
     * @param {*} binding
     */
    var toggleLoading = function toggleLoading(el, binding) {
        if (binding.value) {
            console.log('打开loading', binding);
            Vue.nextTick(function () {
                if (binding.modifiers.fullscreen) {
                    console.log('有fullscreen修饰符,全局loading');
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

                    if (binding.modifiers.body) {
                        console.log('有body修饰符,全局loading');
                    } else {
                        console.log('无body修饰符,局部loading');

                        // 局部loaing, 渲染真实dom
                        insertDom(el, el, binding);
                    }
                }
            });
        } else {
            console.log('关闭loading');
        }
    };

    /**
     * 
     * @param {*} parent
     * @param {*} el
     * @param {*} binding
     */
    var insertDom = function insertDom(parent, el, binding) {
        console.log('insertDom', parent, el, binding, el.domVisible);
        // getStyle(el, 'moz---ABC:::.style::.');
        console.log('getStyle', getStyle(el, 'display'));

        if (!el.domVisible && getStyle(el, 'display') !== 'none' && getStyle(el, 'visible') !== 'hidden') {
            // 如果loading组件显示中(display:none;visible:hidden)
            Object.keys(el.maskStyle).forEach(function (property) {
                el.mask.style[property] = el.maskStyle[property];
            });

            // 添加样式
            if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
                addClass(parent, 'y--loading-parent--relative');
            }
            if (binding.modifiers.fullscreen && binding.modifiers.lock) {
                addClass(parent, 'y-loading-parent--hidden');
            }

            el.domVisible = true;

            parent.appendChild(el.mask);
            Vue.nextTick(function () {
                if (el.instance.hiding) {
                    el.instance.$emit('after-leave');
                } else {
                    el.instance.visible = true;
                }
            });
            el.domInserted = true;
        } else if (el.domVisible && el.instance.hiding === true) {
            // console.log('我爱你，你爱我，蜜雪冰城甜蜜蜜');
            el.instance.visible = true;
            el.instance.hiding = false;
        }
    };

    // 注册自定义指令
    Vue.directive('loading', {
        bind: function bind(el, binding, vnode) {
            // 获取跟指令对应的参数
            var textExr = el.getAttribute('loading-text');
            var spinnerExr = el.getAttribute('loading-spinner');
            var backgroundExr = el.getAttribute('loading-background');

            var vm = vnode.context;

            // Vue构造器实例化
            var mask = new Mask({
                el: document.createElement('div'),
                data: {
                    text: vm && vm[textExr] || textExr,
                    spinner: vm && vm[spinnerExr] || spinnerExr,
                    backgrond: vm && vm[backgroundExr] || backgroundExr,
                    fullscreen: !!binding.modifiers.fullscreen
                }
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

        update: function update(el, binding) {
            el.instance.setText(el.getAttribute('loading-text'));
            // 新值与旧值是否相等
            if (binding.oldValue !== binding.value) {
                toggleLoading(el, binding);
            }
        },

        unbind: function unbind(el, binding) {
            console.log('解除绑定');
            // 销魂vue实例
            el.instance && el.instance.$destroy();
        }
    });
};

/* harmony default export */ var directive = (loadingDirective);
// CONCATENATED MODULE: ./src/utils/after-leave.js
/**
 * Bind after-leave event for vue instance. 
 * Make sure after-leave is called in any browsers.
 * 
 * @param {Vue} instance 必传 Vue instance
 * @param {Function} callback 必传 callback of after-leave event
 * @param {Number} speed 非必传 the speed of transition, default value is 300ms
 * @param {Boolean} once 非必传 weather bind after-leave once. default value is false.
 */
/* harmony default export */ var after_leave = (function (instance, callback) {
    var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
    var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    // 如果instance和callback不存在,抛出异常 hrow new Error()
    if (!instance || !callback) throw new Error('instance & callback is required');

    var called = false;

    var afterLeaveCallback = function afterLeaveCallback() {
        if (called) return;
        called = true;
        if (callback && typeof callback === 'function') {
            // 执行callback, 更改this指向
            callback.apply(null, arguments);
        }
    };

    // 意欲何为?
    if (once) {
        // vm.$once(event, callback): 监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。
        instance.$once('after-leave', afterLeaveCallback);
    } else {
        // vm.$on(event, callback): 监听当前vue实例上自定义的事件,
        // 事件可以由 vm.$emit 触发。回调函数会接收所有传入事件触发函数的额外参数。
        instance.$on('after-leave', afterLeaveCallback);
    }

    setTimeout(function () {
        afterLeaveCallback();
    }, speed + 100);
});
// CONCATENATED MODULE: ./packages/loading/src/index.js
/**
 * loadding的具体实现
 * 两大类型: 全局加载(document.body) | 局部加载(options.target)
 * 
 * 如果已经有全局加载,则返回该全局加载的实例
 * 
 * 
 * 
 */






// 1.创造Vue构造器
var LoadingConstructor = vue_runtime_esm["a" /* default */].extend(loading);

// 默认属性
var src_defaults = {
    body: false, // 默认false, 有指定覆盖的节点
    fullscreen: true, // 默认true, 全局加载
    text: null // 加载的文本
};

var fullscreenLoading = void 0;

/**
 * 定义方法两种实现形式-形式一: 直接在构造器的原型上构建
 * 另外一种形式: 以Vue中的data的形式
 * LoadingConstructor的原型是Vue
 * 在LoadingConstructor中扩展其原型,增加一个close方法
 * 也就是在LoadingConstructor的原型链上加一个close方法
 * 但是该方法是在LoadingConstructor的原型链上, 直接访问Vue, 是没有该方法的
 * 在自己的(LoadingConstructor)原型链(LoadingConstructor.prototype)上扩展,在其原型(Vue)上是不可见(该方法不存在)的
 * 扩展自己的原型链上不存在的属性和方法和自己的原型属性和方法无关
 * 
 * 在loading.vue中通过this.close访问
 */
LoadingConstructor.prototype.close = function () {
    var _this = this;

    console.log('关闭LoadingConstructor');
    if (this.fullscreen) {
        fullscreenLoading = undefined;
    }

    after_leave(this, function (_) {
        var target = _this.fullscreen || _this.body ? document.body : _this.target;

        // console.log('target', target, this.fullscreen, this.body)
        if (_this.$el && _this.$el.parentNode) {
            _this.$el.parentNode.removeChild(_this.$el);
        }

        // 销毁该实例
        _this.$destroy();
    }, 300);

    // 先设置加载不可见
    this.visible = false;
};

var src_Loading = function Loading() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // 当前Vue实例是否运行于服务器
    if (vue_runtime_esm["a" /* default */].prototype.$isServer) return;

    // merge: 合并多个对象到第一个对象
    options = merge({}, src_defaults, options);
    // console.log('optoons', options, merge);

    // options.target: Loading 需要覆盖的 DOM 节点
    // 类型: object/string
    // 默认值: document.body
    // 如果是object: dom节点
    // 如果是string: 将其作为参数传入 document.querySelector以获取到对应 DOM 节点
    if (typeof options.target === 'string') {
        options.target = document.querySelector(options.target);
    }
    options.target = options.target || document.body;

    // 两个对象的比较
    if (options.target !== document.body) {
        // 局部的加载
        options.fullscreen = false;
    } else {
        // 无指定的覆盖节点
        options.body = true;
    }

    // 如果已有全局加载,则返回该实例
    if (options.fullscreen && fullscreenLoading) {
        return fullscreenLoading;
    }

    // 定义实例挂载的父亲节点
    // options.body: 默认值false, 说明有指定覆盖的节点
    // options.target: Loading 需要覆盖的 DOM 节点
    var parent = options.body ? document.body : options.target;

    // 2.创造Vue实例,并挂载
    var instance = new LoadingConstructor({
        el: document.createElement('div'),
        data: options
    });

    Loading.onClose = function () {};

    console.log('instance', instance, LoadingConstructor);

    // 3.渲染真实dom
    parent.appendChild(instance.$el);

    // 等待视图全部更新完毕
    vue_runtime_esm["a" /* default */].nextTick(function () {
        instance.visible = true;
    });

    // 如果是全局加载
    if (options.fullscreen) {
        fullscreenLoading = instance;
    }

    return instance;
};

/* harmony default export */ var src = (src_Loading);
// CONCATENATED MODULE: ./packages/loading/index.js



// YLoading.install = function(Vue) {
//     // 注册Vue组件
//     Vue.Component(YLoading, YLoading.name);
// };

// YLoading.install = function(Vue) {
//     // 挂载到Vue原型链
//     Vue.prototype.$loading = service;
// }
// export default YLoading;

/* harmony default export */ var packages_loading = ({
    install: function install(Vue) {
        console.log('注册loading');
        Vue.use(directive);
        Vue.prototype.$loading = src;
    },

    directive: directive,
    service: src
});
// CONCATENATED MODULE: ./src/index.js
// element-ui 学习参考: https://zhuanlan.zhihu.com/p/94540894, https://zhuanlan.zhihu.com/p/94540894, https://segmentfault.com/a/1190000015884948











var components = [packages_button, packages_radio, packages_radio_group, packages_checkbox, packages_checkbox_group, packages_table, packages_table_column, packages_tree];

// 全局注册组件
// 在Vue.use(插件)时调用 插件.install
var src_install = function install(Vue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    components.forEach(function (component) {
        Vue.component(component.name, component);
    });

    // 注册loading指令
    Vue.use(packages_loading.directive);

    // 挂载到vue的原型链上
    // 这样便可以在vue文件中通过this.$message来使用了
    Vue.prototype.$message = message;
    // console.log('vue', Vue.prototype);

    // 挂载-加载
    Vue.prototype.$loading = packages_loading.service;
};

/* harmony default export */ var src_0 = __webpack_exports__["default"] = ({
    install: src_install,
    Button: packages_button,
    Radio: packages_radio,
    RadioGroup: packages_radio_group,
    Checkbox: packages_checkbox,
    CheckboxGroup: packages_checkbox_group,
    Table: packages_table,
    TableColumn: packages_table_column,
    Tree: packages_tree,
    Message: message,
    Loading: packages_loading
});

/***/ })
/******/ ])["default"];
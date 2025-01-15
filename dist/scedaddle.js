var Scedaddle = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var insertCss$1 = {exports: {}};

	var containers = []; // will store container HTMLElement references
	var styleElements = []; // will store {prepend: HTMLElement, append: HTMLElement}

	var usage = 'insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).';

	function insertCss(css, options) {
	    options = options || {};

	    if (css === undefined) {
	        throw new Error(usage);
	    }

	    var position = options.prepend === true ? 'prepend' : 'append';
	    var container = options.container !== undefined ? options.container : document.querySelector('head');
	    var containerId = containers.indexOf(container);

	    // first time we see this container, create the necessary entries
	    if (containerId === -1) {
	        containerId = containers.push(container) - 1;
	        styleElements[containerId] = {};
	    }

	    // try to get the correponding container + position styleElement, create it otherwise
	    var styleElement;

	    if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
	        styleElement = styleElements[containerId][position];
	    } else {
	        styleElement = styleElements[containerId][position] = createStyleElement();

	        if (position === 'prepend') {
	            container.insertBefore(styleElement, container.childNodes[0]);
	        } else {
	            container.appendChild(styleElement);
	        }
	    }

	    // strip potential UTF-8 BOM if css was read from a file
	    if (css.charCodeAt(0) === 0xFEFF) { css = css.substr(1, css.length); }

	    // actually add the stylesheet
	    if (styleElement.styleSheet) {
	        styleElement.styleSheet.cssText += css;
	    } else {
	        styleElement.textContent += css;
	    }

	    return styleElement;
	}
	function createStyleElement() {
	    var styleElement = document.createElement('style');
	    styleElement.setAttribute('type', 'text/css');
	    return styleElement;
	}

	insertCss$1.exports = insertCss;
	var insertCss_2 = insertCss$1.exports.insertCss = insertCss;

	function e(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o);}}function i(t,i,o){return i&&e(t.prototype,i),o&&e(t,o),t}function o(t){return "number"==typeof t&&!isNaN(t)}function s(t,e,i){return Math.min(Math.max(t,e),i)}function n(t){if(0===t.type.indexOf("touch")){var e=t.touches[0];return {x:e.clientX,y:e.clientY}}return {x:t.clientX,y:t.clientY}}function r(t){return 1==t.length?"0"+t:""+t}var h=function(){function t(t){this._rgba={r:0,g:0,b:0,a:1},this._hsva={h:0,s:0,v:0,a:1},this.fromHex(t);}var e=t.prototype;return e.fromHex=function(t){t||(t=0),o(t)?(this._hexNumber=t,this._hexString=function(t){return "#"+("00000"+(0|t).toString(16)).substr(-6).toUpperCase()}(this._hexNumber)):(this._hexString=t.toUpperCase(),this._hexNumber=u(this._hexString));var e=function(t){return {r:(t>>16&255)/255,g:(t>>8&255)/255,b:(255&t)/255}}(this._hexNumber),i=e.g,s=e.b;this._rgba.r=e.r,this._rgba.g=i,this._rgba.b=s;var n=function(t){var e,i=t.r,o=t.g,s=t.b,n=Math.max(i,o,s),r=Math.min(i,o,s),h=n-r,u=0===n?0:h/n,a=n;if(n==r)e=0;else {switch(n){case i:e=(o-s)/h+(o<s?6:0);break;case o:e=(s-i)/h+2;break;case s:e=(i-o)/h+4;}e/=6;}return {h:e,s:u,v:a}}(this._rgba),r=n.s,h=n.v;this._hsva.h=n.h,this._hsva.s=r,this._hsva.v=h,this._updateBrightness();},e.fromHsv=function(t){var e=t.s,i=t.v;this._hsva.h=t.h,this._hsva.s=e,this._hsva.v=i;var o=function(t){var e=t.h,i=t.s,o=t.v;e*=6;var s=Math.floor(e),n=e-s,r=o*(1-i),h=o*(1-n*i),u=o*(1-(1-n)*i),a=s%6;return {r:[o,h,r,r,u,o][a],g:[u,o,o,h,r,r][a],b:[r,r,u,o,o,h][a]}}(this._hsva),s=o.g,n=o.b;this._rgba.r=o.r,this._rgba.g=s,this._rgba.b=n,this._hexString=function(t){var e=t.g,i=t.b;return ["#",r(Math.round(255*t.r).toString(16)),r(Math.round(255*e).toString(16)),r(Math.round(255*i).toString(16))].join("").toUpperCase()}(this._rgba),this._hexNumber=u(this._hexString),this._updateBrightness();},e._updateBrightness=function(){var t=this._rgba;this._brightness=(299*t.r+587*t.g+114*t.b)/1e3,this._isDark=this._brightness<.5,this._isLight=!this._isDark;},i(t,[{key:"rgb",get:function(){return this._rgba}},{key:"hsv",get:function(){return this._hsva}},{key:"hex",get:function(){return this._hexNumber}},{key:"hexString",get:function(){return this._hexString}},{key:"brightness",get:function(){return this._brightness}},{key:"isDark",get:function(){return this._isDark}},{key:"isLight",get:function(){return this._isLight}}]),t}();function u(t){return parseInt(t.replace("#",""),16)}var a=function(){function t(t){var e=this;void 0===t&&(t={}),this._widthUnits="px",this._heightUnits="px",this._huePosition=0,this._hueHeight=0,this._maxHue=0,this._inputIsNumber=!1,this._saturationWidth=0,this._isChoosing=!1,this._callbacks=[],this.width=0,this.height=0,this.hue=0,this.position={x:0,y:0},this.color=new h(0),this.backgroundColor=new h(0),this.hueColor=new h(0),this._onSaturationMouseDown=function(t){var i=e.$saturation.getBoundingClientRect(),o=n(t),s=o.x,r=o.y;e._isChoosing=!0,e._moveSelectorTo(s-i.left,r-i.top),e._updateColorFromPosition(),e._window.addEventListener("mouseup",e._onSaturationMouseUp),e._window.addEventListener("touchend",e._onSaturationMouseUp),e._window.addEventListener("mousemove",e._onSaturationMouseMove),e._window.addEventListener("touchmove",e._onSaturationMouseMove),t.preventDefault();},this._onSaturationMouseMove=function(t){var i=e.$saturation.getBoundingClientRect(),o=n(t);e._moveSelectorTo(o.x-i.left,o.y-i.top),e._updateColorFromPosition();},this._onSaturationMouseUp=function(){e._isChoosing=!1,e._window.removeEventListener("mouseup",e._onSaturationMouseUp),e._window.removeEventListener("touchend",e._onSaturationMouseUp),e._window.removeEventListener("mousemove",e._onSaturationMouseMove),e._window.removeEventListener("touchmove",e._onSaturationMouseMove);},this._onHueMouseDown=function(t){var i=e.$hue.getBoundingClientRect(),o=n(t).y;e._isChoosing=!0,e._moveHueTo(o-i.top),e._updateHueFromPosition(),e._window.addEventListener("mouseup",e._onHueMouseUp),e._window.addEventListener("touchend",e._onHueMouseUp),e._window.addEventListener("mousemove",e._onHueMouseMove),e._window.addEventListener("touchmove",e._onHueMouseMove),t.preventDefault();},this._onHueMouseMove=function(t){var i=e.$hue.getBoundingClientRect(),o=n(t);e._moveHueTo(o.y-i.top),e._updateHueFromPosition();},this._onHueMouseUp=function(){e._isChoosing=!1,e._window.removeEventListener("mouseup",e._onHueMouseUp),e._window.removeEventListener("touchend",e._onHueMouseUp),e._window.removeEventListener("mousemove",e._onHueMouseMove),e._window.removeEventListener("touchmove",e._onHueMouseMove);},this._window=t.window||window,this._document=this._window.document,this.$el=this._document.createElement("div"),this.$el.className="Scp",this.$el.innerHTML='\n      <div class="Scp-saturation">\n        <div class="Scp-brightness"></div>\n        <div class="Scp-sbSelector"></div>\n      </div>\n      <div class="Scp-hue">\n        <div class="Scp-hSelector"></div>\n      </div>\n    ',this.$saturation=this.$el.querySelector(".Scp-saturation"),this.$hue=this.$el.querySelector(".Scp-hue"),this.$sbSelector=this.$el.querySelector(".Scp-sbSelector"),this.$hSelector=this.$el.querySelector(".Scp-hSelector"),this.$saturation.addEventListener("mousedown",this._onSaturationMouseDown),this.$saturation.addEventListener("touchstart",this._onSaturationMouseDown),this.$hue.addEventListener("mousedown",this._onHueMouseDown),this.$hue.addEventListener("touchstart",this._onHueMouseDown),t.el&&this.appendTo(t.el),t.background&&this.setBackgroundColor(t.background),t.widthUnits&&(this._widthUnits=t.widthUnits),t.heightUnits&&(this._heightUnits=t.heightUnits),this.setSize(t.width||175,t.height||150),this.setColor(t.color);}var e=t.prototype;return e.appendTo=function(t){return "string"==typeof t?document.querySelector(t).appendChild(this.$el):t.appendChild(this.$el),this},e.remove=function(){this._callbacks=[],this._onSaturationMouseUp(),this._onHueMouseUp(),this.$saturation.removeEventListener("mousedown",this._onSaturationMouseDown),this.$saturation.removeEventListener("touchstart",this._onSaturationMouseDown),this.$hue.removeEventListener("mousedown",this._onHueMouseDown),this.$hue.removeEventListener("touchstart",this._onHueMouseDown),this.$el.parentNode&&this.$el.parentNode.removeChild(this.$el);},e.setColor=function(t){this._inputIsNumber=o(t),this.color.fromHex(t);var e=this.color.hsv,i=e.h,s=e.s,n=e.v;return isNaN(i)||(this.hue=i),this._moveSelectorTo(this._saturationWidth*s,(1-n)*this._hueHeight),this._moveHueTo((1-this.hue)*this._hueHeight),this._updateHue(),this},e.setSize=function(t,e){return this.width=t,this.height=e,this.$el.style.width=this.width+this._widthUnits,this.$el.style.height=this.height+this._heightUnits,this._saturationWidth=this.width-25,this.$saturation.style.width=this._saturationWidth+"px",this._hueHeight=this.height,this._maxHue=this._hueHeight-2,this},e.setBackgroundColor=function(t){return this.backgroundColor.fromHex(t),this.$el.style.padding="5px",this.$el.style.background=this.backgroundColor.hexString,this},e.setNoBackground=function(){return this.$el.style.padding="0px",this.$el.style.background="none",this},e.onChange=function(t){return this._callbacks.indexOf(t)<0&&(this._callbacks.push(t),t(this.getHexString())),this},e.getColor=function(){return this._inputIsNumber?this.getHexNumber():this.getHexString()},e.getHexString=function(){return this.color.hexString.toUpperCase()},e.getHexNumber=function(){return this.color.hex},e.getRGB=function(){return this.color.rgb},e.getHSV=function(){return this.color.hsv},e.isDark=function(){return this.color.isDark},e.isLight=function(){return this.color.isLight},e._moveSelectorTo=function(t,e){this.position.x=s(t,0,this._saturationWidth),this.position.y=s(e,0,this._hueHeight),this.$sbSelector.style.transform="translate("+this.position.x+"px, "+this.position.y+"px)";},e._updateColorFromPosition=function(){this.color.fromHsv({h:this.hue,s:this.position.x/this._saturationWidth,v:1-this.position.y/this._hueHeight}),this._updateColor();},e._moveHueTo=function(t){this._huePosition=s(t,0,this._maxHue),this.$hSelector.style.transform="translateY("+this._huePosition+"px)";},e._updateHueFromPosition=function(){var t=this.getHSV();this.hue=1-this._huePosition/this._maxHue,this.color.fromHsv({h:this.hue,s:t.s,v:t.v}),this._updateHue();},e._updateHue=function(){this.hueColor.fromHsv({h:this.hue,s:1,v:1}),this.$saturation.style.background="linear-gradient(to right, #fff, "+this.hueColor.hexString+")",this._updateColor();},e._updateColor=function(){this.$sbSelector.style.background=this.getHexString(),this.$sbSelector.style.borderColor=this.isDark()?"#fff":"#000",this._triggerChange();},e._triggerChange=function(){var t=this;this._callbacks.forEach(function(e){return e(t.getHexString())});},i(t,[{key:"isChoosing",get:function(){return this._isChoosing}}]),t}();insertCss_2(".Scp{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative}.Scp-saturation{position:relative;height:100%;background:linear-gradient(90deg,#fff,red);float:left;margin-right:5px}.Scp-brightness{width:100%;height:100%;background:linear-gradient(hsla(0,0%,100%,0),#000)}.Scp-sbSelector{border:2px solid #fff;position:absolute;width:14px;height:14px;background:#fff;border-radius:10px;top:-7px;left:-7px;box-sizing:border-box;z-index:10}.Scp-hue{width:20px;height:100%;position:relative;float:left;background:linear-gradient(red,#f0f 17%,#00f 34%,#0ff 50%,#0f0 67%,#ff0 84%,red)}.Scp-hSelector{position:absolute;background:#fff;border-bottom:1px solid #000;right:-3px;width:10px;height:2px}");

	/**
	 * Check if the passed argument is the
	 * the passed type.
	 *
	 * @param {string} type
	 * @param {*} arg
	 * @returns {boolean}
	 */
	function isTypeof$1(type, arg) {
	    return typeof arg === type;
	}

	/**
	 * @type {function(*): boolean}
	 */
	var isString$1 = isTypeof$1.bind(null, 'string');

	/**
	 * @type {function(*): boolean}
	 */
	var isUndefined$1 = isTypeof$1.bind(null, 'undefined');

	/**
	 * @type {function(*): boolean}
	 */
	isTypeof$1.bind(null, 'function');

	/**
	 * @type {function(*): boolean}
	 */
	var isNumber$1 = isTypeof$1.bind(null, 'number');

	/**
	 * Removes an item from the passed array
	 *
	 * @param {!Array} arr
	 * @param {*} item
	 */
	function arrayRemove(arr, item) {
	    var i = arr.indexOf(item);

	    if (i > -1) {
	        arr.splice(i, 1);
	    }
	}

	/**
	 * Iterates over an array or object
	 *
	 * @param {!Object|Array} obj
	 * @param {function(*, *)} fn iterator, element
	 */
	function each$1(obj, fn) {
	    if (Array.isArray(obj) || 'length' in obj && isNumber$1(obj.length)) {
	        for (var i = 0; i < obj.length; i++) {
	            fn(i, obj[i]);
	        }
	    } else {
	        Object.keys(obj).forEach(function (key) {
	            fn(key, obj[key]);
	        });
	    }
	}

	/**
	 * @param {?HTMLElement} node
	 * @param {string} className
	 * @returns {boolean}
	 */
	function hasClass(node, className) {
	    return is(node, "." + className);
	}

	/**
	 * Checks if node matches the given selector.
	 *
	 * @param {?HTMLElement} node
	 * @param {string} selector
	 * @returns {boolean}
	 */
	function is(node, selector) {
	    var result = false;

	    if (node && node.nodeType === ELEMENT_NODE) {
	        result = (
	            node.matches ||
	            node.msMatchesSelector ||
	            node.webkitMatchesSelector
	        ).call(node, selector);
	    }

	    return result;
	}

	/**
	 * Finds any child nodes that match the selector
	 *
	 * @param {!HTMLElement} node
	 * @param {!string} selector
	 * @returns {NodeList}
	 */
	function find(node, selector) {
	    return node.querySelectorAll(selector);
	}

	function on(node, events, selector, fn, capture) {
	    events.split(" ").forEach(function (event) {
	        var handler;

	        if (isString$1(selector)) {
	            handler =
	                fn["_event-" + event + selector] ||
	                function (e) {
	                    var target = e.target;
	                    while (target && target !== node) {
	                        if (is(target, selector)) {
	                            fn.call(target, e);
	                            return;
	                        }

	                        target = target.parentNode;
	                    }
	                };

	            fn["_event-" + event + selector] = handler;
	        } else {
	            handler = selector;
	            capture = fn;
	        }

	        node.addEventListener(event, handler, capture || false);
	    });
	}

	function insertBefore(node, refNode) {
	    return refNode.parentNode.insertBefore(node, refNode);
	}

	/**
	 * Creates an element with the specified attributes
	 *
	 * Will create it in the current document unless context
	 * is specified.
	 *
	 * @param {!string} tag
	 * @param {!Object<string, string>} [attributes]
	 * @param {!Document} [context]
	 * @returns {!HTMLElement}
	 */
	function createElement$1(tag, attributes, context) {
	    var node = (context || document).createElement(tag);

	    each$1(attributes || {}, function (key, value) {
	        if (key === "style") {
	            node.style.cssText = value;
	        } else if (key in node) {
	            node[key] = value;
	        } else {
	            node.setAttribute(key, value);
	        }
	    });

	    return node;
	}

	/**
	 * Creates an element with the specified attributes
	 *
	 * Will create it in the current document unless context
	 * is specified.
	 *
	 * @param {!HTMLElement} toWrap
	 * @param {?HTMLElement} wrapper
	 * @param {?boolean} returnElement
	 * @returns {!HTMLElement} either the wrapper or the toWrap
	 */

	function wrapElement(toWrap, wrapper, returnElement) {
	    wrapper = wrapper || document.createElement("div");
	    toWrap.parentNode.appendChild(wrapper);
	    if (returnElement) {
	        return wrapper.appendChild(toWrap).parentNode;
	    } else {
	        return wrapper.appendChild(toWrap);
	    }
	}

	/**
	 * If only attr param is specified it will get
	 * the value of the attr param.
	 *
	 * If value is specified but null the attribute
	 * will be removed otherwise the attr value will
	 * be set to the passed value.
	 *
	 * @param {!HTMLElement} node
	 * @param {!string} attr
	 * @param {?string} [value]
	 */
	function attr(node, attr, value) {
	    if (arguments.length < 3) {
	        return node.getAttribute(attr);
	    }

	    // eslint-disable-next-line eqeqeq, no-eq-null
	    if (value == null) {
	        removeAttr(node, attr);
	    } else {
	        node.setAttribute(attr, value);
	    }
	}

	/**
	 * Removes the specified attribute
	 *
	 * @param {!HTMLElement} node
	 * @param {!string} attr
	 */
	function removeAttr(node, attr) {
	    node.removeAttribute(attr);
	}

	/**
	 * Gets or sets the data attributes on a node
	 *
	 * Unlike the jQuery version this only stores data
	 * in the DOM attributes which means only strings
	 * can be stored.
	 *
	 * @param {Node} node
	 * @param {string} [key]
	 * @param {string} [value]
	 * @return {Object|undefined}
	 */
	function data(node, key, value) {
	    var argsLength = arguments.length;
	    var data = {};

	    if (node.nodeType === ELEMENT_NODE) {
	        if (argsLength === 1) {
	            each$1(node.attributes, function (_, attr) {
	                if (/^data\-/i.test(attr.name)) {
	                    data[attr.name.substr(5)] = attr.value;
	                }
	            });

	            return data;
	        }

	        if (argsLength === 2) {
	            return attr(node, "data-" + key);
	        }

	        attr(node, "data-" + key, String(value));
	    }
	}

	/**
	 * Node type constant for element nodes
	 *
	 * @type {number}
	 */
	var ELEMENT_NODE = 1;

	/**
	 * Parses HTML into a document fragment
	 *
	 * @param {string} html
	 * @param {Document} [context]
	 * @return {DocumentFragment}
	 */
	function parseHTML$1(html, context) {
	    context = context || document;

	    var ret = context.createDocumentFragment();
	    var tmp = createElement$1("div", {}, context);

	    tmp.innerHTML = html;

	    while (tmp.firstChild) {
	        appendChild$1(ret, tmp.firstChild);
	    }

	    return ret;
	}

	/**
	 * Appends child to parent node
	 *
	 * @param {!HTMLElement} node
	 * @param {!HTMLElement} child
	 */
	function appendChild$1(node, child) {
	    node.appendChild(child);
	}

	/**
	 * @param {?HTMLElement} node
	 * @returns {!Array.<string>}
	 */
	function classes(node) {
	    return node.className.trim().split(/\s+/);
	}

	/**
	 * @param {!HTMLElement} node
	 * @param {string} className
	 */
	function addClass(node, className) {
	    var classList = classes(node);

	    if (classList.indexOf(className) < 0) {
	        classList.push(className);
	    }

	    node.className = classList.join(" ");
	}

	/**
	 * @param {!HTMLElement} node
	 * @param {string} className
	 */
	function removeClass(node, className) {
	    var classList = classes(node);

	    arrayRemove(classList, className);

	    node.className = classList.join(" ");
	}

	function remove(node) {
	    if (node.parentNode) {
	        node.parentNode.removeChild(node);
	    }
	}

	/**
	 * Toggles a class on node.
	 *
	 * If state is specified and is truthy it will add
	 * the class.
	 *
	 * If state is specified and is falsey it will remove
	 * the class.
	 *
	 * @param {HTMLElement} node
	 * @param {string} className
	 * @param {boolean} [state]
	 */
	function toggleClass(node, className, state) {
	    state = isUndefined$1(state) ? !hasClass(node, className) : state;

	    if (state) {
	        addClass(node, className);
	    } else {
	        removeClass(node, className);
	    }
	}

	function addListeners(element, events, handler) {
	    events.forEach((event) => element.addEventListener(event, handler));
	}

	var potion_umd_min = {exports: {}};

	(function (module, exports) {
		!function(e,t){module.exports=t();}(commonjsGlobal,(function(){const e=/\{\{(.+?)\}\}/g;function t(e){this.t=e;}return t.prototype.render=function(t){return n=this.t,o=t,n.replace(e,(function(e,t){var n=function(e,t){return t.split(".").reduce(((e,t)=>e[t]),e)}(o,t);return n||0===n?n:""}));var n,o;},t}));
	} (potion_umd_min));

	const Icon = {
	    bold: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bold"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg>',
	    italic: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-italic"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>',
	    underline:
	        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-underline"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg>',
	    strikethrough:
	        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-strikethrough"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" x2="20" y1="12" y2="12"/></svg>',
	    quote: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-quote"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>',
	    code: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code-xml"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>',
	    subscript:
	        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-subscript"><path d="m4 5 8 8"/><path d="m12 5-8 8"/><path d="M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"/></svg>',
	    superscript:
	        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-superscript"><path d="m4 19 8-8"/><path d="m12 19-8-8"/><path d="M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06"/></svg>',
	    unorderedList:
	        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list"><path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M3 6h.01"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M8 6h13"/></svg>',
	    orderedList:
	        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-ordered"><path d="M10 12h11"/><path d="M10 18h11"/><path d="M10 6h11"/><path d="M4 10h2"/><path d="M4 6h1v4"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>',
	    presets:
	        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-scan"><path d="M20 10V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 14a2 2 0 0 0-2 2"/><path d="M20 14a2 2 0 0 1 2 2"/><path d="M20 22a2 2 0 0 0 2-2"/><path d="M16 22a2 2 0 0 1-2-2"/></svg>',
	    headings:
	        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heading"><path d="M6 12h12"/><path d="M6 20V4"/><path d="M18 20V4"/></svg>',
	    alignLeft:
	        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-left"><path d="M15 12H3"/><path d="M17 18H3"/><path d="M21 6H3"/></svg>',
	    alignCenter:
	        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-center"><path d="M17 12H7"/><path d="M19 18H5"/><path d="M21 6H3"/></svg>',
	    alignRight:
	        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-right"><path d="M21 12H9"/><path d="M21 18H7"/><path d="M21 6H3"/></svg>',
	    alignJustify:
	        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-justify"><path d="M3 12h18"/><path d="M3 18h18"/><path d="M3 6h18"/></svg>',
	    color: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-palette"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
	    link: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
	    at: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-at-sign"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>',
	    img: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
	    warning:
	        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-octagon-alert"><path d="M12 16h.01"/><path d="M12 8v4"/><path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"/></svg>',
	    hide: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>',
	    spoiler:
	        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-closed"><path d="m15 18-.722-3.25"/><path d="M2 8a10.645 10.645 0 0 0 20 0"/><path d="m20 15-1.726-2.05"/><path d="m4 15 1.726-2.05"/><path d="m9 18 .722-3.25"/></svg>',
	};

	/**
	 * Creates an element with the specified attributes
	 *
	 * Will create it in the current document unless context
	 * is specified.
	 *
	 * @param {!string} tag
	 * @param {!Object<string, string>} [attributes]
	 * @param {!Document} [context]
	 * @returns {!HTMLElement}
	 */
	function createElement(tag, attributes, context) {
	    var node = (context || document).createElement(tag);

	    each$1(attributes || {}, function (key, value) {
	        if (key === "style") {
	            node.style.cssText = value;
	        } else if (key in node) {
	            node[key] = value;
	        } else {
	            node.setAttribute(key, value);
	        }
	    });

	    return node;
	}

	/**
	 * Parses HTML into a document fragment
	 *
	 * @param {string} html
	 * @param {Document} [context]
	 * @return {DocumentFragment}
	 */
	function parseHTML(html, context) {
	    context = context || document;

	    var ret = context.createDocumentFragment();
	    var tmp = createElement("div", {}, context);

	    tmp.innerHTML = html;

	    while (tmp.firstChild) {
	        appendChild(ret, tmp.firstChild);
	    }

	    return ret;
	}

	/**
	 * Appends child to parent node
	 *
	 * @param {!HTMLElement} node
	 * @param {!HTMLElement} child
	 */
	function appendChild(node, child) {
	    node.appendChild(child);
	}

	// Must start with a valid scheme

	/**
	 * Escapes a string so it's safe to use in regex
	 *
	 * @param {string} str
	 * @return {string}
	 */
	function regex(str) {
	    return str.replace(/([\-.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
	}

	/**
	 * HTML templates used by the editor and default commands
	 * @type {Object}
	 * @private
	 */
	var _templates = {

	    toolbarButton: '<button class="scedaddle__button scedaddle__button--{name}"' +
	        'data-command="{name}" unselectable="on"><div unselectable="on">{dispName}</div></a>',

	    icon: '<svg xmlns="http://www.w3.org/2000/svg" height="{size}" width="{size}" viewBox="0 0 48 48">{path}</svg>'

	};

	/**
	 * Replaces any params in a template with the passed params.
	 *
	 * If createHtml is passed it will return a DocumentFragment
	 * containing the parsed template.
	 *
	 * @param {string} name
	 * @param {Object} [params]
	 * @param {boolean} [createHtml]
	 * @returns {string|DocumentFragment}
	 * @private
	 */
	function _tmpl (name, params, createHtml) {
	    var template = _templates[name];

	    Object.keys(params).forEach(function (name) {
	        template = template.replace(
	            new RegExp(regex('{' + name + '}'), 'g'), params[name]
	        );
	    });

	    if (createHtml) {
	        template = parseHTML(template);
	    }

	    return template;
	}

	/* complete object of material colors */
	const materialColors = {
	    red: {
	        50: "#ffebee",
	        100: "#ffcdd2",
	        200: "#ef9a9a",
	        300: "#e57373",
	        400: "#ef5350",
	        500: "#f44336",
	        600: "#e53935",
	        700: "#d32f2f",
	        800: "#c62828",
	        900: "#b71c1c",
	        A100: "#ff8a80",
	        A200: "#ff5252",
	        A400: "#ff1744",
	        A700: "#d50000",
	    },
	    pink: {
	        50: "#fce4ec",
	        100: "#f8bbd0",
	        200: "#f48fb1",
	        300: "#f06292",
	        400: "#ec407a",
	        500: "#e91e63",
	        600: "#d81b60",
	        700: "#c2185b",
	        800: "#ad1457",
	        900: "#880e4f",
	        A100: "#ff80ab",
	        A200: "#ff4081",
	        A400: "#f50057",
	        A700: "#c51162",
	    },
	    purple: {
	        50: "#f3e5f5",
	        100: "#e1bee7",
	        200: "#ce93d8",
	        300: "#ba68c8",
	        400: "#ab47bc",
	        500: "#9c27b0",
	        600: "#8e24aa",
	        700: "#7b1fa2",
	        800: "#6a1b9a",
	        900: "#4a148c",
	        A100: "#ea80fc",
	        A200: "#e040fb",
	        A400: "#d500f9",
	        A700: "#aa00ff",
	    },
	    deepPurple: {
	        50: "#ede7f6",
	        100: "#d1c4e9",
	        200: "#b39ddb",
	        300: "#9575cd",
	        400: "#7e57c2",
	        500: "#673ab7",
	        600: "#5e35b1",
	        700: "#512da8",
	        800: "#4527a0",
	        900: "#311b92",
	        A100: "#b388ff",
	        A200: "#7c4dff",
	        A400: "#651fff",
	        A700: "#6200ea",
	    },
	    indigo: {
	        50: "#e8eaf6",
	        100: "#c5cae9",
	        200: "#9fa8da",
	        300: "#7986cb",
	        400: "#5c6bc0",
	        500: "#3f51b5",
	        600: "#3949ab",
	        700: "#303f9f",
	        800: "#283593",
	        900: "#1a237e",
	        A100: "#8c9eff",
	        A200: "#536dfe",
	        A400: "#3d5afe",
	        A700: "#304ffe",
	    },
	    blue: {
	        50: "#e3f2fd",
	        100: "#bbdefb",
	        200: "#90caf9",
	        300: "#64b5f6",
	        400: "#42a5f5",
	        500: "#2196f3",
	        600: "#1e88e5",
	        700: "#1976d2",
	        800: "#1565c0",
	        900: "#0d47a1",
	        A100: "#82b1ff",
	        A200: "#448aff",
	        A400: "#2979ff",
	        A700: "#2962ff",
	    },
	    lightBlue: {
	        50: "#e1f5fe",
	        100: "#b3e5fc",
	        200: "#81d4fa",
	        300: "#4fc3f7",
	        400: "#29b6f6",
	        500: "#03a9f4",
	        600: "#039be5",
	        700: "#0288d1",
	        800: "#0277bd",
	        900: "#01579b",
	        A100: "#80d8ff",
	        A200: "#40c4ff",
	        A400: "#00b0ff",
	        A700: "#0091ea",
	    },
	    cyan: {
	        50: "#e0f7fa",
	        100: "#b2ebf2",
	        200: "#80deea",
	        300: "#4dd0e1",
	        400: "#26c6da",
	        500: "#00bcd4",
	        600: "#00acc1",
	        700: "#0097a7",
	        800: "#00838f",
	        900: "#006064",
	        A100: "#84ffff",
	        A200: "#18ffff",
	        A400: "#00e5ff",
	        A700: "#00b8d4",
	    },
	    teal: {
	        50: "#e0f2f1",
	        100: "#b2dfdb",
	        200: "#80cbc4",
	        300: "#4db6ac",
	        400: "#26a69a",
	        500: "#009688",
	        600: "#00897b",
	        700: "#00796b",
	        800: "#00695c",
	        900: "#004d40",
	        A100: "#a7ffeb",
	        A200: "#64ffda",
	        A400: "#1de9b6",
	        A700: "#00bfa5",
	    },
	    green: {
	        50: "#e8f5e9",
	        100: "#c8e6c9",
	        200: "#a5d6a7",
	        300: "#81c784",
	        400: "#66bb6a",
	        500: "#4caf50",
	        600: "#43a047",
	        700: "#388e3c",
	        800: "#2e7d32",
	        900: "#1b5e20",
	        A100: "#b9f6ca",
	        A200: "#69f0ae",
	        A400: "#00e676",
	        A700: "#00c853",
	    },
	    lightGreen: {
	        50: "#f1f8e9",
	        100: "#dcedc8",
	        200: "#c5e1a5",
	        300: "#aed581",
	        400: "#9ccc65",
	        500: "#8bc34a",
	        600: "#7cb342",
	        700: "#689f38",
	        800: "#558b2f",
	        900: "#33691e",
	        A100: "#ccff90",
	        A200: "#b2ff59",
	        A400: "#76ff03",
	        A700: "#64dd17",
	    },
	    lime: {
	        50: "#f9fbe7",
	        100: "#f0f4c3",
	        200: "#e6ee9c",
	        300: "#dce775",
	        400: "#d4e157",
	        500: "#cddc39",
	        600: "#c0ca33",
	        700: "#afb42b",
	        800: "#9e9d24",
	        900: "#827717",
	        A100: "#f4ff81",
	        A200: "#eeff41",
	        A400: "#c6ff00",
	        A700: "#aeea00",
	    },
	    yellow: {
	        50: "#fffde7",
	        100: "#fff9c4",
	        200: "#fff59d",
	        300: "#fff176",
	        400: "#ffee58",
	        500: "#ffeb3b",
	        600: "#fdd835",
	        700: "#fbc02d",
	        800: "#f9a825",
	        900: "#f57f17",
	        A100: "#ffff8d",
	        A200: "#ffff00",
	        A400: "#ffea00",
	        A700: "#ffd600",
	    },
	    amber: {
	        50: "#fff8e1",
	        100: "#ffecb3",
	        200: "#ffe082",
	        300: "#ffd54f",
	        400: "#ffca28",
	        500: "#ffc107",
	        600: "#ffb300",
	        700: "#ffa000",
	        800: "#ff8f00",
	        900: "#ff6f00",
	        A100: "#ffe57f",
	        A200: "#ffd740",
	        A400: "#ffc400",
	        A700: "#ffab00",
	    },
	    orange: {
	        50: "#fff3e0",
	        100: "#ffe0b2",
	        200: "#ffcc80",
	        300: "#ffb74d",
	        400: "#ffa726",
	        500: "#ff9800",
	        600: "#fb8c00",
	        700: "#f57c00",
	        800: "#ef6c00",
	        900: "#e65100",
	        A100: "#ffd180",
	        A200: "#ffab40",
	        A400: "#ff9100",
	        A700: "#ff6d00",
	    },
	    deepOrange: {
	        50: "#fbe9e7",
	        100: "#ffccbc",
	        200: "#ffab91",
	        300: "#ff8a65",
	        400: "#ff7043",
	        500: "#ff5722",
	        600: "#f4511e",
	        700: "#e64a19",
	        800: "#d84315",
	        900: "#bf360c",
	        A100: "#ff9e80",
	        A200: "#ff6e40",
	        A400: "#ff3d00",
	        A700: "#dd2c00",
	    },
	    /*
	    brown: {
	        50: '#efebe9',
	        100: '#d7ccc8',
	        200: '#bcaaa4',
	        300: '#a1887f',
	        400: '#8d6e63',
	        500: '#795548',
	        600: '#6d4c41',
	        700: '#5d4037',
	        800: '#4e342e',
	        900: '#3e2723',
	    },
	    grey: {
	        50: '#fafafa',
	        100: '#f5f5f5',
	        200: '#eeeeee',
	        300: '#e0e0e0',
	        400: '#bdbdbd',
	        500: '#9e9e9e',
	        600: '#757575',
	        700: '#616161',
	        800: '#424242',
	        900: '#212121',
	    },
	    blueGrey: {
	        50: '#eceff1',
	        100: '#cfd8dc',
	        200: '#b0bec5',
	        300: '#90a4ae',
	        400: '#78909c',
	        500: '#607d8b',
	        600: '#546e7a',
	        700: '#455a64',
	        800: '#37474f',
	        900: '#263238',
	    },
	    black: {
	        500: '#000000',
	    },
	    white: {
	        500: '#ffffff',
	    }
	    */
	};

	var defaultCommands = {
	    // START COMMAND: Trigger Warnings
	    tw: {
	        exec: function () {},
	        icon: Icon.warning,
	        format: "customHtml",
	        wrapper: ["<triggers>", "</triggers>"],
	        shortcut: "",
	        tooltip: "Trigger warning",
	    },
	    // END COMMAND: Trigger Warnings
	    // START COMMAND: Headings
	    headings: {
	        _dropdown: function (editor, caller, callback) {
	            var list = createElement$1("ul", {
	                className: "scedaddle__dropdown__list",
	            });
	            /*
	            var items = {
	                h1: 'Heading 1',
	                h2: 'Heading 2',
	                h3: 'Heading 3',
	                h4: 'Heading 4',
	                h5: 'Heading 5',
	                h6: 'Heading 6',
	                p: 'Paragraph'
	            };
	            for (var key in items) {
	                var item = dom.createElement('li', {
	                    className: 'scedaddle__dropdown__list__item',
	                    innerHTML: items[key]
	                });
	                item.addEventListener('click', function (e) {
	                    e.preventDefault();
	                    callback(this.getAttribute('data-tag'));
	                }.bind({
	                    tag: key
	                }));
	                list.appendChild(item);
	            }
	            */
	            return list;
	        },
	        icon: Icon.headings,
	        shortcut: "ctrl+h",
	        tooltip: "Titres",
	    },
	    // END COMMAND: Headings
	    // START COMMAND: Colors
	    color: {
	        _colorButton: function (value, name, classes) {
	            return (
	                '<span class="scedaddle__dropdown__color ' +
	                (classes || "") +
	                '" title="' +
	                (name || value) +
	                '" style="background-color: ' +
	                value +
	                ';" data-color="' +
	                value +
	                '"></span>'
	            );
	        },
	        _colorCustomButton: function (value, name, classes) {
	            return (
	                '<span class="scedaddle__dropdown__color custom-color ' +
	                (classes || "") +
	                '" title="(clique droit pour supprimer)" style="background-color: ' +
	                value +
	                ';" data-color="' +
	                value +
	                '"></span>'
	            );
	        },
	        _faColors: function () {
	            let i,
	                x,
	                color,
	                colors = new Array(37),
	                colorColumns = new Array(6),
	                genColor = {
	                    r: 255,
	                    g: 255,
	                    b: 255,
	                },
	                html = "",
	                cmd = defaultCommands.color;

	            if (!cmd._faColorsCache) {
	                for (i = 0; i < colorColumns.length; ++i) {
	                    html +=
	                        '<div class="sceddadle__colors-group" style="grid-template-columns: repeat(18,1fr)">';
	                    for (x = 1; x < colors.length; ++x) {
	                        color =
	                            colors[x] ||
	                            "#" +
	                                genColor.r.toString(16) +
	                                genColor.g.toString(16) +
	                                genColor.b.toString(16);
	                        html += cmd._colorButton(color);
	                        if (x % 6 === 0) {
	                            genColor.g -= 51;
	                            genColor.b = 255;
	                            if (genColor.g < 51) {
	                                genColor.g = "00";
	                            }
	                        } else genColor.b -= 51;
	                        if (genColor.b < 51) {
	                            genColor.b = "00";
	                        }
	                    }
	                    html += "</div>";
	                    if (i % 1 === 0) {
	                        genColor.r -= 51;
	                        genColor.g = 255;
	                        genColor.b = 255;
	                        if (genColor.r < 51) {
	                            genColor.r = "00";
	                        }
	                    } else {
	                        genColor.g = 255;
	                        genColor.b = 255;
	                    }
	                }
	                cmd._faColorsCache = html;
	            }
	            return cmd._faColorsCache;
	        },
	        _materialColors: function (colors) {
	            let html = "";
	            for (const color in colors) {
	                html +=
	                    '<div class="sceddadle__colors-group" data-color="' +
	                    color +
	                    '">';

	                for (const value in colors[color]) {
	                    html += defaultCommands.color._colorButton(
	                        colors[color][value],
	                        color.toUpperCase() + ": " + value
	                    );
	                }

	                html += "</div>";
	            }

	            return html;
	        },
	        _addCustomColor: (color) => {
	            let colors = defaultCommands.color._getCustomColors();
	            colors.push(color);
	            defaultCommands.color._setCustomColors(colors);
	        },
	        _removeCustomColor: (index) => {
	            let colors = defaultCommands.color._getCustomColors();
	            colors.splice(index, 1);
	            defaultCommands.color._setCustomColors(colors);
	        },
	        _setCustomColors: (colors) => {
	            localStorage.setItem(
	                "scedaddle-customColors",
	                JSON.stringify(colors)
	            );
	        },
	        _getCustomColors: () => {
	            let colors = localStorage.getItem("scedaddle-customColors");
	            if (colors) {
	                colors = JSON.parse(colors);
	            } else {
	                colors = [];
	                localStorage.setItem(
	                    "scedaddle-customColors",
	                    JSON.stringify(colors)
	                );
	            }
	            return colors;
	        },
	        _customColors: (rebuild, instance) => {
	            const cmd = defaultCommands.color;
	            let colors = cmd._getCustomColors();

	            let html = "";
	            html += '<div class="sceddadle__colors-group">';
	            for (const color of colors) {
	                html += cmd._colorCustomButton(color);
	            }
	            html += "</div>";

	            if (rebuild) {
	                instance.innerHTML = html;
	                return;
	            }

	            let content = new DocumentFragment(),
	                colorPicker = (cmd._colorPicker = new a({
	                    width: 200,
	                    height: 200,
	                }));

	            let colorPickerContainer = createElement$1("div", {
	                className: "scedaddle__colorpicker-container",
	            });

	            colorPicker.appendTo(colorPickerContainer);

	            let input = createElement$1("input", {
	                className: "scedaddle__colorpicker-input",
	                type: "text",
	            });

	            let addButton = createElement$1("span", {
	                className: "scedaddle__colorpicker-add add-color",
	                innerHTML: "+",
	            });

	            colorPickerContainer.appendChild(input);
	            colorPickerContainer.appendChild(addButton);

	            let customColorsContainer = createElement$1("div", {
	                className: "scedaddle__custom-colors-container",
	                innerHTML: html,
	            });

	            colorPickerContainer.appendChild(customColorsContainer);

	            // events

	            cmd._colorPicker.onChange(function (color) {
	                cmd._customColorSelected = color;
	                input.value = color;
	            });

	            content.appendChild(colorPickerContainer);

	            return { content, instance: customColorsContainer };
	        },
	        _dropDown: function (editor, caller, callback) {
	            let content = createElement$1("div"),
	                cmd = defaultCommands.color,
	                { content: customTabContent, instance: customListInstance } =
	                    cmd._customColors();

	            /* TODO put some cache of tabs */

	            var tabs = editor.createMenu("color-picker", {
	                Default: cmd._faColors(),
	                Material: cmd._materialColors(materialColors),
	                Custom: customTabContent,
	            });

	            appendChild$1(content, tabs);

	            on(content, "click", "span[data-color]", function (e) {
	                console.log("hey");
	                callback(data(this, "color"));
	                editor.closeDropDown(true);
	                e.preventDefault();
	            });
	            on(content, "contextmenu", "span[data-color]", function (ev) {
	                ev.preventDefault();
	                const index = Array.prototype.indexOf.call(
	                    this.parentNode.children,
	                    ev.target
	                );
	                cmd._removeCustomColor(index);
	                cmd._customColors(true, customListInstance);
	            });

	            on(content, "click", ".add-color", function (e) {
	                console.log(e);
	                cmd._addCustomColor(cmd._customColorSelected);
	                cmd._customColors(true, customListInstance);
	            });

	            editor.createDropDown(caller, "color-picker", content);
	        },
	        exec: function (caller) {
	            var editor = this;

	            defaultCommands.color._dropDown(editor, caller, function (color) {
	                console.log(color, editor);
	                editor.execWrapCommand(defaultCommands.color, color);
	            });
	        },
	        format: "bbcode",
	        wrapper: ['[color="{0}"]', "[/color]"],
	        icon: Icon.color,
	        shortcut: "ctrl+k",
	        tooltip: "Couleur du texte",
	    },
	    // END COMMAND: Colors
	    // START COMMAND: Presets
	    presets: {
	        _presetList: function () {
	            const cmd = defaultCommands.presets;

	            const presets = cmd._getPresets();
	            console.log(presets);
	            if (presets.length === 0)
	                return `<div class="sceddadle__presets-tab empty">Il n'y a pas encore de presets.</div>`;

	            return "hello wrold";
	        },
	        _getPresets: function () {
	            return localStorage.getItem("presets") || [];
	            // titre, desc, content (render with potion), image
	            // from localstorage
	            // add option to in commands init?
	        },
	        _presetCreation: function () {
	            return "";
	        },
	        _dropDown: function (editor, caller, callback) {
	            let content = createElement$1("div"),
	                cmd = defaultCommands.presets;

	            /* let template = new Potion("<div>{{test}}</div>");
	            const test = template.render({
	                test: "hey",
	            }); */

	            editor.opts?.presets;

	            const tabs = editor.createMenu("presets", {
	                Prédéfinis: cmd._presetList(),
	                Créer: cmd._presetCreation(),
	            });

	            appendChild$1(content, tabs);

	            on(content, "click", "button", function (e) {
	                /* callback(dom.data(this, "color"));
	                editor.closeDropDown(true); */
	                e.preventDefault();
	            });

	            editor.createDropDown(caller, "presets", content);
	        },
	        exec: function (caller) {
	            var editor = this;
	            defaultCommands.presets._dropDown(
	                editor,
	                caller,
	                function (preset) {
	                    editor.execWrapCommand(defaultCommands.presets, preset);
	                }
	            );
	        },
	        condition: function (opts) {
	            return opts.hasOwnProperty("presets");
	        },
	        icon: Icon.presets,
	        tooltip: "Presets",
	        shortcut: "ctrl+shift+p",
	    },
	    // START COMMAND: Bold
	    bold: {
	        exec: "bold",
	        icon: Icon.bold,
	        format: "bbcode",
	        wrapper: ["[b]", "[/b]"],
	        shortcut: "ctrl+b",
	        tooltip: "Gras",
	    },
	    // END COMMAND: Bold
	    // START COMMAND: Italic
	    italic: {
	        exec: "italic",
	        icon: Icon.italic,
	        format: "bbcode",
	        wrapper: ["[i]", "[/i]"],
	        shortcut: "ctrl+i",
	        tooltip: "Italique",
	    },
	    // END COMMAND: Italic
	    // START COMMAND: Underline
	    underline: {
	        exec: "underline",
	        icon: Icon.underline,
	        format: "bbcode",
	        wrapper: ["[u]", "[/u]"],
	        shortcut: "ctrl+u",
	        tooltip: "Souligné",
	    },
	    // END COMMAND: Underline
	    // START COMMAND: Strikethrough
	    strikethrough: {
	        exec: "strikethrough",
	        icon: Icon.strikethrough,
	        format: "bbcode",
	        wrapper: "[s]|[/s]",
	        shortcut: "ctrl+s",
	        tooltip: "Barré",
	    },
	    // END COMMAND: Strikethrough
	    // START COMMAND: Superscript
	    superscript: {
	        exec: "superscript",
	        icon: Icon.superscript,
	        format: "bbcode",
	        wrapper: "[sup]|[/sup]",
	        shortcut: "ctrl+shift+.",
	        tooltip: "Exposant",
	    },
	    // END COMMAND: Superscript
	    // START COMMAND: Subscript
	    subscript: {
	        exec: "subscript",
	        icon: Icon.subscript,
	        format: "bbcode",
	        wrapper: "[sub]|[/sub]",
	        shortcut: "ctrl+shift+,",
	        tooltip: "Indice",
	    },
	    // END COMMAND: Subscript
	    // START COMMAND: Quote
	    quote: {
	        exec: "formatBlock",
	        icon: Icon.quote,
	        format: "bbcode",
	        wrapper: "[quote]|[/quote]",
	        shortcut: "ctrl+q",
	        tooltip: "Citation",
	    },
	    // END COMMAND: Quote
	    // START COMMAND: Code
	    code: {
	        exec: "formatBlock",
	        icon: Icon.code,
	        format: "bbcode",
	        wrapper: "[code]|[/code]",
	        shortcut: "ctrl+shift+c",
	        tooltip: "Code",
	    },
	    // END COMMAND: Code
	    // START COMMAND: Unordered List
	    "unordered-list": {
	        exec: "insertUnorderedList",
	        icon: Icon.unorderedList,
	        format: "bbcode",
	        wrapper: "[ul][li]|[/li][/ul]",
	        shortcut: "ctrl+shift+8",
	        tooltip: "Liste non-ordonnée",
	    },
	    // END COMMAND: Unordered List
	    // START COMMAND: Ordered List
	    "ordered-list": {
	        exec: "insertOrderedList",
	        icon: Icon.orderedList,
	        format: "bbcode",
	        wrapper: "[ol][li]|[/li][/ol]",
	        shortcut: "ctrl+shift+7",
	        tooltip: "Liste ordonnée",
	    },
	    // END COMMAND: Ordered List
	    // START COMMAND: Align Left
	    "align-left": {
	        exec: "justifyLeft",
	        icon: Icon.alignLeft,
	        format: "bbcode",
	        wrapper: "[left]|[/left]",
	        shortcut: "ctrl+shift+l",
	        tooltip: "Alignement gauche",
	    },
	    // END COMMAND: Align Left
	    // START COMMAND: Align Center
	    "align-center": {
	        exec: "justifyCenter",
	        icon: Icon.alignCenter,
	        format: "bbcode",
	        wrapper: "[center]|[/center]",
	        shortcut: "ctrl+shift+c",
	        tooltip: "Alignement centre",
	    },
	    // END COMMAND: Align Center
	    // START COMMAND: Align Right
	    "align-right": {
	        exec: "justifyRight",
	        icon: Icon.alignRight,
	        format: "bbcode",
	        wrapper: "[right]|[/right]",
	        shortcut: "ctrl+shift+r",
	        tooltip: "Alignement droit",
	    },
	    // END COMMAND: Align Right
	    // START COMMAND: Align Justify
	    "align-justify": {
	        exec: "justifyFull",
	        icon: Icon.alignJustify,
	        format: "bbcode",
	        wrapper: "[justify]|[/justify]",
	        shortcut: "ctrl+shift+j",
	        tooltip: "Alignement justifié",
	    },
	    // END COMMAND: Align Justify
	    // START COMMAND: Link
	    link: {
	        exec: "url",
	        icon: Icon.link,
	        format: "bbcode",
	        wrapper: "[url{1}]|[/url]",
	        tooltip: "Lien",
	    },
	    // END COMMAND: LINK
	    // START COMMAND: AT
	    at: {
	        exec: function (button) {
	            console.log(this);
	            try {
	                this._dropdown(
	                    button,
	                    function () {
	                        const a = document.createElement("a");
	                        a.innerText = "heyyyoo";
	                        return a;
	                    },
	                    (color) => {
	                        this.execWrapCommand(defaultCommands.color, color);
	                    }
	                );
	            } catch (e) {
	                console.log(e);
	            }
	        },
	        icon: Icon.at,
	        format: "bbcode",
	        wrapper: "[@]|[/@]",
	        tooltip: "Mention",
	    },
	    // END COMMAND: AT
	    // START COMMAND: IMG
	    img: {
	        exec: "img",
	        icon: Icon.img,
	        format: "bbcode",
	        wrapper: ["[img]", "[/img]"],
	        tooltip: "Image",
	    },
	    // END COMMAND: IMG

	    // START COMMAND: HIDE
	    hide: {
	        exec: "hide",
	        icon: Icon.hide,
	        format: "bbcode",
	        wrapper: ["[hide]", "[/hide]"],
	        tooltip: "Caché",
	    },
	    // END COMMAND: HIDE
	    // START COMMAND: SPOILER
	    spoiler: {
	        exec: "spoiler",
	        icon: Icon.spoiler,
	        format: "bbcode",
	        wrapper: ["[spoiler]", "[/spoiler]"],
	        tooltip: "Divulgâché",
	    },
	};

	var defaultOptions = {
	    presetButtons: true,
	    /**
	     * Toolbar buttons order and groups. Should be comma separated and
	     * have a bar | to separate groups
	     *
	     * @type {string}
	     */
	    toolbar:
	        "tw,color,presets|" +
	        "headings,bold,italic,underline,strikethrough|" +
	        "superscript,subscript|" +
	        "quote,code|" +
	        "unordered-list,ordered-list|" +
	        "align-left,align-center,align-right,align-justify|" +
	        "link,at,img|" +
	        "hide,spoiler|",

	    toolbarExclude: null,

	    palettes: {
	        default: true,
	        material: true,
	        custom: true,
	    },

	    width: null,
	    height: null,

	    autoresizeDefault: true,
	    autoresizeEnabled: true,

	    rows: 12,

	    /** Element to inset the toolbar into,
	     *  if not set, will be inserted after the textarea
	     * @type {HTMLElement}
	     */
	    toolbarContainer: null,

	    id: null,

	    placeholder: "Rédigez votre message...",
	};

	var textareaCaret = {exports: {}};

	/* jshint browser: true */

	(function (module) {
		(function () {

		// We'll copy the properties below into the mirror div.
		// Note that some browsers, such as Firefox, do not concatenate properties
		// into their shorthand (e.g. padding-top, padding-bottom etc. -> padding),
		// so we have to list every single property explicitly.
		var properties = [
		  'direction',  // RTL support
		  'boxSizing',
		  'width',  // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
		  'height',
		  'overflowX',
		  'overflowY',  // copy the scrollbar for IE

		  'borderTopWidth',
		  'borderRightWidth',
		  'borderBottomWidth',
		  'borderLeftWidth',
		  'borderStyle',

		  'paddingTop',
		  'paddingRight',
		  'paddingBottom',
		  'paddingLeft',

		  // https://developer.mozilla.org/en-US/docs/Web/CSS/font
		  'fontStyle',
		  'fontVariant',
		  'fontWeight',
		  'fontStretch',
		  'fontSize',
		  'fontSizeAdjust',
		  'lineHeight',
		  'fontFamily',

		  'textAlign',
		  'textTransform',
		  'textIndent',
		  'textDecoration',  // might not make a difference, but better be safe

		  'letterSpacing',
		  'wordSpacing',

		  'tabSize',
		  'MozTabSize'

		];

		var isBrowser = (typeof window !== 'undefined');
		var isFirefox = (isBrowser && window.mozInnerScreenX != null);

		function getCaretCoordinates(element, position, options) {
		  if (!isBrowser) {
		    throw new Error('textarea-caret-position#getCaretCoordinates should only be called in a browser');
		  }

		  var debug = options && options.debug || false;
		  if (debug) {
		    var el = document.querySelector('#input-textarea-caret-position-mirror-div');
		    if (el) el.parentNode.removeChild(el);
		  }

		  // The mirror div will replicate the textarea's style
		  var div = document.createElement('div');
		  div.id = 'input-textarea-caret-position-mirror-div';
		  document.body.appendChild(div);

		  var style = div.style;
		  var computed = window.getComputedStyle ? window.getComputedStyle(element) : element.currentStyle;  // currentStyle for IE < 9
		  var isInput = element.nodeName === 'INPUT';

		  // Default textarea styles
		  style.whiteSpace = 'pre-wrap';
		  if (!isInput)
		    style.wordWrap = 'break-word';  // only for textarea-s

		  // Position off-screen
		  style.position = 'absolute';  // required to return coordinates properly
		  if (!debug)
		    style.visibility = 'hidden';  // not 'display: none' because we want rendering

		  // Transfer the element's properties to the div
		  properties.forEach(function (prop) {
		    if (isInput && prop === 'lineHeight') {
		      // Special case for <input>s because text is rendered centered and line height may be != height
		      style.lineHeight = computed.height;
		    } else {
		      style[prop] = computed[prop];
		    }
		  });

		  if (isFirefox) {
		    // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
		    if (element.scrollHeight > parseInt(computed.height))
		      style.overflowY = 'scroll';
		  } else {
		    style.overflow = 'hidden';  // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
		  }

		  div.textContent = element.value.substring(0, position);
		  // The second special handling for input type="text" vs textarea:
		  // spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
		  if (isInput)
		    div.textContent = div.textContent.replace(/\s/g, '\u00a0');

		  var span = document.createElement('span');
		  // Wrapping must be replicated *exactly*, including when a long word gets
		  // onto the next line, with whitespace at the end of the line before (#7).
		  // The  *only* reliable way to do that is to copy the *entire* rest of the
		  // textarea's content into the <span> created at the caret position.
		  // For inputs, just '.' would be enough, but no need to bother.
		  span.textContent = element.value.substring(position) || '.';  // || because a completely empty faux span doesn't render at all
		  div.appendChild(span);

		  var coordinates = {
		    top: span.offsetTop + parseInt(computed['borderTopWidth']),
		    left: span.offsetLeft + parseInt(computed['borderLeftWidth']),
		    height: parseInt(computed['lineHeight'])
		  };

		  if (debug) {
		    span.style.backgroundColor = '#aaa';
		  } else {
		    document.body.removeChild(div);
		  }

		  return coordinates;
		}

		{
		  module.exports = getCaretCoordinates;
		}

		}());
	} (textareaCaret));

	var getCaretCoordinates = textareaCaret.exports;

	/**
	 * Check if the passed argument is the
	 * the passed type.
	 *
	 * @param {string} type
	 * @param {*} arg
	 * @returns {boolean}
	 */
	function isTypeof(type, arg) {
	    return typeof arg === type;
	}

	/**
	 * @type {function(*): boolean}
	 */
	var isString = isTypeof.bind(null, 'string');

	/**
	 * @type {function(*): boolean}
	 */
	var isUndefined = isTypeof.bind(null, 'undefined');

	/**
	 * @type {function(*): boolean}
	 */
	var isFunction = isTypeof.bind(null, 'function');

	/**
	 * @type {function(*): boolean}
	 */
	var isNumber = isTypeof.bind(null, 'number');

	/**
	 * Extends the first object with any extra objects passed
	 *
	 * If the first argument is boolean and set to true
	 * it will extend child arrays and objects recursively.
	 *
	 * @param {!Object|boolean} targetArg
	 * @param {...Object} source
	 * @return {Object}
	 */
	function extend(targetArg, sourceArg) {
	    var isTargetBoolean = targetArg === !!targetArg;
	    var i = isTargetBoolean ? 2 : 1;
	    var target = isTargetBoolean ? sourceArg : targetArg;
	    var isDeep = isTargetBoolean ? targetArg : false;

	    function isObject(value) {
	        return value !== null && typeof value === 'object' &&
	            Object.getPrototypeOf(value) === Object.prototype;
	    }

	    for (; i < arguments.length; i++) {
	        var source = arguments[i];

	        // Copy all properties for jQuery compatibility
	        /* eslint guard-for-in: off */
	        for (var key in source) {
	            var targetValue = target[key];
	            var value = source[key];

	            // Skip undefined values to match jQuery
	            if (isUndefined(value)) {
	                continue;
	            }

	            // Skip special keys to prevent prototype pollution
	            if (key === '__proto__' || key === 'constructor') {
	                continue;
	            }

	            var isValueObject = isObject(value);
	            var isValueArray = Array.isArray(value);

	            if (isDeep && (isValueObject || isValueArray)) {
	                // Can only merge if target type matches otherwise create
	                // new target to merge into
	                var isSameType = isObject(targetValue) === isValueObject &&
	                    Array.isArray(targetValue) === isValueArray;

	                target[key] = extend(
	                    true,
	                    isSameType ? targetValue : (isValueArray ? [] : {}),
	                    value
	                );
	            } else {
	                target[key] = value;
	            }
	        }
	    }

	    return target;
	}


	/*
	 * isElementSupported
	 * Feature test HTML element support 
	 * @param {String} tag
	 * @return {Boolean|Undefined}
	 */

	function isElementSupported(tag) {
	    var toString = {}.toString;
	    if (!window.HTMLUnknownElement) {
	        return undefined;
	    }
	    var element = document.createElement(tag);
	    if (tag.indexOf('-') > -1) {
	        return (
	            element.constructor !== window.HTMLUnknownElement &&
	            element.constructor !== window.HTMLElement
	        );
	    }
	    return toString.call(element) !== '[object HTMLUnknownElement]';
	}
	/**
	 * Iterates over an array or object
	 *
	 * @param {!Object|Array} obj
	 * @param {function(*, *)} fn iterator, element
	 */
	function each(obj, fn) {
	    if (Array.isArray(obj) || 'length' in obj && isNumber(obj.length)) {
	        for (var i = 0; i < obj.length; i++) {
	            fn(i, obj[i]);
	        }
	    } else {
	        Object.keys(obj).forEach(function (key) {
	            fn(key, obj[key]);
	        });
	    }
	}


	function getHtmlTagName(html) {
	    var tag = html.match(/^<(\S*).*>$/);
	    return tag && tag[1];
	}

	const slugify = (text) => {
	    return text
	        .toString()
	        .toLowerCase()
	        .normalize('NFD')
	        .trim()
	        .replace(/\s+/g, '-')
	        .replace(/[^\w\-]+/g, '')
	        .replace(/\-\-+/g, '-');
	};

	const DEFAULT_OPTIONS = defaultOptions;
	const globalDoc = document;

	//http://stackoverflow.com/questions/14880229/how-to-replace-a-substring-between-two-indices
	String.prototype.replaceBetween = function (start, end, what) {
	    return this.substring(0, start) + what + this.substring(end);
	};

	function Editor(origine, customOptions = {}) {
	    const base = this;

	    let editorContainer;

	    let toolbar;

	    let dropdown;

	    let toolbarContainer;

	    let toolbarButtons = {};

	    let btnStateHandlers = [];

	    let shortcutHandlers = {};

	    let emojis = [];

	    let emojisOpen = false;

	    let emojiSearch = "";

	    let init,
	        handleCommand,
	        handleEmojiSearch,
	        handleShortcuts,
	        handleDocumentClick,
	        handleKeyDown,
	        initEditor,
	        initToolBar,
	        initOptions,
	        initEmojis,
	        initEvents,
	        initResize,
	        parseCommandValues,
	        registerCustomElement,
	        fetchEmojis,
	        callEmojis,
	        getEmojis,
	        filterEmojis;

	    base._dropdown = function (button, body, callback, pos) {
	        let content = createElement$1("div");
	        content.appendChild(body());

	        on(content, "click", "button", function (e) {
	            console.log("clicked inside dropdwon?");
	            base.closeDropDown(true);
	            e.preventDefault();
	        });

	        base.createDropDown(button, "base-dropdown", content, pos);
	    };

	    /** @name commands */
	    base.commands = extend(
	        true,
	        {},
	        defaultCommands,
	        customOptions.commands || {}
	    );

	    /** @name opts */
	    const options = (base.opts = extend(
	        true,
	        {},
	        DEFAULT_OPTIONS,
	        customOptions
	    ));

	    /** Create the editor
	     * @private
	     */
	    init = () => {
	        origine._this = base;

	        /** Create editor container */
	        let container = createElement$1("div", {
	            className: "scedaddle__container",
	        });

	        /** Wrap with container */
	        editorContainer = wrapElement(origine, container, true);

	        initEditor();
	        initToolBar();
	        initOptions();
	        initEmojis();
	        initEvents();
	    };

	    initEditor = () => {
	        var placeholder =
	            options.placeholder || attr(origine, "placeholder");

	        if (placeholder) {
	            origine.placeholder = placeholder;
	        }
	    };

	    initOptions = () => {
	        attr(origine, "rows", options.rows);

	        /* init options' based functionnalities */
	        if (options.autoresizeEnabled) {
	            initResize();
	        }

	        if (options.wordCountEnabled) ;

	        /* add additionnal id to container */
	        attr(editorContainer, "id", options.id);
	    };

	    initToolBar = () => {
	        let group;
	        const commands = base.commands,
	            exclude = (options.toolbarExclude || "").split(","),
	            groups = options.toolbar.split("|");

	        toolbar = createElement$1("div", {
	            className: "scedaddle__toolbar",
	            unselectable: "on",
	        });

	        each(groups, (_, menuItems) => {
	            group = createElement$1("div", {
	                className: "scedaddle__buttons",
	            });

	            each(menuItems.split(","), (_, commandName) => {
	                let button, shortcut;
	                const command = commands[commandName];

	                if (!command || exclude.indexOf(commandName) > -1) {
	                    return;
	                }

	                if (
	                    "condition" in command &&
	                    command.condition(base.opts) === false
	                ) {
	                    return;
	                }

	                if (command.shortcut) {
	                    shortcut = command.shortcut;
	                }

	                button = _tmpl(
	                    "toolbarButton",
	                    {
	                        name: commandName,
	                        dispName:
	                            command.name || command.tooltip || commandName,
	                    },
	                    true
	                ).firstChild;

	                console.log(button);

	                if (command.icon) {
	                    let icon = new DOMParser().parseFromString(
	                        command.icon,
	                        "text/xml"
	                    );
	                    if (icon) {
	                        insertBefore(icon.firstChild, button.firstChild);
	                        addClass(button, "has-icon");
	                    }
	                }

	                toggleClass(button, "disabled", !command.exec);
	                on(button, "click", (e) => {
	                    if (!hasClass(button, "disabled")) {
	                        handleCommand(button, command);
	                    }
	                    // updateActiveButtons();
	                    e.preventDefault();
	                });

	                // Prevent editor losing focus when button clicked
	                on(button, "mousedown", function (e) {
	                    base.closeDropDown();
	                    e.preventDefault();
	                });

	                if (
	                    command.format?.toLowerCase() === ("html" )
	                ) {
	                    /* check if wrapper is an existing html element */
	                    if (!command.wrapper)
	                        return console.log(
	                            command.exec + " command is missing a wrapper"
	                        );
	                    let tagName = getHtmlTagName(command.wrapper[0]);
	                    if (tagName && !isElementSupported(tagName)) {
	                        registerCustomElement(tagName);
	                    }
	                }

	                if (command.tooltip) {
	                    // TODO rework des tooltips
	                    attr(
	                        button,
	                        "title",
	                        command.tooltip +
	                            (shortcut ? " (" + shortcut + ")" : "")
	                    );
	                }

	                if (shortcut) {
	                    base.addShortcut(shortcut, commandName);
	                }

	                if (command.state) {
	                    btnStateHandlers.push({
	                        name: commandName,
	                        state: command.state,
	                    });
	                    // exec string commands can be passed to queryCommandState
	                } else if (isString(command.exec)) {
	                    btnStateHandlers.push({
	                        name: commandName,
	                        state: command.exec,
	                    });
	                }

	                appendChild$1(group, button);
	                toolbarButtons[commandName] = button;
	            });

	            if (group.firstChild) {
	                toolbarContainer = toolbar;
	                appendChild$1(toolbar, group);
	            }
	        });

	        appendChild$1(options.toolbarContainer || editorContainer, toolbar);
	    };

	    initEmojis = async () => {
	        new DocumentFragment();
	        const emojisData = await getEmojis();
	        emojisData.forEach((e) => emojis.push(Array.from(e.images)));
	    };

	    callEmojis = () => {
	        const emojisCopy = emojis.map((group) => Array.from(group));
	        console.log(emojisCopy);
	        base._dropdown(
	            origine,
	            function () {
	                console.log("Before:", emojisCopy); // Debugging
	                const content = document.createElement("div");
	                emojisCopy.forEach((group) => {
	                    const groupDiv = createElement$1("div", {
	                        className: "sceditor__emoji-group",
	                    });
	                    group.forEach((img) => {
	                        groupDiv.appendChild(img);
	                    });
	                    content.appendChild(groupDiv);
	                });
	                console.log("After:", emojisCopy); // Debugging */
	                return content;
	            },
	            function () {
	                console.log("");
	            },
	            true
	        );
	    };

	    getEmojis = async () => {
	        try {
	            const emojisURL =
	                "/smilies?mode=smilies_frame&t=" + new Date().getTime();
	            const pages = [];
	            await fetchEmojis({ url: emojisURL, pages });
	            return pages;
	        } catch (error) {
	            console.error("Failed to fetch emojis:", error);
	        }
	    };

	    fetchEmojis = async ({ url, prev = 0, pages }) => {
	        try {
	            const res = await fetch(url + `&categ=${prev}`);
	            if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

	            const html = await res.text();
	            const parser = new DOMParser();
	            const DOM = parser.parseFromString(html, "text/html");
	            pages.push(DOM);

	            const next = [
	                ...DOM.querySelectorAll('select[name="categ"] option'),
	            ].filter((el) => el.value && Number(el.value) > prev);

	            if (next.length > 0) {
	                await fetchEmojis({ url, prev: Number(next[0].value), pages });
	            }
	        } catch (error) {
	            console.error("Error fetching emojis:", error);
	        }
	    };

	    filterEmojis = () => {
	        let filteredEmojis = emojis.map((group) =>
	            group.filter((emoji) => emoji.alt.includes(`:${emojiSearch}`))
	        );

	        updateEmojiDropdown(filteredEmojis);
	    };

	    const updateEmojiDropdown = (filteredEmojis) => {
	        base._dropdown(
	            origine,
	            function () {
	                console.log("Before:", filteredEmojis); // Debugging
	                const content = document.createElement("div");

	                // Parcours des groupes filtrés
	                filteredEmojis.forEach((group) => {
	                    const groupDiv = createElement$1("div", {
	                        className: "sceditor__emoji-group",
	                    });

	                    // Ajout des emojis du groupe à l'élément DOM
	                    group.forEach((img) => {
	                        groupDiv.appendChild(img);
	                    });

	                    content.appendChild(groupDiv);
	                });

	                console.log("After:", filteredEmojis); // Debugging
	                return content;
	            },
	            function () {
	                console.log("");
	            },
	            true
	        );
	    };

	    registerCustomElement = (tagName) => {
	        customElements.define(
	            tagName,
	            class extends HTMLElement {
	                constructor() {
	                    super();
	                    this.attachShadow({ mode: "open" });
	                }
	            }
	        );
	    };

	    initResize = () => {
	        /**
	         * textarea in variable "origine" need to autoresize when content is too long
	         * or when user press enter
	         */

	        on(origine, "input change", function (e) {
	            let computedStyle = getComputedStyle(this);
	            let elementHeight = this.scrollHeight;
	            elementHeight -=
	                parseFloat(computedStyle.paddingTop) +
	                parseFloat(computedStyle.paddingBottom);
	            e.target.style.height = "auto";
	            e.target.style.height = elementHeight + "px";
	        });
	    };

	    initEvents = () => {
	        on(globalDoc, "click", handleDocumentClick);

	        addListeners(origine, ["focus", "blur", "keydown"], (e) => {
	            if (e.type === "focus") {
	                addClass(editorContainer.parentNode, "focus");
	            } else if (e.type === "blur") {
	                removeClass(editorContainer.parentNode, "focus");
	            } else if (e.type === "keydown") {
	                handleKeyDown(e);
	            }
	        });
	    };

	    handleKeyDown = (e) => {
	        if (emojisOpen) {
	            handleEmojiSearch(e);
	        } else {
	            handleShortcuts(e);
	        }
	    };

	    handleEmojiSearch = (e) => {
	        if (["Enter", "Escape", " ", "Backspace"].includes(e.key)) {
	            emojisOpen = false;
	            emojiSearch = "";
	            base.closeDropDown();
	        } else {
	            if (/^[a-zA-Z0-9]$/.test(e.key)) {
	                emojiSearch += e.key; // Ajouter la lettre ou le caractère à la recherche
	            }
	            console.log(emojiSearch);
	            filterEmojis();
	        }
	    };

	    handleShortcuts = (e) => {
	        var shortcut = [],
	            SHIFT_KEYS = {
	                "`": "~",
	                1: "!",
	                2: "@",
	                3: "#",
	                4: "$",
	                5: "%",
	                6: "^",
	                7: "&",
	                8: "*",
	                9: "(",
	                0: ")",
	                "-": "_",
	                "=": "+",
	                ";": ":",
	                "'": '"',
	                ",": "<",
	                ".": ">",
	                "/": "?",
	                "\\": "|",
	                "[": "{",
	                "]": "}",
	            },
	            SPECIAL_KEYS = {
	                8: "backspace",
	                9: "tab",
	                13: "enter",
	                19: "pause",
	                20: "capslock",
	                27: "esc",
	                32: "space",
	                33: "pageup",
	                34: "pagedown",
	                35: "end",
	                36: "home",
	                37: "left",
	                38: "up",
	                39: "right",
	                40: "down",
	                45: "insert",
	                46: "del",
	                91: "win",
	                92: "win",
	                93: "select",
	                96: "0",
	                97: "1",
	                98: "2",
	                99: "3",
	                100: "4",
	                101: "5",
	                102: "6",
	                103: "7",
	                104: "8",
	                105: "9",
	                106: "*",
	                107: "+",
	                109: "-",
	                110: ".",
	                111: "/",
	                112: "f1",
	                113: "f2",
	                114: "f3",
	                115: "f4",
	                116: "f5",
	                117: "f6",
	                118: "f7",
	                119: "f8",
	                120: "f9",
	                121: "f10",
	                122: "f11",
	                123: "f12",
	                144: "numlock",
	                145: "scrolllock",
	                186: ";",
	                187: "=",
	                188: ",",
	                189: "-",
	                190: ".",
	                191: "/",
	                192: "`",
	                219: "[",
	                220: "\\",
	                221: "]",
	                222: "'",
	            },
	            NUMPAD_SHIFT_KEYS = {
	                109: "-",
	                110: "del",
	                111: "/",
	                96: "0",
	                97: "1",
	                98: "2",
	                99: "3",
	                100: "4",
	                101: "5",
	                102: "6",
	                103: "7",
	                104: "8",
	                105: "9",
	            },
	            which = e.which,
	            character =
	                SPECIAL_KEYS[which] || String.fromCharCode(which).toLowerCase();

	        if (e.key == ":") {
	            emojisOpen = true;
	            callEmojis();
	        }

	        if (e.ctrlKey || e.metaKey) {
	            shortcut.push("ctrl");
	        }

	        if (e.altKey) {
	            shortcut.push("alt");
	        }

	        if (e.shiftKey) {
	            shortcut.push("shift");

	            if (NUMPAD_SHIFT_KEYS[which]) {
	                character = NUMPAD_SHIFT_KEYS[which];
	            } else if (SHIFT_KEYS[character]) {
	                character = SHIFT_KEYS[character];
	            }
	        }

	        // Shift is 16, ctrl is 17 and alt is 18
	        if (character && (which < 16 || which > 18)) {
	            shortcut.push(character);
	        }

	        shortcut = shortcut.join("+");
	        if (
	            shortcutHandlers[shortcut] &&
	            shortcutHandlers[shortcut].call(base) === false
	        ) {
	            e.stopPropagation();
	            e.preventDefault();
	        }
	    };

	    /**
	     * Handles any document click and closes the dropdown if open
	     * @private
	     */
	    handleDocumentClick = (e) => {
	        if (e.which !== 3 && dropdown && !e.defaultPrevented) {
	            base.closeDropDown();
	        }
	    };

	    /**
	     * Like wysiwygEditorInsertHtml but inserts text into the
	     * source mode editor instead.
	     *
	     * If endText is specified any selected text will be placed between
	     * text and endText. If no text is selected text and endText will
	     * just be concatenate together.
	     *
	     * The cursor will be placed after the text param. If endText is
	     * specified the cursor will be placed before endText, so passing:<br />
	     *
	     * '[b]', '[/b]'
	     *
	     * Would cause the cursor to be placed:<br />
	     *
	     * [b]Selected text|[/b]
	     *
	     * @param {string} text
	     * @param {string} [endText=null]
	     * @since 1.4.0
	     * @function
	     * @name editorInsertText
	     * @memberOf SCEditor.prototype
	     */
	    base.editorInsertText = (text, endText) => {
	        var scrollTop,
	            currentValue,
	            startPos = origine.selectionStart,
	            endPos = origine.selectionEnd;

	        scrollTop = origine.scrollTop;
	        origine.focus();
	        currentValue = origine.value;

	        if (!startPos || !endPos) {
	            origine.setRangeText(text + endText);
	        }

	        if (endText) {
	            text += currentValue.substring(startPos, endPos) + endText;
	        }

	        origine.value =
	            currentValue.substring(0, startPos) +
	            text +
	            currentValue.substring(endPos, currentValue.length);

	        origine.selectionStart =
	            startPos + text.length - (endText ? endText.length : 0);
	        origine.selectionEnd = origine.selectionStart;

	        origine.scrollTop = scrollTop;
	        origine.focus();
	    };

	    /**
	     * Gets the selected text of the source editor
	     * @return {string}
	     * @private
	     */
	    base.editorSelectedText = () => {
	        origine.focus();

	        return origine.value.substring(base.selectionStart, base.selectionEnd);
	    };

	    base.createDropDown = (menuItem, name, content, pos) => {
	        // first click for create second click for close
	        var dropDownClass = "scedaddle-" + name;

	        base.closeDropDown();

	        // Only close the dropdown if it was already open
	        if (dropdown && hasClass(dropdown, dropDownClass)) {
	            return;
	        }

	        dropdown = createElement$1("div", {
	            className: "sceddadle__dropdown " + dropDownClass,
	        });

	        appendChild$1(dropdown, content);
	        appendChild$1(toolbarContainer, dropdown);
	        on(dropdown, "click focusin", function (e) {
	            // stop clicks within the dropdown from being handled
	            e.stopPropagation();
	        });

	        if (pos) {
	            const { left, top } = getCaretCoordinates(origine);
	            const viewportWidth = window.innerWidth;
	            const textarea = origine.getBoundingClientRect();
	            console.log(left + textarea.left);
	            if (left + textarea.left < viewportWidth / 2) {
	                // Si le caret est dans la première moitié de l'écran, placer le dropdown à droite
	                dropdown.style.left = `-${dropdown.offsetWidth + 24}px`;
	            } else {
	                // Si le caret est dans la deuxième moitié de l'écran, placer le dropdown à gauche
	                dropdown.style.left = `${textarea.width + 24}px`;
	            }
	        }

	        /*
	        if (dropdown) {
	            var first = dom.find(dropdown, 'input,textarea')[0];
	            if (first) {
	                first.focus();
	            }
	        }
	        */
	    };

	    base.closeDropDown = (focus) => {
	        if (dropdown) {
	            remove(dropdown);
	            dropdown = null;
	        }

	        if (focus === true) {
	            origine.focus();
	        }
	    };

	    /**
	     * Create a new menu with tabs
	     * @public
	     * @param {string} name Menu name
	     * @param {object} obj The object key/value pairs of tab name and content
	     * The value can be a html parsable string (or a function that returns a html parsable string)
	     */
	    base.createMenu = (menuName, obj) => {
	        // tabs can only exists inside dropdowns;
	        if (!menuName) {
	            return;
	        }

	        let names = Object.keys(obj),
	            contents = Object.values(obj),
	            tabs = new DocumentFragment();

	        if (localStorage.getItem("scedaddle-" + menuName) === null) {
	            localStorage.setItem("scedaddle-" + menuName, 0);
	        }

	        let activeIndex = Number(localStorage.getItem("scedaddle-" + menuName));

	        let container = createElement$1("div", {
	            className: "scedaddle__tabs",
	        });

	        let tabList = createElement$1("ul", {
	            className: "scedaddle__tabs-list",
	        });

	        each(names, (i, name) => {
	            let tab = createElement$1("li", {
	                className:
	                    "scedaddle__tabs-item" +
	                    (activeIndex === i ? " active" : ""),
	            });

	            data(tab, "tab", slugify(name));
	            tab.innerText = name;
	            appendChild$1(tabList, tab);
	        });

	        appendChild$1(container, tabList);

	        let contentWrapper = createElement$1("div", {
	            className: "scedaddle__tabs-wrapper",
	        });

	        each(contents, (i, content) => {
	            let tabContent = createElement$1("div", {
	                className:
	                    "scedaddle__tabs-content" +
	                    (activeIndex === i ? " active" : ""),
	            });

	            data(tabContent, "content", slugify(names[i]));
	            appendChild$1(
	                tabContent,
	                isString(content) ? parseHTML$1(content) : content
	            );
	            /* */
	            appendChild$1(contentWrapper, tabContent);
	        });

	        appendChild$1(container, contentWrapper);
	        appendChild$1(tabs, container);

	        on(tabList, "click", "li", function (e) {
	            let tab = e.target;
	            // get index of tab
	            let index = Array.prototype.indexOf.call(tabList.children, tab);
	            let tabName = data(tab, "tab");
	            let content = find(
	                contentWrapper,
	                '[data-content="' + tabName + '"]'
	            )[0];

	            find(tabList, "li.active")[0].classList.remove("active");
	            addClass(tab, "active");

	            find(
	                contentWrapper,
	                ".scedaddle__tabs-content.active"
	            )[0].classList.remove("active");
	            addClass(content, "active");

	            localStorage.setItem("scedaddle-" + menuName, index);
	        });

	        return tabs;
	    };

	    /**
	     * Adds a shortcut handler to the editor
	     * @param  {string}          shortcut
	     * @param  {String|Function} cmd
	     * @return {sceditor}
	     */
	    base.addShortcut = (shortcut, cmd) => {
	        shortcut = shortcut.toLowerCase();

	        if (isString(cmd)) {
	            shortcutHandlers[shortcut] = function () {
	                handleCommand(toolbarButtons[cmd], base.commands[cmd]);

	                return false;
	            };
	        } else {
	            shortcutHandlers[shortcut] = cmd;
	        }

	        return base;
	    };

	    /**
	     *
	     * @param {string} name a label for the command
	     * @param {CmdObject} caller the command object
	     * @param {string|number|array} value the value to set
	     */
	    base.execWrapCommand = (caller, ...value) => {
	        origine.focus();

	        base.editorSelectedText();
	        if (caller.wrapper) {
	            let wrapper = caller.wrapper;
	            if (!Array.isArray(wrapper)) {
	                wrapper = wrapper.split("|");
	            }

	            if (value) {
	                base.editorInsertText(
	                    parseCommandValues(wrapper[0], value),
	                    parseCommandValues(wrapper[1], value)
	                );
	            } else {
	                base.editorInsertText(wrapper[0], wrapper[1]);
	            }
	        }
	        return;
	    };

	    parseCommandValues = (text, ...values) => {
	        let regex = /\{(\d+)\}/g;

	        if (values.length === 1) return text.replace(regex, values);

	        return text.replace(regex, function (...args) {
	            return values[Number(args[1])];
	        });
	    };

	    handleCommand = (caller, cmd) => {
	        if (cmd.exec) {
	            if (isFunction(cmd.exec)) {
	                cmd.exec.call(base, caller);
	            } else {
	                base.execWrapCommand(cmd);
	            }
	        }
	    };

	    // run the initializer
	    init();
	}

	return Editor;

})();

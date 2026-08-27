/**
 * DOM helpers used by the editor.
 *
 * Previously imported from an external Helpers folder, now bundled
 * with the source so the project builds standalone.
 */
import { each } from './utils.js';

/**
 * Creates an element with the passed attributes.
 *
 * Keys that exist as a property on the element are assigned directly
 * (className, innerHTML, type, ...), the others are set as attributes.
 *
 * @param {string} tag
 * @param {Object} [attributes]
 * @param {Document} [context]
 * @returns {HTMLElement}
 */
export function createElement(tag, attributes, context) {
    var node = (context || document).createElement(tag);

    each(attributes || {}, function (key, value) {
        if (key === 'style') {
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
 * Parses an HTML string into a DocumentFragment.
 *
 * @param {string} html
 * @param {Document} [context]
 * @returns {DocumentFragment}
 */
export function parseHTML(html, context) {
    var doc = context || document;
    var container = doc.createElement('div');
    var fragment = doc.createDocumentFragment();

    container.innerHTML = html;

    while (container.firstChild) {
        fragment.appendChild(container.firstChild);
    }

    return fragment;
}

/**
 * Appends child to node. Accepts nodes and document fragments.
 *
 * @param {Node} node
 * @param {Node} child
 */
export function appendChild(node, child) {
    node.appendChild(child);
}

/**
 * Inserts node before refNode.
 *
 * @param {Node} node
 * @param {Node} refNode
 */
export function insertBefore(node, refNode) {
    refNode.parentNode.insertBefore(node, refNode);
}

/**
 * Removes node from its parent.
 *
 * @param {Node} node
 */
export function remove(node) {
    if (node && node.parentNode) {
        node.parentNode.removeChild(node);
    }
}

/**
 * Wraps node inside wrapper, keeping node's position in the document.
 *
 * @param {Node} node
 * @param {HTMLElement} wrapper
 * @param {boolean} [returnWrapper] return the wrapper instead of the node
 * @returns {Node|HTMLElement}
 */
export function wrapElement(node, wrapper, returnWrapper) {
    if (node.parentNode) {
        node.parentNode.insertBefore(wrapper, node);
    }

    wrapper.appendChild(node);

    return returnWrapper ? wrapper : node;
}

/**
 * Returns all descendants of node matching the selector.
 *
 * @param {HTMLElement|Document} node
 * @param {string} selector
 * @returns {NodeList}
 */
export function find(node, selector) {
    return node.querySelectorAll(selector);
}

/**
 * Attaches a handler for one or more space separated events.
 *
 * If a selector is passed the handler is delegated: it only runs when
 * the event target matches (or is inside) the selector, with `this`
 * bound to the matched element.
 *
 * @param {Node} node
 * @param {string} events space separated event names
 * @param {string|function} selector selector or handler
 * @param {function} [fn] handler when a selector is used
 */
export function on(node, events, selector, fn) {
    var handler = fn;

    if (typeof selector === 'function') {
        handler = selector;
        selector = null;
    }

    events.split(' ').forEach(function (eventName) {
        if (!eventName) {
            return;
        }

        node.addEventListener(eventName, function (e) {
            if (!selector) {
                handler.call(node, e);
                return;
            }

            var target = e.target;

            while (target && target !== node) {
                if (target.nodeType === 1 && target.matches(selector)) {
                    handler.call(target, e);
                    return;
                }

                target = target.parentNode;
            }
        });
    });
}

/**
 * Attaches the same handler to a list of events.
 *
 * @param {Node} node
 * @param {string[]} events
 * @param {function} fn
 */
export function addListeners(node, events, fn) {
    events.forEach(function (eventName) {
        node.addEventListener(eventName, fn);
    });
}

/**
 * Gets or sets an attribute.
 *
 * Passing null as the value removes the attribute.
 *
 * @param {HTMLElement} node
 * @param {string} name
 * @param {string|null} [value]
 * @returns {string|undefined} the value when used as a getter
 */
export function attr(node, name, value) {
    if (arguments.length < 3) {
        return node.getAttribute(name);
    }

    if (value === null) {
        node.removeAttribute(name);
    } else {
        node.setAttribute(name, value);
    }
}

/**
 * Gets or sets a `data-` attribute.
 *
 * @param {HTMLElement} node
 * @param {string} name
 * @param {string} [value]
 * @returns {string|undefined} the value when used as a getter
 */
export function data(node, name, value) {
    var key = 'data-' + name;

    if (arguments.length < 3) {
        return attr(node, key);
    }

    attr(node, key, value);
}

/**
 * @param {HTMLElement} node
 * @param {string} className
 * @returns {boolean}
 */
export function hasClass(node, className) {
    return node.classList.contains(className);
}

/**
 * @param {HTMLElement} node
 * @param {string} className
 */
export function addClass(node, className) {
    node.classList.add(className);
}

/**
 * @param {HTMLElement} node
 * @param {string} className
 */
export function removeClass(node, className) {
    node.classList.remove(className);
}

/**
 * Toggles className, or forces it on/off when state is passed.
 *
 * @param {HTMLElement} node
 * @param {string} className
 * @param {boolean} [state]
 */
export function toggleClass(node, className, state) {
    if (arguments.length < 3) {
        node.classList.toggle(className);
    } else {
        node.classList.toggle(className, !!state);
    }
}

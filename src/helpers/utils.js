/**
 * Utility helpers used by the editor.
 *
 * Previously imported from an external Helpers folder, now bundled
 * with the source so the project builds standalone.
 */

/**
 * @param {*} value
 * @returns {boolean}
 */
export function isString(value) {
    return typeof value === 'string';
}

/**
 * @param {*} value
 * @returns {boolean}
 */
export function isFunction(value) {
    return typeof value === 'function';
}

/**
 * @param {*} value
 * @returns {boolean}
 */
export function isObject(value) {
    return value !== null && typeof value === 'object';
}

/**
 * True only for `{}` literals, so DOM nodes, dates, regexes and class
 * instances are never cloned by `extend`.
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isPlainObject(value) {
    if (!isObject(value) || Array.isArray(value)) {
        return false;
    }

    var proto = Object.getPrototypeOf(value);

    return proto === null || proto === Object.prototype;
}

/**
 * Iterates over an array or object calling fn(key, value) for each entry.
 *
 * Returning false from fn stops the iteration.
 *
 * @param {Array|Object} obj
 * @param {function(string|number, *)} fn
 */
export function each(obj, fn) {
    if (!obj) {
        return;
    }

    if (Array.isArray(obj) || typeof obj.length === 'number') {
        for (var i = 0; i < obj.length; i++) {
            if (fn.call(obj[i], i, obj[i]) === false) {
                return;
            }
        }
    } else {
        var keys = Object.keys(obj || {});

        for (var j = 0; j < keys.length; j++) {
            if (fn.call(obj[keys[j]], keys[j], obj[keys[j]]) === false) {
                return;
            }
        }
    }
}

/**
 * Merges the properties of the source objects into the target.
 *
 * If the first argument is `true` the merge is done recursively.
 *
 * @param {boolean|Object} targetArg
 * @param {...Object} sourceArgs
 * @returns {Object}
 */
export function extend(targetArg) {
    var deep = targetArg === true;
    var i = deep ? 2 : 1;
    var target = deep ? arguments[1] : targetArg;

    if (!isObject(target) && !isFunction(target)) {
        target = {};
    }

    for (; i < arguments.length; i++) {
        var source = arguments[i];

        if (!isObject(source)) {
            continue;
        }

        each(source, function (key, value) {
            var current = target[key];

            if (deep && Array.isArray(value)) {
                target[key] = extend(
                    true, Array.isArray(current) ? current : [], value
                );
            } else if (deep && isPlainObject(value)) {
                target[key] = extend(
                    true, isPlainObject(current) ? current : {}, value
                );
            } else if (value !== undefined) {
                target[key] = value;
            }
        });
    }

    return target;
}

/**
 * Extracts the tag name from an HTML string like `<my-tag attr="x">`.
 *
 * @param {string} html
 * @returns {?string} lowercased tag name or null
 */
export function getHtmlTagName(html) {
    if (!isString(html)) {
        return null;
    }

    var match = html.match(/<\s*([a-z][^\s/>]*)/i);

    return match ? match[1].toLowerCase() : null;
}

/**
 * Checks if the browser natively knows the passed tag name.
 *
 * @param {string} tagName
 * @returns {boolean}
 */
export function isElementSupported(tagName) {
    if (!tagName) {
        return false;
    }

    var element = document.createElement(tagName);

    return !(element instanceof HTMLUnknownElement);
}

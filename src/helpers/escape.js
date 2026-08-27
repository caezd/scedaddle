/**
 * Escaping helpers.
 */

/**
 * Escapes all regex special characters so the string can safely be used
 * inside a `RegExp`.
 *
 * @param {string} str
 * @returns {string}
 */
export function regex(str) {
    return !str ? '' : str.replace(/([\-.*+?^${}()|[\]\/\\])/g, '\\$1');
}

/**
 * Escapes the characters that have a meaning in HTML.
 *
 * @param {string} str
 * @returns {string}
 */
export function entities(str) {
    return !str ? str : str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&#34;')
        .replace(/'/g, '&#39;');
}

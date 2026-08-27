import * as dom from './helpers/dom.js';
import * as escape from './helpers/escape.js';


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
export default function (name, params, createHtml) {
    var template = _templates[name];

    Object.keys(params).forEach(function (name) {
        template = template.replace(
            new RegExp(escape.regex('{' + name + '}'), 'g'), params[name]
        );
    });

    if (createHtml) {
        template = dom.parseHTML(template);
    }

    return template;
};
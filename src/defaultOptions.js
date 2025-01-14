import { attr } from "../../Helpers/DOM.js";

export default {
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

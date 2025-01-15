import { getRange, isSelectionInside } from "./selection.js";
import defaultCommands from "./defaultCommands.js";
import defaultOptions from "./defaultOptions.js";
import _tmpl from "./templates.js";
import getCaretCoordinates from "textarea-caret";

import * as dom from "../../Helpers/DOM.js";
import * as utils from "../../Helpers/Utils.js";
import { slugify } from "../../Helpers/String.js";

const DEFAULT_OPTIONS = defaultOptions;

const globalWin = window;
const globalDoc = document;

//http://stackoverflow.com/questions/14880229/how-to-replace-a-substring-between-two-indices
String.prototype.replaceBetween = function (start, end, what) {
    return this.substring(0, start) + what + this.substring(end);
};

export default function Editor(origine, customOptions = {}) {
    const base = this;

    let format;

    let editorContainer;

    let eventHandlers = {};

    let toolbar;

    let dropdown;

    let menu;

    let isComposing;

    let toolbarContainer;

    let toolbarButtons = {};

    let rangeHelper;

    let btnStateHandlers = [];

    let currentNode;

    let currentSelection;

    let shortcutHandlers = {};

    let emojis = [];

    let emojisOpen = false;

    let emojiSearch = "";

    /** The min and max heights that autoExpand should stay within. */
    let autoExpandBounds;

    let init,
        handleCommand,
        handleMouseDown,
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
        let content = dom.createElement("div");
        content.appendChild(body());

        dom.on(content, "click", "button", function (e) {
            console.log("clicked inside dropdwon?");
            base.closeDropDown(true);
            e.preventDefault();
        });

        base.createDropDown(button, "base-dropdown", content, pos);
    };

    /** @name commands */
    base.commands = utils.extend(
        true,
        {},
        defaultCommands,
        customOptions.commands || {}
    );

    /** @name opts */
    const options = (base.opts = utils.extend(
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
        let container = dom.createElement("div", {
            className: "scedaddle__container",
        });

        /** Wrap with container */
        editorContainer = dom.wrapElement(origine, container, true);

        initEditor();
        initToolBar();
        initOptions();
        initEmojis();
        initEvents();
    };

    initEditor = () => {
        var placeholder =
            options.placeholder || dom.attr(origine, "placeholder");

        if (placeholder) {
            origine.placeholder = placeholder;
        }
    };

    initOptions = () => {
        dom.attr(origine, "rows", options.rows);

        /* init options' based functionnalities */
        if (options.autoresizeEnabled) {
            initResize();
        }

        if (options.wordCountEnabled) {
            // initWordCount();
        }

        /* add additionnal id to container */
        dom.attr(editorContainer, "id", options.id);
    };

    initToolBar = () => {
        let group;
        const commands = base.commands,
            exclude = (options.toolbarExclude || "").split(","),
            groups = options.toolbar.split("|");

        toolbar = dom.createElement("div", {
            className: "scedaddle__toolbar",
            unselectable: "on",
        });

        utils.each(groups, (_, menuItems) => {
            group = dom.createElement("div", {
                className: "scedaddle__buttons",
            });

            utils.each(menuItems.split(","), (_, commandName) => {
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
                        dom.insertBefore(icon.firstChild, button.firstChild);
                        dom.addClass(button, "has-icon");
                    }
                }

                dom.toggleClass(button, "disabled", !command.exec);
                dom.on(button, "click", (e) => {
                    if (!dom.hasClass(button, "disabled")) {
                        handleCommand(button, command);
                    }
                    // updateActiveButtons();
                    e.preventDefault();
                });

                // Prevent editor losing focus when button clicked
                dom.on(button, "mousedown", function (e) {
                    base.closeDropDown();
                    e.preventDefault();
                });

                if (
                    command.format?.toLowerCase() === ("html" || "customhtml")
                ) {
                    /* check if wrapper is an existing html element */
                    if (!command.wrapper)
                        return console.log(
                            command.exec + " command is missing a wrapper"
                        );
                    let tagName = utils.getHtmlTagName(command.wrapper[0]);
                    if (tagName && !utils.isElementSupported(tagName)) {
                        registerCustomElement(tagName);
                    }
                }

                if (command.tooltip) {
                    // TODO rework des tooltips
                    dom.attr(
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
                } else if (utils.isString(command.exec)) {
                    btnStateHandlers.push({
                        name: commandName,
                        state: command.exec,
                    });
                }

                dom.appendChild(group, button);
                toolbarButtons[commandName] = button;
            });

            if (group.firstChild) {
                toolbarContainer = toolbar;
                dom.appendChild(toolbar, group);
            }
        });

        dom.appendChild(options.toolbarContainer || editorContainer, toolbar);
    };

    initEmojis = async () => {
        const fragment = new DocumentFragment();
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
                    const groupDiv = dom.createElement("div", {
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
                    const groupDiv = dom.createElement("div", {
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

        dom.on(origine, "input change", function (e) {
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
        dom.on(globalDoc, "click", handleDocumentClick);

        dom.addListeners(origine, ["focus", "blur", "keydown"], (e) => {
            if (e.type === "focus") {
                dom.addClass(editorContainer.parentNode, "focus");
            } else if (e.type === "blur") {
                dom.removeClass(editorContainer.parentNode, "focus");
            } else if (e.type === "keydown") {
                handleKeyDown(e);
            }
        });
    };

    handleMouseDown = () => {
        base.closeDropDown();
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
        var dropDownCss,
            dropDownClass = "scedaddle-" + name;

        base.closeDropDown();

        // Only close the dropdown if it was already open
        if (dropdown && dom.hasClass(dropdown, dropDownClass)) {
            return;
        }

        dropdown = dom.createElement("div", {
            className: "sceddadle__dropdown " + dropDownClass,
        });

        dom.appendChild(dropdown, content);
        dom.appendChild(toolbarContainer, dropdown);
        dom.on(dropdown, "click focusin", function (e) {
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
            dom.remove(dropdown);
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

        let container = dom.createElement("div", {
            className: "scedaddle__tabs",
        });

        let tabList = dom.createElement("ul", {
            className: "scedaddle__tabs-list",
        });

        utils.each(names, (i, name) => {
            let tab = dom.createElement("li", {
                className:
                    "scedaddle__tabs-item" +
                    (activeIndex === i ? " active" : ""),
            });

            dom.data(tab, "tab", slugify(name));
            tab.innerText = name;
            dom.appendChild(tabList, tab);
        });

        dom.appendChild(container, tabList);

        let contentWrapper = dom.createElement("div", {
            className: "scedaddle__tabs-wrapper",
        });

        utils.each(contents, (i, content) => {
            let tabContent = dom.createElement("div", {
                className:
                    "scedaddle__tabs-content" +
                    (activeIndex === i ? " active" : ""),
            });

            dom.data(tabContent, "content", slugify(names[i]));
            dom.appendChild(
                tabContent,
                utils.isString(content) ? dom.parseHTML(content) : content
            );
            /* */
            dom.appendChild(contentWrapper, tabContent);
        });

        dom.appendChild(container, contentWrapper);
        dom.appendChild(tabs, container);

        menu = tabs;

        dom.on(tabList, "click", "li", function (e) {
            let tab = e.target;
            // get index of tab
            let index = Array.prototype.indexOf.call(tabList.children, tab);
            let tabName = dom.data(tab, "tab");
            let content = dom.find(
                contentWrapper,
                '[data-content="' + tabName + '"]'
            )[0];

            dom.find(tabList, "li.active")[0].classList.remove("active");
            dom.addClass(tab, "active");

            dom.find(
                contentWrapper,
                ".scedaddle__tabs-content.active"
            )[0].classList.remove("active");
            dom.addClass(content, "active");

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

        if (utils.isString(cmd)) {
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

        let selectedText = base.editorSelectedText();
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
            if (utils.isFunction(cmd.exec)) {
                cmd.exec.call(base, caller);
            } else {
                base.execWrapCommand(cmd);
            }
        }
    };

    // run the initializer
    init();
}

import ColorPicker from "simple-color-picker";
import * as dom from "../../Helpers/DOM.js";
import Potion from "@poumon/potion";

import Icon from "./icons.js";

import _tmpl from "./templates.js";

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
const iconSize = 24;

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
            var list = dom.createElement("ul", {
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
                colorPicker = (cmd._colorPicker = new ColorPicker({
                    width: 200,
                    height: 200,
                }));

            let colorPickerContainer = dom.createElement("div", {
                className: "scedaddle__colorpicker-container",
            });

            colorPicker.appendTo(colorPickerContainer);

            let input = dom.createElement("input", {
                className: "scedaddle__colorpicker-input",
                type: "text",
            });

            let addButton = dom.createElement("span", {
                className: "scedaddle__colorpicker-add add-color",
                innerHTML: "+",
            });

            colorPickerContainer.appendChild(input);
            colorPickerContainer.appendChild(addButton);

            let customColorsContainer = dom.createElement("div", {
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
            let content = dom.createElement("div"),
                cmd = defaultCommands.color,
                { content: customTabContent, instance: customListInstance } =
                    cmd._customColors();

            /* TODO put some cache of tabs */

            var tabs = editor.createMenu("color-picker", {
                Default: cmd._faColors(),
                Material: cmd._materialColors(materialColors),
                Custom: customTabContent,
            });

            dom.appendChild(content, tabs);

            dom.on(content, "click", "span[data-color]", function (e) {
                console.log("hey");
                callback(dom.data(this, "color"));
                editor.closeDropDown(true);
                e.preventDefault();
            });
            dom.on(content, "contextmenu", "span[data-color]", function (ev) {
                ev.preventDefault();
                const index = Array.prototype.indexOf.call(
                    this.parentNode.children,
                    ev.target
                );
                cmd._removeCustomColor(index);
                cmd._customColors(true, customListInstance);
            });

            dom.on(content, "click", ".add-color", function (e) {
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
            let html = "";

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
            let content = dom.createElement("div"),
                cmd = defaultCommands.presets;

            /* let template = new Potion("<div>{{test}}</div>");
            const test = template.render({
                test: "hey",
            }); */

            const presets = editor.opts?.presets;

            const tabs = editor.createMenu("presets", {
                Prédéfinis: cmd._presetList(),
                Créer: cmd._presetCreation(),
            });

            dom.appendChild(content, tabs);

            dom.on(content, "click", "button", function (e) {
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

export default defaultCommands;

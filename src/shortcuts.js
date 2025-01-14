import * as utils from '../../Helpers/utils.js';

const shortcutHandlers = {};

const addShortcut = (shortcut, cmd) => {
    shortcut = shortcut.toLowerCase();

    if (utils.isString(cmd)) {
        shortcutHandlers[shortcut] = function () {
            handleCommand(toolbarButtons[cmd], base.commands[cmd]);

            return false;
        };
    } else {
        shortcutHandlers[shortcut] = cmd;
    }
    console.log(shortcutHandlers[shortcut])
};

const handleKeyDown = function (e) {
    var shortcut = [],
        SHIFT_KEYS = {
            '`': '~',
            '1': '!',
            '2': '@',
            '3': '#',
            '4': '$',
            '5': '%',
            '6': '^',
            '7': '&',
            '8': '*',
            '9': '(',
            '0': ')',
            '-': '_',
            '=': '+',
            ';': ': ',
            '\'': '"',
            ',': '<',
            '.': '>',
            '/': '?',
            '\\': '|',
            '[': '{',
            ']': '}'
        },
        SPECIAL_KEYS = {
            8: 'backspace',
            9: 'tab',
            13: 'enter',
            19: 'pause',
            20: 'capslock',
            27: 'esc',
            32: 'space',
            33: 'pageup',
            34: 'pagedown',
            35: 'end',
            36: 'home',
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            45: 'insert',
            46: 'del',
            91: 'win',
            92: 'win',
            93: 'select',
            96: '0',
            97: '1',
            98: '2',
            99: '3',
            100: '4',
            101: '5',
            102: '6',
            103: '7',
            104: '8',
            105: '9',
            106: '*',
            107: '+',
            109: '-',
            110: '.',
            111: '/',
            112: 'f1',
            113: 'f2',
            114: 'f3',
            115: 'f4',
            116: 'f5',
            117: 'f6',
            118: 'f7',
            119: 'f8',
            120: 'f9',
            121: 'f10',
            122: 'f11',
            123: 'f12',
            144: 'numlock',
            145: 'scrolllock',
            186: ';',
            187: '=',
            188: ',',
            189: '-',
            190: '.',
            191: '/',
            192: '`',
            219: '[',
            220: '\\',
            221: ']',
            222: '\''
        },
        NUMPAD_SHIFT_KEYS = {
            109: '-',
            110: 'del',
            111: '/',
            96: '0',
            97: '1',
            98: '2',
            99: '3',
            100: '4',
            101: '5',
            102: '6',
            103: '7',
            104: '8',
            105: '9'
        },
        which = e.which,
        character = SPECIAL_KEYS[which] ||
            String.fromCharCode(which).toLowerCase();

    if (e.ctrlKey || e.metaKey) {
        shortcut.push('ctrl');
    }

    if (e.altKey) {
        shortcut.push('alt');
    }

    if (e.shiftKey) {
        shortcut.push('shift');

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

    shortcut = shortcut.join('+');
    if (shortcutHandlers[shortcut]) {


        e.stopPropagation();
        e.preventDefault();
    }
};

export {
    addShortcut,
    handleKeyDown,
    shortcutHandlers
}
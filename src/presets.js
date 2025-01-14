const base = {
    name: '',
    icon: '', // html allowed
    type: '',
    openTag: '',
    closeTag: '',
};


const bold = {
    name: 'bold',
    icon: '<i class="bi bi-type-bold"></i>',
    type: 'bbcode',
    openTag: '[b]',
    closeTag: '[/b]',
    shortcut: 'ctrl+b',
};

const italic = {
    name: 'bold',
    icon: '<i class="bi bi-type-italic"></i>',
    type: 'bbcode',
    openTag: '[i]',
    closeTag: '[/i]',
    shortcut: 'ctrl+i',
};

const underline = {
    name: 'underline',
    icon: '<i class="bi bi-type-underline"></i>', // html allowed
    type: 'bbcode',
    openTag: '[u]',
    closeTag: '[/u]',
};

const strikethrough = {
    name: 'strikethrough',
    icon: '<i class="bi bi-type-strikethrough"></i>', // html allowed
    type: 'bbcode',
    openTag: '[s]',
    closeTag: '[/s]',
};



const left = {
    name: 'left',
    icon: '<i class="bi bi-text-left"></i>', // html allowed
    type: 'bbcode',
    openTag: '[left]',
    closeTag: '[/left]',
}
const center = {
    name: 'center',
    icon: '<i class="bi bi-text-center"></i>', // html allowed
    type: 'bbcode',
    openTag: '[center]',
    closeTag: '[/center]',
}
const right = {
    name: 'right',
    icon: '<i class="bi bi-text-right"></i>', // html allowed
    type: 'bbcode',
    openTag: '[right]',
    closeTag: '[/right]',
}
const justify = {
    name: 'justify',
    icon: '<i class="bi bi-justify"></i>', // html allowed
    type: 'bbcode',
    openTag: '[justify]',
    closeTag: '[/justify]',
}

export const presetButtons = [
    [bold, italic, underline, strikethrough],
    [left, center, right, justify]
]
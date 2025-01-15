const getRange = () => {
    const selection = document.getSelection();
    if (selection.rangeCount === 0) return;
    return selection.getRangeAt(0);
};

const isSelectionInside = (el) => {
    var sel = window.getSelection();
    if (sel.rangeCount > 0) {
        for (var i = 0; i < sel.rangeCount; ++i) {
            if (!el.contains(sel.getRangeAt(i).commonAncestorContainer)) {
                return false;
            }
        }
        return true;
    }
    return false;
};

const getCaretCoordinatesRelativeToContainer = (
    textarea,
    caretPos,
    container
) => {
    const div = document.createElement("div");
    const style = window.getComputedStyle(textarea);

    // Copie les styles du textarea
    for (const prop of style) {
        div.style[prop] = style[prop];
    }

    div.style.position = "absolute";
    div.style.whiteSpace = "pre-wrap";
    div.style.visibility = "hidden";
    div.style.width = `${textarea.offsetWidth}px`;

    // Texte avant et après le caret
    const textBeforeCaret = textarea.value.substring(0, caretPos);
    const textAfterCaret = textarea.value.substring(caretPos) || ".";

    div.textContent = textBeforeCaret;

    const span = document.createElement("span");
    span.textContent = textAfterCaret[0];
    div.appendChild(span);

    document.body.appendChild(div);

    const spanRect = span.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const coordinates = {
        top: spanRect.top - containerRect.top,
        left: spanRect.left - containerRect.left,
    };

    document.body.removeChild(div);
    return coordinates;
};

const getCaretCoordinates = (el, caretPos) => {
    console.log(caretPos);
};

export { getRange, isSelectionInside };

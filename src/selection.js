const getRange = () => {
    const selection = document.getSelection();
    if (selection.rangeCount === 0) return
    return selection.getRangeAt(0)
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

export {
    getRange,
    isSelectionInside
}
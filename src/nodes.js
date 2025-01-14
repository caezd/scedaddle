const copyPasteChildNodes = (pasteDOM, copyDOM) => {
    while (copyDOM.childNodes.length > 0) {
        pasteDOM.appendChild(copyDOM.childNodes[0]);
    }
    return pasteDOM
};

export {
    copyPasteChildNodes
}
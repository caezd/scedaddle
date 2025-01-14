$.sceditor.ie = (function () {
    var undef,
        v = 3,
        div = document.createElement("div"),
        all = div.getElementsByTagName("i");
    do {
        div.innerHTML = "<!--[if gt IE " + ++v + "]><i></i><![endif]-->";
    } while (all[0]);
    if (document.all && window.atob) {
        v = 10;
    } else if (!!window.MSStream && "ActiveXObject" in window) {
        v = 11;
    }
    return v > 4 ? v : undef;
})();
var FA_SCEditor = {
    characters: {
        FASpecialCharacters: [
            ";",
            " ",
            '"',
            "<",
            ">",
            "%",
            "|",
            "\\",
            "^",
            "~",
            "[",
            "]",
            "`",
        ],
        FAEncodedCharacters: [
            "%3B",
            "%20",
            "%22",
            "%3C",
            "%3E",
            "%25",
            "%7C",
            "%5C",
            "%5E",
            "%7E",
            "%5B",
            "%5D",
            "%60",
        ],
    },
    functions: {
        FAdecodeURI: function (url) {
            for (
                var i = 0;
                i < FA_SCEditor.characters.FAEncodedCharacters.length;
                i++
            ) {
                url = url.replace(
                    new RegExp(
                        FA_SCEditor.characters.FAEncodedCharacters[i],
                        "g"
                    ),
                    FA_SCEditor.characters.FASpecialCharacters[i]
                );
            }
            return url;
        },
        showHideToolbarElements: function () {
            if (
                $(".sceditor-button-subscript").parent().css("display") !==
                "none"
            ) {
                $(".sceditor-button-subscript").parent().css("display", "none");
                $(".sceditor-button-fascroll").parent().css("display", "none");
            } else {
                $(".sceditor-button-subscript")
                    .parent()
                    .css("display", "inline-block");
                $(".sceditor-button-fascroll")
                    .parent()
                    .css("display", "inline-block");
            }
        },
        getUploadFrame: function () {
            var uploadFrame = null;
            if ($(".sceditor-tinypic").length === 1)
                uploadFrame = $(".sceditor-tinypic");
            else if ($(".sceditor-servimg").length === 1)
                uploadFrame = $(".sceditor-servimg");
            if (uploadFrame) {
                $(document).click(function () {
                    uploadFrame.css("display", "none");
                });
            }
            return uploadFrame;
        },
        closeDropDown: function () {
            var uploadFrame = null,
                emoticonFrame = null;
            if ($(".sceditor-tinypic").length === 1)
                uploadFrame = $(".sceditor-tinypic");
            else if ($(".sceditor-servimg").length === 1)
                uploadFrame = $(".sceditor-servimg");
            if ($(".sceditor-emoticon").length === 1)
                emoticonFrame = $(".sceditor-emoticon");
            if (uploadFrame) {
                uploadFrame.css("display", "none");
            }
            if (emoticonFrame) {
                emoticonFrame.css("display", "none");
            }
        },
        toggleSourceMode: function () {
            var editor = $("#text_editor_textarea").sceditor("instance");
            var end = editor.getSourceEditorValue()
                ? editor.getSourceEditorValue().substr(-6, 6)
                : "<br />";
            if (editor.inSourceMode())
                editor.setSourceEditorValue(editor.getWysiwygEditorValue());
            else editor.setWysiwygEditorValue(editor.getSourceEditorValue());
        },
    },
};
$.sceditor.regexEscape = function (str) {
    return str
        .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
        .replace("<", "&lt;")
        .replace(">", "&gt;");
};
$.sceditor.command.set("source", {
    exec: function (caller) {
        this.toggleSourceMode();
        this.blur();
        $.cookie("WYSIWYG_STATE", "0", { expires: 365 });
        caller.addClass("hover");
    },
    txtExec: function (caller) {
        this.toggleSourceMode();
        this.blur();
        $.cookie("WYSIWYG_STATE", "1", { expires: 365 });
        caller.removeClass("hover");
    },
    tooltip: "Switch Editor Mode",
    shortcut: "ctrl+shift+s",
});
$.sceditor.command.set("", {});
$.sceditor.command.set("font", {
    _dropDown: function (editor, caller, callback) {
        var fonts = editor.opts.fonts.split(","),
            content = $('<div class="url" />'),
            clickFunc = function () {
                callback($(this).data("font"));
                editor.closeDropDown(true);
                return false;
            };
        for (var i = 0; i < fonts.length; i++)
            content.append(
                $(
                    '<a class="sceditor-font-option" href="#" data-font="' +
                        fonts[i] +
                        '"><font face="' +
                        fonts[i] +
                        '">' +
                        fonts[i] +
                        "</font></a>"
                ).click(clickFunc)
            );
        editor.createDropDown(caller, "font-picker", content);
    },
    exec: function (caller) {
        var editor = this;
        $.sceditor.command
            .get("font")
            ._dropDown(editor, caller, function (fontName) {
                editor.execCommand("fontname", fontName);
            });
    },
    tooltip: "Font Name",
});
$.sceditor.command.set("size", {
    _dropDown: function (editor, caller, callback) {
        var sizeAssoc = { 1: 10, 2: 13, 3: 16, 4: 18, 5: 24 },
            content = $("<div />"),
            clickFunc = function (e) {
                callback($(this).data("size"));
                editor.closeDropDown(true);
                e.preventDefault();
            };
        for (var i = 1; i <= 5; i++)
            content.append(
                $(
                    '<a class="sceditor-fontsize-option" data-size="' +
                        sizeAssoc[i] +
                        '" href="#"><span style="font-size: ' +
                        sizeAssoc[i] +
                        'px;">' +
                        sizeAssoc[i] +
                        "</span></a>"
                ).click(clickFunc)
            );
        editor.createDropDown(caller, "fontsize-picker", content);
    },
    exec: function (caller) {
        var editor = this;
        $.sceditor.command
            .get("size")
            ._dropDown(editor, caller, function (fontSize) {
                var sizeAssoc = { 10: 1, 13: 2, 16: 3, 18: 4, 24: 5 };
                var sel = editor
                    .getContentAreaContainer()[0]
                    .contentDocument.getSelection();
                if (
                    $(sel.anchorNode.parentNode).text() ==
                    sel.anchorNode.nodeValue
                )
                    $(sel.anchorNode.parentNode).css("font-size", "");
                editor.execCommand("fontsize", sizeAssoc[fontSize]);
            });
    },
    tooltip: "Font Size",
});
$.sceditor.command.set("quote", {
    forceNewLineAfter: ["blockquote"],
    _dropDown: function (editor, caller, handleIdFunc) {
        var content = $(
            '<div><label for="authorlabel">' +
                editor._("Author (optional)") +
                '</label><input type="text" id="authorlabel" value="" /></div><div><input type="button" class="button" value="' +
                editor._("Insert") +
                '" /></div>'
        );
        content.find(".button").click(function (e) {
            var val = content.find("#authorlabel").val();
            handleIdFunc(val);
            editor.closeDropDown(true);
            e.preventDefault();
        });
        editor.createDropDown(caller, "insertquote", content);
    },
    exec: function (caller) {
        var editor = this;
        $.sceditor.command
            .get("quote")
            ._dropDown(editor, caller, function (author) {
                var before = "<blockquote>",
                    end = "</blockquote><br />";
                if (author !== "") {
                    before = before + "<cite>" + author + "</cite>";
                }
                if (editor.getRangeHelper().selectedHtml() === "") {
                    end = "<br />" + end;
                }
                editor.wysiwygEditorInsertHtml(before, end);
            });
    },
    txtExec: function (caller) {
        var editor = this;
        $.sceditor.command
            .get("quote")
            ._dropDown(editor, caller, function (author) {
                var before = "<blockquote>",
                    end = "</blockquote><br />";
                if (author !== "") {
                    before = before + "<cite>" + author + "</cite>";
                }
                if (editor.getRangeHelper().selectedHtml() === "") {
                    end = "<br />" + end;
                }
                editor.insertText(before, end);
            });
    },
    tooltip: "Insert a Quote",
});
$.sceditor.command.set("code", {
    forceNewLineAfter: ["code"],
    exec: function (caller) {
        var end = "</code><br />";
        if (this.getRangeHelper().selectedHtml() === "") {
            end = "<br />" + end;
        }
        this.wysiwygEditorInsertHtml("<code>", end);
    },
    tooltip: "Code",
});
$.sceditor.command.set("link", {
    _dropDown: function (editor, caller, handler) {
        var descVal = "";
        if (window.getSelection) {
            descVal = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            descVal = document.selection.createRange().text;
        }
        if (descVal == "") {
            var iframe = $(".sceditor-container iframe")[0];
            var tmp = iframe.contentDocument;
            if (tmp.getSelection && tmp.getSelection() != null) {
                descVal = tmp.getSelection().toString();
            } else if (tmp.selection && tmp.selection.type != "Control") {
                descVal = tmp.selection.createRange().text;
            } else {
                descVal = document.activeElement.value.substring(
                    document.activeElement.selectionStart,
                    document.activeElement.selectionEnd
                );
            }
        }
        var content = $(
            '<div><label for="linksrc">' +
                editor._("URL:") +
                '</label> <input type="text" id="linksrc" class="url" placeholder="https://" value="" /></div><div><label for="linktitle">' +
                editor._("Description (optional):") +
                '</label> <input type="text" id="linktitle" value="' +
                descVal +
                '" /></div><div><input type="button" class="button" value="' +
                editor._("Insert") +
                '" /></div>'
        );
        content.find(".button").click(function (e) {
            var values = new Array(),
                src = content.find("#linksrc").val(),
                description = content.find("#linktitle").val();
            if (!description) {
                description = src;
            }
            values["src"] = src;
            values["desc"] = description;
            handler(values);
            editor.closeDropDown(true);
            e.preventDefault();
        });
        editor.createDropDown(caller, "insertlink", content);
    },
    exec: function (caller) {
        var editor = this;
        $.sceditor.command
            .get("link")
            ._dropDown(editor, caller, function (values) {
                if (values["src"]) {
                    editor.wysiwygEditorInsertHtml(
                        '<a href="' +
                            values["src"] +
                            '">' +
                            values["desc"] +
                            "</a>"
                    );
                }
            });
    },
    tooltip: "Insert a link",
});
$.sceditor.command.set("unlink", { exec: "unlink", tooltip: "Unlink" });
$.sceditor.command.set("servimg", {
    _menu: function (editor, caller) {
        var uploadFrame = null;
        if ($(".sceditor-tinypic").length === 1)
            uploadFrame = $(".sceditor-tinypic");
        else if ($(".sceditor-servimg").length === 1)
            uploadFrame = $(".sceditor-servimg");
        if (uploadFrame === null) {
            var menu,
                name,
                content,
                css = {
                    top: caller.offset().top,
                    left: caller.offset().left,
                    marginTop: caller.outerHeight(),
                };
            if (servImgAccount === "" && servImgId === "" && servImgF === "") {
                name = "tinypic";
                content = $(
                    '<p><iframe src="http://plugin.tinypic.com/plugin/index.php?popts=l,narrow|t,images|c,forum|i,' +
                        _userdata.user_lang +
                        '|s,false" scrolling="auto" allowtransparency="true" frameborder="0" width="300" height="400">Update your browser for tinypic.com</iframe></p>'
                );
            } else {
                name = "servimg";
                let servImgTBParam = "";
                let servImgSLParam = "";
                if (typeof servImgTB !== "undefined") {
                    servImgTBParam = servImgTB !== "" ? "&tb=" + servImgTB : "";
                    if (typeof servImgSL !== "undefined") {
                        servImgSLParam =
                            servImgSL !== "" ? "&sl=" + servImgSL : "";
                    }
                }
                content = $(
                    '<p><iframe id="obj_servimg" src="https://' +
                        servimgDomain +
                        "/multiupload.php?&mode=" +
                        (typeof servImgMode == "undefined" || servImgMode == ""
                            ? "fae"
                            : servImgMode) +
                        "&account=" +
                        servImgAccount +
                        "&id=" +
                        servImgId +
                        "&f=" +
                        servImgF +
                        servImgTBParam +
                        servImgSLParam +
                        '" width="540" height="350" border="0"></iframe></p>'
                );
            }
            menu = $('<div class="sceditor-dropdown sceditor-' + name + '" />')
                .css(css)
                .append(content)
                .appendTo($("body"))
                .click(function (e) {
                    e.stopPropagation();
                });
            $("#obj_servimg")[0].contentWindow.focus();
        } else {
            if (uploadFrame.css("display") === "none") {
                editor.closeDropDown();
                uploadFrame.css("display", "");
                $("#obj_servimg")[0].contentWindow.focus();
            } else {
                editor.closeDropDown();
            }
        }
    },
    exec: function (caller) {
        $.sceditor.command.get("servimg")._menu(this, caller);
    },
    txtExec: function (caller) {
        $.sceditor.command.get("servimg")._menu(this, caller);
    },
    tooltip: "Host an image",
});
$.sceditor.command.set("image", {
    _dropDown: function (editor, caller, handler) {
        var url = editor._("URL:");
        var width = editor._("Width (optional):");
        var height = editor._("Height (optional):");
        var insert = editor._("Insert");
        var image =
            '<div><label for="link">' +
            url +
            '</label> <input type="text" id="image" class="url" placeholder="https://" /></div>' +
            '<div><label for="width">' +
            width +
            '</label> <input type="text" id="width" size="2" /></div>' +
            '<div><label for="height">' +
            height +
            '</label> <input type="text" id="height" size="2" /></div>' +
            '<div><input type="button" class="button" value="' +
            insert +
            '" /></div>';
        var content = $(image);
        content.find(".button").click(function (e) {
            var values = new Array(),
                width = content.find("#width").val(),
                height = content.find("#height").val();
            values["src"] = content.find("#image").val();
            values["attrs"] = "";
            if (width) {
                values["attrs"] += ' width="' + width + '"';
                values["width"] = width;
            }
            if (height) {
                values["attrs"] += ' height="' + height + '"';
                values["height"] = height;
            }
            handler(values);
            editor.closeDropDown(true);
            e.preventDefault();
        });
        editor.createDropDown(caller, "insertimage", content);
    },
    exec: function (caller) {
        var editor = this;
        $.sceditor.command
            .get("image")
            ._dropDown(editor, caller, function (values) {
                if (values["src"])
                    editor.wysiwygEditorInsertHtml(
                        "<img" +
                            values["attrs"] +
                            ' src="' +
                            values["src"] +
                            '" />'
                    );
            });
    },
    txtExec: function (caller) {
        var editor = this;
        $.sceditor.command
            .get("image")
            ._dropDown(editor, caller, function (values) {
                if (values["src"])
                    editor.insertText(
                        "<img" +
                            values["attrs"] +
                            ' src="' +
                            values["src"] +
                            '" />'
                    );
            });
    },
    tooltip: "Insert an image",
});
$.sceditor.command.set("table", {
    exec: function (caller) {
        var editor = this,
            border = editor._("Border:"),
            rows = editor._("Rows:"),
            cols = editor._("Cols:"),
            insert = editor._("Insert"),
            table =
                '<div><label for="border">' +
                border +
                '</label><input type="text" id="border" value="1" /></div>' +
                '<div><label for="rows">' +
                rows +
                '</label><input type="text" id="rows" value="2" /></div>' +
                '<div><label for="cols">' +
                cols +
                '</label><input type="text" id="cols" value="2" /></div>' +
                '<div><input type="button" class="button" value="' +
                insert +
                '" /></div>',
            content = $(table);
        content.find(".button").click(function (e) {
            var border = content.find("#border").val() - 0,
                rows = content.find("#rows").val() - 0,
                cols = content.find("#cols").val() - 0,
                html = "<table>";
            if (rows < 1 || cols < 1) return;
            if (border > 0) html = '<table border="' + border + '">';
            for (var row = 0; row < rows; row++) {
                html += "<tr>";
                for (var col = 0; col < cols; col++)
                    html += "<td>" + ($.sceditor.ie ? "" : "<br />") + "</td>";
                html += "</tr>";
            }
            html += "</table>";
            editor.wysiwygEditorInsertHtml(html);
            editor.closeDropDown(true);
            e.preventDefault();
        });
        editor.createDropDown(caller, "inserttable", content);
    },
    tooltip: "Insert a table",
});
$.sceditor.command.set("color", {
    _dropDown: function (editor, caller, callback) {
        var i,
            x,
            color,
            colors,
            genColor = { r: 255, g: 255, b: 255 },
            content = $("<div />"),
            colorColumns = editor.opts.colors
                ? editor.opts.colors.split("|")
                : new Array(6),
            html = [],
            cmd = $.sceditor.command.get("color");
        if (!cmd._htmlCache) {
            for (i = 0; i < colorColumns.length; ++i) {
                colors = colorColumns[i]
                    ? colorColumns[i].split(",")
                    : new Array(37);
                html.push('<div class="sceditor-color-column">');
                for (x = 1; x < colors.length; ++x) {
                    color =
                        colors[x] ||
                        "#" +
                            genColor.r.toString(16) +
                            genColor.g.toString(16) +
                            genColor.b.toString(16);
                    html.push(
                        '<a href="#" class="sceditor-color-option" style="background-color: ' +
                            color +
                            '" data-color="' +
                            color +
                            '" title="' +
                            color +
                            '"></a>'
                    );
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
                html.push("</div>");
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
            cmd._htmlCache = html.join("");
        }
        content
            .append(cmd._htmlCache)
            .find("a")
            .click(function (e) {
                callback($(this).attr("data-color"));
                editor.closeDropDown(true);
                e.preventDefault();
            });
        editor.createDropDown(caller, "color-picker", content);
    },
    _menu: function (editor, caller, callback) {
        var colors = {},
            html = $("<div />");
        colors[editor._("color_dark_red")] = "#660000";
        colors[editor._("color_red")] = "#FF0000";
        colors[editor._("color_orange")] = "#FF9933";
        colors[editor._("color_brown")] = "#663300";
        colors[editor._("color_yellow")] = "#FFFF00";
        colors[editor._("color_green")] = "#006600";
        colors[editor._("color_olive")] = "#666633";
        colors[editor._("color_cyan")] = "#00FFFF";
        colors[editor._("color_blue")] = "#0000FF";
        colors[editor._("color_dark_blue")] = "#000099";
        colors[editor._("color_indigo")] = "#6600FF";
        colors[editor._("color_violet")] = "#990099";
        colors[editor._("color_grey")] = "#999999";
        colors[editor._("color_white")] = "#EEEEEE";
        colors[editor._("color_black")] = "#000000";
        for (var k in colors)
            html.append(
                '<div><a class="sceditor-fontsize-option"><font color="' +
                    colors[k] +
                    '">' +
                    k +
                    "</font></a></div>"
            );
        html.find("font").click(function (e) {
            callback($(this).attr("color"));
            editor.closeDropDown(true);
            e.preventDefault();
        });
        editor.createDropDown(caller, "color-picker", html);
    },
    exec: function (caller) {
        var editor = this;
        if (palette === 1) {
            $.sceditor.command
                .get("color")
                ._dropDown(editor, caller, function (color) {
                    editor.execCommand("forecolor", color);
                });
        } else {
            $.sceditor.command
                .get("color")
                ._menu(editor, caller, function (color) {
                    editor.execCommand("forecolor", color);
                });
        }
    },
    tooltip: "Font Color",
});
$.sceditor.command.set("emoticon", {
    _menu: function (editor, caller) {
        var uploadFrame = null;
        if ($(".sceditor-emoticon").length === 1)
            uploadFrame = $(".sceditor-emoticon");
        if (uploadFrame) {
            if (uploadFrame.css("display") === "none") {
                editor.closeDropDown();
                uploadFrame.css("display", "");
            } else {
                editor.closeDropDown();
            }
        } else {
            var menu,
                iframeSrc =
                    typeof editor.opts.emoticonsURL === "undefined" ||
                    editor.opts.emoticonsURL === "" ||
                    editor.opts.emoticonsURL === null
                        ? "/smilies?mode=smilies_frame&t=" +
                          new Date().getTime() +
                          "&timeinfo=null"
                        : editor.opts.emoticonsURL,
                content = $("<iframe />")
                    .attr({
                        class: "row1",
                        height: "250",
                        id: "quickEmojInternal",
                        marginheight: "0",
                        marginwidth: "0",
                        name: "smilies",
                        scrolling: "auto",
                        src: iframeSrc,
                        width: "220",
                    })
                    .css({ border: "none", visibility: "hidden" })
                    .load(function () {
                        $(this)
                            .css("visibility", "visible")
                            .parent()
                            .css("background-image", "none");
                    }),
                css = {
                    top: caller.offset().top,
                    left: caller.offset().left,
                    marginTop: caller.outerHeight(),
                    background:
                        "#FFFFFF url('" +
                        illiwebDomain +
                        "fa/i/loader.gif') no-repeat center center",
                };
            menu = $('<div class="sceditor-dropdown sceditor-emoticon" />')
                .css(css)
                .append(content)
                .appendTo($("body"))
                .click(function (e) {
                    e.stopPropagation();
                });
        }
    },
    exec: function (caller) {
        $.sceditor.command.get("emoticon")._menu(this, caller);
    },
    txtExec: function (caller) {
        $.sceditor.command.get("emoticon")._menu(this, caller);
    },
    tooltip: "Insert an emoticon",
});
var config = {
    emoji_list:
        "\uD83D\uDE00 \uD83D\uDE01 \uD83D\uDE02 \uD83D\uDE03 \uD83D\uDE04 \uD83D\uDE05 \uD83D\uDE06 \uD83D\uDE09 \uD83D\uDE0A \uD83D\uDE0B \uD83D\uDE0E \uD83D\uDE0D \uD83D\uDE18 \uD83D\uDE17 \uD83D\uDE19 \uD83D\uDE1A \u263A\uFE0F \uD83D\uDE07 \uD83D\uDE10 \uD83D\uDE11 \uD83D\uDE36 \uD83D\uDE0F \uD83D\uDE23 \uD83D\uDE25 \uD83D\uDE2E \uD83D\uDE2F \uD83D\uDE2A \uD83D\uDE2B \uD83D\uDE34 \uD83D\uDE0C \uD83D\uDE1B \uD83D\uDE1C \uD83D\uDE1D \uD83D\uDE12 \uD83D\uDE13 \uD83D\uDE14 \uD83D\uDE15 \uD83D\uDE16 \uD83D\uDE37 \uD83D\uDE32 \uD83D\uDE1E \uD83D\uDE1F \uD83D\uDE24 \uD83D\uDE22 \uD83D\uDE2D \uD83D\uDE26 \uD83D\uDE27 \uD83D\uDE28 \uD83D\uDE29 \uD83D\uDE2C \uD83D\uDE30 \uD83D\uDE31 \uD83D\uDE33 \uD83D\uDE35 \uD83D\uDE21 \uD83D\uDE20 \uD83D\uDC7F \uD83D\uDE08 \uD83D\uDC66 \uD83D\uDC67 \uD83D\uDC68 \uD83D\uDC69 \uD83D\uDC74 \uD83D\uDC75 \uD83D\uDC76 \uD83D\uDC71 \uD83D\uDC6E \uD83D\uDC72 \uD83D\uDC73 \uD83D\uDC77 \uD83D\uDC78 \uD83D\uDC82 \uD83C\uDF85 \uD83D\uDC7C \uD83D\uDC6F \uD83D\uDC86 \uD83D\uDC87 \uD83D\uDC70 \uD83D\uDE4D \uD83D\uDE4E \uD83D\uDE45 \uD83D\uDE46 \uD83D\uDC81 \uD83D\uDE4B \uD83D\uDE47 \uD83D\uDE4C \uD83D\uDE4F \uD83D\uDC64 \uD83D\uDC65 \uD83D\uDEB6 \uD83C\uDFC3 \uD83D\uDC83 \uD83D\uDC8F \uD83D\uDC91 \uD83D\uDC6A \uD83D\uDC6B \uD83D\uDC6C \uD83D\uDC6D \uD83D\uDCAA \uD83D\uDC48 \uD83D\uDC49 \u261D\uFE0F \uD83D\uDC46 \uD83D\uDC47 \u270C\uFE0F \u270A \u270B \uD83D\uDC4A \uD83D\uDC4C \uD83D\uDC4D \uD83D\uDC4E \uD83D\uDC4B \uD83D\uDC4F \uD83D\uDC50 \uD83D\uDC85 \uD83D\uDC63 \uD83D\uDC40 \uD83D\uDC42 \uD83D\uDC43 \uD83D\uDC45 \uD83D\uDC44 \uD83D\uDC8B \uD83D\uDC98 \u2764\uFE0F \uD83D\uDC93 \uD83D\uDC94 \uD83D\uDC95 \uD83D\uDC96 \uD83D\uDC97 \uD83D\uDC99 \uD83D\uDC9A \uD83D\uDC9B \uD83D\uDC9C \uD83D\uDC9D \uD83D\uDC9E \uD83D\uDC9F \uD83D\uDC8C \uD83D\uDCA7 \uD83D\uDCA4 \uD83D\uDCA2 \uD83D\uDCA3 \uD83D\uDCA5 \uD83D\uDCA6 \uD83D\uDCA8 \uD83D\uDCAB \uD83D\uDCAC \uD83D\uDCAD \uD83D\uDC53 \uD83D\uDC54 \uD83D\uDC55 \uD83D\uDC56 \uD83D\uDC57 \uD83D\uDC58 \uD83D\uDC59 \uD83D\uDC5A \uD83D\uDC5B \uD83D\uDC5C \uD83D\uDC5D \uD83C\uDF92 \uD83D\uDC5E \uD83D\uDC5F \uD83D\uDC60 \uD83D\uDC61 \uD83D\uDC62 \uD83D\uDC51 \uD83D\uDC52 \uD83C\uDFA9 \uD83D\uDC84 \uD83D\uDC8D \uD83D\uDC8E \uD83D\uDC79 \uD83D\uDC7A \uD83D\uDC7B \uD83D\uDC80 \uD83D\uDC7D \uD83D\uDC7E \uD83D\uDCA9 \uD83D\uDC35 \uD83D\uDE48 \uD83D\uDE49 \uD83D\uDE4A \uD83D\uDC12 \uD83D\uDC36 \uD83D\uDC15 \uD83D\uDC29 \uD83D\uDC3A \uD83D\uDC31 \uD83D\uDE38 \uD83D\uDE39 \uD83D\uDE3A \uD83D\uDE3B \uD83D\uDE3C \uD83D\uDE3D \uD83D\uDE3E \uD83D\uDE3F \uD83D\uDE40 \uD83D\uDC08 \uD83D\uDC2F \uD83D\uDC05 \uD83D\uDC06 \uD83D\uDC34 \uD83D\uDC0E \uD83D\uDC2E \uD83D\uDC02 \uD83D\uDC03 \uD83D\uDC04 \uD83D\uDC37 \uD83D\uDC16 \uD83D\uDC17 \uD83D\uDC3D \uD83D\uDC0F \uD83D\uDC11 \uD83D\uDC10 \uD83D\uDC2A \uD83D\uDC2B \uD83D\uDC18 \uD83D\uDC2D \uD83D\uDC01 \uD83D\uDC00 \uD83D\uDC39 \uD83D\uDC30 \uD83D\uDC07 \uD83D\uDC3B \uD83D\uDC28 \uD83D\uDC3C \uD83D\uDC3E \uD83D\uDC14 \uD83D\uDC13 \uD83D\uDC23 \uD83D\uDC24 \uD83D\uDC25 \uD83D\uDC26 \uD83D\uDC27 \uD83D\uDC38 \uD83D\uDC0A \uD83D\uDC22 \uD83D\uDC0D \uD83D\uDC32 \uD83D\uDC09 \uD83D\uDC33 \uD83D\uDC0B \uD83D\uDC2C \uD83D\uDC1F \uD83D\uDC20 \uD83D\uDC21 \uD83D\uDC19 \uD83D\uDC1A \uD83D\uDC0C \uD83D\uDC1B \uD83D\uDC1C \uD83D\uDC1D \uD83D\uDC1E \uD83D\uDC90 \uD83C\uDF38 \uD83D\uDCAE \uD83C\uDF39 \uD83C\uDF3A \uD83C\uDF3B \uD83C\uDF3C \uD83C\uDF37 \uD83C\uDF31 \uD83C\uDF32 \uD83C\uDF33 \uD83C\uDF34 \uD83C\uDF35 \uD83C\uDF3E \uD83C\uDF3F \uD83C\uDF40 \uD83C\uDF41 \uD83C\uDF42 \uD83C\uDF43 \uD83C\uDF47 \uD83C\uDF48 \uD83C\uDF49 \uD83C\uDF4A \uD83C\uDF4B \uD83C\uDF4C \uD83C\uDF4D \uD83C\uDF4E \uD83C\uDF4F \uD83C\uDF50 \uD83C\uDF51 \uD83C\uDF52 \uD83C\uDF53 \uD83C\uDF45 \uD83C\uDF46 \uD83C\uDF3D \uD83C\uDF44 \uD83C\uDF30 \uD83C\uDF5E \uD83C\uDF56 \uD83C\uDF57 \uD83C\uDF54 \uD83C\uDF5F \uD83C\uDF55 \uD83C\uDF72 \uD83C\uDF71 \uD83C\uDF58 \uD83C\uDF59 \uD83C\uDF5A \uD83C\uDF5B \uD83C\uDF5C \uD83C\uDF5D \uD83C\uDF60 \uD83C\uDF62 \uD83C\uDF63 \uD83C\uDF64 \uD83C\uDF65 \uD83C\uDF61 \uD83C\uDF66 \uD83C\uDF67 \uD83C\uDF68 \uD83C\uDF69 \uD83C\uDF6A \uD83C\uDF82 \uD83C\uDF70 \uD83C\uDF6B \uD83C\uDF6C \uD83C\uDF6D \uD83C\uDF6E \uD83C\uDF6F \uD83C\uDF7C \u2615 \uD83C\uDF75 \uD83C\uDF76 \uD83C\uDF77 \uD83C\uDF78 \uD83C\uDF79 \uD83C\uDF7A \uD83C\uDF7B \uD83C\uDF74 \uD83C\uDF73 \uD83C\uDF0D \uD83C\uDF0E \uD83C\uDF0F \uD83C\uDF10 \uD83C\uDF0B \uD83D\uDDFB \uD83C\uDFE0 \uD83C\uDFE1 \u26EA \uD83C\uDFE2 \uD83C\uDFE3 \uD83C\uDFE4 \uD83C\uDFE5 \uD83C\uDFE6 \uD83C\uDFE8 \uD83C\uDFE9 \uD83C\uDFEA \uD83C\uDFEB \uD83C\uDFEC \uD83C\uDFED \uD83C\uDFEF \uD83C\uDFF0 \uD83D\uDC92 \uD83D\uDDFC \uD83D\uDDFD \uD83D\uDDFE \u26F2 \u26FA \uD83C\uDF01 \uD83C\uDF03 \uD83C\uDF04 \uD83C\uDF05 \uD83C\uDF06 \uD83C\uDF07 \uD83C\uDF09 \uD83C\uDF0A \u2668\uFE0F \uD83D\uDDFF \uD83C\uDF0C \uD83C\uDFA0 \uD83C\uDFA1 \uD83C\uDFA2 \uD83D\uDC88 \uD83C\uDFAA \uD83C\uDFAD \uD83C\uDFA8 \uD83C\uDFB0 \uD83D\uDE82 \uD83D\uDE83 \uD83D\uDE84 \uD83D\uDE85 \uD83D\uDE86 \uD83D\uDE87 \uD83D\uDE88 \uD83D\uDE89 \uD83D\uDE8A \uD83D\uDE9D \uD83D\uDE9E \uD83D\uDE8B \uD83D\uDE8C \uD83D\uDE8D \uD83D\uDE8E \uD83D\uDE8F \uD83D\uDE90 \uD83D\uDE91 \uD83D\uDE92 \uD83D\uDE93 \uD83D\uDE94 \uD83D\uDE95 \uD83D\uDE96 \uD83D\uDE97 \uD83D\uDE98 \uD83D\uDE99 \uD83D\uDE9A \uD83D\uDE9B \uD83D\uDE9C \uD83D\uDEB2 \uD83D\uDEB3 \u26FD \uD83D\uDEA8 \u2693 \uD83D\uDD31 \u26F5 \uD83D\uDEA3 \uD83D\uDEA4 \uD83D\uDEA2 \u2708\uFE0F \uD83D\uDCBA \uD83D\uDE81 \uD83D\uDE9F \uD83D\uDEA0 \uD83D\uDEA1 \uD83D\uDE80 \uD83C\uDFE7 \uD83D\uDEAE \uD83D\uDEA5 \uD83D\uDEA6 \uD83D\uDEA7 \uD83D\uDEAB \uD83D\uDEAD \uD83D\uDEAF \uD83D\uDEB0 \uD83D\uDEB1 \uD83D\uDEB7 \uD83D\uDEB8 \u267F \uD83D\uDEB9 \uD83D\uDEBA \uD83D\uDEBB \uD83D\uDEBC \uD83D\uDEBE \uD83D\uDEC2 \uD83D\uDEC3 \uD83D\uDEC4 \uD83D\uDEC5 \u26A0\uFE0F \u26D4 \uD83D\uDEAA \uD83D\uDEBD \uD83D\uDEBF \uD83D\uDEC0 \uD83D\uDEC1 \u231B \u23F3 \u231A \u23F0 \uD83D\uDD5B \uD83D\uDD67 \uD83D\uDD50 \uD83D\uDD5C \uD83D\uDD51 \uD83D\uDD5D \uD83D\uDD52 \uD83D\uDD5E \uD83D\uDD53 \uD83D\uDD5F \uD83D\uDD54 \uD83D\uDD60 \uD83D\uDD55 \uD83D\uDD61 \uD83D\uDD56 \uD83D\uDD62 \uD83D\uDD57 \uD83D\uDD63 \uD83D\uDD58 \uD83D\uDD64 \uD83D\uDD59 \uD83D\uDD65 \uD83D\uDD5A \uD83D\uDD66 \u2648 \u2649 \u264A \u264B \u264C \u264D \u264E \u264F \u2650 \u2651 \u2652 \u2653 \u26CE \uD83C\uDF11 \uD83C\uDF12 \uD83C\uDF13 \uD83C\uDF14 \uD83C\uDF15 \uD83C\uDF16 \uD83C\uDF17 \uD83C\uDF18 \uD83C\uDF19 \uD83C\uDF1A \uD83C\uDF1B \uD83C\uDF1C \u2600\uFE0F \uD83C\uDF1D \uD83C\uDF1E \u2601\uFE0F \u26C5 \uD83C\uDF00 \uD83C\uDF08 \uD83C\uDF02 \u2614 \u2744\uFE0F \u26C4 \uD83C\uDF1F \uD83C\uDF20 \uD83D\uDD25 \uD83C\uDF83 \uD83C\uDF84 \uD83C\uDF86 \uD83C\uDF87 \u2728 \uD83C\uDF88 \uD83C\uDF89 \uD83C\uDF8A \uD83C\uDF8B \uD83C\uDF8C \uD83C\uDF8D \uD83C\uDF8E \uD83C\uDF8F \uD83C\uDF90 \uD83C\uDF91 \uD83C\uDF93 \uD83C\uDFAF \uD83C\uDFB4 \uD83C\uDF80 \uD83C\uDF81 \uD83C\uDFAB \u26BD \u26BE \uD83C\uDFC0 \uD83C\uDFC8 \uD83C\uDFC9 \uD83C\uDFBE \uD83C\uDFB1 \uD83C\uDFB3 \u26F3 \uD83C\uDFA3 \uD83C\uDFBD \uD83C\uDFBF \uD83C\uDFC2 \uD83C\uDFC4 \uD83C\uDFC7 \uD83C\uDFCA \uD83D\uDEB4 \uD83D\uDEB5 \uD83C\uDFC6 \uD83C\uDFAE \uD83C\uDFB2 \u2660\uFE0F \u2665\uFE0F \u2666\uFE0F \u2663\uFE0F \uD83C\uDCCF \uD83C\uDC04 \uD83D\uDD07 \uD83D\uDD08 \uD83D\uDD09 \uD83D\uDD0A \uD83D\uDCE2 \uD83D\uDCE3 \uD83D\uDCEF \uD83D\uDD14 \uD83D\uDD15 \uD83D\uDD00 \uD83D\uDD01 \uD83D\uDD02 \u25B6\uFE0F \u23E9 \u25C0\uFE0F \u23EA \uD83D\uDD3C \u23EB \uD83D\uDD3D \u23EC \uD83C\uDFBC \uD83C\uDFB5 \uD83C\uDFB6 \uD83C\uDFA4 \uD83C\uDFA7 \uD83C\uDFB7 \uD83C\uDFB8 \uD83C\uDFB9 \uD83C\uDFBA \uD83C\uDFBB \uD83D\uDCFB \uD83D\uDCF1 \uD83D\uDCF3 \uD83D\uDCF4 \uD83D\uDCF2 \uD83D\uDCF5 \u260E\uFE0F \uD83D\uDCDE #\u20E3\uFE0F 0\u20E3\uFE0F 1\u20E3\uFE0F 2\u20E3\uFE0F 3\u20E3\uFE0F 4\u20E3\uFE0F 5\u20E3\uFE0F 6\u20E3\uFE0F 7\u20E3\uFE0F 8\u20E3\uFE0F 9\u20E3\uFE0F \uD83D\uDD1F \uD83D\uDCF6 \uD83D\uDCDF \uD83D\uDCE0 \uD83D\uDD0B \uD83D\uDD0C \uD83D\uDCBB \uD83D\uDCBD \uD83D\uDCBE \uD83D\uDCBF \uD83D\uDCC0 \uD83C\uDFA5 \uD83C\uDFA6 \uD83C\uDFAC \uD83D\uDCFA \uD83D\uDCF7 \uD83D\uDCF9 \uD83D\uDCFC \uD83D\uDD05 \uD83D\uDD06 \uD83D\uDD0D \uD83D\uDD0E \uD83D\uDD2C \uD83D\uDD2D \uD83D\uDCE1 \uD83D\uDCA1 \uD83D\uDD26 \uD83C\uDFEE \uD83D\uDCD4 \uD83D\uDCD5 \uD83D\uDCD6 \uD83D\uDCD7 \uD83D\uDCD8 \uD83D\uDCD9 \uD83D\uDCDA \uD83D\uDCD3 \uD83D\uDCD2 \uD83D\uDCC3 \uD83D\uDCDC \uD83D\uDCC4 \uD83D\uDCF0 \uD83D\uDCD1 \uD83D\uDD16 \uD83D\uDCB0 \uD83D\uDCB4 \uD83D\uDCB5 \uD83D\uDCB6 \uD83D\uDCB7 \uD83D\uDCB8 \uD83D\uDCB1 \uD83D\uDCB2 \uD83D\uDCB3 \uD83D\uDCB9 \u2709\uFE0F \uD83D\uDCE7 \uD83D\uDCE8 \uD83D\uDCE9 \uD83D\uDCE4 \uD83D\uDCE5 \uD83D\uDCE6 \uD83D\uDCEB \uD83D\uDCEA \uD83D\uDCEC \uD83D\uDCED \uD83D\uDCEE \u270F\uFE0F \u2712\uFE0F \uD83D\uDCDD \uD83D\uDCBC \uD83D\uDCC1 \uD83D\uDCC2 \uD83D\uDCC5 \uD83D\uDCC6 \uD83D\uDCC7 \uD83D\uDCC8 \uD83D\uDCC9 \uD83D\uDCCA \uD83D\uDCCB \uD83D\uDCCC \uD83D\uDCCD \uD83D\uDCCE \uD83D\uDCCF \uD83D\uDCD0 \uD83D\uDCDB \u2702\uFE0F \uD83D\uDD12 \uD83D\uDD13 \uD83D\uDD0F \uD83D\uDD10 \uD83D\uDD11 \uD83D\uDD28 \uD83D\uDD27 \uD83D\uDD29 \uD83D\uDD17 \uD83D\uDC89 \uD83D\uDC8A \uD83D\uDD2A \uD83D\uDD2B \uD83D\uDEAC \uD83C\uDFC1 \uD83D\uDEA9 \uD83C\uDDE8\uD83C\uDDF3 \uD83C\uDDEB\uD83C\uDDF7 \uD83C\uDDE9\uD83C\uDDEA \uD83C\uDDEE\uD83C\uDDF9 \uD83C\uDDEF\uD83C\uDDF5 \uD83C\uDDF7\uD83C\uDDFA \uD83C\uDDF0\uD83C\uDDF7 \uD83C\uDDEA\uD83C\uDDF8 \uD83C\uDDEC\uD83C\uDDE7 \uD83C\uDDFA\uD83C\uDDF8 \u2B06\uFE0F \u2197\uFE0F \u27A1\uFE0F \u2198\uFE0F \u2B07\uFE0F \u2199\uFE0F \u2B05\uFE0F \u2196\uFE0F \u2195\uFE0F \u2194\uFE0F \u21A9\uFE0F \u21AA\uFE0F \u2934\uFE0F \u2935\uFE0F \uD83D\uDD03 \uD83D\uDD04 \uD83D\uDD19 \uD83D\uDD1A \uD83D\uDD1B \uD83D\uDD1C \uD83D\uDD1D \uD83D\uDD30 \uD83D\uDD2E \uD83D\uDD2F \u267B\uFE0F \u26A1 \u2B50 \u2B55 \u2705 \u2611\uFE0F \u2714\uFE0F \u2716\uFE0F \u274C \u274E \u2795 \u2796 \u2797 \u27B0 \u27BF \u303D\uFE0F \u2733\uFE0F \u2734\uFE0F \u2747\uFE0F \u203C\uFE0F \u2049\uFE0F \u2753 \u2754 \u2755 \u2757 \u3030\uFE0F \u00A9\uFE0F \u00AE\uFE0F \u2122\uFE0F \uD83D\uDCAF \uD83D\uDD1E \uD83D\uDD20 \uD83D\uDD21 \uD83D\uDD22 \uD83D\uDD23 \uD83D\uDD24 \uD83C\uDD70\uFE0F \uD83C\uDD8E \uD83C\uDD71\uFE0F \uD83C\uDD91 \uD83C\uDD92 \uD83C\uDD93 \u2139\uFE0F \uD83C\uDD94 \u24C2\uFE0F \uD83C\uDD95 \uD83C\uDD96 \uD83C\uDD7E\uFE0F \uD83C\uDD97 \uD83C\uDD7F\uFE0F \uD83C\uDD98 \uD83C\uDD99 \uD83C\uDD9A \uD83C\uDE01 \uD83C\uDE02\uFE0F \uD83C\uDE37\uFE0F \uD83C\uDE36 \uD83C\uDE2F \uD83C\uDE50 \uD83C\uDE39 \uD83C\uDE1A \uD83C\uDE32 \uD83C\uDE51 \uD83C\uDE38 \uD83C\uDE34 \uD83C\uDE33 \u3297\uFE0F \u3299\uFE0F \uD83C\uDE3A \uD83C\uDE35 \u25AA\uFE0F \u25AB\uFE0F \u25FB\uFE0F \u25FC\uFE0F \u25FD \u25FE \u2B1B \u2B1C \uD83D\uDD36 \uD83D\uDD37 \uD83D\uDD38 \uD83D\uDD39 \uD83D\uDD3A \uD83D\uDD3B \uD83D\uDCA0 \uD83D\uDD18 \uD83D\uDD32 \uD83D\uDD33 \u26AA \u26AB \uD83D\uDD34 \uD83D\uDD35 \uE50A \uD83C\uDDE6 \uD83C\uDDE7 \uD83C\uDDE8 \uD83C\uDDE9 \uD83C\uDDEA \uD83C\uDDEB \uD83C\uDDEC \uD83C\uDDED \uD83C\uDDEE \uD83C\uDDEF \uD83C\uDDF0 \uD83C\uDDF1 \uD83C\uDDF2 \uD83C\uDDF3 \uD83C\uDDF4 \uD83C\uDDF5 \uD83C\uDDF6 \uD83C\uDDF7 \uD83C\uDDF8 \uD83C\uDDF9 \uD83C\uDDFA \uD83C\uDDFB \uD83C\uDDFC \uD83C\uDDFD \uD83C\uDDFE \uD83C\uDDFF",
};
$.sceditor.command.set("twemojifa", {
    dropDown: function (editor, caller, callback) {
        if (!fa_emoji.element) {
            fa_emoji.element = document.createElement("DIV");
            if (typeof twemoji !== "undefined") {
                fa_emoji.element.innerHTML =
                    '<div style="width:100%;text-align:center;height:20px;">Emojis by <a href="https://twemoji.twitter.com/" rel="nofollow" target="_blank">twemoji</a></div>' +
                    twemoji
                        .parse(fa_emoji.emoji_list, {
                            size: 16,
                            attributes: function () {
                                return { style: "display:none;" };
                            },
                        })
                        .replace(/\s(?=<|$)/g, "");
            }
            fa_emoji.image = {
                collection: $("img", fa_emoji.element),
                index: 0,
                timeout: [0, 1000],
                load: window.setInterval(function () {
                    if (
                        typeof fa_emoji.image.collection[
                            fa_emoji.image.index
                        ] !== "undefined"
                    ) {
                        if (
                            fa_emoji.image.collection[fa_emoji.image.index]
                                .complete
                        ) {
                            fa_emoji.image.index++;
                            if (
                                fa_emoji.image.collection[fa_emoji.image.index]
                            ) {
                                fa_emoji.image.collection[
                                    fa_emoji.image.index
                                ].style.display = "";
                                fa_emoji.image.timeout[0] = 0;
                            } else {
                                window.clearInterval(fa_emoji.image.load);
                                fa_emoji.image.load = "COMPLETE";
                            }
                        } else if (
                            ++fa_emoji.image.timeout[0] >
                            fa_emoji.image.timeout[1]
                        ) {
                            window.clearInterval(fa_emoji.image.load);
                            fa_emoji.image.load = "ERROR";
                        }
                    } else {
                        window.clearInterval(fa_emoji.image.load);
                        fa_emoji.image.load = "ERROR";
                    }
                }, 10),
            };
            fa_emoji.image.collection[fa_emoji.image.index].style.display = "";
        }
        $(fa_emoji.element).click(function (e) {
            var target = e.target;
            if (target.tagName == "IMG") {
                callback(target.src);
            }
        });
        editor.createDropDown(caller, "twemojifa", fa_emoji.element);
    },
    exec: function (c) {
        var e = this;
        $.sceditor.command.get("twemojifa").dropDown(e, c, function (icon) {
            e.insert(
                "&nbsp;[img]" + icon + "[/img]&nbsp;",
                "",
                true,
                true,
                true
            );
        });
    },
    txtExec: function (c) {
        var e = this;
        $.sceditor.command.get("twemojifa").dropDown(e, c, function (icon) {
            e.insert(" [img]" + icon + "[/img] ", "", true, true, true);
        });
    },
    tooltip: "Twemoji",
});
if (!window.fa_emoji) {
    window.fa_emoji = config;
}
$.sceditor.command.set("more", {
    exec: function () {
        FA_SCEditor.functions.showHideToolbarElements();
    },
    txtExec: function () {
        FA_SCEditor.functions.showHideToolbarElements();
    },
    tooltip: "More",
});
$.sceditor.command.set("embed", {
    _dropDown: function (editor, caller, callback) {
        var $content = $("<div />");
        $(
            "<label for='sceditor-input-embed'>URL</label><input autocomplete='off' type='text' id='sceditor-input-embed' placeholder='https://' autofocus/><br />"
        ).appendTo($content);
        $(
            "<input class='button' type='submit' id='sceditor-input-embed-submit' value='" +
                editor._("Insert") +
                "'/>"
        )
            .on("click", function (e) {
                callback($("#sceditor-input-embed").val());
                editor.closeDropDown(true);
                e.preventDefault();
            })
            .appendTo($content);
        editor.createDropDown(caller, "embed", $content.get(0));
    },
    exec: function (caller) {
        var editor = this;
        $.sceditor.command
            .get("embed")
            ._dropDown(editor, caller, function (text) {
                editor.wysiwygEditorInsertHtml(
                    '<a href="' + text + '" class="link_embed">' + text + "</a>"
                );
            });
    },
    txtExec: function (caller) {
        var editor = this;
        $.sceditor.command
            .get("embed")
            ._dropDown(editor, caller, function (text) {
                editor.insertText("[embed]" + text + "[/embed]");
            });
    },
    tooltip: "Embed a link",
});
$.sceditor.command.set("mention", {
    _dropDown: function (editor, caller, callback) {
        var $content = $("<div />");
        if ("activeElement" in document) document.activeElement.blur();
        $(
            "<input autocomplete='off' type='text' id='sceditor-input-mention' placeholder='@' autofocus/>"
        )
            .keyup(function (e) {
                var timeoutID = null;
                clearTimeout(timeoutID);
                timeoutID = setTimeout(function () {
                    findMember(e.target.value);
                }, 500);
            })
            .appendTo($content);
        findMember("");
        function findMember(str) {
            $.get("/ajax_mention.php", {
                search: str,
                topicID: SCE_TopicID,
            }).done(function (data) {
                appendMentionList(data);
            });
        }
        function appendMentionList(data) {
            if ($("#sceditor-mention-div")) {
                $("#sceditor-mention-div").remove();
            }
            $("<div id='sceditor-mention-div'/></div>").appendTo($content);
            data = JSON.parse(data);
            if (data) {
                for (var user in data) {
                    if (data[user].isGroup) {
                        $(
                            '<p class="sceditor-mention-user" style="color:#' +
                                data[user].color +
                                ';"><img style="background-color: #' +
                                data[user].color +
                                ';" src="' +
                                data[user].avatar +
                                '"/>' +
                                data[user].username +
                                "</p>"
                        ).appendTo("#sceditor-mention-div");
                    } else {
                        $(
                            '<p class="sceditor-mention-user"><img src="' +
                                data[user].avatar +
                                '" onerror="this.src=\'' +
                                illiweb +
                                "fa/i/l_users3.png';\"/>" +
                                data[user].username +
                                "</p>"
                        ).appendTo("#sceditor-mention-div");
                    }
                }
                $(".sceditor-mention-user").on("click", function (e) {
                    callback($(this).text());
                    editor.closeDropDown(true);
                    e.preventDefault();
                });
            }
        }
        editor.createDropDown(caller, "mention", $content.get(0));
        $("#sceditor-input-mention").focus();
    },
    exec: function (caller) {
        var editor = this;
        $.sceditor.command
            .get("mention")
            ._dropDown(editor, caller, function (text) {
                editor.wysiwygEditorInsertHtml(' @"' + text + '" ');
            });
    },
    txtExec: function (caller) {
        var editor = this;
        $.sceditor.command
            .get("mention")
            ._dropDown(editor, caller, function (text) {
                editor.insertText(' @"' + text + '" ');
            });
    },
    tooltip: "Mention a user",
});
$.sceditor.command.set("headers", {
    _dropDown: function (editor, caller, callback) {
        var $content = $("<div />");
        for (var i = 2; i <= 4; i++) {
            $(
                "<h" +
                    i +
                    ' class="sceditor-header-option post-content">H' +
                    i +
                    "</h" +
                    i +
                    ">"
            )
                .data("headersize", i)
                .click(function (e) {
                    callback($(this).data("headersize"));
                    editor.closeDropDown(true);
                    e.preventDefault();
                })
                .css({
                    margin: 0,
                    border: 0,
                    color: "#333",
                    cursor: "pointer",
                    "text-transform": "none",
                })
                .hover(
                    function () {
                        $(this).css("background-color", "#EEE");
                    },
                    function () {
                        $(this).css("background-color", "#FFF");
                    }
                )
                .appendTo($content);
        }
        editor.createDropDown(caller, "header-picker", $content);
    },
    exec: function (caller) {
        var editor = this;
        $.sceditor.command
            .get("headers")
            ._dropDown(editor, caller, function (lvl) {
                editor.execCommand("formatblock", "<h" + lvl + ">");
            });
    },
    tooltip: "Format Headers",
});
$.sceditor.command.set("giphy", {
    _dropDown: function (editor, caller, callback) {
        var $content = $(
            '<div id="fa_gif_picker">' +
                '<input id ="gif_search" type="text" placeholder="' +
                editor._("Search") +
                '..." autocomplete="off" autofocus/>' +
                '<div id="fa_gif_switch">' +
                '<div class="gif_switch_btn selected" id="switch_gifs_btn">GIFs</div>' +
                '<div class="gif_switch_btn" id="switch_stickers_btn">Stickers</div>' +
                "</div>" +
                '<section id="gif_grid"></section>' +
                "<footer>" +
                '<a href="https://developers.giphy.com/">' +
                '<img src="' +
                illiweb +
                'fa/i/poweredByGiphy.gif" alt="Powered By GIPHY" />' +
                "</a>" +
                "</footer>" +
                "</div>"
        );
        function populateGifPicker(data, offset) {
            var gif_picker = $("#fa_gif_picker");
            data = data.data;
            if (offset === 0) $("#gif_grid").empty();
            $("<div></div>")
                .addClass("gif_page")
                .attr("id", "gif_offset_" + offset)
                .appendTo("#gif_grid");
            if (data.length > 0) {
                gif_picker.removeClass("no_result");
                for (var j in data) {
                    var i = data[j];
                    if (typeof i.images.fixed_width_small.url !== "undefined") {
                        var gif = $(
                            "<img loading='lazy' title='" +
                                i.title +
                                "' style='height:" +
                                i.images.fixed_width_small.height +
                                "px !important;' alt='" +
                                i.title +
                                "' data-gifsrc='" +
                                i.images.fixed_height.url +
                                "' src='" +
                                i.images.fixed_width_small.url +
                                "'>"
                        ).click(function (e) {
                            callback($(this).data("gifsrc"));
                            editor.closeDropDown(true);
                            e.preventDefault();
                        });
                        gif.appendTo("#gif_offset_" + offset);
                    }
                }
            } else {
                gif_picker.addClass("no_result");
            }
            if (offset > 0) gif_picker.animate({ scrollTop: "+=100px" }, 200);
        }
        function bindScrollEvent(str, data) {
            var max_gif_to_show = 101;
            var picker = $("#fa_gif_picker");
            var offset = data.pagination.offset;
            var count = data.pagination.count;
            var total_count = data.pagination.total_count;
            var nextOffset = offset + count;
            if (nextOffset < total_count && nextOffset < max_gif_to_show) {
                picker.on("scroll", function () {
                    if (
                        $(this).scrollTop() + $(this).innerHeight() >=
                        $(this)[0].scrollHeight - 100
                    ) {
                        var timeoutScroll = null;
                        clearTimeout(timeoutScroll);
                        timeoutScroll = setTimeout(function () {
                            fetchGif(str, nextOffset, getGifType());
                        }, 500);
                        picker.unbind("scroll");
                    }
                });
            }
        }
        function fetchGif(str, offset, type) {
            if (typeof str === "undefined") str = "";
            if (typeof offset === "undefined") offset = 0;
            if (typeof type === "undefined") type = "gifs";
            $.ajax({
                url: "/ajax_giphy.php",
                method: "GET",
                data: { search: str, offset: offset, type: type },
                cache: false,
                async: true,
            })
                .done(function (data) {
                    if (data) {
                        data = JSON.parse(data);
                        populateGifPicker(data, offset);
                        $("#fa_gif_picker").unbind("scroll");
                        bindScrollEvent(str, data);
                    }
                })
                .fail(function (xhr) {
                    switch (xhr.status) {
                        case 400:
                            console.warn(
                                "[GIPHY] Your request was formatted incorrectly or missing a required parameter(s)."
                            );
                            $("#fa_gif_picker").addClass("no_result");
                            break;
                        case 401:
                            console.warn("[GIPHY] No API key found in request");
                            break;
                        case 403:
                            console.warn(
                                "[GIPHY] You weren't authorized to make your request; most likely this indicates an issue with your API Key."
                            );
                            break;
                        case 404:
                            console.warn(
                                "[GIPHY] The particular GIF or Sticker you are requesting was not found. This occurs, for example, if you request a GIF by using an id that does not exist."
                            );
                            $("#fa_gif_picker").addClass("no_result");
                            break;
                        case 429:
                            console.warn(
                                "[GIPHY] Your API Key is making too many requests. Read about requesting a Production Key to upgrade your API Key rate limits at https://developers.giphy.com/dashboard"
                            );
                            break;
                        default:
                            console.warn(
                                "[GIPHY] Fail with error code " + xhr.status
                            );
                            $("#fa_gif_picker").addClass("no_result");
                            break;
                    }
                });
        }
        function switchGifType() {
            $(".gif_switch_btn").unbind("click");
            $(".gif_switch_btn").toggleClass("selected");
            $(".gif_switch_btn:not(.selected)").bind("click", function () {
                switchGifType();
                fetchGif($("#gif_search").val(), 0, getGifType());
            });
            $("#gif_search").focus();
        }
        function getGifType() {
            if ($("#switch_gifs_btn").hasClass("selected")) return "gifs";
            if ($("#switch_stickers_btn").hasClass("selected"))
                return "stickers";
            return "gifs";
        }
        function setGifEventsHandlers() {
            var typingTimer;
            var doneTypingInterval = 500;
            var $input = $("#gif_search");
            $(".gif_switch_btn:not(.selected)").bind("click", function () {
                switchGifType();
                fetchGif($input.val(), 0, getGifType());
            });
            $input.on("keyup", function () {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(doneTyping, doneTypingInterval);
            });
            $input.on("keydown", function () {
                clearTimeout(typingTimer);
            });
            function doneTyping() {
                fetchGif($input.val(), 0, getGifType());
            }
        }
        fetchGif();
        editor.createDropDown(caller, "giphy", $content);
        setGifEventsHandlers();
    },
    exec: function (caller) {
        var editor = this;
        $.sceditor.command
            .get("giphy")
            ._dropDown(editor, caller, function (src) {
                editor.wysiwygEditorInsertHtml(
                    '<img class="fa_giphy_gif" src="' + src + '" />'
                );
            });
    },
    txtExec: function (caller) {
        var editor = this;
        $.sceditor.command
            .get("giphy")
            ._dropDown(editor, caller, function (src) {
                editor.insertText("[img]" + src + "[/img]");
            });
    },
    tooltip: "Insert a GIF",
});

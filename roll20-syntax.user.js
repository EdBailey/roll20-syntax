// ==UserScript==
// @name         Roll20 macro syntax highlighting
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Enable syntax highlighting for roll20 macros
// @author       Ed Bailey
// @match        https://app.roll20.net/editor/
// @grant        none
// @require https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/codemirror.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/addon/mode/simple.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/addon/display/fullscreen.min.js
// @require https://raw.githubusercontent.com/EdBailey/roll20-syntax/master/roll20.sytax.js
// @require https://raw.githubusercontent.com/rafaelw/mutation-summary/master/src/mutation-summary.js
// @resource      codemirrorCSS https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/codemirror.min.css
// @resource      codemirrorCSS_Monokai https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/theme/monokai.min.css
// @resource      codemirrorCSS_Fullscreen https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/addon/display/fullscreen.min.css
// @grant         GM_addStyle
// @grant         GM_getResourceText
// ==/UserScript==

GM_addStyle (GM_getResourceText ("codemirrorCSS") );
GM_addStyle (GM_getResourceText ("codemirrorCSS_Monokai") );
GM_addStyle (GM_getResourceText ("codemirrorCSS_Fullscreen") );

var observer = new MutationSummary({
    callback: function(summaries) {
        summaries.forEach(function(summary) {
            summary.added.forEach(function(element) {
                var cm = CodeMirror.fromTextArea(element, {
                    mode: "roll20",
                    lineWrapping: true,
                    theme: 'monokai',
                    extraKeys: {
                        "F11": function(cm) {
                            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                        },
                        "Esc": function(cm) {
                            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                        }
                    }
                });
                cm.on('changes', function() {
                    element.value = cm.getDoc().getValue();
                });
            });
        });
    },
    queries: [{
        element: '.tokenizer.macro, .tokenizer.action'
    }]
});

//Styles needed to both allow fullscreen to work and allow functionality in journals
var css = 'div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable {overflow: visible;}\
.CodeMirror-fullscreen { padding-left:60px; }\
.abil .CodeMirror { display: none; }\
.abil.editing .CodeMirror { display: block; }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}
head.appendChild(style);

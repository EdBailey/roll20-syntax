CodeMirror.defineSimpleMode("roll20", {
  // The start state contains the rules that are intially used
  start: [{
    regex: /\/(?:me|emas|roll|gmroll|w|ooc|em|talktomyself|fx|desc|as)(?= )/i,
    token: "keyword",
    sol: true
  }, {
    regex: /\[\[/,
    token: 'def'
  }, {
    regex: /\]\]/,
    token: "def",
    pop: true
  }, {
    regex: /\{\{/,
    token: 'tag'
  }, {
    regex: /\}\}/,
    token: "tag",
    pop: true
  }, {
    regex: /[0-9]*d(?:[0-9]+|f)(?:c[sf](?:[0-9]+))?/i,
    token: "variable-3"
  }, {
    regex: /\[.*?\]/,
    token: "comment"
  }, {
    regex: /\?\{/,
    token: "query",
    next: "query"
  }, {
    regex: /[\+\-\/\*]/,
    token: "operator"
  }, {
    regex: /=/,
    token: "punctuation"
  }, {
    regex: /[@&]\{.*?\}/,
    token: "variable-2"
  }, {
    regex: /#[^ ]+(?= )/,
    token: "link"
  }, {
    regex: /[0-9]+(?:\.[0-9]+)?/,
    token: "number"
  }, ],
  query: [{
    regex: /\}/,
    token: "query",
    next: "start"
  }, {
    regex: /([^\}\|]+)(\|)/,
    token: ["string", "operator"],
    next: "queryValue"
  }, ],
  queryValue: [{
    regex: /\}/,
    token: "query",
    next: "start"
  }, {
    regex: /\|/,
    token: "operator"
  }, {
    regex: /\[\[/,
    token: "def",
    push: "start"
  }, {
    regex: /, ?/,
    token: "punctuation"
  }, {
    regex: /[^\}\|\,]+/,
    token: "string"
  }, ],
});
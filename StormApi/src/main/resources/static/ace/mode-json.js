define("ace/mode/json_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var JsonHighlightRules = function () {
        this.$rules = {
            "start": [
                {
                    token: "keyword", // single line
                    regex: /^[^0-9].+\n*/,
                    next: "stats"
                }
            ],
            "stats": [
                {
                    token: "entity.name.function",
                    regex: /ac |AC |pp |PP |hp |HP |speed |SPEED |str |dex |con |int |wis |cha /
                }, {
                    token: "constant.numeric",
                    regex: /-|[+|-]|\d+d\d+|\d+/
                }, {
                    token: "constant.numeric",
                    regex: /\d/
                }, {
                    token: "keyword",
                    regex: /^[^0-9].+\n*/,
                    next: "ability"
                }
            ],
            "ability": [
                {
                    token: "entity.name.function",
                    regex: /ac |AC |pp |PP |hp |HP |speed |SPEED |str |dex |con |int |wis |cha /,
                    next: "stats"
                }, {
                    token: "constant.numeric",
                    regex: /[+|-]\s*\d+/,
                }, {
                    token: "entity.name.function",
                    regex: /to hit/,
                    next: "abilityBlock"
                }
            ],
            "abilityBlock": [
                {
                    token: "entity.name.function",
                    regex: /hit|reach|range/
                }, {
                    token: "constant.numeric",
                    regex: /\d|d|[+|-]/
                }, {
                    token: "entity.name.function",
                    regex: /(piercing|slashing|bludgeoning|fire|acid|ice|arcane|thunder)/
                }, {
                    token: "paren",
                    regex: /{/,
                    next: "description"
                }, /*{
                    token: "keyword",
                    regex: /^[^0-9].+\n* =>/,
                    next: "featureOrAbility"
                }, */{
                    token: "keyword",
                    regex: /^[^0-9][^=>]+\s*\n*/,
                    next: "featureOrAbility"
                }, {
                    defaultToken: "text"
                }
            ],
            "featureOrAbility": [
                {
                    token: "entity.name.function",
                    regex: /=>/,
                    next: "feature"
                }, {
                    token: "entity.name.function",
                    regex: /[^+{=>]+\s*.*\s*\n*/,
                    next: "abilityBlock"
                }, {
                    token: "constant.numeric",
                    regex: /[+|-]\s*\d+/,
                }, {
                    token: "entity.name.function",
                    regex: /to hit/,
                    next: "abilityBlock"
                }, {
                    token: "paren",
                    regex: /{/,
                    next: "description"
                }
            ],
            "description": [
                {
                    token: "paren",
                    regex: /}/,
                    next: "abilityBlock"
                }, {
                    defaultToken: "text"
                }
            ],
            "feature": [
                {
                    token: "entity.name.function",
                    regex: /=>/
                }, {
                    token: "paren",
                    regex: /{/
                }, {
                    token: "paren",
                    regex: /}/,
                    next: "featureName"
                }, {
                    defaultToken: "text"
                }
            ],
            "featureName": [
                {
                    token: "entity.name.function",
                    regex: /=>/
                }, {
                    token: "paren",
                    regex: /{/,
                    next: "feature"
                }, {
                    token: "keyword",
                    regex: /^[^0-9][^=>{}]+\n*/,
                }
            ]
        };

    };
    oop.inherits(JsonHighlightRules, TextHighlightRules);

    exports.JsonHighlightRules = JsonHighlightRules;
});

define("ace/mode/json", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/json_highlight_rules", "ace/mode/matching_brace_outdent", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle", "ace/worker/worker_client"], function (require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var HighlightRules = require("./json_highlight_rules").JsonHighlightRules;

    var Mode = function () {
        this.HighlightRules = HighlightRules;
    };
    oop.inherits(Mode, TextMode);

    exports.Mode = Mode;
});

define("ace/mode/storm_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"],
    function (require, exports, module) {
        "use strict";

        var oop = require("../lib/oop");
        var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

        var StormHighlightRules = function () {
            this.$rules = {
                "start": [
                    {
                        token: "keyword",
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
                        regex: /[+|-]\s*\d+/
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
                    }, {
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
                        regex: /[+|-]\s*\d+/
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
                        regex: /^[^0-9][^=>{}]+\n*/
                    }
                ]
            };
        };
        oop.inherits(StormHighlightRules, TextHighlightRules);

        exports.StormHighlightRules = StormHighlightRules;
    });

define("ace/mode/storm", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/storm_highlight_rules"],
    function (require, exports, module) {
        "use strict";

        const oop = require("../lib/oop");
        const TextMode = require("./text").Mode;
        const HighlightRules = require("./storm_highlight_rules").StormHighlightRules;

        const Mode = function () {
            this.HighlightRules = HighlightRules;
        };
        oop.inherits(Mode, TextMode);

        exports.Mode = Mode;
    });
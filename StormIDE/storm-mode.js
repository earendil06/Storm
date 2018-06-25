ace.define("ace/mode/storm_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"],
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
                        regex: /(actions|features)\s*{/,
                       next: "block"
                    }
                ],
                "block": [
                    {
                        token: "entity.name.function",
                        regex: /^[^0-9]+\s*=>\s*\n*/
                    }, {
                        token: "constant.numeric",
                        regex: /\s*{/,
                        next: "description"
                    }, {
                        token: "string",
                        regex: /hit|reach|range|to hit/
                    }, {
                        token: "constant.numeric",
                        regex: /[+|-]\s*\d+|\dd|\d|[+|-]/
                    }, {
                        token: "string",
                        regex: /(piercing|slashing|bludgeoning|fire|acid|ice|arcane|thunder)/
                    }, {
                        token: "keyword",
                        regex: /}\s*/,
                        next: "stats"
                    }, {
                        defaultToken: "text"
                    }
                ],
                "description": [
                    {
                        token: "constant.numeric",
                        regex: /}\s*/,
                        next: "block"
                    }, {
                        defaultToken: "text"
                    }
                ]
            };
            this.normalizeRules();
        };
        oop.inherits(StormHighlightRules, TextHighlightRules);

        exports.StormHighlightRules = StormHighlightRules;
    });

ace.define("ace/mode/storm", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/storm_highlight_rules"],
    function (require, exports, module) {
        "use strict";

        const oop = require("../lib/oop");
        const TextMode = require("./text").Mode;
        const HighlightRules = require("./storm_highlight_rules").StormHighlightRules;

        const Mode = function () {
            this.HighlightRules = HighlightRules;
        };
        oop.inherits(Mode, TextMode);

        (function() {

            this.$id = "ace/mode/storm-mode";

            var WorkerClient = require("ace/worker/worker_client").WorkerClient;
            this.createWorker = function(session) {
                this.$worker = new WorkerClient(["ace"], "ace/worker/my-worker", "MyWorker", "my-worker.js");
                this.$worker.attachToDocument(session.getDocument());

                this.$worker.on("errors", function(e) {
                    session.setAnnotations(e.data);
                });

                this.$worker.on("annotate", function(e) {
                    session.setAnnotations(e.data);
                });

                this.$worker.on("terminate", function() {
                    session.clearAnnotations();
                });

                return this.$worker;

            };

        }).call(Mode.prototype);

        exports.Mode = Mode;
    });
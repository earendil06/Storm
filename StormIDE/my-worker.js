importScripts("bower_components/ace-worker/worker.js");
importScripts("bower_components/ace-builds/src-noconflict/ace.js");
importScripts("bower_components/ace-worker/mirror.js");

ace.define('ace/worker/my-worker', ["require", "exports", "module", "ace/lib/oop", "ace/worker/mirror"],
    function (require, exports, module) {
        "use strict";

        var oop = require("ace/lib/oop");
        var Mirror = require("ace/worker/mirror").Mirror;

        var MyWorker = function (sender) {
            Mirror.call(this, sender);
            this.setTimeout(200);
            this.$dialect = null;
        };

        oop.inherits(MyWorker, Mirror);

        var ace_require = require;
        window.require = undefined; // prevent error: "Honey: 'require' already defined in
                                    // global scope"
        var Honey = {'requirePath': ['..']}; // walk up to js folder, see Honey docs
        importScripts("./require.js");
        var antlr4_require = window.require;
        window.require = require = ace_require;

        // load antlr4 and myLanguage
        var antlr4, StormLexer, StormParser, StormListener;
        try {
            window.require = antlr4_require;
            antlr4 = antlr4_require('antlr4/index');
            StormLexer = antlr4_require('./parser/StormLexer').StormLexer;
            StormParser = antlr4_require('./parser/StormParser').StormParser;
            StormListener = antlr4_require('./parser/StormListener').StormListener;
        } finally {
            window.require = ace_require;
        }

        var AnnotatingErrorListener = function (annotations) {
            antlr4.error.ErrorListener.call(this);
            this.annotations = annotations;
            return this;
        };

        AnnotatingErrorListener.prototype = Object.create(antlr4.error.ErrorListener.prototype);
        AnnotatingErrorListener.prototype.constructor = AnnotatingErrorListener;

        AnnotatingErrorListener.prototype.syntaxError = function (recognizer, offendingSymbol, line, column, msg, e) {
            /*console.log(offendingSymbol)
            console.log(line)
            console.log(column)
            console.log(msg)
            console.log(e)
            console.log('-----')
            console.log('-----')*/
            this.annotations.push({
                row: line - 1,
                column: column,
                text: msg,
                type: "error"
            });
        };

        var validate = function (input) {
            var stream = antlr4.CharStreams.fromString(input);
            var lexer = new StormLexer(stream);
            var tokens = new antlr4.CommonTokenStream(lexer);
            var parser = new StormParser(tokens);
            var annotations = [];
            var listener = new AnnotatingErrorListener(annotations);
            parser.removeErrorListeners();
            parser.addErrorListener(listener);
            // parser.block();
            var stormListener = new StormListener();
            var walker = new antlr4.tree.ParseTreeWalker();
            walker.walk(stormListener, parser.block());
            return annotations;
            // return [{row: 0, column: 0, text: "MyMode says Hello!", type: "error"}];
        };


        (function () {

            this.onUpdate = function () {
                var value = this.doc.getValue();
                var annotations = validate(value);
                this.sender.emit("annotate", annotations);
            };

        }).call(MyWorker.prototype);

        exports.MyWorker = MyWorker;
    });

var validate = function (input) {
    return [{row: 0, column: 0, text: "MyMode says Hello!", type: "error"}];
};
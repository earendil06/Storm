importScripts("bower_components/ace-worker/worker.js");
importScripts("bower_components/ace-builds/src-min/ace.js");
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

        (function () {
            this.onUpdate = function () {
                let value = this.doc.getValue();
                // let annotations = validate(value);
                // this.sender.emit("annotate", annotations);
            };

        }).call(MyWorker.prototype);

        exports.MyWorker = MyWorker;
    });

let validate = function (input) {
    return [{row: 0, column: 0, text: "MyMode says Hello!", type: "error"}];
};
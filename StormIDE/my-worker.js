importScripts("bower_components/ace-worker/worker.js");
importScripts("bower_components/ace-builds/src-min/ace.js");
importScripts("bower_components/ace-worker/mirror.js");

ace.define('ace/worker/my-worker', ["require", "exports", "module", "ace/lib/oop", "ace/worker/mirror"],
    function (require, exports, module, document) {
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
                this.sender.emit("storm-modified", value);
            };

        }).call(MyWorker.prototype);

        exports.MyWorker = MyWorker;
    });
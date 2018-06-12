var util = util || {};
util.toArray = function (list) {
    return Array.prototype.slice.call(list || [], 0);
};

class Command {

    constructor(name){
        this.name = name;
    }

    setCallback(f){
        this.callback = f;
    }
}

class ClearCommand extends Command {
    constructor(output, cmdline){
        super("clear");

        this.setCallback(function(){
            output.innerHTML = '';
            cmdline.value = '';
        });
    }
}

class Terminal {
    constructor(){

    }
}

var Terminal = Terminal || function (cmdLineContainer, outputContainer) {
    window.URL = window.URL || window.webkitURL;
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

    var cmdLine_ = document.querySelector(cmdLineContainer);
    var output_ = document.querySelector(outputContainer);

    const CMDS_ = [
        'cat', new ClearCommand(output_, cmdLine_), 'help', 'block'
    ];
    var history_ = [];
    var histpos_ = 0;
    var histtemp_ = 0;

    window.addEventListener('click', function (e) {
        cmdLine_.focus();
    }, false);

    cmdLine_.addEventListener('keydown', historyHandler_, false);
    cmdLine_.addEventListener('keydown', processNewCommand_, false);

    function historyHandler_(e) {
        if (history_.length) {
            if (e.keyCode === 38 || e.keyCode === 40) {
                if (history_[histpos_]) {
                    history_[histpos_] = this.value;
                } else {
                    histtemp_ = this.value;
                }
            }

            if (e.keyCode === 38) { // up
                histpos_--;
                if (histpos_ < 0) {
                    histpos_ = 0;
                }
            } else if (e.keyCode === 40) { // down
                histpos_++;
                if (histpos_ > history_.length) {
                    histpos_ = history_.length;
                }
            }

            if (e.keyCode === 38 || e.keyCode === 40) {
                this.value = history_[histpos_] ? history_[histpos_] : histtemp_;
            }
        }
    }

    //
    function processNewCommand_(e) {

        if (e.keyCode === 9) { // tab
            if (!this.value) {
                e.preventDefault();
            }
            var path = this.value.split(" ").filter(function (w) {
                return w !== "";
            });
            // Implement tab suggest.
        } else if (e.keyCode === 13) { // enter
            // Save shell history.
            if (this.value) {
                history_[history_.length] = this.value;
                histpos_ = history_.length;
            }

            // Duplicate current input and append to output section.
            var line = this.parentNode.parentNode.cloneNode(true);
            line.removeAttribute('id');
            line.classList.add('line');
            var input = line.querySelector('input.cmdline');
            input.autofocus = false;
            input.readOnly = true;
            output_.appendChild(line);

            if (this.value && this.value.trim()) {
                var args = this.value.split(' ').filter(function (val, i) {
                    return val;
                });
                var cmd = args[0].toLowerCase();
                args = args.splice(1); // Remove cmd from arg list.
            }

            switch (cmd) {
                case 'cat':
                    var url = args.join(' ');
                    if (!url) {
                        output('Usage: ' + cmd + ' https://s.codepen.io/...');
                        output('Example: ' + cmd + ' https://s.codepen.io/AndrewBarfield/pen/LEbPJx.js');
                        break;
                    }
                    $.get(url, function (data) {
                        var encodedStr = data.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
                            return '&#' + i.charCodeAt(0) + ';';
                        });
                        output('<pre>' + encodedStr + '</pre>');
                    });
                    break;
                case 'clear':
                    CMDS_[1].callback();
                    //new ClearCommand(this).callback();
                    //output_.innerHTML = '';
                    //this.value = '';
                    return;
                case 'help':
                    output('<div class="ls-files">' + CMDS_.join('<br>') + '</div>');
                    break;
                case'block':
                    var name = args[0];
                    $.ajax({
                        contentType: "application/json",
                        method: 'get',
                        url: 'http://localhost:8080/api/block/' + name,
                        success: function (data) {
                            output('<pre>' + data + '</pre>');
                        }
                    });
                    /*$.getJSON( 'http://localhost:8080/api/block/' + name, function(data) {
                        debugger;
                        /*var encodedStr = data.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
                            return '&#'+i.charCodeAt(0)+';';
                        });
                        output('<pre>' + data + '</pre>');
                    });*/
                    break;
                default:
                    if (cmd) {
                        output(cmd + ': command not found');
                    }
            }

            window.scrollTo(0, getDocHeight_());
            this.value = ''; // Clear/setup line for next input.
        }
    }

    //
    function formatColumns_(entries) {
        var maxName = entries[0].name;
        util.toArray(entries).forEach(function (entry, i) {
            if (entry.name.length > maxName.length) {
                maxName = entry.name;
            }
        });

        var height = entries.length <= 3 ?
            'height: ' + (entries.length * 15) + 'px;' : '';

        // 12px monospace font yields ~7px screen width.
        var colWidth = maxName.length * 7;

        return ['<div class="ls-files" style="-webkit-column-width:',
            colWidth, 'px;', height, '">'];
    }

    //
    function output(html) {
        output_.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
    }

    // Cross-browser impl to get document's height.
    function getDocHeight_() {
        var d = document;
        return Math.max(
            Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
            Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
            Math.max(d.body.clientHeight, d.documentElement.clientHeight)
        );
    }

    //
    return {
        init: function () {
            output('<img align="left" src="http://www.w3.org/html/logo/downloads/HTML5_Badge_128.png" width="100" height="100" style="padding: 0px 10px 20px 0px"><h2 style="letter-spacing: 4px">HTML5 Web Terminal</h2><p>' + new Date() + '</p><p>Enter "help" for more information.</p>');
        },
        output: output
    }
};
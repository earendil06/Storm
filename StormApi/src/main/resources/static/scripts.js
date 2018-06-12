$(function() {
    $('.prompt').html('[storm@web] # ');
    var term = new Terminal('#input-line .cmdline', '#container output');
    term.init();
});
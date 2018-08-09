let editor = ace.edit("editor");
editor.setTheme("ace/theme/solarized_dark");
editor.$blockScrolling = Infinity;
editor.setOptions({
    enableLiveAutocompletion: false
});
editor.getSession().setMode("ace/mode/storm");
ace.$ = $;
let langTools = ace.require('ace/ext/language_tools');
let tokens = ['AC ', 'ac ', 'PP ', 'pp ', 'HP ', 'hp ', 'speed ', 'str ', 'dex ', 'con ', 'int ', 'wis ', 'cha ',
    'actions {', 'features {', 'hit ', 'reach ', 'range ', 'to hit\n',
    'piercing', 'slashing', 'bludgeoning', 'fire', 'acid', 'ice', 'arcane', 'thunder', '=>'];
langTools.addCompleter({
    getCompletions: function (editor, session, pos, prefix, callback) {
        if (prefix.length === 0) {
            callback(null, []);
            return
        }
        callback(null, tokens.map(function (t) {
                return {name: t, value: t, score: 1, meta: "Statement"}
            })
        );
    }
});


function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

function saveTextAsFile() {
    let textToWrite = editor.getValue();
    let nameInput = textToWrite.split('\n')[0].split(" ").join("_");
    let textFileAsBlob = new Blob([textToWrite], {type: 'text/plain'});
    let fileNameToSaveAs;
    if (nameInput == null) return;
    if (nameInput === "" || /\s/.test(nameInput)) {
        console.log('Incorrect name, nothing has been saved.');
        return;
    } else {
        fileNameToSaveAs = nameInput.toLowerCase() + ".storm";
    }
    let downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
}

function save() {
    let textToWrite = editor.getValue();
    let nameInput = textToWrite.split('\n')[0].split(" ").join("_");
    let fileNameToSaveAs;
    if (nameInput == null) return;
    if (nameInput === "" || /\s/.test(nameInput)) {
        console.log('Incorrect name, nothing has been saved.');
        return;
    } else {
        fileNameToSaveAs = nameInput;
    }
    document.getElementById("loader").style.display = "block";
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/write/" + fileNameToSaveAs.toLowerCase(),
        data: textToWrite,
        contentType: "text/plain",
        success: function () {
            document.getElementById("loader").style.display = "none";
            console.log(fileNameToSaveAs + " saved!");
        },
        error: function (data) {
            if (data.status === 0) {
                document.getElementById("loader").style.display = "none";
                console.log("Can't reach server.");
            } else {
                document.getElementById("loader").style.display = "none";
                console.log("Something went wrong with error code " + data.status);
            }
        }
    });
}

let download = document.getElementById('download');
download.addEventListener('click', saveTextAsFile);

let saveButton = document.getElementById('save');
saveButton.addEventListener('click', save);

// let load = document.getElementById('load');
// button.addEventListener('click', ???);

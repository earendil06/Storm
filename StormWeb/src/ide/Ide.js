let editor = ace.edit("editor");
editor.setTheme("ace/theme/solarized_dark");
editor.$blockScrolling = Infinity;
editor.setOptions({
    enableLiveAutocompletion: false
});
editor.getSession().setMode("ace/mode/storm");
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
    let accessor = window.StaticHelpers.getAccessor();
    accessor.saveBlock(fileNameToSaveAs.toLowerCase(), textToWrite);
    console.log("saved"); //todo check the save and prompt it
}

async function load() {
    let name = prompt("Name of the monster to load", "goblin");
    if (name == null || name === "") {
        console.log("invalid input");
    } else {
        let localBlock = await window.StaticHelpers.getAccessor().loadLocalBlock(name);
        if (localBlock != null && localBlock !== "") {
            editor.setValue(localBlock, 1);
        } else {
            console.log(name + " not found");
        }
    }
}

let download = document.getElementById('download');
download.addEventListener('click', saveTextAsFile);

let saveButton = document.getElementById('save');
saveButton.addEventListener('click', save);

let loadButton = document.getElementById('load');
loadButton.addEventListener('click', load);

import Term from "./term/Main";
import Ide from "./ide/Main";
import * as $ from "jquery"

if ($("#container").length > 0) {
    if (!window.navigator.onLine){
        window.location.href = "index-offline.html";
    }
    Term.main();
} else {
    if (!window.navigator.onLine){
        window.location.href = "ide-offline.html";
    }
    Ide.main();
}

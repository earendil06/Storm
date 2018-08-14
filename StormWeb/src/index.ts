import Term from "./term/Main";
import Ide from "./ide/Main";
import * as $ from "jquery"

if ($("#container").length > 0) {
    Term.main();
} else {
    Ide.main();
}

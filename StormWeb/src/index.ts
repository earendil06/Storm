import Term from "./term/Main";
import Ide from "./ide/Main";
import * as $ from "jquery"
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../css/block.css';

if ($("#container").length > 0) {
    require("../css/term.css");

    const WebFont = require('webfontloader');

    WebFont.load({
        google: {
            families: ['Inconsolata']
        }
    });

    Term.main();
} else {
    Ide.main();
}

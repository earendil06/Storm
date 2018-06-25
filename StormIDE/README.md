# How to run

```shell
npm install
bower install #or use bower through ./node_modules if it not installed globally
```
then open index.html.

Any modification in the Storm.g4 must be copied in this package
and the code must be re-generated with JavaScript target for syntax
checking purpose (currently disabled cause not working correctly).

The syntax checking code is located in my-worker.js
(To enable it, uncomment the commented code in storm-mode.js).

The syntaxic coloration code is located in storm-mode.js.

The autocompletion code is located in index.html.

We might automatize all of this later.
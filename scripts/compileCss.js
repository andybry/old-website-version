"use strict";
/* 
  Avoid 64K limit for methods in Rhino optimisation.
  This can also be set using the command line option:
   -opt -1
 */
Packages.org.mozilla.javascript.Context.
        getCurrentContext().setOptimizationLevel(-1);

/* 
  env.js DOM implementation in JavaScript 
  Website: http://www.envjs.com/
 */
load("lib/env.rhino.1.2.js");
load("lib/less-1.3.3.js");

/* 
  less loads imports relative to the window location
  so use a local webserver for now

  TODO: work out how to avoid this
 */
window.location = "http://localhost:8080/www.arbryant101.com/index.htm";

var input = readFile("css/style.less");

var parser = new less.Parser({
  "paths": ["css/"],
  "filename": "css/style.less"
});
parser.parse(input, function(err, tree) {
  if(err) {
    print(JSON.stringify(err, function(key, value) { return value;}, 2));
  } else {
    print(tree.toCSS());
  }
});

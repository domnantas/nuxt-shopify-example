const hooks = require("require-extension-hooks");
require("browser-env")();

hooks("vue")
  .plugin("vue")
  .push();
hooks(["vue", "js"])
  .plugin("babel")
  .push();

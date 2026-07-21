const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const Dir = path.join(__dirname + "/plugins");
//Map is Power Full & Safe 
let plugins = new Map();

fs.readdir(Dir, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }
    files.forEach(el => {
        if (el.endsWith(".js")) {
            const model = require("./plugins/" + el);
            try {
                if (model.name && model.func) {
                    plugins.set(model.name, model.func);
                }
            } catch (err) {
                console.error("🔪 plugins loding fail:", err);
            }
        }
    });
});

router.get("/", (req, res) => {
    res.json({
        status: true,
        message: "go to Doc page"
    });
});
router.get("/:name", (req, res) => {
  //check plugings in map
  let name = req.params.name
  if(plugins.has(name)){
     let plug = plugins.get(name);
     plug(req,res)
  }else{
    res.json({
      status: false,
      message:"wrong api usage Sorry Try Other\n Read Doc"
    })
  }
});

module.exports = router;

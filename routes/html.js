var path= require("path")
module.exports=function(app){
 app.get("/articles", function(req, res) {
   res.sendFile(path.join(__dirname+"../public/index"))
  });
}

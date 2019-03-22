var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");
module.exports=function(app){
app.get("/scrape", function(req, res) {
    axios.get("https://www.foxnews.com/").then(function(response) {
      var $ = cheerio.load(response.data);
      var result = [];
      $("article.article").each(function(i, element) {
        var title = $(element).find(".info").find(".info-header").find(".meta").find("span").find("a").text();
        var sum = $(element).find(".info").find(".info-header").find("h2").find("a").text()
        var link = $(element).find(".info").find(".info-header").find("h2").find("a").attr("href");
        if(title&&sum&&link){
        result.push({title:title,sum:sum,link:link})
        }
      });
      db.Article.insertMany(result,{ordered:1})
      .then(function(dbArticle) {console.log(dbArticle);}).catch(function(err) {console.log(err);});
      res.send("/done");
    });
  });

  app.get("/articles", function(req, res) {
    db.Article.find({}).then(Article=>res.json(Article))
  });

  app.get("/articles/:id", function(req, res) {
    db.Article.find({_id:req.params.id}).populate("note")
    .then(article=>res.json(article))
  });
  
  // Route for saving/updating an Article's associated Note
  app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)
    .then(dbnote=>db.Article.findOneAndUpdate({_id:req.params.id},{$set:{note:dbnote._id}})
    .then(Article=> res.json(Article)))
  });
}
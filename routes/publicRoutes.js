const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = app => {
  app.get("/", (req, res) => {
    axios.get("https://www.nytimes.com/").then(response => {
      let $ = cheerio.load(response.data);

      let results = [];

      $("article").each((i, element) => {
        let title = $(element)
          .children()
          .find("h2.esl82me2")
          .text();
        let summary = $(element)
          .children()
          .find("p.e1n8kpyg0")
          .text();
        let link =
          "https://www.nytimes.com" +
          $(element)
            .children()
            .find("a")
            .attr("href");

        results.push({
          id: i,
          title: title,
          summary: summary,
          link: link
        });
      });
      res.render("index", {
        article: results
      });
    });
  });

  app.get("/saved", (req, res) => {
    console.log("sending");
    db.Article.find({}).populate('notes').then(dbArticle => {
      let article = dbArticle;
      console.log(article);
      res.render("saved", {
        article: article
      });
    });
  });
};
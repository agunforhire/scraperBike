const cheerio = require('cheerio');
const axios = require('axios');

function scrape() {
  axios.get("https://www.nytimes.com/").then(res => {
             let $ = cheerio.load(res.data);

             let results = [];

             $("article").each((i, element) => {

                 let title = $(element).children().find("h2.esl82me2").text();
                 let summary = $(element).children().find("p.e1n8kpyg0").text();
                 let link = "https://www.nytimes.com" + $(element).children().find("a").attr("href");

                 results.push({
                     id: i,
                     title: title,
                     summary: summary,
                     link: link
                 });
});
                return results;
         });
}

module.exports = scrape;

scrape();
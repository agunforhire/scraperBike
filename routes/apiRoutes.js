const db = require('../models');

module.exports = (app) => {
  app.post('/articles', (req, res) =>{
    console.log(req.body.title);
    db.Article.create(req.body)
      .then(dbArticle => {
        res.json(dbArticle);
      });
  });

  app.post('/notes', (req,res) => {
db.Note.create(req.body)
    .then(function(dbNote){
      console.log('object id:',dbNote.articleId);
      return db.Article.findOneAndUpdate({_id: dbNote.articleId}, {$push: { notes: dbNote._id}}, {new: true});    })
    .catch((err) =>{
      console.error(err);
      res.json(err);
    });
  });

  app.delete('/articles', (req,res) =>{
    db.Article.remove({})
      .then(dbArticle =>{
        console.log('Article Removed');
      })
  });

  app.get('/articles', (req,res) => {
    db.Article.find({}).populate('notes').then((dbNote)=>{
      res.json(dbNote);
    });
  });

  app.get('/notes', (req,res) => {
    db.Note.find({}).then((dbNote) =>{
      res.json(dbNote);
    });
  });
}
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./views"));
app.set('view engine', 'ejs')
const MongoClient = require('mongodb').MongoClient;

    let db;
    MongoClient.connect("mongodb://leks:leks@ds249415.mlab.com:49415/quotesapp", (err, database) => {
      if (err) return console.log(err);
      db = database;
      app.listen(3000, () => {
        console.log(`server is running on port ${3000}`);
      });
    });

  app.get('/', (req, res) => {
      db.collection('quotes').find().toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('index', {quotes: result})
      });
    });

app.post("/quotes", (req, res) => {
    db.collection("quotes").save(req.body, (err, result) => {
       if (err) return console.log(err);

       console.log(`${req.body} has been saved to the database`);
    res.redirect("/");
     });
});

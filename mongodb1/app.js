const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDB, getDB } = require('./db');

const app = express();
app.use(express.json());

let db;

connectToDB((err) => {
  if (!err)
    {
      app.listen(3000, () => {   
        console.log('Example app listening on port 3000!');
      });
    }
    db = getDB();
})

app.get('/books', (req, res) => {
  const page = req.query.p || 1;
  const booksPerPage = 3;

  let books = []

  db.collection('books')
    .find()
    .sort({ author:1 })
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach(book => {
      books.push(book);
    })
    .then(() => {
      res.status(200).json(books);
    })
    .catch(
      res.status(500).json({ error: "couldnt fetch the docs"})
    )
});

app.get('/books/:id', (req, res) => {
if (ObjectId.isValid(req.params.id)) {
  db.collection.findOne({_id: ObjectId(req.params.id)})
    .then(doc => 
      res.status(200).json(doc)
      )
    .catch(err => {
      res.status(500).json({err: "server err couldnt fetch data"})
    })
} else {
  res.status(500).json({err: "not valid id"});
}

})

app.post('/books', (req, res) => {
  const book = req.body

  db.collection('books')
    .insertOne(book)
    .then(res => {
      res.status(201).json(res)
    })
    .catch(err => {
      res.status(500).json({ err: 'couldnt create a new doc'})
    })
})

app.delete('/books/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection.deleteOne({_id: ObjectId(req.params.id)})
      .then(res => 
        res.status(200).json(res)
        )
      .catch(err => {
        res.status(500).json({err: "couldnt delete the doc"})
      })
  } else {
    res.status(500).json({err: "not valid id"});
  }
})

app.patch('/books/:id', (req, res) => {
  const updates = req.body

  if (ObjectId.isValid(req.params.id)) {
    db.collection.updateOne({_id: ObjectId(req.params.id)}, {$set: updates})
      .then(res => 
        res.status(200).json(res)
        )
      .catch(err => {
        res.status(500).json({err: "couldnt update the doc"})
      })
  } else {
    res.status(500).json({err: "not valid id"});
  }
})


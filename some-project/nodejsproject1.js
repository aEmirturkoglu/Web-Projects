// Require modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Create app
const app = express();

// Set port
const port = process.env.PORT || 5500;

// Connect to database
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to database'))
    .catch(err => console.error(err));

// Define schema and model
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: {type: Date, default: Date.now}
});

const Post = mongoose.model('Post', postSchema);

// Set view engine and static folder
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// Define routes
app.get('/', (req, res) => {
    // Get all posts from database and render index page
    Post.find({}, (err, posts) => {
        if (err) return console.error(err);
        res.render('index', {posts: posts});
    });
});

app.get('/new', (req, res) => {
    // Render new post form
    res.render('new');
});

app.post('/new', (req, res) => {
    // Create a new post from form data and save to database
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save((err, post) => {
        if (err) return console.error(err);
        // Redirect to home page
        res.redirect('/');
    });
});

app.get('/post/:id', (req, res) => {
    // Get a single post by id and render show page
    Post.findById(req.params.id, (err, post) => {
        if (err) return console.error(err);
        res.render('show', {post: post});
    });
});

app.get('/edit/:id', (req, res) => {
    // Get a single post by id and render edit page
    Post.findById(req.params.id, (err, post) => {
        if (err) return console.error(err);
        res.render('edit', {post: post});
    });
});

app.post('/edit/:id', (req, res) => {
    // Update a single post by id with form data and save to database
    Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content
    }, (err, post) => {
        if (err) return console.error(err);
        // Redirect to show page
        res.redirect('/post/' + req.params.id);
    });
});

app.post('/delete/:id', (req, res) => {
    // Delete a single post by id from database
    Post.findByIdAndDelete(req.params.id, (err, post) => {
        if (err) return console.error(err);
        // Redirect to home page
        res.redirect('/');
    });
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));

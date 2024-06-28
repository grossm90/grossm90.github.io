const path = require('path');
const pug = require('pug');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./database/models/Post');
const app = new express;

mongoose.connect('mongodb://127.0.0.1:27017/node-blog')
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))

app.use(express.static('public'));

app.set('view engine', 'pug');

app.set('views', __dirname + '/views');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/resume', (req, res) => {
    res.render('resume');
});

app.get('/projects', (req, res) => {
    res.render('projects');
});

app.get('/posts', async (req, res) => {
    const posts = await Post.find({});
    res.render('blog', {
        posts
    });
});

app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('post', {
        post
    })
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/posts/new', (req, res) => {
    res.render('create');
});

app.post('/posts/store', (req, res) => {
    Post.create(req.body)
        .then(() => {
            res.redirect('/');
        })
        .catch((error) => {
            console.log(error);
        })
});

app.listen(4000, () => {
    console.log('App listening on port 4000');
});


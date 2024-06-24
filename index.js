const path = require('path');

const express = require('express');

const app = new express;

const pug = require('pug');

app.use(express.static('public'));

app.set('view engine', 'pug');

app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/resume', (req, res) => {
    res.render('resume');
});

app.get('/projects', (req, res) => {
    res.render('projects');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(4000, () => {
    console.log('App listening on port 4000');
});


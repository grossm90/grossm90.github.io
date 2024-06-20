const path = require('path');

const express = require('express');

const app = new express;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});

app.get('/resume', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/resume.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/projects.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.listen(4000, () => {
    console.log('App listening on port 4000');
});


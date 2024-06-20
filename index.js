const path = require ('path');

const express = require ('express');

const app = new express;

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/pages/index.html'));
});

app.listen(4000, () => {
    console.log('App listening on port 4000');
});


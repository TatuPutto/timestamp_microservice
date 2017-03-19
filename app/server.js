const express = require('express');
const url = require('url');
const timestamp = require('./timestamp');
const app = express();

app.set('port', (process.env.PORT || 8080));

app.use(express.static(__dirname));

app.get('/', (req, res) => res.render('index'));

app.get('/:time', (req, res) => {
    const urlObj = url.parse(req.url, true)
    const output = timestamp(urlObj.pathname.substring(1));
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(output);
});

app.listen(app.get('port'));

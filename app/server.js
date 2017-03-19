const express = require('express');
const url = require('url');
const timestamp = require('./timestamp');
const app = express();

app.set('port', (process.env.PORT || 8080));

app.use(express.static(__dirname));

app.get('/', (req, res) => res.render('index'));

app.get('/:time', (req, res) => {
    const urlObj = url.parse(req.url, true)
    const parsedPathname = urlObj.pathname.replace(/%20/g, ',');
    const output = timestamp(parsedPathname.substring(1));
    res.end(JSON.stringify(output));
});

app.listen(app.get('port'));

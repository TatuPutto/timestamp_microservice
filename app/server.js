const express = require('express');
const app = express();

app.get('/', (request, response) => {
    response.send('123');
});
app.listen(8080, () => {
    console.log('Listening to port 8080');
});

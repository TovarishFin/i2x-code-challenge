const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});
app.listen(process.env.PORT || 8080);

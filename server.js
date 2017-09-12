const express = require('express');
const app = express();

app.use(express.static(__dirname + '/src/'));
app.get('/', function(res, res) {
  res.sendFile(__dirname + '/dist/index.html');
})
app.listen(process.env.PORT || 8080);

const express = require('express');
const app = express();
const routes = require('./routes');
const port = process.env.PORT || 8080;
const path = require('path'); 


app.use(express.json());

app.use('/', routes);

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});





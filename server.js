const express = require('express');
const app = express();
const routes = require('./routes');
const port = process.env.PORT || 8080;
const path = require('path'); 
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'my_db';

MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    const db = client.db(dbName);

    // Pass the MongoDB database connection to the routes
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    // Set up routes
    app.use(express.json());
    app.use('/', routes);
    app.use(express.static('public'));

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

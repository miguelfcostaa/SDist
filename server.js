const express = require('express');
const app = express();
const routes = require('./routes');
const port = process.env.PORT || 8080;
const path = require('path'); 
const MongoClient = require('mongodb').MongoClient;

const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'my_db';

MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  const db = client.db(dbName);

  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  app.use(express.json());
  app.use('/', routes);
  app.use(express.static('public'));

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  
});


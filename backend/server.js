const express = require('express');
const app = express();
const routes = require('./routes');
const port = process.env.PORT || 3000;
const path = require('path'); 
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');


app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies


const mongoUrl = process.env.MONGODB_URL || 'mongodb+srv://miguelfcosta88:miguel1234@sdistdb.sbvckky.mongodb.net/';
const dbName = process.env.DB_NAME || 'sdist_db';


MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

  .then((client) => {

    const db = client.db(dbName);
    console.log(`\nDatabase connected!`);
    
    // Configurações CORS para permitir acesso de qualquer origem (não seguro para produção)
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*'); // Permitir acesso de qualquer origem
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Cabeçalhos permitidos
      next();
    });

    // Pass the MongoDB database connection to the routes
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    // Set up routes
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json());
    app.use('/', routes);
    

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

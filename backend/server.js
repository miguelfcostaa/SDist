const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 8080;

app.use(bodyParser.json());

const mongoUrl = process.env.MONGODB_URL || 'mongodb+srv://miguelfcosta88:miguel1234@sdistdb.sbvckky.mongodb.net/';
const dbName = process.env.DB_NAME || 'sdist_db';


// Função para conectar ao MongoDB
const connectToMongoDB = async () => {
  const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Conectado ao MongoDB');
    return client.db(dbName);
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB', error);
    throw error;
  }
};


app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});


// Endpoint para login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const db = await connectToMongoDB();

  // Verificar se o usuário existe e a senha está correta
  const user = await db.collection('users').findOne({ username, password });

  if (user) {
    return res.json({ message: 'Login bem-sucedido' });
  } else {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

// Endpoint para criar uma conta
app.post('/api/create-account', async (req, res) => {
  const { username, password } = req.body;

  const db = await connectToMongoDB();

  // Verificar se o usuário já existe
  const existingUser = await db.collection('users').findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: 'Usuário já existe' });
  }

  // Criar uma nova conta
  await db.collection('users').insertOne({ username, password });

  return res.json({ message: 'Conta criada com sucesso' });
});


app.listen(port, () => {
  console.log(`Servidor backend iniciado na porta ${port}`);
});

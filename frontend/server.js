const express = require('express');
const path = require('path');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());


app.use('/api', express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/api/create-account', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});


app.get('/api/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


app.listen(port, () => {
  console.log(`Servidor Frontend iniciado na porta ${port}`);
});
const express = require('express');
const path = require('path');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());


app.use('/api', express.static(path.join(__dirname, 'public')));


app.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/api/create-account', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/api/create-account-success', (req, res) => {
  res.send('Account created!');
});

app.get('/api/create-account-fail', (req, res) => {
  res.send('Error: username already exists.');
});


app.get('/api/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


app.get('/api/login-success', (req, res) => {
  res.send('Login was successful!');
});


app.get('/api/login-fail', (req, res) => {
  res.send('Login Failed: Your username or password is incorrect.');
});


app.listen(port, () => {
  console.log(`Servidor Frontend iniciado na porta ${port}`);
});
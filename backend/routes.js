const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

router.get('/create-account', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

router.get('/login-sucess', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

router.get('/login-fail', (req, res) => {
  res.status(409).json({ message: 'Invalid credentials.' });
});

router.get('/create-sucess', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

router.get('/create-fail', (req, res) => {
  res.status(409).json({ message: 'User already exists.' });
});

router.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});


router.post('/create-account', async (req, res) => {
  const { username, password } = req.body;
  const db = req.db;

  const existingUser = await db.collection('users').findOne({ username });

  if (existingUser) {
    return res.redirect('/create-fail');
  }

  await db.collection('users').insertOne({ username, password });2
  return res.redirect('/create-sucess');
  //res.status(201).json({ message: 'User created', userId: result.insertedId });
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const db = req.db;

  // Check if the user exists and the password is correct
  const user = await db.collection('users').findOne({ username, password });

  if (!user) {
    return res.redirect('/login-fail');
  }

  // If login is successful, send a JSON message to another service
  try {
    const response = await axios.post('http://login-backend-service/login', {
      username: user.username,
      password: user.password,
    });

    if (response.status === 200) {
      // Operação bem-sucedida, você pode tratar isso conforme necessário
      console.log('Successfully sent login information to the other service');
    } else {
      console.warn('Unexpected status code from the other service:', response.status);
      // Tratar de acordo com suas necessidades
    }

    return res.redirect('/login-sucess');
  } 
  catch (error) {
    // Handle the error if the request to the other service fails
    console.error('Error sending JSON message to other service:', error.message);
    res.status(500).json({ message: 'Internal server error' });
    return res.redirect('/login-fail');
  }
});


module.exports = router;

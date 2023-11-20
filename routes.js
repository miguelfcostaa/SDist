const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});


router.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

router.get('/menu/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});


router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const db = req.db;

  const existingUser = await db.collection('users').findOne({ username });

  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  await db.collection('users').insertOne({ username, password });
  return res.redirect('/menu');
  //res.status(201).json({ message: 'User created', userId: result.insertedId });
});



router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const db = req.db;

  // Check if the user exists and the password is correct
  const user = await db.collection('users').findOne({ username, password });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  //res.json({ message: 'Login successful', user });
  return res.redirect('/menu');
});


module.exports = router;

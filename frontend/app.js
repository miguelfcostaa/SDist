import axiosInstance from './api';

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 80;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Frontend server is running on http://localhost:${port}`);
});


axiosInstance.get('/')
  .then(response => {

    console.log(response.data);
  })
  .catch(error => {

    console.error(error);
  });
ddw

axiosInstance.get('/login')
  .then(response => {

    console.log(response.data);
  })
  .catch(error => {

    console.error(error);
  });


axiosInstance.post('/create-account', { username: 'example', password: 'password' })
  .then(response => {

    console.log(response.data);
  })
  .catch(error => {

    console.error(error);
  });


axiosInstance.post('/login', { username: 'example', password: 'password' })
  .then(response => {
    
    console.log(response.data);
  })
  .catch(error => {

    console.error(error);
  });
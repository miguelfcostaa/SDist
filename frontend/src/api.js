import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://login-backend-service:8080', // Replace with your backend service IP
});

export default instance;

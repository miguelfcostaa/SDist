import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.43.0.1:8080', // Replace with your backend service IP
});

export default instance;

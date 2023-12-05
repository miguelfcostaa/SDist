import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.43.244.57:8080', // Replace with your backend service IP
});

export default instance;

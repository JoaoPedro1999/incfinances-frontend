import axios from 'axios';

const api = axios.create({
  baseURL: 'http://157.245.252.101/',
});

export default api;

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4732',
});

export default axiosInstance;
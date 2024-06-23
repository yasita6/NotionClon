import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/v1';
const getToken = () => localStorage.getItem("token");


const axiosClient = axios.create({
  baseURL: BASE_URL,
});

// API を叩く前に前処理を行う
axiosClient.interceptors.request.use(async(config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`, //リクエストヘッダにJWTを付けてサーバーに渡す
    },
  };
});

axiosClient.interceptors.response.use((response) => {
  return response;
}, (err) => {
  throw err.response;
  }
);

export default axiosClient;
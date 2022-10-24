import axios from "axios";

const client = axios.create({
  baseURL: 'http://localhost:3008'
});

// Add a request interceptor
client.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default client;
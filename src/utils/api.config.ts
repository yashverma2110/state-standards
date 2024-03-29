import axios from "axios";

export const API = axios.create({
  baseURL:
    process.env.NODE_ENV === 'dev'
      ? 'http://localhost:8080'
      : 'https://dev.quizizz.com/_ssserver',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

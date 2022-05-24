import axios from "axios";

export const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "dev"
      ? "http://localhost:8080"
      : "http://34.227.222.221:8080",
});

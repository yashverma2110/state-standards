import axios from "axios";

export const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "dev"
      ? "http://localhost:8080"
      : "https://dev-services.quizizz.com",
  headers: {
    "x-standard": "state",
    "Access-Control-Allow-Origin": "*",
  },
});

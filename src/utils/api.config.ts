import axios from "axios";

export const API = axios.create({
  baseURL: "https://state-standards-be.vercel.app",
});

import axios from "axios";

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT || 3000}`;
}

export const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
});

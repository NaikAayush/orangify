import axios from "axios";

export const walletAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_WALLET_API_URL,
});

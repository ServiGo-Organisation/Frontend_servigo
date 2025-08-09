import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const url = "http://192.168.43.43:8087";

const customFetch = axios.create({
  baseURL: url,
});

// Ajoute automatiquement le token dans chaque requête si présent
customFetch.interceptors.request.use(
  async (config) => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;

      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
    } catch (err) {
      console.error("Erreur intercepteur axios:", err);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default customFetch;

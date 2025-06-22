import axios from "axios";

export const url = "http://192.168.43.43:8087";
const customFetch = axios.create({
  baseURL: url,
});

export default customFetch;

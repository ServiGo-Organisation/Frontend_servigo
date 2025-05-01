import axios from "axios";

const url = "http://192.168.1.106:8087";
const customFetch = axios.create({
  baseURL: url,
});
export default customFetch;

import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/user`;

function register(name, email, password) {
  return http.post(apiEndpoint, { name, email, password });
}

export default {
  register,
};

import http from "./httpService";
import config from "../config.json";

const apiEndpoint = `${config.apiUrl}/user`;

function register(name, email, password) {
  return http.post(apiEndpoint, { name, email, password });
}

export default {
  register,
};

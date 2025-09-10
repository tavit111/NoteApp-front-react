import http from "./httpService";

const apiEndpoint = `${process.env.REACT_APP_API_URL}/user`;

function register(name, email, password) {
  return http.post(apiEndpoint, { name, email, password });
}

export default {
  register,
};

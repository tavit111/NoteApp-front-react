import axios from "axios";
import auth from "./authService";

axios.interceptors.response.use(null, (error) => {
  const unexpectedErrors =
    error.response &&
    error.response.status < 400 &&
    error.response.status >= 500;

  if (unexpectedErrors) {
    console.log(error);
    alert("unexpected error");
  }

  return Promise.reject(error);
});

function setToken(token) {
  axios.defaults.headers.common["x-auth-token"] = token;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setToken,
};

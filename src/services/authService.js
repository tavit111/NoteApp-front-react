import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = `${process.env.REACT_APP_API_URL}/auth`;
const tokenKey = "note-app-token";

http.setToken(getToken());

async function login(email, password) {
  const res = await http.post(apiEndpoint, { email, password });

  localStorage.setItem(tokenKey, res.data);
}

function logWithJwt(token) {
  localStorage.setItem(tokenKey, token);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    return jwtDecode(token);
  } catch (er) {
    return null;
  }
}

function getToken() {
  try {
    return localStorage.getItem(tokenKey);
  } catch (ex) {
    return null;
  }
}

export default { login, logout, logWithJwt, getCurrentUser, getToken };

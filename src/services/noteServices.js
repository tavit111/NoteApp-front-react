import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/notes`;

function getNotes() {
  return http.get(apiEndpoint);
}

function getNote(id) {
  return http.get(`${apiEndpoint}/${id}`);
}

function createNote(title, body) {
  return http.post(apiEndpoint, { title, body });
}

function updateNote(id, title, body) {
  return http.put(`${apiEndpoint}/${id}`, { title, body });
}

function deleteNote(id) {
  return http.delete(`${apiEndpoint}/${id}`);
}

export default { getNotes, getNote, createNote, updateNote, deleteNote };

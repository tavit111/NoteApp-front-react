import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/notes`;
const noteUrl = (id) => `${apiEndpoint}/${id}`;

function getNotes() {
  return http.get(apiEndpoint);
}

function getNote(id) {
  return http.get(noteUrl(id));
}

function createNote(title, body) {
  return http.post(apiEndpoint, { title, body });
}

function updateNote(id, title, body) {
  return http.put(`${apiEndpoint}/${id}`, { title, body });
}

export default { getNotes, getNote, createNote, updateNote };

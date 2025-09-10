import http from "./httpService";

const apiEndpoint = `${process.env.REACT_APP_API_URL}/notes`;

function getNotes() {
  return http.get(apiEndpoint);
}

function getNote(id) {
  return http.get(`${apiEndpoint}/${id}`);
}

function createNote(title, body, category) {
  return http.post(apiEndpoint, {
    title,
    body,
    category: category ? category : null,
  });
}

function updateNote(id, title, body, category) {
  return http.put(`${apiEndpoint}/${id}`, {
    title,
    body,
    category: category ? category : null,
  });
}

function deleteNote(id) {
  return http.delete(`${apiEndpoint}/${id}`);
}

export default { getNotes, getNote, createNote, updateNote, deleteNote };

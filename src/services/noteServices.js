import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/notes`;
const noteUrl = (id) => `${apiEndpoint}/${id}`;

const notes = [
  {
    _id: "1",
    title: "Note 1",
    body: "This is my note number 1.",
    date: 1636375809000,
  },
  {
    _id: "2",
    title: "Note 2",
    body: "This is my note number 2.",
    date: 1636030209000,
  },
  {
    _id: "3",
    title: "Note 3",
    body: "This is my note number 3.",
    date: 1635771009000,
  },
];

function getNotes() {
  return http.get(apiEndpoint);
}

function getNote(id) {
  return http.get(noteUrl(id));
}

export { getNotes, getNote };

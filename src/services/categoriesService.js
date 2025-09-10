import http from "./httpService";

const apiEndpoint = `${process.env.REACT_APP_API_URL}/categories`;

function getCategories() {
  return http.get(apiEndpoint);
}

function createCategory(name) {
  return http.post(apiEndpoint, { name });
}

function deleteCategory(id) {
  return http.delete(`${apiEndpoint}/${id}`);
}

export default { getCategories, createCategory, deleteCategory };

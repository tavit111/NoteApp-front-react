import http from "./httpService";
import config from "../config.json";

const apiEndpoint = `${config.apiUrl}/categories`;

function getCategories() {
  return http.get(apiEndpoint);
}
function createCategory(name) {
  return http.post(apiEndpoint, { name });
}

export default { getCategories, createCategory };

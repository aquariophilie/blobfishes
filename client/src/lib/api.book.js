import axios from 'axios'
import {
  API_PATH
} from './api';

const apiBookPath = `${API_PATH}/book`;

function findBooks() {
  return axios.get(apiBookPath);
}

function insertBook(payload) {
  return axios.post(apiBookPath, payload);
}

function updateBook(id, payload) {
  const path = `${apiBookPath}/${id}`;
  return axios.put(path, payload);
}

function removeBook(id) {
  const path = `${apiBookPath}/${id}`;
  return axios.delete(path);
}

export const apiBook = {
  findBooks,
  insertBook,
  updateBook,
  removeBook
}
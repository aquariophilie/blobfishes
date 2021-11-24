import axios from 'axios'
import {
  API_PATH
} from './api';

const apiAuthorPath = `${API_PATH}/author`;

function findAuthors() {
  return axios.get(apiAuthorPath);
}

function insertAuthor(payload) {
  return axios.post(apiAuthorPath, payload);
}

function updateAuthor(id, payload) {
  const path = `${apiAuthorPath}/${id}`;
  return axios.put(path, payload);
}

function removeAuthor(id) {
  const path = `${apiAuthorPath}/${id}`;
  return axios.delete(path);
}

export const apiAuthor = {
  findAuthors,
  insertAuthor,
  updateAuthor,
  removeAuthor
}
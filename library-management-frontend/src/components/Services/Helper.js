import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";
const authorization = {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
};

const helpers = {
  checkadmin: function () {
    return axios.get(API_URL + "checkadmin", authorization);
  },
  dashboardData: function () {
    return axios.get(API_URL + "dashboardData", authorization);
  },
  register: function (data) {
    return axios.post(API_URL + "register", data);
  },
  signout: function () {
    return axios.get(API_URL + "signout", authorization);
  },
  getUserList: function () {
    return axios.get(API_URL + "getUserList", authorization);
  },
  deleteUser: function (data) {
    return axios.post(API_URL + "deleteUser", data, authorization);
  },
  addUser: function (data) {
    return axios.post(API_URL + "addUser", data, authorization);
  },
  updateUser: function (data) {
    return axios.post(API_URL + "updateUser", data, authorization);
  },

  getBookList: function () {
    return axios.get(API_URL + "getBookList", authorization);
  },
  deleteBook: function (data) {
    return axios.post(API_URL + "deleteBook", data, authorization);
  },
  addBook: function (data) {
    return axios.post(API_URL + "addBook", data, authorization);
  },
  updateBook: function (data) {
    return axios.post(API_URL + "updateBook", data, authorization);
  },

  sendBookRequest: function (data) {
    return axios.post(API_URL + "sendBookRequest", data, authorization);
  },
  getRequestList: function () {
    return axios.get(API_URL + "getRequestList", authorization);
  },
  getAvailableBooks: function () {
    return axios.get(API_URL + "getAvailableBooks", authorization);
  },
  rejectRequest: function (data) {
    return axios.post(API_URL + "rejectRequest", data, authorization);
  },
  approveRequest: function (data) {
    return axios.post(API_URL + "approveRequest", data, authorization);
  },
  returnRequest: function (data) {
    return axios.post(API_URL + "returnRequest", data, authorization);
  },
};

export default helpers;

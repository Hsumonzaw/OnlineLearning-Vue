import axios from "../config";

class UserAccountService {
  axios;
  constructor() {
    this.axios = axios;
  }

  getUserList(userType) {
    let url = `/useraccounts`;
    return this.axios
      .get(url, {
        params: {
          userType,
        },
      })
      .then((request) => request.data);
  }
  getUserListFree(userType) {
    let url = `/free/useraccounts`;
    return this.axios
      .get(url, {
        params: {
          userType,
        },
      })
      .then((request) => request.data);
  }

  // addUser(user) {
  //   let url = `/useraccounts`;
  //   return this.axios.post(url, user).then((request) => request.data);
  // }
  addUser(user) {
  let url = `/useraccounts`;
  return this.axios.post(url, user, {
    headers: { "Content-Type": "application/json" },
  }).then((request) => request.data);
}
  addUserFree(user) {
  let url = `/free/useraccounts`;
  return this.axios.post(url, user, {
    headers: { "Content-Type": "application/json" },
  }).then((request) => request.data);
}

 saveFreeUserAccounts(user) {
    let url = `/free/useraccounts`;
    return this.axios.post(url, user).then((request) => request.data);
  }
  updateUser(useraccounts) {
    let url = `/useraccounts/${useraccounts.userAccountId}`;
    return this.axios.put(url, useraccounts).then((request) => request.data);
  }
  deleteUser(userAccountId) {
    let url = `/useraccounts/${userAccountId}`;
    return this.axios.delete(url).then((request) => request.data);
  }
  updatePhoto(formData, userAccountId) {
    let url = `useraccounts/${userAccountId}/photo`;
    return axios
      .put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((request) => request.data);
  }
    updateFile(formData, userAccountId) {
    let url = `useraccounts/${userAccountId}/file`;
    return axios
      .put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((request) => request.data);
  }
getStudentsForTeacher() {
  return axios
    .get(`/useraccounts`, { params: { userType: "TEACHER" } })
    .then((res) => res.data);
}
register(student) {
  return this.addUser(student);
}
  login(data) {
    return this.axios.post("/useraccounts/login", data).then(res => res.data);
  }

   

  
}

const service = new UserAccountService();
export default service;
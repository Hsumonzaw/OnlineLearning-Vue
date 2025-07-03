import axios from "../config";

class UserAccountService {
  axios;
  constructor() {
    this.axios = axios;
  }

  getUserList() {
    let url = `/useraccounts`;
    return this.axios.get(url).then((request) => request.data);
  }

  addUser(user) {
    let url = `/useraccounts`;
    return this.axios.post(url, user).then((request) => request.data);
  }

  updateUser(useraccounts) {
    let url = `/useraccounts/${useraccounts.userAccountId}`;
    return this.axios.put(url, useraccounts).then((request) => request.data);
  }
  deleteUser(userAccount) {
    let url = `/useraccounts/${userAccount.userAccountId}`;
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

}

const service = new UserAccountService();
export default service;

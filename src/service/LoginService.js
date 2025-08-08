import axios from "../config";

class LoginService {
  axios;
  constructor() {
    this.axios = axios;
  }

  loginAccount(user) {
    let url = `/useraccounts/login`;
    return axios
      .get(url, {
        params: {
          userName: user.userName,
          password: user.password,
        },
      })
      .then((request) => request.data);
  }

  // Corrected method to send JSON data
  registerAccount(user) {
    return axios.post(`/free/useraccounts`, user)
      .then(res => res.data);
  }

  // This new method is for sending the photo as multipart/form-data
  updatePhoto(formData, userId) {
    return axios.post(`/useraccounts/${userId}/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(res => res.data);
  }
}

const service = new LoginService();
export default service;
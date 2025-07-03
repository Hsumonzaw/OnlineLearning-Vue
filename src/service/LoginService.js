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
}

const service = new LoginService();
export default service;

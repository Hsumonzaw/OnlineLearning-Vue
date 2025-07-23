import axios from "../config";

class AnsService {
  axios;
  constructor() {
    this.axios = axios;
  }

  getAnsList() {
    let url = `/ans`;
    return this.axios.get(url).then((request) => request.data);
  }
  
  
}

const service = new AnsService();
export default service;
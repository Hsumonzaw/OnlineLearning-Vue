import axios from "../config";

class AnsService {
  axios;
  constructor() {
    this.axios = axios;
  }

  getExamans() {
    let url = `/examans`;
    return this.axios.get(url).then((request) => request.data);
  }
  
  
}

const service = new AnsService();
export default service;
import axios from "../config";

class AnsService {
  axios;
  constructor() {
    this.axios = axios;
  }

  getExamMark() {
    let url = `/ansmark`;
    return this.axios.get(url).then((request) => request.data);
  }
  
  
}

const service = new AnsService();
export default service;
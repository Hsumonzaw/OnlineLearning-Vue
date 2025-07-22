import axios from "../config";

class CoursesService {
  axios;
  constructor() {
    this.axios = axios;
  }

  getCourseList() {
    let url = `/`;
    return this.axios.get(url).then((request) => request.data);
  }
}

const service = new CoursesService();
export default service;

import axios from "../config";

class CoursesService {
  axios;
  constructor() {
    this.axios = axios;
  }

  getCoursesList() {
    let url = `/courses`;
    return this.axios.get(url).then((request) => request.data);
  }

  addCoursesList(courses) {
    let url = `/courses`;
    return this.axios.post(url, courses).then((request) => request.data);
  }
}

const service = new CoursesService();
export default service;
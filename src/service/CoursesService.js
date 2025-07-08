import axios from "../config";

class CoursesService {
  axios;
  constructor() {
    this.axios = axios;
  }

  getCourseList() {
    let url = `/courses`;
    return this.axios.get(url).then((request) => request.data);
  }
  addCourse(course) {
    let url = `/courses`;
    return this.axios.post(url, course).then((request) => request.data);
  }

  updateCourse(course) {
    let url = `/courses/${course.coursesId}`;
    return this.axios.put(url, course).then((request) => request.data);
  }
  deleteCourse(course) {
    let url = `/courses/${course.coursesId}`;
    return this.axios.delete(url).then((request) => request.data);
  }
}

const service = new CoursesService();
export default service;

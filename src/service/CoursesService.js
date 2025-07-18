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

  updateCorPhoto(formData, coursesId) {
    let url = `courses/${coursesId}/cphoto`;
    return axios
      .put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((request) => request.data);
  }
  courseListMethodByType() {
  coursesService.getCourseListByType(this.type)
    .then((response) => {
      this.coursesList = response;
    })
    .catch((err) => console.error("Fetch error:", err));
}
}

const service = new CoursesService();
export default service;

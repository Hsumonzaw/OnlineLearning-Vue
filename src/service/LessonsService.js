import axios from "../config";

class LessonService {
  axios;
  constructor() {
    this.axios = axios;
  }

  getLessonList() {
    let url =`/lessons`;
    return this.axios.get(url).then((request) => request.data);
  }

//   getLessonList(freeVideo = null) {
//   let url = "/lessons";
//   if (freeVideo) {
//     url += `?freeVideo=${freeVideo}`;
//   }
//   return this.axios.get(url).then((request) => request.data);
// }

  addLesson(lesson) {
    let url = `/lessons`;
    return this.axios.post(url, lesson).then((request) => request.data);
  }

  updateLesson(lesson) {
    let url =`/lessons/${lesson.lessonsId}`;
    return this.axios.put(url, lesson).then((request) => request.data);
  }
  deleteLesson(lesson) {
    let url = `/lessons/${lesson.lessonsId}`;
    return this.axios.delete(url).then((request) => request.data);
  }
  updateFile(formData, lessonsId) {
    let url = `lessons/${lessonsId}/pdf`;
    return axios
      .put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((request) => request.data);
  }
}



const service = new LessonService();
export default service;
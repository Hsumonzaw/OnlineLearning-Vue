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
  addLesson(lesson) {
    let url = `/lessons`;
    return this.axios.post(url, lesson).then((request) => request.data);
  }

  // updateLesson(lessons) {
  //   let url = /lessons/${lessons.lessonsId};
  //   return this.axios.put(url, lessons).then((request) => request.data);
  // }
  // deleteLesson(lessons) {
  //   let url = /lessons/${lessons.lessonsId};
  //   return this.axios.delete(url).then((request) => request.data);
  // }

}

const service = new LessonService();
export default service;
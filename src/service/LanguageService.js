import axios from "../config";

class LanguageService {
  axios;
  constructor() {
    this.axios = axios;
  }

  getLanguageList() {
    let url =`/languages`;
    return this.axios.get(url).then((request) => request.data);
  }
  addLanguageList(language) {
    let url = `/languages`;
    return this.axios.post(url, language).then((request) => request.data);
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

const service = new LanguageService();
export default service;
import axios from "../config";

class LanguageService {
  axios;
  constructor() {
    this.axios = axios;
  }

  getLanguageList() {
    let url = `/languages`;
    return this.axios.get(url).then((request) => request.data);
  }
  addLanguageList(language) {
    let url = `/languages`;
    return this.axios.post(url, language).then((request) => request.data);
  }

  updateLanguage(language) {
    let url = `/languages/${language.languagesId}`;
    return this.axios.put(url, language).then((request) => request.data);
  }
  deleteLanguage(language) {
    let url = `/languages/${language.languagesId}`;
    return this.axios.delete(url).then((request) => request.data);
  }
  getLanguageListFree() {
    let url = `/free/languages`;
    return this.axios.get(url).then((request) => request.data);
  }
  
}

const service = new LanguageService();
export default service;

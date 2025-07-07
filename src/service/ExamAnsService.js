import axios from "../config";

class ExamAnsService {
    axios;
  constructor() {
    this.axios = axios;
}

getExamList() {
    let url = `/examans`;
    return this.axios.get(url).then((request) => request.data);
  }


  addExam(exam) {
    let url = `/examans`;
    return this.axios.post(url, exam).then((request) => request.data);
  }
}

const service = new ExamAnsService();
export default service;

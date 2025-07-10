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


addExamList(exam) {
    let url = `/examans`;
    return this.axios.post(url, exam).then((request) => request.data);
  }
   updateLanguage(exam) {
    let url = `/examans/${exam.examansId}`;
    return this.axios.put(url, exam).then((request) => request.data);
  }
  deleteLanguage(exam) {
    let url = `/examans/${exam.examansId}`;
    return this.axios.delete(url).then((request) => request.data);
  }
}

const service = new ExamAnsService();
export default service;

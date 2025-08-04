import axios from "../config";

class QuizService {
  axios;
  constructor() {
    this.axios = axios;
  }

  getQuizList() {
    let url = `/quiz`;
    return this.axios.get(url).then((request) => request.data);
  }
  
  getQuizStudent(languagesId) {
    let url = `/quiz/student/${languagesId}`;
    return this.axios.get(url).then((request) => request.data);
  }
  addQuizList(quiz) {
    let url = `/quiz`;
    return this.axios.post(url, quiz).then((request) => request.data);
  }

  updateQuiz(quiz) {
    let url = `/quiz/${quiz.quizId}`;
    return this.axios.put(url, quiz).then((request) => request.data);
  }
  deleteQuiz(quiz) {
    let url = `/quiz/${quiz.quizId}`;
    return this.axios.delete(url).then((request) => request.data);
  }
   saveAns(coursesId,quizList,minutesCount) {
    let url = `/ans/${coursesId}/${minutesCount}`;
    return this.axios.post(url,quizList).then((request) => request.data);
  }
  getExamMark(languagesId) {
    let url = `/ans/exammark/${languagesId}`;
    return this.axios.get(url).then((request) => request.data);
  }
  pdfCertificate(score,languagesName) {
        return this.axios({
          url: `/free/pdf/certificate`,
          method: "GET",
          responseType: "blob",
          params: {
          score, languagesName
        }
        });
        
    }
}

const service = new QuizService();
export default service;

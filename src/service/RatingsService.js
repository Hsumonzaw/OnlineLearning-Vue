import axios from "../config";

class RatingService {
  axios;
  constructor() {
    this.axios = axios;
  }

  getRatingList() {
    let url = `/ratings`;
    return this.axios.get(url).then((request) => request.data);
  }

}

const service = new RatingService();
export default service;
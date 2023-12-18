import axios from "axios";

const localinstance = axios.create({
  // baseURL: "http://192.168.7.148:7000/api/",
  // baseURL: "http://192.168.7.168:7000/api/",
  // baseURL: "http://192.168.29.99:7000/api",
  // baseURL: "https://stageapi.eupheusapp.com/api/",
  // baseURL: "http://192.168.7.90:7000/api/",
  // baseURL: "https://eubookapi.eupheusapp.com/api/",
  baseURL: "https://prodapi.eubook.in/",
});

export default localinstance;

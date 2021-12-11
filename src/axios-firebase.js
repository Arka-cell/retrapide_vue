import axios from "axios";
import firebase from "firebase/app";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.interceptors.request.use(async (config) => {
  let token = await firebase.auth().currentUser.getIdToken(true);

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

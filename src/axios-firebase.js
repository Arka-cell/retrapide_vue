import axios from "axios";
import firebase from "firebase/app";
import "firebase"

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.interceptors.request.use(async (config) => {
  try {
    let token = await firebase.auth().currentUser.getIdToken(true);

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  } catch {
    return config;
  }
});

import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase/app";
import "@/axios-firebase";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import "buefy/dist/buefy.css";


Vue.config.productionTip = false;


Vue.use(Buefy);

const firebaseConfig = {
  apiKey: "AIzaSyD3Lk6zKTSlwiORxlyXGUGsXf4Y0BJNnkw",
  authDomain: "retrapide-f9e63.firebaseapp.com",
  projectId: "retrapide-f9e63",
  storageBucket: "retrapide-f9e63.appspot.com",
  messagingSenderId: "1072771612057",
  appId: "1:1072771612057:web:ce275e87a808b415eb2708",
  measurementId: "${config.measurementId}",
};

firebase.initializeApp(firebaseConfig);

const getUser = () => {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};

store.dispatch("updateUser", getUser());

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

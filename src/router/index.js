import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "@/views/ProfileView.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/LoginView.vue"),
    meta: {
      guest: true,
    },
  },

  {
    path: "/leaf",
    name: "Leaf",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/LeafView.vue"),
  },

  {
    path: "*",
    name: "Error",
    component: () =>
      import(/* webpackChunkName: "errorPage" */ "@/views/Error.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        next();
      } else {
        next({
          name: "Login",
        });
      }
    });
  } else if (to.matched.some((record) => record.meta.guest)) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        next({
          name: "Profile",
        });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

export default router;
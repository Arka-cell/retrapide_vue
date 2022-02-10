<template>
  <div id="app">
    <PageLoader :mountedFinished="this.mountedFinished"/>
    <nav class="navbar py-4">
      <div class="container">
        <div class="navbar-brand is-centered">
          <router-link class="navbar-item" to="/">
            <img
              class="image is-flex is-centered"
              src="./assets/suitcase.png"
            />
          </router-link>
          <a
            class="navbar-burger"
            role="button"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class="navbar-menu">
          
          <div class="navbar-end">
            <input v-model="search_query" class="input" type="text" placeholder="Text input" @keyup.enter="search()">
            <router-link class="navbar-item" to="/about">About</router-link
            ><router-link class="navbar-item" to="/companies"
              >Companies</router-link
            ><router-link class="navbar-item" to="/services"
              >Services</router-link
            ><router-link class="navbar-item" to="/chat">Chat</router-link>
          </div>
          <div class="navbar-item">
            <div id="login" v-if="user" class="buttons">
              <router-link class="button" :to="{ name: 'Profile' }"
                >Profile</router-link
              >
              <button class="button is-danger" @click="signOut()">Logout</button>
            </div>
            <div id="logout" v-else class="buttons">
              <router-link class="button" :to="{ name: 'Login' }"
                >Login as a user</router-link
              >
              <router-link class="button" :to="{ name: 'Login' }"
                >Login as a company</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
import firebase from "firebase/app";
import PageLoader from "@/components/PageLoader.vue";

export default {
  data() {
    return {
      user: null,
      mountedFinished: false,
      search_query: "",
    };
  },
  components: {
    PageLoader
  },
  async mounted() {
    this.user = await this.$store.state.user;
    this.mountedFinished = true;
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
      this.user = null;
      this.$store.dispatch("updateUser", this.user);
    },
    async search() {
      await this.$router.push({ path: `/job-search/${this.search_query}`});
      if(this.$router.currentRoute.name === "JobOffersResult") {
        this.$router.go();
      }
    }
  },
};
</script>

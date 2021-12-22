<template>
  <div id="app">
    <div v-if="user" id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link :to="{ name: 'Profile' }">Profile</router-link> |
    </div>
    <div v-else id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link :to="{ name: 'Login' }">Login</router-link> |
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  async mounted() {
    this.user = await this.$store.state.user;
  },
};
</script>

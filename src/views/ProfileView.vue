<template>
  <div id="profile-view" class="container">
    <div class="columns is-multiline is-centered">
      <PersonalInfoSection />
      <CVSection />

      <section class="section column is-8">
        <h1 class="title">Se déconnecter</h1>
        <b-button @click="signOut">Se déconnecter</b-button>
      </section>
    </div>
  </div>
</template>

<script>
import PersonalInfoSection from "@/components/PersonalInfoSection.vue";
import CVSection from "@/components/CVSection.vue";
import firebase from "firebase/app";

export default {
  name: "ProfileView",
  components: { PersonalInfoSection, CVSection },
  methods: {
    signOut() {
      firebase.auth().signOut();
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

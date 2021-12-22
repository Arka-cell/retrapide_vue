<template>
  <div id="profile-view" class="container">
    <PersonalInfoSection />
  </div>
</template>

<script>
import PersonalInfoSection from "@/components/PersonalInfoSection.vue";
import firebase from "firebase/app";

export default {
  name: "ProfileView",
  components: { PersonalInfoSection },
  methods: {
    signOut() {
      firebase.auth().signOut();
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

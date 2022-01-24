<template>
  <div id="profile-view" class="section">
    <PageLoader :mountedFinished="this.mountedFinished" />
    <div class="box has-text-centered">
      <h1 class="title is-3">Thank you for trusting our service!</h1>
      <h2 class="title is-4">What are you interested in?</h2>
      <div class="columns is-centered has-addons">
        <button
          class="button is-danger is-selected is-italic"
          @click="beJobSeeker()"
        >
          I wanna find a job
        </button>
        <div class="button" disabled>Or</div>
        <button
          class="button is-danger is-selected is-italic"
          @click="beCompany()"
        >
          I wanna recruit talent
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import axios from "axios";
import PageLoader from "@/components/PageLoader.vue";

export default {
  name: "ProfileView",
  components: {
    PageLoader,
  },
  data() {
    return {
      mountedFinished: false,
    };
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
      this.$router.push({ name: "Home" });
    },
    async beCompany() {
      // send to company form and create company in the API
      const response = await axios.put("/company/");
      if (response.status === 201) {
        this.$router.push({ name: "CompanyRegistration" });
      }
    },
    async beJobSeeker() {
      // send to jobseeker form and create jobseeker in the API
      const response = await axios.put("/job-seeker/");
      if (response.status === 201) {
        this.$router.push({ name: "JobSeekerRegistration" });
      }
    },
  },
  async mounted() {
    // we need to add a big loading circle that should finish at the ends of mounted
    const response = await axios.get("/user-state/");
    if (response.data.is_company == "Not Created") {
      // permissions not defined
    } else if (response.data.is_company) {
      // push router to company infos page
      await this.$router.push({ name: "CompanyRegistration" });
    } else {
      // push router to job seeker infos page
      await this.$router.push({ name: "JobSeekerRegistration" });
    }
    this.mountedFinished = true;
  },
};
</script>
<style></style>

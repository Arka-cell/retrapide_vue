<template>
  <div class="box has-text-centered">
    <PageLoader :mountedFinished="this.mountedFinished" />
    <h1 class="title">Résultat de recherche pour {{query}} </h1>
    <div class="columns is-multiline">
      <JobOfferCard v-for="job in job_offers" :key="job.id" :content="job" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import JobOfferCard from "@/components/JobOfferCard.vue";

export default {
  props: {
    query: { type: String, required: true },
  },
  components: {
    JobOfferCard,
  },
  data() {
    return {
      job_offers: {},
      mountedFinished: false,
    };
  },
  methods: {
    async getJobsResult() {
      const response = await axios.get(`/search-jobs/${this.query}/`);
      this.job_offers = await response.data;
    },
  },
  mounted() {
    // I should query all jobs in a view where we can query jobs by a string
    this.getJobsResult();
    this.mountedFinished = true;
  }
};
</script>

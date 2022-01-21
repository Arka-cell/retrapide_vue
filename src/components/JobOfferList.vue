<template>
  <div class="box has-text-centered">
    <h1 class="title">Nos offres d'emploi</h1>
    <div class="columns is-multiline">
      <JobOfferCard
        v-for="job in job_offers"
        :key="job.id"
        :content="job"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import JobOfferCard from "@/components/JobOfferCard.vue";

export default {
  data() {
    return {
      page: 1,
      job_offers: [],
    };
  },
  components: {
    JobOfferCard,
  },
  mounted() {
    this.getJobPage()
  },
  methods: {
    async getJobPage() {
      const response = await axios.get(`/job-offers/${this.page}/`);
      this.job_offers = response.data.job_offers;
    },
  },
};
</script>

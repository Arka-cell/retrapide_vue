<template>
<div>
<div class="columns is-centered">
    <CandidateCard 
      v-for="candidate in candidates"
      :key="candidate.id"
      :content="candidate"
      class="column is-10"
    />
  </div>
</div>
</template>
<script>
import axios from "axios";
import CandidateCard from "@/components/CandidateCard.vue"

export default {
  name: "OfferCandidates",
  components: {
      CandidateCard
  },
  props: {
    id: { type: String, required: false },
  },
  data() {
    return {
      candidates: [],
      offer_id: this.id,
    };
  },
  async mounted() {
    this.offer_id = this.offer_id == undefined ? 19 : this.offer_id
    const response = await axios.get(
      `/my-job-offers/${this.offer_id}/candidates/`
    );
    this.candidates = response.data;
  },
};
</script>

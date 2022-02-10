<template>
  <div class="box has-text-centered">
    <div class="columns is-multiline is-centered">
      <CompanyCard
        v-for="company in companies"
        :key="company.id"
        :content="company"
      />
    </div>
  </div>
</template>
<script>
import CompanyCard from "@/components/CompanyCard";
import axios from "axios";

export default {
  components: {
    CompanyCard,
  },
  data() {
    return {
      page: 1,
      companies: [],
      n_pages: 0,
    };
  },
  methods: {
    async getCompanies() {
      const response = await axios.get(`/companies/${this.page}/`);
      this.companies = response.data.companies;
      this.n_pages = response.data.n_pages;
    },
  },
  mounted() {
    this.getCompanies();
  },
};
</script>

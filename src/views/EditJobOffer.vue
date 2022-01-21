<template>
  <div class="columns is-centered">
      
    <div class="column is-7">
      <img
        class="icon is-clickable"
        src="@/assets/back-arrow.png"
        @click="myProfile()"
      />
      <div class="box">
        <div class="field">
          <label class="label">Job Title</label>
          <div class="control has-icons-left has-icons-right">
            <input
              class="input is-success"
              type="text"
              placeholder="Enter Job Title"
              value=""
              v-model="form.title"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Job Description</label>
          <div class="control has-icons-left has-icons-right">
            <textarea
              class="textarea is-success"
              placeholder="Describe Job Postion"
              value=""
              v-model="form.description"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Skillsets</label>
          <div class="control has-icons-left has-icons-right">
            <textarea
              class="textarea is-success"
              placeholder="Job Positions Skillsets"
              value=""
              v-model="form.skillsets"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Requirements</label>
          <div class="control has-icons-left has-icons-right">
            <textarea
              class="textarea is-success"
              placeholder="Job Positions Skillsets"
              value=""
              v-model="form.requirements"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="has-text-centered">
        <button class="button is-success" @click="updateJobOffer()">
          Edit Job Offer
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {},
      savedForm: {},
    };
  },
  mounted() {
    this.getJobOffer()
  },
  methods: {
    async getJobOffer() {
        const response = await axios.get(`/my-job-offers/${this.$route.params.id}/`);
        this.form = response.data;
        for (const key in this.form) {
            this.savedForm[key] = this.form[key];
        }
    },
    async updateJobOffer() {
      const editedData = {};
      for (const key in this.form) {
        if (this.form[key] == this.savedForm[key]) {
          continue;
        } else {
          editedData[key] = this.form[key];
        }
      }
      const response = await axios.patch(`/my-job-offers/${this.$route.params.id}/`, editedData);
      this.form = response.data;
      this.getJobOffer()
    },
    async myProfile() {
        this.$router.push({ name: "CompanyRegistration" })
    }
  },
};
</script>

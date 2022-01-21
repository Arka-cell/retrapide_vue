<template>
  <div class="columns is-centered">
    <div class="column is-7">
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
        <button class="button is-success" @click="createJob()">
          Create Job
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
      form: {
        title: "",
        requirements: "",
        description: "",
        skillsets: "",
        error: null,
      },
    };
  },
  methods: {
    async createJob() {
      const response = await axios.put("/my-job-offers/", this.form);
      if (response.status == 201) {
        this.$router.push({ name: "CompanyRegistration" });
      } else if (response.status == 200) {
        this.error = response.data.error
      }
    },
  },
};
</script>

<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-6 is-4-desktop mb-5 is-centered">
            <div class="py-5 has-text-centered">
              <span class="has-text-grey-dark">Full Name</span>
              <h3 class="mb-5 is-size-4 has-text-weight-bold">Profile Info</h3>
              <div class="field">
                <div class="mb-2 columns is-multiline">
                  <div class="column is-6">
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        placeholder="First Name"
                        v-model="personalInfos.first_name"
                      />
                    </div>
                  </div>
                  <div class="column is-6">
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        placeholder="Last Name"
                        v-model="personalInfos.last_name"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input mb-2"
                    type="date"
                    placeholder="Birthdate"
                    min="1900-01-01"
                    max="2022-01-01"
                    v-model="personalInfos.birthdate"
                  />
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input mb-3"
                    type="text"
                    placeholder="Address"
                    v-model="personalInfos.location"
                  />
                </div>
              </div>
              <label class="checkbox mb-5">
                <input
                  class="checkbox mr-2"
                  type="checkbox"
                  name="terms"
                  v-model="personalInfos.open_for_job"
                />
                <small class="has-text-grey-dark"
                  >Currently looking for a job?</small
                >
              </label>
              <button
                class="button is-primary mb-3 is-fullwidth"
                @click="updateInfos()"
              >
                Update Profile
              </button>
            </div>
          </div>
          <div class="column is-6 is-4-desktop mb-5">
            <iframe id="resume" :src="resume_src">

            </iframe>
            <label>
              <input
                class="button is-primary mb-3 is-2"
                text="Upload Your Resume"
                type="file"
                id="file"
                ref="file"
                v-on:change="handleFileUpload()"
              />
            </label>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import firebase from "firebase";

export default {
  data() {
    return {
      personalInfos: {},
      resume: "",
      resume_src: "",
    };
  },
  async mounted() {
    const response = await axios.get("/job-seeker-infos/");
    this.personalInfos = response.data;
    this.getResume();
  },
  methods: {
    async updateInfos() {
      console.log(this.personalInfos);
      const response = await axios.patch(
        "/job-seeker-infos/",
        this.personalInfos
      );
      this.personalInfos = response.data;
      this.getResume();
    },
    async handleFileUpload() {
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      console.log(this.file);
      formData.append("file", this.file);
      const response = await axios.put("/upload-resume/", formData);
      console.log(response);
    },
    async getResume() {
      const storage = firebase.storage();
      var storageRef = storage.ref();
      const user = await this.$store.state.user;
      const resumeRef = storageRef.child(`${user.uid}/${user.uid}.pdf`);

      resumeRef.getDownloadURL()
        .then((url) => {
          this.resume_src = url;
        })
    }
  },
};
</script>

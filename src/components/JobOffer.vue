<template>
  <div class="columns is-centered">
    <div class="column box is-10">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-96x96">
                <img :src="this.company_image" alt="Placeholder image" />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{ job_offer.title }}</p>
              <p class="subtitle is-6">{{ job_offer.company_name }}</p>
            </div>
          </div>

          <div class="content">
            {{ job_offer.description }}
            <br />
            <time
              :datetime="job_offer.created_at"
              class="has-text-weight-medium is-italic is-size-6"
            >
              <span class="icon is-small is-left">
                <img class="custom-icon" src="@/assets/calendar.png" />
              </span>
              {{
                new Date(Date.parse(job_offer.created_at))
                  .toISOString()
                  .replace("-", "/")
                  .split("T")[0]
                  .replace("-", "/")
              }}</time
            >
            {{ job_offer.created_at }}
          </div>
          <div class="buttons is-right">
            <div
              v-if="
                this.is_company == false
              "
              :class="job_offer.has_applied ? 'button is-gray is-light': 'button is-success is-right'" :disabled="job_offer.has_applied ? true : false"
              @click="applyJob(job_offer.id, job_offer.get_uid)"
            >
              {{ job_offer.has_applied ? 'Déja postulé' : 'Postuler' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";

export default {
  name: "JobOffer",
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      job_offer: {},
      company_image: "",
      is_company: true,
    };
  },
  mounted() {
    this.getJob();
  },
  methods: {
    async getUserState() {
      const response = await axios.get("/user-state/");
      this.is_company = response.data.is_company;
    },
    async getJob() {
      const user = await this.$store.state.user
      const id = this.id;
      if(user) {
        const response = await axios.get(`/job-offer/${id}/`);
        this.job_offer = response.data;
        console.log(this.job_offer)

      } else {
        const response = await axios.get(`/job-offer/${id}/`);
        this.job_offer = response.data;
      }
      this.getImage();
      this.getUserState();
      
    },
    async getImage() {
      const storage = firebase.storage();
      const storageRef = storage.ref();

      const imageRef = await storageRef.child("img/" + this.job_offer.get_uid);
      imageRef.getDownloadURL().then((url) => {
        this.company_image = url;
      });
    },
    async applyJob(id, companyId) {
      if (!this.is_company) {
        await axios.put(`/apply-job/${id}/`);
        this.allowResume(companyId);
        this.job_offer.has_applied = true;
      } else if (this.is_company == "Not Created") {
        this.$router.push({ name: "Login" });
      }
    },
    async allowResume(companyId) {
      const storage = firebase.storage();
      var storageRef = storage.ref();
      const user = await this.$store.state.user;
      const resumeRef = storageRef.child(`${user.uid}/${user.uid}.pdf`);
      const metadata = await resumeRef.getMetadata();
      const stringMetadata = JSON.stringify(metadata.customMetadata)
      const newMetadata = {
        customMetadata: {
          companies:  stringMetadata.companies + companyId,
        },
      };
      await resumeRef.updateMetadata(newMetadata);
    },
  },
};
</script>

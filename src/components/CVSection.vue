<template>
  <section id="cv" class="section is-relative column is-8">
    <h1 class="title">Curriculum Vitæ</h1>

    <UploadCV @uploadFile="sendFile" />
    <DisplayCV :cv="cv" />
    <b-loading
      v-model="isLoading"
      :is-full-page="false"
      :can-cancel="false"
    ></b-loading>
  </section>
</template>

<script>
import axios from "axios";
import UploadCV from "@/components/UploadCV.vue";
import DisplayCV from "@/components/DisplayCV.vue";

export default {
  name: "CVSection",
  components: { UploadCV, DisplayCV },
  data() {
    return {
      cv: "",
      isLoading: false,
    };
  },

  async created() {
    this.isLoading = true;
    let { data } = await axios.get("/seeker-cv-file/", {
      responseType: "blob",
    });
    if (data.size < 100) {
      this.isLoading = false;
    } else {
      let blob = new Blob([data], { type: "application/pdf" });
      let objectUrl = URL.createObjectURL(blob);
      this.cv = objectUrl;
      this.isLoading = false;
    }
  },

  methods: {
    async sendFile(file) {
      this.isLoading = true;
      let { data } = await axios.put("/seeker-cv-file/", file, {
        responseType: "blob",
        headers: {
          "Content-Disposition": `cv_file; filename=cv.pdf`,
          "Content-Type": "application/pdf",
        },
      });
      let blob = new Blob([data], { type: "application/pdf" });
      let objectUrl = URL.createObjectURL(blob);
      this.cv = objectUrl;
      this.isLoading = false;
    },
  },
};
</script>

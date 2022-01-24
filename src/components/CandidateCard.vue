<template>
  <div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-96x96">
              <img :src="this.profile_img" class="is-rounded" />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">
              {{ candidate.first_name }} {{ candidate.last_name }}
            </p>
            <p class="subtitle is-6">{{ candidate.email }}</p>
          </div>
        </div>

        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
          iaculis mauris. <a>@bulmaio</a>. <a href="#">#css</a>
          <a href="#">#responsive</a>
          <br />
          <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
        <div class="buttons is-right">
          <button
            class="button is-right is-success is-light"
            @click="getResume()"
          >
            See CV
          </button>
        </div>
      </div>
      <div class="columns is-centered ">
        <div
          id="resume"
          v-if="this.resume_src"
          class="column is-10 has-text-centered mgb-large"
        >
          <iframe :src="this.resume_src" width="90%" height="400px"></iframe>
        </div>
      </div>
    </div>
  
</template>

<script>
import firebase from "firebase";

export default {
  name: "CandidateCard",
  props: {
    content: { type: Object, required: true },
  },
  data() {
    return {
      candidate: this.content,
      profile_img: "",
      resume_src: "",
    };
  },
  mounted() {
    this.getImage();
  },
  methods: {
    async getImage() {
      console.log(await this.$store.state.user);
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const imageRef = storageRef.child("img/" + this.candidate.user_uid);
      imageRef.getDownloadURL().then((url) => {
        this.profile_img = url;
      });
    },
    async getResume() {
      const storage = firebase.storage();
      var storageRef = storage.ref();
      const resumeRef = storageRef.child(
        `${this.candidate.user_uid}/${this.candidate.user_uid}.pdf`
      );
      resumeRef.getDownloadURL().then((url) => {
        this.resume_src = url + "#view=Fit";
      });
    },
  },
};
</script>
<style>

</style>

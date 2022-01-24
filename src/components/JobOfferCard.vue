<template>
  <div class="column is-4">
    <div class="card custom-size">
      <div class="is-vcenteredis-multiline">
        <header
          class="card-header is-shadowless py-4 px-5 is-justify-content-space-between is-align-items-center"
        >
          <div class="rows">
            <h4 class="card-header-title is-4 px-0 mr-2">
              {{ content.title }}
            </h4>

            <h6 class="subtitle is-6 has-text-left">
              <span class="icon is-small is-left">
                <img
                  class="custom-icon is-small is-left"
                  src="@/assets/business.png"
                />
              </span>
              {{ content.company_name }}
            </h6>
          </div>
          <figure class="image is-96x96">
            <div class="image-upload">
              <label>
                <img
                  class="image-onmouse is-clickable"
                  :src="this.profile_img"
                />
              </label>
            </div>
          </figure>
        </header>
        <div class="card-content">
          <div class="media">
            <div class="has-text-left description-size">
              <p>{{ content.description.substring(0, 120) }} ...</p>
              <g-link
                class="has-text-link is-clickable"
                :to="`/job-offer/${content.id}/`"
                @click="toJobOffer(content.id)"
                >Lire plus</g-link
              >
              <div
                v-for="skill in content.skills_array"
                v-bind:key="skill"
                class="mt-2"
              >
                <g-link :to="'/' + content.skillsets"
                  ><span class="tag is-info is-warning">{{
                    skill
                  }}</span></g-link
                >
              </div>
            </div>
          </div>
        </div>
        <div
          class="card-footer py-4 px-5 is-justify-content-space-between is-align-items-center"
        >
          <time
            :datetime="content.created_at"
            class="has-text-weight-medium is-italic is-size-6"
          >
            <span class="icon is-small is-left">
              <img class="custom-icon" src="@/assets/calendar.png" />
            </span>
            {{
              new Date(Date.parse(content.created_at))
                .toISOString()
                .replace("-", "/")
                .split("T")[0]
                .replace("-", "/")
            }}</time
          >
          <button
            class="has-text-weight-medium button is-success"
            @click="applyOffer(content.id)"
          >
            Postuler
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";

export default {
  name: "JobOfferCard",
  props: {
    content: { type: Object, required: true },
  },
  data() {
    return {
      profile_img: "./assets/business.png",
    };
  },
  methods: {
    async applyOffer(identifier) {
      await axios.put(`/job-apply/${identifier}`);
    },
    getImage() {
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const imageRef = storageRef.child("img/" + this.content.get_uid);
      imageRef.getDownloadURL().then((url) => {
        this.profile_img = url;
      });
    },
    async toJobOffer(id) {
      await this.$router.push({ path: `/job-offer/${id}`});
    },
  },
  mounted() {
    this.getImage();
  },
};
</script>
<style>
.custom-icon {
  height: 15px;
  width: 15px;
}
.custom-size {
  height: 350px;
  width: 500px;
}
.description-size {
  height: 80px;
}
</style>

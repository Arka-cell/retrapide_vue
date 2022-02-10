<template>
  <div class="column is-4">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img :src="this.company_img" alt="Image" />
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ content.name }}</strong>
            <small> {{ content.email }} </small>
            <br />
            <small>{{
              new Date(Date.parse(content.created_at))
                .toISOString()
                .replace("-", "/")
                .split("T")[0]
                .replace("-", "/")
            }}</small>
            <br />
            {{ content.description }}
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item" aria-label="reply">
              <span class="icon is-small">
                <i class="fas fa-reply" aria-hidden="true"></i>
              </span>
            </a>
            <a class="level-item" aria-label="retweet">
              <span class="icon is-small">
                <i class="fas fa-retweet" aria-hidden="true"></i>
              </span>
            </a>
            <a class="level-item" aria-label="like">
              <span class="icon is-small">
                <i class="fas fa-heart" aria-hidden="true"></i>
              </span>
            </a>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  name: "CompanyCard",
  data() {
    return {
      company_img: "",
    };
  },
  props: {
    content: { type: Object, required: true },
  },
  methods: {
    getImage() {
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const imageRef = storageRef.child("img/" + this.content.user_uid);
      imageRef.getDownloadURL().then((url) => {
        this.company_img = url;
      });
    },
  },
  mounted() {
    this.getImage();
  },
};
</script>
<style scoped>
.column {
  margin: 5px;
}
</style>

<template>
  <div v-if="cv != ''" id="display-cv">
    <b-dropdown aria-role="list" :mobile-modal="false">
      <template #trigger="{ active }">
        <b-button
          label="Telechargement"
          type="is-danger"
          :icon-right="active ? 'menu-up' : 'menu-down'"
        />
      </template>

      <b-dropdown-item aria-role="listitem" @click="showCv">
        <b-icon icon="eye" size="is-small"> </b-icon>
        Visualiser
      </b-dropdown-item>
      <b-dropdown-item aria-role="listitem" @click="download">
        <b-icon icon="download" size="is-small"> </b-icon>
        Telecharger
      </b-dropdown-item>
    </b-dropdown>

    <Pdf :src="cv" />
  </div>
</template>

<script>
import Pdf from "vue-pdf";

export default {
  name: "DisplayCV",
  components: { Pdf },
  props: {
    cv: {
      type: String,
      default: "",
      required: true,
    },
  },

  methods: {
    showCv() {
      window.open(this.cv);
    },

    download() {
      let link = document.createElement("a");
      link.href = this.cv;
      link.download = "telechargement.pdf";
      link.click();
    },
  },
};
</script>

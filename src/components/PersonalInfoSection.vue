<template>
  <section id="personal-info-section" class="section is-relative column is-8">
    <h1 class="title">Informations personnelles</h1>

    <b-loading
      v-model="isLoading"
      :is-full-page="false"
      :can-cancel="false"
    ></b-loading>

    <BFieldWithValidation
      reference="first_name"
      rules="required|alpha"
      type="text"
      label="Prénom"
      :value="firstName"
      @updateEvent="update"
    />
    <BFieldWithValidation
      reference="last_name"
      rules="required|alpha"
      type="text"
      label="Nom"
      :value="lastName"
      @updateEvent="update"
    />
  </section>
</template>

<script>
import BFieldWithValidation from "@/components/BFieldWithValidation.vue";
import axios from "axios";

export default {
  name: "PersonalInfoSection",
  components: { BFieldWithValidation },
  data() {
    return {
      firstName: "",
      lastName: "",
      isLoading: false,
    };
  },
  async created() {
    this.isLoading = true;
    let { data } = await axios.get("/seeker-infos/");
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.isLoading = false;
  },
  methods: {
    update({ first_name, last_name }) {
      this.firstName = first_name;
      this.lastName = last_name;
    },
  },
};
</script>

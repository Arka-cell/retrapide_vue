<template>
  <div id="upload-cv">
    <ValidationProvider
      ref="file"
      v-slot="{ errors }"
      rules="ext:pdf"
      name="Cv"
    >
      <b-field class="file">
        <b-upload v-model="file" @change.enter="saveFile">
          <a class="button is-primary">
            <b-icon icon="upload"></b-icon>
            <span>{{ file.name || "Charger Votre Cv" }}</span>
          </a>
        </b-upload>
      </b-field>
      <span v-show="errors[0]">Le fichier charger dois étre de type Pdf</span>
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import { localize } from "vee-validate";
import fr from "vee-validate/dist/locale/fr.json";

localize("fr", fr);

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

export default {
  name: "UploadCV",
  components: { ValidationProvider },
  data() {
    return {
      file: {},
    };
  },

  methods: {
    async saveFile() {
      const { valid } = await this.$refs.file.validate();
      if (valid) {
        this.$emit("uploadFile", this.file);
      }
    },
  },
};
</script>

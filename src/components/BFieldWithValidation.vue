<template>
  <ValidationProvider
    :ref="reference"
    v-slot="{ errors, valid }"
    :name="$attrs.name || $attrs.label"
    :rules="rules"
  >
    <b-field
      v-bind="$attrs"
      :type="{ 'is-danger': errors[0], 'is-success': valid }"
      :message="errors"
    >
      <b-input
        v-model="innerValue"
        v-bind="$attrs"
        @keyup.enter="onKeyUp"
      ></b-input>
      <b-loading
        v-model="isLoading"
        :is-full-page="false"
        :can-cancel="false"
      ></b-loading>
    </b-field>
  </ValidationProvider>
</template>

<script>
import axios from "axios";
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
  name: "BFieldWithValidation",
  components: { ValidationProvider },
  props: {
    rules: {
      type: [Object, String],
      default: "",
    },

    reference: {
      type: String,
      default: "",
    },

    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      innerValue: "",
      isLoading: false,
      time: null,
    };
  },
  watch: {
    value(val) {
      this.innerValue = val;
    },
  },

  methods: {
    async update() {
      let { valid } = await this.$refs[this.reference].validate();
      if (valid) {
        this.isLoading = true;
        let obj = {};
        obj[this.reference] = this.innerValue;
        let { data } = await axios.patch("/seeker-infos/", obj);
        this.isLoading = false;
        this.innerValue = data[this.reference];
        this.$emit("updateEvent", data);
      }
    },
    onKeyUp() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.update();
      }, 1000);
    },
  },
};
</script>

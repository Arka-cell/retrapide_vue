<template>
  <div id="profile-create" class="section">
    <div class="columns is-centered">
      <div class="column is-5">
        <div class="box">
          <!-- I need to put a big centered company icon here -->
          <div class="field">
            <label class="label">Company Name</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-success"
                type="text"
                placeholder="Enter your company name"
                value=""
                v-model="form.name"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Creation Date</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-success"
                type="date"
                value="bulma"
                v-model="form.creation_date"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Recruiting</label>
            <div class="control">
              <div class="select is-success">
                <select v-model="form.recruiting">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Phone Number</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-success"
                type="text"
                placeholder="Enter your phone number"
                value=""
                v-model="form.phone_number"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-success"
                type="email"
                placeholder="JonDoe@example.com"
                value=""
                v-model="form.email"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Address</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-success"
                type="text"
                placeholder="Enter your address"
                value=""
                v-model="form.address"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">City</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-success"
                type="text"
                placeholder="Enter your city"
                value=""
                v-model="form.city"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Country</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-success"
                type="text"
                placeholder="Enter your country"
                value=""
                v-model="form.country"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="has-text-centered">
          <button class="button is-success" @click="updateInfos()">
            Update Infos
          </button>
        </div>
      </div>
      <div class="column is-7">
        <div class="box">
          <div class="columns is-right">
            <div class="column is-full has-text-right">
              <div class="button is-link is-light is-focused"><em class="">Create a Job Offer</em></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {},
      savedForm: {},
    };
  },
  mounted() {
    // is isCompany user state is false, redirect to unauthorized message page
    this.getInfos();
  },
  methods: {
    async updateInfos() {
      const editedData = {};
      console.log(this.form["recruiting"]);
      for (const key in this.form) {
        if (key === "creation_date" || key == "recruiting") {
          editedData[key] = this.form[key];
          continue;
        }
        if (this.form[key] === this.savedForm[key]) {
          console.log(key, " is not going to be updated");
          continue;
        } else {
          console.log(key, "will be added to editedData");
          editedData[key] = this.form[key];
        }
      }
      const response = await axios.patch("/company/", editedData);
      console.log(response.status);
      this.getInfos();
    },
    async getInfos() {
      const response = await axios.get("/company/");
      this.form = response.data;
      for (const key in this.form) {
        this.savedForm[key] = this.form[key];
      }
    },
  },
};
</script>

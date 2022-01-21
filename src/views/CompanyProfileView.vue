<template>
  <div id="profile-create" class="section">
    <div class="columns is-centered">
      <div class="column is-5">
        <div class="box box-header">
          <div class="media">
            <div id="profile-image" class="media-left">
              <figure class="image is-96x96">
                <div class="image-upload">
                  <label for="file-input">
                    <img
                      class="image-onmouse is-clickable"
                      :src="this.profile_img"
                      onmouseover="this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Octicons-cloud-upload.svg/1200px-Octicons-cloud-upload.svg.png'"
                      :onmouseout="`this.src='${this.profile_img}'`"
                    />
                  </label>

                  <input
                    id="file-input"
                    type="file"
                    ref="file"
                    v-on:change="handleFileUpload()"
                  />
                </div>
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{ form.name }}</p>
              <p class="subtitle is-6">{{ form.email }}</p>
            </div>
          </div>
        </div>
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
                <img
                  class="custom-icon is-small is-left"
                  src="@/assets/business.png"
                />
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
                <img class="custom-icon" src="@/assets/creation.png" />
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
                <img class="custom-icon" src="@/assets/smartphone.png" />
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
                <img class="custom-icon" src="@/assets/email.png" />
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
                <img class="custom-icon" src="@/assets/address.png" />
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
                <img class="custom-icon" src="@/assets/city.png" />
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
                <img class="custom-icon" src="@/assets/country.png" />
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
        <div class="box box-header">
          <div class="columns is-right">
            <div class="column is-full has-text-right">
              <img
                class="icon is-clickable is-medium"
                src="@/assets/create-job.png"
                @click="createJob()"
              />
            </div>
          </div>
          <div class="columns is-mobile">
            <div class="column is-4"><h5 class="title is-5">Job Title</h5></div>
            <div class="column is-6">
              <h5 class="title is-5">Description</h5>
            </div>
            <div class="column is-3">
              <h5 class="title is-5">Edit Offer</h5>
            </div>
          </div>
        </div>
        <div class="box box-body scrollable">
          <div
            v-for="job in myJobOffers"
            v-bind:key="job.id"
            class="media columns"
          >
            <div class="column is-4">
              <h5 class="subtitle is-5">{{ job.title }}</h5>
            </div>
            <div class="column is-6">
              {{ job.description.substring(0, 110) }}
            </div>
            <div class="column is-3">
              <img
                class="icon is-clickable"
                src="@/assets/document-edit.png"
                @click="editJobOffer(job.id)"
              />
              <p class="has-text-link is-clickable is-size-7 is-italic" @click="seeOfferCandidates(job.id)">See candidates</p>
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
  data() {
    return {
      form: {},
      savedForm: {},
      myJobOffers: [],
      profile_img: "https://bulma.io/images/placeholders/96x96.png",
    };
  },
  mounted() {
    // is isCompany user state is false, redirect to unauthorized message page
    this.getInfos();
    this.getMyJobOffers();
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
      this.getImage();
    },
    async createJob() {
      await this.$router.push({ name: "CreateJob" });
    },
    async getMyJobOffers() {
      const response = await axios.get("/my-job-offers/");
      this.myJobOffers = response.data;
    },
    async editJobOffer(id) {
      await this.$router.push({ path: `/edit-job-offer/${id}` });
    },
    async handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.form.id);
      const storageRef = firebase.storage().ref("img/" + this.form.user_id);
      storageRef.put(this.file);
      this.getImage();
    },
    getImage() {
      const storage = firebase.storage();
      const storageRef = storage.ref();

      const imageRef = storageRef.child("img/" + this.form.user_id)
      imageRef.getDownloadURL().then((url) => {
        this.profile_img = url
      })
    },
    seeOfferCandidates(job_id) {
      
      this.$router.push({ name: 'OfferCandidates', params: {id: `${job_id}`}})
    }
  },
};
</script>
<style>
.prevent-text-flow {
  word-wrap: break-word;
}
.scrollable {
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  height: 700px;
}
::-webkit-scrollbar {
  width: 10px;
}
.box-header {
  height: 140px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(173, 171, 171, 0.05);
  border-radius: 3px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(153, 153, 153, 0.1);
  border-radius: 5px;
}
.custom-icon {
  width: 20px;
  height: 20px;
}
.image-upload > input {
  display: none;
}
.image-onmouse {
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
</style>

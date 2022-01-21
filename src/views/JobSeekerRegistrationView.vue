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
                    ref="image"
                    v-on:change="handleImageUpload()"
                  />
                </div>
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{ form.first_name }} {{ form.last_name }}</p>
              <p class="subtitle is-6">{{ form.email }}</p>
            </div>
          </div>
        </div>
        <div class="box">
          <!-- I need to put a big centered company icon here -->
          <div class="field">
            <label class="label">First Name</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-success"
                type="text"
                placeholder="Enter your first name"
                value=""
                v-model="form.first_name"
              />
              <span class="icon is-small is-left">
                <img class="custom-icon" src="@/assets/first_name.png">
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Last Name</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-success"
                type="text"
                placeholder="Enter your last name"
                value=""
                v-model="form.last_name"
              />
              <span class="icon is-small is-left">
                <img class="custom-icon" src="@/assets/first_name.png">
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Birthdate</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-success"
                type="date"
                v-model="form.birthdate"
              />
              <span class="icon is-small is-left">
                <img class="custom-icon" src="@/assets/creation.png">
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Looking for a job</label>
            <div class="control">
              <div class="select is-success">
                <select v-model="form.open_for_job">
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
                <img class="custom-icon" src="@/assets/smartphone.png">
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
                <img class="custom-icon" src="@/assets/email.png">
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
                <img class="custom-icon" src="@/assets/address.png">
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
                <img class="custom-icon" src="@/assets/city.png">
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
                <img class="custom-icon" src="@/assets/country.png">
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
        <div class="box has-text-centered">
          <h3 class="title is-3">My Resume</h3>
          <iframe id="resume" :src="resume_src" />
        </div>
        <div class="has-text-centered">
          <input
            class="button is-success custom-file-input"
            text="Upload Your Resume"
            type="file"
            id="file"
            ref="file"
            v-on:change="handleFileUpload()"
          />
          <label class="button is-success" for="file">Upload Resume</label>
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
      resume_src: "",
      profile_img: "https://bulma.io/images/placeholders/96x96.png",
    };
  },
  mounted() {
    // is isCompany user state is true, redirect to unauthorized message page
    this.getUserState();
    this.getInfos();
    this.getResume();
  },
  methods: {
    async updateInfos() {
      const editedData = {};
      for (const key in this.form) {
        if (this.form[key] == this.savedForm[key]) {
          continue;
        } else {
          console.log(key, " will be changed");
          editedData[key] = this.form[key];
        }
      }
      await axios.patch("/job-seeker/", editedData);
      this.getInfos();
    },
    async getInfos() {
      const response = await axios.get("/job-seeker/");
      this.form = response.data;
      for (const key in this.form) {
        this.savedForm[key] = this.form[key];
      }
      this.getImage();
    },
    async handleFileUpload() {
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append("file", this.file);
      await axios.put("/upload-resume/", formData);
      this.getResume();
    },
    async getResume() {
      const storage = firebase.storage();
      var storageRef = storage.ref();
      const user = await this.$store.state.user;
      const resumeRef = storageRef.child(`${user.uid}/${user.uid}.pdf`);
      resumeRef.getDownloadURL().then((url) => {
        this.resume_src = url + "#view=Fit";
      });
      // this.$refs.file.files[0] = this.resume_src 
    },
    async getUserState() {
      const response = await axios.get("/user-state/");
      if (response.data.is_company) {
        this.$router.push({ name: "CompanyRegistration" });
      }
    },
    async handleImageUpload() {
      this.file = this.$refs.image.files[0];
      const storageRef = firebase.storage().ref("img/" + this.form.user_id);
      storageRef.put(this.file);
      this.getImage();
    },
    async getImage() {
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const imageRef = storageRef.child("img/" + this.form.user_id)
      imageRef.getDownloadURL().then((url) => {
        if(url) {
          this.profile_img = url
        }
        
      })
    },
  },
};
</script>
<style>
.custom-file-input {
  display: none;
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  text-align: right;
}
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
#resume {
  width: 100%;
  height: 678px;
  border-radius: 10px;
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

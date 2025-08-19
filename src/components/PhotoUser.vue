<template>
  <v-dialog v-model="showDialog" max-width="360px" persistent>
    <v-card class="rounded-xl elevation-10 pa-3">
      
      <!-- Title -->
      <v-card-title class="justify-center text-center bg-primary text-white rounded-t-xl">
        <v-icon left>mdi-camera-plus</v-icon>
        <span class="font-weight-bold">Profile Photo</span>
      </v-card-title>

      <!-- Content -->
      <v-card-text class="d-flex flex-column align-center py-4">

        <!-- Avatar with shadow -->
        <v-avatar size="100" class="mb-3" color="grey-lighten-3" tile>
          <v-img :src="photoSrc || defaultImage" cover />
        </v-avatar>

        <!-- Username & Role -->
        <v-card class="pa-2 mb-4 w-100 text-center" outlined elevation="2">
          <v-col cols="12">
          <div class="subtitle-2 font-weight-medium">
          User Name: {{ userData.userName || "Not logged in" }}
          </div>
          <div class="subtitle-2 font-weight-medium">
          Role: {{ userData.role || "--" }}
          </div>
          
          </v-col>
        </v-card>

        <!-- File Input -->
        <v-file-input
          v-model="selectedFile"
          label="Browse photo"
          accept="image/*"
          prepend-icon="mdi-upload"
          outlined
          dense
          hide-details
          class="w-100"
        />
      </v-card-text>

      <!-- Actions -->
      <v-card-actions class="justify-end pt-2">
        <v-btn text color="red" @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" rounded @click="savePicture">
          <v-icon left>mdi-cloud-upload</v-icon> Upload
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>




<script>
import userService from "@/service/UserAccountService.js";
import axios from "@/config";


export default {
  props: ["user"],
  data() {
    return {
      userData: {},
      showDialog: true,
      selectedFile: null,
      photoSrc: null,
      defaultImage: new URL('@/assets/loginProfile.png', import.meta.url).href,
    };
  },
  mounted() {
    this.userData = JSON.parse(localStorage.getItem("user")) || {};
    
    if (this.userData?.profilePhoto) {
    this.photoSrc = `${axios.defaults.baseURL}/userphoto/${this.userData.profilePhoto}.png`;
  } else {
    this.photoSrc = this.defaultProfile;
  }
  this.setUserPhoto();
  },
  watch: {
 selectedFile(newFile) {
    if (!newFile) {
      // Restore existing image
      if (this.userData?.profilePhoto) {
        fetch(`/api/v1/useraccounts/${this.userData.userId}/photo`)
          .then(res => res.blob())
          .then(blob => (this.photoSrc = URL.createObjectURL(blob)))
          .catch(() => (this.photoSrc = this.defaultImage));
      } else {
        this.photoSrc = this.defaultImage;
      }
      return;
    }
    const file = Array.isArray(newFile) ? newFile[0] : newFile;
    const reader = new FileReader();
    reader.onload = e => (this.photoSrc = e.target.result);
    reader.readAsDataURL(file);
  },
},
  methods: {
    loadUserList() {
    // Refresh userData from localStorage
    this.userData = JSON.parse(localStorage.getItem("user")) || {};

    // Update avatar immediately
    if (this.userData?.profilePhoto) {
      this.photoSrc = `${axios.defaults.baseURL}/userphoto/${this.userData.profilePhoto}.png`;
    } else {
      this.photoSrc = this.defaultProfile;
    }

    this.showPhotoDialog = false; // close dialog
  },
  setUserPhoto() {
    this.photoSrc = this.userData?.profilePhoto
      ? `${axios.defaults.baseURL}/userphoto/${this.userData.profilePhoto}.png`
      : this.defaultProfile;
  },
  refreshUserPhoto(newFileName) {
    this.userData.profilePhoto = newFileName;
    localStorage.setItem("user", JSON.stringify(this.userData));
    this.photoSrc = `${axios.defaults.baseURL}/userphoto/${newFileName}.png`;
    this.setUserPhoto();

  },
    closeDialog() {
      this.showDialog = false;
      this.$emit("closeDialog");
    },

    savePicture() {
      if (!this.selectedFile) {
        alert("Please select a file!");
        return;
      }

      const file = Array.isArray(this.selectedFile) ? this.selectedFile[0] : this.selectedFile;
      const formData = new FormData();
      formData.append("file", file);

      userService.updatePhoto(formData, this.user.userId)
        .then(() => {
          // Update localStorage instantly
          const storedUser = JSON.parse(localStorage.getItem("user")) || {};
          storedUser.profilePhoto = file.name;
          localStorage.setItem("user", JSON.stringify(storedUser));

          this.$emit("refreshUserPhoto"); // parent will refresh avatar
          this.closeDialog();
          alert("Photo uploaded successfully!");
        })
        .catch(err => {
          console.error(err);
          alert("Upload failed!");
        });
    },
  },
};
</script>

<template>
  <v-dialog v-model="showDialog" max-width="500px" persistent>
    <v-card>
      <v-card-title class="headline grey lighten-4">
        <v-icon left color="primary">mdi-camera-plus</v-icon>
        Upload Profile Photo
      </v-card-title>

      <v-card-text class="d-flex flex-column align-center">
        <!-- Image Preview -->
        <v-avatar size="150" class="mb-4">
          <v-img :src="imagePreview || defaultImage" />
        </v-avatar>

        <!-- File Input -->
        <v-file-input
          v-model="selectedFile"
          label="Choose a photo"
          accept="image/*"
          prepend-icon="mdi-upload"
          outlined
          dense
          hide-details
        ></v-file-input>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn text color="red" @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="savePicture">Upload</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import userService from "@/service/UserAccountService.js";

export default {
  props: ["user"],
  data() {
    return {
      showDialog: true,
      selectedFile: null,
      imagePreview: null,
      defaultImage: new URL('@/assets/loginProfile.png', import.meta.url).href,
    };
  },
  watch: {
    selectedFile(newFile) {
      if (!newFile) {
        this.imagePreview = null;
        return;
      }
      const file = Array.isArray(newFile) ? newFile[0] : newFile;
      const reader = new FileReader();
      reader.onload = e => (this.imagePreview = e.target.result);
      reader.readAsDataURL(file);
    },
  },
  methods: {
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

<style scoped>
.v-avatar {
  border: 2px dashed #2196f3;
  overflow: hidden;
}
</style>

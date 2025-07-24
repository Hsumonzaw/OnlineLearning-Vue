<template>
  <v-container class="pa-6" max-width="500px">
    <v-card class="pa-6" elevation="8">
      <v-card-title class="text-h5 text-center mb-4">
        Create Your Account
      </v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <!-- Username -->
        <v-text-field
          v-model="user.username"
          label="Username"
          :rules="[rules.required]"
          outlined
          dense
          class="mb-4"
        ></v-text-field>

        <!-- Email -->
        <v-text-field
          v-model="user.email"
          label="Email"
          :rules="[rules.required, rules.email]"
          outlined
          dense
          class="mb-4"
        ></v-text-field>

        <!-- Password -->
        <v-text-field
          v-model="user.password"
          label="Password"
          type="password"
          :rules="[rules.required, rules.min]"
          outlined
          dense
          class="mb-4"
        ></v-text-field>

        <!-- Photo Upload -->
        <v-file-input
          v-model="photo"
          label="Profile Photo"
          prepend-icon="mdi-camera"
          accept="image/*"
          :rules="[rules.required]"
          outlined
          dense
          class="mb-4"
          @change="previewImage"
        ></v-file-input>

        <!-- Preview -->
        <v-img
          v-if="photoPreview"
          :src="photoPreview"
          max-width="150"
          max-height="150"
          class="mb-4 mx-auto"
          rounded
        ></v-img>

        <!-- Submit Button -->
        <v-btn
          :disabled="!valid || loading"
          color="primary"
          block
          large
          @click="register"
        >
          <v-progress-circular
            v-if="loading"
            indeterminate
            size="20"
            color="white"
            class="mr-2"
          ></v-progress-circular>
          Register
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      valid: false,
      loading: false,
      user: {
        username: "",
        email: "",
        password: "",
      },
      photo: null,
      photoPreview: null,
      rules: {
        required: (v) => !!v || "This field is required",
        email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        min: (v) => (v && v.length >= 6) || "Minimum 6 characters",
      },
    };
  },
  methods: {
    previewImage() {
      if (this.photo) {
        this.photoPreview = URL.createObjectURL(this.photo);
      }
    },
    async register() {
      const isValid = await this.$refs.form.validate();
      if (!isValid) return;

      this.loading = true;

      try {
        const formData = new FormData();
        formData.append("username", this.user.username);
        formData.append("email", this.user.email);
        formData.append("password", this.user.password);
        formData.append("photo", this.photo);

        await axios.post("http://localhost:8080/api/register", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Registration successful!");
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
        alert("Registration failed. Please try again.");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

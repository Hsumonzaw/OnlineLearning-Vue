<template>
  <v-app my-5>
    <div class="background-image d-flex align-center justify-center">
      <v-card
        class="pa-8 bg-light-blue-lighten-4"
        elevation="16"
        style="width: 400px; min-width: 300px; max-height: 90vh; overflow-y: auto;"
      >
        <v-card-title class="text-h5 text-center">
          <img src="@/assets/user-profile.png" alt="" class="login"><br>
          {{ isLogin ? "Log In" : "Register" }}
        </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row dense>
            <template v-if="isLogin">
              <v-col cols="12" md="12">
                <v-text-field
                  label="UserName"
                  v-model="user.userName"
                  prepend-icon="mdi-account"
                  variant="outlined"
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  label="Password"
                  v-model="user.password"
                  prepend-icon="mdi-lock"
                  variant="outlined"
                  @keyup.enter="clickLogin()"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="passwordRules"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showPassword = !showPassword"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn block color="primary" @click="clickLogin()">Login</v-btn>
              </v-col>
              <v-col cols="12" md="12" class="text-center mt-2">
                <span>Don't have an account?</span>
                <v-btn text color="primary" @click="toggleForm()">Register here</v-btn>
              </v-col>
            </template>
            <template v-else>
              <v-col cols="12" class="text-center">
                <v-avatar size="100" class="mx-auto mb-2">
                  <v-img v-if="user.photoPreview" :src="user.photoPreview" />
                  <v-icon v-else size="100" color="grey">mdi-account-circle</v-icon>
                </v-avatar>
                <v-file-input
                  v-model="user.photo"
                  accept="image/*"
                  label="Profile Photo"
                  prepend-icon="mdi-camera"
                  @change="previewImage"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                   <v-menu
              v-model="startMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ props }">
                  <v-text-field
                    v-model="user.startDate"
                    label="Date"
                    prepend-icon="mdi-calendar"
                    variant="outlined"
                    density="compact"
                    disabled
                    
                  />
              </template>
              <v-date-picker
                v-model="startPicker"
                @input="user.startDate = startPicker"
                color="primary"
                hide-header
              />
            </v-menu>

                </v-col>


              <v-col cols="12">
                <v-text-field
                  v-model="user.name"
                  label="Full Name"
                  prepend-icon="mdi-account"
                  variant="outlined"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="user.userName"
                  label="Username"
                  prepend-icon="mdi-account"
                  variant="outlined"
                  :rules="nameRules"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="user.password"
                  label="Password"
                  prepend-icon="mdi-lock"
                  variant="outlined"
                  :type="showPassword ? 'text' : 'password'"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showPassword = !showPassword"
                  :rules="passwordRules"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="user.email"
                  label="Email"
                  prepend-icon="mdi-email"
                  :rules="emailRules"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="user.nrc"
                  label="NRC"
                  prepend-icon="mdi-card-account-details"
                  :rules="[rules.required, rules.nrc]"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="user.gender"
                  :items="['Male', 'Female']"
                  label="Gender"
                  prepend-icon="mdi-gender-male-female"
                  :rules="[rules.required]"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <v-menu v-model="dobMenu" :close-on-content-click="false" transition="scale-transition" offset-y>
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-bind="props"
                      v-model="formattedDob"
                      label="Date of Birth"
                      prepend-icon="mdi-calendar"
                      readonly
                      variant="outlined"
                      :rules="[rules.required]"
                    />
                  </template>
                  <v-date-picker v-model="user.dob" @update:model-value="dobMenu = false" />
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="user.phonenum"
                  label="Phone Number"
                  prepend-icon="mdi-phone"
                  :rules="[rules.required, rules.phone]"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="user.address"
                  label="Address"
                  prepend-icon="mdi-map-marker"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <v-btn block color="success" @click="clickRegister()">Register</v-btn>
              </v-col>
              <v-col cols="12" md="12" class="text-center mt-2">
                <span>Already have an account?</span>
                <v-btn text color="primary" @click="toggleForm()">Back to Login</v-btn>
              </v-col>
            </template>
          </v-row>
        </v-form>
      </v-card>
    </div>
  </v-app>
</template>
<script>
import userService from "../service/LoginService.js";
import axios from "../config";
import { format } from "date-fns";
export default {
data: () => ({
 user: {
 name: "",
userName: "",
 password: "",
email: "",
nrc: "",
gender: "",
dob: null,
 phonenum: "",
 address: "",
photo: null,
photoPreview: null,
startDate: null, 
 },
 startMenu: false,
 startPicker: new Date(),
isLogin: true,
valid: true,
dobMenu: false,
userList: [],
formattedDob: "",
 showPassword: false,
 nameRules: [(v) => !!v || "Name is required"],
//     passwordRules: [
//       (v) => !!v || "Password is required",
//       (v) => v.length >= 8 || "Password must be at least 8 characters",
//       (v) => /[A-Z]/.test(v) || "Password must contain an uppercase letter",
//       (v) => /[a-z]/.test(v) || "Password must contain a lowercase letter",
//       (v) => /[0-9]/.test(v) || "Password must contain a number",
//       (v) => /[^a-zA-Z0-9]/.test(v) || "Password must contain a special character",
//     ],
emailRules: [
(v) => !!v || "Email is required",
(v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Invalid email",
],
rules: {
  required: (v) => !!v || "Required",
 phone: (v) => /^(?:0|\+95)9[246789]\d{7,9}$/.test(v) || "Invalid phone number",
 nrc: (v) => /^\d{1,12}\/[A-Z]{3}\([NPE]\)\d{6}$/.test(v) || "Invalid NRC format",
},
 }),
 props: { hideToolbar: Function },
 mounted() {
    // const date = this.formatDate(new Date());
       this.user.startDate = format(this.startPicker, "dd-MM-yyyy");
       this.userType = localStorage.getItem("userType");
    // this.startDate = date;
    // this.user.createdDate = date;
  },
methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
       this.$refs.form.reset();
    },
    previewImage() {
      const file = this.user.photo;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.user.photoPreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    formatDate(date) {
      const d = new Date(date);
      return `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d
        .getDate()
        .toString()
        .padStart(2, "0")}/${d.getFullYear()}`;
    },
    async clickLogin() {
  const { valid } = await this.$refs.form.validate();
  if (!valid) {
    return;
  }
  try {
    const response = await userService.loginAccount(this.user);
    localStorage.setItem("user", JSON.stringify(response));
    localStorage.setItem("isLoggedIn", "true");
    this.$root.isLoggedIn = true;
    
    // Add a null check before accessing response.userType
    if (response && response.userType === "ADMIN") {
      this.$router.push("/useraccounts");
    } else {
      this.$router.push("/");
    }
  } catch (error) {
    alert("Login failed. Please check your credentials.");
  }
},
    async clickRegister() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      try {
        const userWithoutPhoto = { ...this.user };
        delete userWithoutPhoto.photo;
        delete userWithoutPhoto.photoPreview;
        
        const response = await userService.registerAccount(userWithoutPhoto);
        const createdUserId = response.userId;
        
        if (this.user.photo && createdUserId) {
          const formData = new FormData();
          formData.append("file", this.user.photo);
          await userService.updatePhoto(formData, createdUserId);
        }
        
        alert("Registration successful! You can now log in.");
        this.toggleForm();
      } catch (err) {
        console.error("Registration failed:", err);
        alert("Registration failed. Please try again.");
      }
    },
  },
 watch: {
 "user.dob"(val) {
      if (val) this.formattedDob = this.formatDate(val);
    },
    startPicker() {
      this.startMenu = false;
      this.user.startDate = format(this.startPicker, "dd-MM-yyyy");
    },
},
};

</script>

<style scoped>
.background-image {
  height: 100vh;
  width: 100vw;
  background-image: url('@/assets/skyblue.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}
.title{
  font-size: large ;
}
.login{
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
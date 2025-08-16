<template>
  <v-app >
    <div class="background-image d-flex align-center justify-center">
     <v-card
  class="pa-12 glass-card"
  elevation="12"
  :style="tab === 'login' 
            ? 'max-width: 800px; height: 540px; width: 35%;' 
            : 'max-width: 700px; height: auto; width: auto;'"
>
     <v-tabs v-model="tab">
  <v-tab value="login">Log In</v-tab>
  <v-tab value="register">Register</v-tab>
</v-tabs>

       <v-window v-model="tab" class="mt-4">
         <v-window-item value="login">
          <v-form ref="loginForm" @submit.prevent="clickLogin">
             <v-row dense>
              <v-col cols="12">
                <v-text-field
                  label="UserName"
                  v-model="loginData.userName"
                  prepend-icon="mdi-account"
                  variant="outlined"
                  :rules="nameRules"
                  required>
            </v-text-field>
              </v-col>
               <v-col cols="12">
                <v-text-field
                  label="Password"
                  v-model="loginData.password"
                  prepend-icon="mdi-lock"
                  variant="outlined"
                  :rules="passwordRules"
                  :type="showPassword ? 'text' : 'password'"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showPassword = !showPassword" required>
            </v-text-field>
               </v-col>
               <v-col cols="12">
                <v-btn type="submit" block color="primary" class="rounded-lg glow-button ">
                  Login</v-btn>
               </v-col>
               </v-row>
            </v-form>
          </v-window-item>

          <!-- REGISTER TAB -->
          <v-window-item value="register">
            <v-form ref="registerForm" @submit.prevent="clickRegister">

             <v-row dense>
              <!-- LEFT COLUMN -->
             <v-col cols="12" md="6">
              <v-file-input
  v-model="user.photo"
  accept="image/*"
  label="Upload Photo"
  prepend-icon="mdi-camera"
  dense
  hide-details
  show-size
  @change="previewImage"
/>



                   <v-text-field 
                        v-model="user.name"
                        label="Full Name"
                        prepend-icon="mdi-account"
                        variant="outlined"
                        :rules="[rules.required]"/>
                <v-text-field
                        v-model="user.userName"
                        label="Username"
                        prepend-icon="mdi-account"
                        variant="outlined"
                        :rules="nameRules"/>
                <v-select
                        v-model="user.gender"
                        :items="['Male', 'Female']"
                        label="Gender"
                        prepend-icon="mdi-gender-male-female"
                        :rules="[rules.required]"
                        variant="outlined"
                      />
                                <v-menu
                v-model="dobMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-bind="props"
                    v-model="formattedDob"
                    label="Date of Birth"
                    prepend-icon="mdi-calendar"
                    readonly
                    outlined
                  />
                </template>
                <v-date-picker
                  v-model="user.age"
                  @update:model-value="updateDob"
                />
              </v-menu>
              </v-col>
       
           <!-- RIGHT COLUMN -->   
            <v-col cols="12" md="6">
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
                <v-text-field
                  v-model="user.email"
                  label="Email"
                  prepend-icon="mdi-email"
                  :rules="emailRules"
                  variant="outlined"
                />
                <v-text-field
                  v-model="user.phonenum"
                  label="Phone Number"
                  prepend-icon="mdi-phone"
                  :rules="[rules.required, rules.phone]"
                  variant="outlined"
                />
                <v-text-field
                  v-model="user.nrc"
                  label="NRC"
                  prepend-icon="mdi-card-account-details"
                  :rules="[rules.required, rules.nrc]"
                  variant="outlined"
                />
                <v-textarea
                  v-model="user.address"
                  label="Address"
                  prepend-icon="mdi-map-marker"
                  variant="outlined"
                />
                  <!-- start date -->
              <v-menu
                v-model="startMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-bind="props"
                    v-model="formattedStartDate"
                    label="Register Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    outlined
                  />
                </template>
                <v-date-picker
                  v-model="user.startDate"
                  @update:model-value="updateStartDate"
                />
              </v-menu>
            </v-col>
            <v-col cols="12" class="mt-4">
                  <v-btn type="submit" block color="success" class="rounded-lg glow-button">
                    Register
                  </v-btn>
                </v-col>
            </v-row>
            </v-form>
              </v-window-item>
       </v-window>
         </v-card>
    </div>
  </v-app>
</template>


<script>
// import LoginService from "@/services/LoginService";
import userService from "../service/LoginService.js";
import axios from "../config";
import { format } from "date-fns";
export default {
data: () => ({
  tab: "login",

  showPassword: false,
  dobMenu: false,
  startMenu: false,
  formattedDob: "",
  formattedStartDate: "",
  selectedPhoto: null,
  loginData: {
        userName: "",
        password: "",
      },
 user: {
 name: "",
userName: "",
 password: "",
email: "",
nrc: "",
gender: "",
age: null,
 phonenum: "",
 address: "",
photo: null,
photoPreview: null,
startDate: null, 
 },

//  startPicker: new Date(),
// isLogin: true,
// valid: true,

userList: [],

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
//  mounted() {
//     // const date = this.formatDate(new Date());
//        this.user.startDate = format(this.startPicker, "dd-MM-yyyy");
//       //  this.userType = localStorage.getItem("userType");
//     // this.startDate = date;
//     // this.user.createdDate = date;
//   },
methods: {
    // toggleForm() {
    //   this.isLogin = !this.isLogin;
    //    this.$refs.form.reset();
    // },
    // previewImage() {
    //   const file = this.user.photo;
    //   if (file) {
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //       this.user.photoPreview = e.target.result;
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // },
    // formatDate(date) {
    //   const d = new Date(date);
    //   return `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d
    //     .getDate()
    //     .toString()
    //     .padStart(2, "0")}/${d.getFullYear()}`;
    // },
    async uploadPhoto(userId) {
  if (!this.user.photo) return;
  const formData = new FormData();
  formData.append("file", this.user.photo);
  await axios.post(`/api/v1/useraccounts/${userId}/photo`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
},
async clickLogin() {
  const valid = await this.$refs.loginForm.validate();
  if (!valid) return;

  try {
    const response = await userService.loginAccount(this.loginData);
    localStorage.setItem("user", JSON.stringify(response));
    localStorage.setItem("isLoggedIn", "true");
    this.$root.isLoggedIn = true;

    if (response.userType === "ADMIN") this.$router.push("/useraccounts");
    else this.$router.push("/");
  } catch (err) {
    console.error(err);
    alert("Login failed. Check username and password.");
  }
},
// onPhotoSelected(files) {
//       if (files && files.length > 0) {
//         this.selectedPhoto = files[0];
//         this.user.photoPreview = URL.createObjectURL(files[0]);
//       }
//     },
    updateDob(date) {
  this.dobMenu = false;
  this.user.age = new Date(date); // store Date object
  this.formattedDob = format(new Date(date), "yyyy-MM-dd"); // optional, for display
},
    updateStartDate(date) {
      this.startMenu = false;
      this.formattedStartDate = format(new Date(date), "yyyy-MM-dd");
    },
  async clickRegister() {
  // 1️⃣ Payload: DOB and startDate as formatted strings
  const payload = {
    name: this.user.name,
    userName: this.user.userName,
    password: this.user.password,
    email: this.user.email,
    age: this.user.age ? this.user.age.toISOString().split("T")[0] : null,
    gender: this.user.gender,
    phonenum: this.user.phonenum,
    nrc: this.user.nrc,
    address: this.user.address,
    startDate: this.user.startDate ? this.user.startDate.toISOString().split("T")[0] : null,
    userType: "STUDENT"
  };

  try {
    // 2️⃣ Register user
    const res = await userService.registerAccount(payload);
console.log("Full response:", res);
console.log("Response data:", res.data);

    // 3️⃣ Upload photo if available
    if (res.data?.id && this.user.photo) {
  const file = this.user.photo instanceof File ? this.user.photo : this.user.photo[0];
  if (file) {
    const formData = new FormData();
    formData.append("photo", file); // field name must match backend
    await axios.post(`/api/v1/useraccounts/${res.data.id}/photo`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Photo uploaded!");
  }
}

    alert("Registration successful! You can now log in.");
    this.tab = "login";
  } catch (err) {
    console.error("Registration error", err.response || err);
    alert("Registration failed. Check console for details.");
  }
},


// userService.registerAccount(payload)
//   .then((res) => {
//     if (res.data && this.user.photo) {
//       this.uploadPhoto(res.data.id);
//     }
//     alert("Registration successful! You can now log in.");
//     this.tab = "login";
//   })
//   .catch((err) => {
//     console.error("Registration error", err.response || err);
//     alert("Registration failed. Check console for details.");
//   });
//    },


  previewImage(file) {
  const selected = file instanceof File ? file : file[0];
  if (selected) {
    const reader = new FileReader();
    reader.onload = (e) => (this.user.photoPreview = e.target.result);
    reader.readAsDataURL(selected);
  } else {
    this.user.photoPreview = null;
  }
},

registerAccount(payload) {
  return axios.post("/api/v1/free/useraccounts", payload);
}
  
},
 
  watch: {
  'user.photo'(file) {
  if (file instanceof File) { // only proceed if it’s a File
    const reader = new FileReader();
    reader.onload = (e) => {
      this.user.photoPreview = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    this.user.photoPreview = null;
  }

  },
}

};

</script>

<style scoped>
.background-image {
  height: 100vh;
  width: 100vw;
  position: relative;
   background: center / cover no-repeat url('@/assets/lr.png');
}
.background-image::before {
  content: "";
  position: absolute;
  inset: 0;
  /* subtle blue overlay for contrast */
  background: linear-gradient(120deg, rgba(33,150,243,.35), rgba(25,118,210,.35));
}
.background-image > * { position: relative; z-index: 1; }

.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border-radius: 20px;
}

.login {
  width: 300px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

/* Glow animation for buttons */
.glow-button {
  box-shadow: 0 0 8px rgba(33, 150, 243, 0.6), 0 0 20px rgba(33, 150, 243, 0.3);
  animation: pulseGlow 2s infinite;
}

@keyframes pulseGlow {
  0% {
    box-shadow: 0 0 8px rgba(33, 150, 243, 0.6), 0 0 20px rgba(33, 150, 243, 0.3);
  }
  50% {
    box-shadow: 0 0 16px rgba(33, 150, 243, 0.8), 0 0 30px rgba(33, 150, 243, 0.4);
  }
  100% {
    box-shadow: 0 0 8px rgba(33, 150, 243, 0.6), 0 0 20px rgba(33, 150, 243, 0.3);
  }
}
</style> 

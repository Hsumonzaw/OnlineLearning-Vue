<template>
  <v-app>
    <div>
      <v-app-bar flat height="70" color="#2196f3" class="px-8">
        <v-toolbar-title class="d-flex align-center font-weight-bold white--text" style="font-size: 2rem; color: antiquewhite;">
          <v-avatar size="60" class="mr-2" color="white">
            <v-img src="@/assets/unilogo.png" alt="Logo" cover />
          </v-avatar>
        Learn Hub
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <div class="centered-nav">
          <v-btn text to="/">Home</v-btn>
          <v-btn text to="/usercourses">Courses</v-btn>
          <v-btn text to="/userlessons">Lessons</v-btn>
          <v-btn text to="/userteacher">Teachers</v-btn>
<v-btn v-if="!userData.role || userData.role !== 'ADMIN'" text to="/userexam">Exam</v-btn>
          <v-btn text to="/aboutus">About Us</v-btn>
          <v-btn v-if="userData.role === 'ADMIN'" text to="/admin">Dashboard</v-btn>
        </div>

        <!-- Settings for non-students -->
        <v-menu offset-y open-on-hover close-on-content-click v-if="showNavigation && userData?.role !== 'STUDENT'">
          <template v-slot:activator="{ props }">
            <v-btn text v-bind="props" class="hover-style">
              <v-icon start>mdi-cog</v-icon>
              Setting
              <v-icon end>mdi-menu-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <!-- <v-list-item @click="clickRouter('/')">
              <v-list-item-title><v-icon>mdi-home</v-icon> Home</v-list-item-title>
            </v-list-item> -->
            <v-list-item @click="clickRouter('/useraccount')" v-if="showTeacher">
              <v-list-item-title><v-icon>mdi-account-multiple</v-icon> User Account</v-list-item-title>
            </v-list-item>
            <v-list-item @click="clickRouter('/studentdetail')" v-if="showTeacher">
              <v-list-item-title><v-icon>	mdi-school</v-icon> Student Records</v-list-item-title>
            </v-list-item>
            <v-list-item @click="clickRouter('/teacherforstudent')" v-else>
              <v-list-item-title><v-icon>mdi-account-multiple</v-icon> My Students</v-list-item-title>
            </v-list-item>
            <v-list-item @click="clickRouter('/courses')" v-if="showTeacher">
              <v-list-item-title><v-icon>mdi-folder-open</v-icon> Ledger</v-list-item-title>
            </v-list-item>
            <v-list-item @click="clickRouter('/languages')" v-if="showTeacher">
              <v-list-item-title><v-icon>mdi-web</v-icon>Add Courses</v-list-item-title>
            </v-list-item>
            <!-- mdi-book-open-page-variant -->
            <!-- <v-list-item @click="clickRouter('/lessons')">
              <v-list-item-title><v-icon>mdi-lightbulb-on-outline</v-icon>Add Lessons</v-list-item-title>
            </v-list-item> -->
            <v-list-item
  @click="clickRouter('/lessons')"
  v-if="userData.role === 'ADMIN'"
>
  <v-list-item-title>
    <v-icon>mdi-lightbulb-on-outline</v-icon>
    View lesson
  </v-list-item-title>
</v-list-item>

<v-list-item
  @click="clickRouter('/lessons')"
  v-if="userData.role === 'TEACHER'"
>
  <v-list-item-title>
    <v-icon>mdi-lightbulb-on-outline</v-icon>
    Add Lesson
  </v-list-item-title>
</v-list-item>
             <v-list-item
  @click="clickRouter('/quiz')"
  v-if="userData.role === 'ADMIN'"
>
  <v-list-item-title>
    <v-icon>mdi-format-list-checks</v-icon>
    View Quiz
  </v-list-item-title>
</v-list-item>

<v-list-item
  @click="clickRouter('/quiz')"
  v-if="userData.role === 'TEACHER'"
>
  <v-list-item-title>
    <v-icon>mdi-format-list-checks</v-icon>
    Add Quiz
  </v-list-item-title>
</v-list-item>
<!-- <v-list-item @click="clickRouter('/admin')" v-if="showTeacher">
              <v-list-item-title><v-icon>mdi-web</v-icon>Dashboard</v-list-item-title>
            </v-list-item> -->


             <!-- <v-list-item @click="clickRouter('/ans')">
              <v-list-item-title><v-icon>mdi mdi-account-school</v-icon>Exam Marks</v-list-item-title>
            </v-list-item> -->
            
          </v-list>
        </v-menu>

        <!-- Theme Toggle -->
        <v-btn icon @click="toggleTheme" :title="isDark ? 'Light Mode' : 'Dark Mode'">
          <v-icon>{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
        </v-btn>

       <span style="color: white; font-weight: bold; margin-left: 12px; margin-right: 16px; align-self: center;">
       {{ userData.userName || "Guest" }}
       </span> 

        <!-- Profile Avatar -->
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" class="d-flex align-center" style="gap: 8px;">
              <v-avatar size="30" class="mr-2">
                <img :src="photoSrc" alt="profile" class="profile-img" @error="onImgError">
              </v-avatar>
       </v-btn>
          </template>

          <v-card min-width="120">
            <v-list>
              <v-list-item v-if="!isLoggedIn" @click="clickRouter('/login')">
                <v-list-item-title>Log In</v-list-item-title>
              </v-list-item>
              <v-list-item v-else @click="logout">
                <v-list-item-title>Log Out</v-list-item-title>
              </v-list-item>
              <v-list-item @click="showProfile = true">
             <v-list-item-title>View Profile</v-list-item-title>
             </v-list-item>
             <!-- <v-list-item @click="showChangePassword = true">
            <v-list-item-title>Change Password</v-list-item-title>
            </v-list-item> -->
            </v-list>
          </v-card>
        </v-menu>
      </v-app-bar>
    </div>

    <!-- Page content -->
    <v-container fluid class="pa-0 pt-16" >
   
      <router-view :hideToolbar="hideToolbar" />
    </v-container>
     <v-footer color="#f3e5f5" class="pa-10 footer">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <h3 class="font-weight-bold">Learn Hub</h3>
            <p>Learn to code and speak new languages with us. Expert-led online courses to boost your skills from anywhere, at any time.</p>
            <v-row class="mt-2">
              <v-col cols="2" v-for="(icon, index) in socialIcons" :key="index">
                <v-icon size="24">{{ icon }}</v-icon>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="6" md="3">
            <h4 class="font-weight-bold mb-2">Company</h4>
            <router-link to="/aboutus" class="footer-link">About Us</router-link>
            <!-- <router-link to="" class="footer-link">Services</router-link>
            <router-link to="" class="footer-link">Community</router-link>
            <router-link to="" class="footer-link">Comments</router-link> -->
          </v-col>

          <!-- <v-col cols="6" md="2">
            <h4 class="font-weight-bold mb-2">Support</h4>
            <router-link to="" class="footer-link">Help Center</router-link>
            <router-link to="" class="footer-link">Feedback</router-link>
          </v-col> -->

          <v-col cols="6" md="3">
            <h4 class="font-weight-bold mb-2">Links</h4>
            <router-link to="/usercourses" class="footer-link">Courses</router-link>
            <router-link to="/" class="footer-link">Lessons</router-link>
            <router-link to="/userteacher" class="footer-link">Teachers</router-link>
          </v-col>

          <v-col cols="6" md="3">
            <h4 class="font-weight-bold mb-2">Contact Us</h4>
            <p>+959775988862</p>
            <p>+959255674574</p>
            <p>hsumonzaw811@gmail.com</p>
          </v-col>
        </v-row>

        <v-divider class="my-4"></v-divider>
        <p class="text-center grey--text text--darken-1">
          © 2025 Learn Hub. All Rights Reserved.
        </p>
      </v-container>
    </v-footer>
    <!-- View Profile Dialog -->
<v-dialog v-model="showProfile" max-width="500px">
  <v-card>
    <v-card-title>
      <span class="text-h6">Your Profile</span>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-avatar size="100">
            <v-img :src="photoSrc" @error="onImgError" />
          </v-avatar>
        </v-col>
        <v-col cols="12">
          <v-list>
            <v-list-item><b>Username:</b> {{ userData.userName }}</v-list-item>
            
            <v-list-item><b>Role:</b> {{ userData.role }}</v-list-item>
          </v-list>

        </v-col>
      </v-row>
    </v-card-text>
    <!-- <v-list-item><b>Name:</b> {{ userData.name }}</v-list-item> -->

    <v-card-actions>
      <v-btn color="primary" @click="showProfile = false">Close</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<!-- Change Password Dialog -->
<!-- <v-dialog v-model="showChangePassword" max-width="500px">
  <v-card>
    <v-card-title>Change Password</v-card-title>
    <v-card-text>
      <v-text-field v-model="passwordForm.oldPassword" label="Old Password" type="password" />

      <v-text-field
        v-model="passwordForm.newPassword"
        label="New Password"
        :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showNewPassword ? 'text' : 'password'"
        @click:append="showNewPassword = !showNewPassword"
      />

      <v-text-field
        v-model="passwordForm.confirmPassword"
        label="Confirm New Password"
        :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showConfirmPassword ? 'text' : 'password'"
        @click:append="showConfirmPassword = !showConfirmPassword"
      />
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="submitPasswordChange">Change</v-btn>
      <v-btn @click="showChangePassword = false">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog> -->



  </v-app>
</template>

<script>
import { ref, reactive } from 'vue'
import axios from "./config";
;

export default {
  data: () => ({
    defaultProfile: new URL('@/assets/loginProfile.png', import.meta.url).href,
    photoSrc: '',
    showNavigation: true,
    userData: {},
    isDark: false,
    showTeacher: false,
    isLoggedIn:false,
    showProfile: false,
     currentUser: null,
  //   showNewPassword: false,
  // showConfirmPassword: false,
  //   showChangePassword: false,
  //   passwordForm: {
  //     oldPassword: '',
  //     newPassword: '',
  //     confirmPassword: '',
  //   },
    socialIcons: ["mdi-facebook", "mdi-twitter", "mdi-instagram", "mdi-youtube"]
  }),
   created() {
    const user = localStorage.getItem("user");
    if (user) {
      this.isLoggedIn = true;
      this.currentUser = JSON.parse(user);
    }
  },

  mounted() {
    this.userData = JSON.parse(localStorage.getItem("user")) || {};
    console.log('User data from localStorage:', this.userData);
    if (this.userData?.role === "TEACHER") {
      this.showTeacher = false;
    } else {
      this.showTeacher = true;
    }

    this.getLoginMethod();
    this.setTheme();
    this.setUserPhoto();
  },

  watch: {
    isDark(val) {
      this.$vuetify.theme.global.name = val ? 'dark' : 'light';
    },

    userData: {
      handler(newVal) {
        console.log("Updated userData:", newVal);
      },
      deep: true
    }
  },

  methods: {
     setUser(user) {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    },
    clearUser() {
      this.currentUser = null;
      this.isLoggedIn = false;
    },
  
    clickRouter(path) {
      this.$router.push(path);
    },
    setTheme() {
      const savedTheme = localStorage.getItem("theme");
      this.isDark = savedTheme === "dark";
      this.$vuetify.theme.global.name = this.isDark ? 'dark' : 'light';
    },

    getLoginMethod() {
      this.userData = JSON.parse(localStorage.getItem("user")) || {};

      if (this.userData?.role === "TEACHER") {
        this.showTeacher = false;
      } else {
        this.showTeacher = true;
      }

      if (!this.userData?.password) {
        this.isLoggedIn = false;
        this.showNavigation = false;
      } else {
        axios.defaults.headers.common["Authorization"] = this.userData.password;
        this.showNavigation = true;
        this.isLoggedIn = true;
        this.setUserPhoto();
      }
    },

    setUserPhoto() {
      if (this.userData?.profilePhoto) {
        this.photoSrc = `${axios.defaults.baseURL}/userphoto/${this.userData.profilePhoto}.png`;
      } else {
        this.photoSrc = this.defaultProfile;
      }
    },

    onImgError(e) {
      e.target.src = this.defaultProfile;
    },

    clickRouter(path) {
      this.$router.push({ path }).catch(() => {});
    },

    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      
      this.userData = {};
      this.isLoggedIn = false;
      this.showNavigation = false;
      this.photoSrc = this.defaultProfile;
      this.$router.push({ path: "/" });
    },

    hideToolbar() {
      this.getLoginMethod();
    },

    toggleTheme() {
      this.isDark = !this.isDark;
      localStorage.setItem("theme", this.isDark ? "dark" : "light");
      this.$vuetify.theme.global.name = this.isDark ? 'dark' : 'light';
    },

//    submitPasswordChange() {
//   // client-side validation
//   if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
//     alert("Passwords do not match!");
//     return;
//   }

//   if (!this.userData?.password) {
//     alert("You are not logged in.");
//     return;
//   }

//   // Use relative path (no /api/v1 prefix) so it combines with axios.defaults.baseURL correctly
// axios.put(`/useraccounts/${this.userData.userAccountId}/changepassword`, {
//     oldPassword: this.passwordForm.oldPassword,
//     newPassword: this.passwordForm.newPassword,
//   })
//   .then((res) => {
//     alert("Password changed successfully!");
//     this.showChangePassword = false;
//     // clear sensitive fields only on success
//     this.passwordForm.oldPassword = '';
//     this.passwordForm.newPassword = '';
//     this.passwordForm.confirmPassword = '';
//   })
//   .catch(err => {
//     console.error('Change password error:', err);

//     // Better error message for the user if server sent one
//     if (err.response && err.response.data) {
//       // try to show an informative message from the backend
//       const serverMsg =
//         typeof err.response.data === 'string'
//           ? err.response.data
//           : err.response.data.message || JSON.stringify(err.response.data);
//       alert(`Failed to change password: ${serverMsg}`);
//     } else if (err.request) {
//       alert("No response from server. Please check your network or backend.");
//     } else {
//       alert("Failed to change password. Please try again.");
//     }
//   });
// }

submitPasswordChange() {
  if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (!this.userData?.userAccountId) {
    alert("User ID missing. Please login again.");
    return;
  }

axios.put(`/useraccounts/${this.userData.userAccountId}/changepassword`, null, {
  params: {
    oldPassword: this.passwordForm.oldPassword,
    newPassword: this.passwordForm.newPassword
  }
})
  .then(res => {
    alert("Password changed successfully!");
    this.showChangePassword = false;
    this.passwordForm.oldPassword = '';
    this.passwordForm.newPassword = '';
    this.passwordForm.confirmPassword = '';
  })
  .catch(err => {
    console.error('Change password error:', err);
    alert('Failed to change password. Please try again.');
  });
},

}
  
};
</script>


<style scoped>
.v-toolbar.light-bar {
  background-color: #558cdf;
  color: white;
}
.v-toolbar.dark-bar {
  background-color: #4ecddbf6;
  color: white;
}
.profile-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.hover-style:hover {
  background-color: #61cfd6;
  color: #0a3e8b;
}
.centered-nav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
}
.footer-link {
  display: block;
  color: #4ecddbf6;
  text-decoration: none;
  margin: 4px 0;
}
.footer-link:hover {
  color: #6a1b9a;
  text-decoration: underline;
}
.footer{
  position: sticky;
}
</style>
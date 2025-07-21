<template>
  <v-app>
    <div>
      <v-app-bar flat height="70" color="#2196f3" class="px-8">
        <v-toolbar-title class="d-flex align-center font-weight-bold white--text" style="font-size: 2rem; color: antiquewhite;">
          <v-avatar size="60" class="mr-2" color="white">
            <v-img src="@/assets/unilogo.png" alt="Logo" cover />
          </v-avatar>
          CodeLingo
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <div class="centered-nav">
          <v-btn text to="/">Home</v-btn>
          <v-btn text to="/usercourses">Courses</v-btn>
          <v-btn text to="/userlessons">Lessons</v-btn>
          <v-btn text to="/userteacher">Teachers</v-btn>
          <v-btn text to="">Exam</v-btn>
        </div>

        <!-- Settings for non-students -->
        <v-menu offset-y open-on-hover close-on-content-click v-if="showNavigation && userData.role !== 'STUDENT'">
          <template v-slot:activator="{ props }">
            <v-btn text v-bind="props" class="hover-style">
              <v-icon start>mdi-cog</v-icon>
              Setting
              <v-icon end>mdi-menu-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="clickRouter('/')">
              <v-list-item-title><v-icon>mdi-home</v-icon> Home</v-list-item-title>
            </v-list-item>
            <v-list-item @click="clickRouter('/useraccount')" v-if="showTeacher">
              <v-list-item-title><v-icon>mdi-account-multiple-plus</v-icon> User Account</v-list-item-title>
            </v-list-item>
            <v-list-item @click="clickRouter('/teacherforstudent')" v-else>
              <v-list-item-title><v-icon>mdi-account-multiple</v-icon> My Students</v-list-item-title>
            </v-list-item>
            <v-list-item @click="clickRouter('/courses')" v-if="showTeacher">
              <v-list-item-title><v-icon>mdi-folder-open</v-icon> Courses</v-list-item-title>
            </v-list-item>
            <v-list-item @click="clickRouter('/languages')">
              <v-list-item-title><v-icon>mdi-web</v-icon> Languages</v-list-item-title>
            </v-list-item>
            <v-list-item @click="clickRouter('/lessons')">
              <v-list-item-title><v-icon>mdi-lightbulb-on-outline</v-icon> Lessons</v-list-item-title>
            </v-list-item>
            
          </v-list>
        </v-menu>

        <!-- Theme Toggle -->
        <v-btn icon @click="toggleTheme" :title="isDark ? 'Light Mode' : 'Dark Mode'">
          <v-icon>{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
        </v-btn>

        <!-- Profile Avatar -->
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar size="30">
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
            </v-list>
          </v-card>
        </v-menu>
      </v-app-bar>
    </div>

    <!-- Page content -->
    <v-container fluid class="pa-0">
      <router-view :hideToolbar="hideToolbar" />
    </v-container>
  </v-app>
</template>

<script>
import axios from "./config";

export default {
  data: () => ({
    defaultProfile: new URL('@/assets/loginProfile.png', import.meta.url).href,
    photoSrc: '',
    showNavigation: true,
    userData: {},
    isDark: false,
    showTeacher : false,
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true"
  }),

  mounted() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    
    if(this.userData.role=="TEACHER"){
      this.showTeacher = false;
    }else{
      this.showTeacher = true;
    }
    this.getLoginMethod();
    this.setTheme();
    this.setUserPhoto();
  },

  methods: {
    setTheme() {
      const savedTheme = localStorage.getItem("theme");
      this.isDark = savedTheme === "dark";
      this.$vuetify.theme.global.name = this.isDark ? 'dark' : 'light';
    },

    getLoginMethod() {
      this.userData = JSON.parse(localStorage.getItem("user"));
      if (!this.userData?.password) {
        this.isLoggedIn = false;
        this.showNavigation = false;
        this.$router.push({ path: "/login" }).catch(() => {});
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
      this.$router.push({ path: "/" }).catch(() => {});
    },

    hideToolbar() {
      this.getLoginMethod();
    },

    toggleTheme() {
      this.isDark = !this.isDark;
      localStorage.setItem("theme", this.isDark ? "dark" : "light");
      this.$vuetify.theme.global.name = this.isDark ? 'dark' : 'light';
    }
  },

  watch: {
    isDark(val) {
      this.$vuetify.theme.global.name = val ? 'dark' : 'light';
    }
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
</style>

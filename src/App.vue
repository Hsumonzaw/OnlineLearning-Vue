<template>
  <v-app>
    <div >
      <v-app-bar flat height="70" color="#2196f3"  class="px-8">
       <v-toolbar-title class="d-flex align-center font-weight-bold white--text " style="font-size: 2rem;color: antiquewhite;">
    <v-avatar size="60" class="mr-2" color="white">
  <v-img
    src="@/assets/unilogo.png"
    alt="Logo"
    cover
  />
</v-avatar>
      CodeLingo
  </v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="centered-nav ">
    <v-btn text  to="/">Home</v-btn>
    <v-btn text to="/usercourses">Courses</v-btn>
    <v-btn text to="/userlessons"> Lessons</v-btn>
    <v-btn text to="">Teachers</v-btn>
    <v-btn text to="">Exam</v-btn>
    </div>
    <v-menu offset-y open-on-hover close-on-content-click v-if="showNavigation && userData.role!='STUDENT'">
        <template v-slot:activator="{props}">
          <v-btn text v-bind="props" v-on="on"
            class="hover-style">
            <v-icon start>mdi-cog</v-icon>
            Setting
            <v-icon end>mdi-menu-down</v-icon > 
            </v-btn>
        </template>
        <v-list>
    <v-list-item @click="clickRouter('/')">
    <v-list-item-title>
      <v-icon>mdi-home</v-icon>
      Home</v-list-item-title>
    </v-list-item>
    <v-list-item @click="clickRouter('/useraccount')">
      <v-list-item-title>
      <v-icon>mdi-account-multiple-plus</v-icon> 
        User Account</v-list-item-title>
    </v-list-item>
    <v-list-item @click="clickRouter('/courses')">
      <v-list-item-title>
        <v-icon>mdi-folder-open</v-icon>
        Courses</v-list-item-title>
      </v-list-item>
 
    <v-list-item @click="clickRouter('/languages')">
      <v-list-item-title>
      <v-icon>mdi-web</v-icon> 
        Languages</v-list-item-title>
    </v-list-item>

    <v-list-item @click="clickRouter('/lessons')">
      <v-list-item-title>
      <v-icon>mdi-lightbulb-on-outline</v-icon>  
        Lessons</v-list-item-title>
    </v-list-item>
    </v-list>

      </v-menu>
     <v-btn icon @click="toggleTheme" :title="isDark ? 'Light Mode' : 'Dark Mode'">
      <v-icon>{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>

    <!-- profile -->
      <v-menu offset-y>
    <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar size="30">
              <img src="@/assets/loginProfile.png" alt="" class="profile-img">
            </v-avatar>
          </v-btn>
        </template>
        <v-card min-width="120" style="">
          <v-list>
          <!-- <v-list-item @click="" ><v-list-item-title>Setting</v-list-item-title></v-list-item> -->
          <v-list-item v-if="!isLoggedIn" @click="clickRouter('/login')"><v-list-item-title>Log In</v-list-item-title></v-list-item>
          <v-list-item v-else @click="logout"><v-list-item-title>Log Out</v-list-item-title></v-list-item>

        </v-list>
        </v-card>
      </v-menu>
      
 </v-app-bar>
    </div>
    <div>
   
   
      <!-- <v-navigation-drawer
        expand-on-hover
        rail
        v-show="showNavigation"
      >
        <v-list>
          <v-list-item
            :prepend-avatar="srcMethod()"
            :subtitle="userData.profileName"
            :title="userData.role"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-folder" title="Home" value="myfiles" @click="clickRouter('/')"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="New Courses" value="newcourses" @click="clickRouter('/newcourses')"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Courses List" value="courseslist"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Exam List" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Languages" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Lessons" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Exam" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="UserAccounts" value="shared" @click="clickRouter('/one')"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer> -->
  <div class="hidden-print-only"> 
      </div>
      <v-container fluid class="pa-0">
        <router-view :hideToolbar="hideToolbar"/>
        </v-container>
              
    </div>
  </v-app>
</template>
<script>
import axios from "./config";
export default {
  data: () => ({
    showNavigation:true,
    userData:{},
    isDark: false,
   
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true", 

    
  
  }),
   props: {},
  mounted: function() {
    //dark mode store in local storage
    this.getLoginMethod();
  const savedTheme = localStorage.getItem("theme");
  this.isDark = savedTheme === "dark"; 
  this.$vuetify.theme.global.name = this.isDark ? 'dark' : 'light';
  //  console.log("USER TYPE:", this.userData?.userTypeList); 
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    

     
   

  },
  // computed: {
  // isAdminOrStaff() {
  //   const role = this.userData?.role;
  //   return role === 'Admin' || role === 'Staff';
  // }
// },
  methods: {
    srcMethod:function(){
        return `${axios.defaults.baseURL}/userphoto/${this.userData?.profilePhoto}.png`;
    },
   getLoginMethod:function(){
      this.userData = JSON.parse(localStorage.getItem("user"));
    if(this.userData?.password=="" || this.userData?.password==undefined){
        this.isLoggedIn = false;
      this.$router
          .push({
            path: "/login",
          })
          .catch(() => {});
          this.showNavigation = false;
    }else{
      axios.defaults.headers.common["Authorization"] = `${this.userData.password}`;
      this.showNavigation = true;

    }
    },
    // clickRouter:function(path){
    //    this.$router
    //       .push({
    //         path: path,
    //       })
    //       .catch(() => {});
    //  },
    logout(){
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      this.userData = {};
      this.isLoggedIn = false;
      this.showNavigation = false;

    this.$router
    .push({
      path: "/"
    })
    .catch(() => {});
    },
    clickRouter:function(path){
       this.$router
          .push({
            path: path,
          })
          .catch(() => {});
    },
    hideToolbar:function(hide){
      this.getLoginMethod();
    },
    toggleTheme(){
      this.isDark = !this.isDark;
      localStorage.setItem("theme", this.isDark ? "dark" : "light");
      
    },


    
    // logout(){
    //   th// $router.push("// gin").catch(() => {});
    // }
  },
  watch: {
   isDark(val) {
      this.$vuetify.theme.global.name = val ? 'dark' : 'light';
    }
  },
  components: {}
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
.hover-style:hover{
  background-color:  #61cfd6;
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

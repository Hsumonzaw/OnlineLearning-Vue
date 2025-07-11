<template>
  <v-app>
    <div>
      <v-toolbar flat :elevation="isDark ? 0 : 4" :class="isDark ? 'dark-bar' : 'light-bar'" height="50">
    <v-toolbar-title>Online Courses Management</v-toolbar-title>

    <v-spacer></v-spacer>
     <v-btn icon @click="toggleTheme" :title="isDark ? 'Light Mode' : 'Dark Mode'">
      <v-icon>{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>
      <v-menu offset-y>
    <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar size="30">
              <img src="@/assets/loginProfile.png" alt="" class="profile-img">
            </v-avatar>
          </v-btn>
        </template>
        <v-card min-width="180">
          <v-list>
          <!-- <v-list-item @click="" ><v-list-item-title>Setting</v-list-item-title></v-list-item> -->
          <v-list-item v-if="!isLoggedIn" @click="clickRouter('/login')"><v-list-item-title>Log In</v-list-item-title></v-list-item>
          <v-list-item v-else @click="logout"><v-list-item-title>Log Out</v-list-item-title></v-list-item>

        </v-list>
        </v-card>
      </v-menu>
   </v-toolbar>
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
    
  
  }),
   props: {},
  mounted: function() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.getLoginMethod();

     
   

  },
  methods: {
    srcMethod:function(){
        return `${axios.defaults.baseURL}/userphoto/${this.userData?.profilePhoto}.png`;
    },
   getLoginMethod:function(){
      
    if(this.userData?.password=="" || this.userData?.password==undefined){
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
</style>

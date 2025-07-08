<template>
  <v-app>
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
  
  }),
   props: {},
  mounted: function() {
    this.userData = JSON.parse(localStorage.getItem("user"));
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
    clickRouter:function(path){
       this.$router
          .push({
            path: path,
          })
          .catch(() => {});
    },
     hideToolbar: function (hide) {
      this.getLoginMethod();
    },
  },
  watch: {},
  components: {}
};
</script>
<style scoped>

</style>

<template>
 <v-app my-5>
  <div class="background-image d-flex align-center justify-center">
   <v-card class="pa-8  bg-light-blue-lighten-4  " elevation="16" style="width: 400px; min-width: 300px;">
    
    <v-card-title class="text-h5 text-center"><img src="@/assets/user-profile.png" alt="" class="login"><br>Log In</v-card-title>
    <v-col cols="12" md="12">
      <v-text-field label="UserName" v-model="user.userName" prepend-icon="mdi-account" variant="outlined" :rules="nameRules"
></v-text-field>
    </v-col>
    <v-col cols="12" md="12">
      
      <v-text-field label="Password" v-model="user.password" prepend-icon="mdi-lock"  variant="outlined"  
      @keyup.enter="clickLogin()"
      :type="showPassword ? 'text' : 'password'"
      :rules="passwordRules" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
       @click:append-inner="showPassword = !showPassword"
>
    </v-text-field>
    </v-col>
    <v-col cols="12" md="12" >
          <v-btn block color="primary" @click="clickLogin()">Login</v-btn>
    </v-col>
  </v-card>
  </div>
 </v-app>
 
</template>
<script>
import userService from "../service/LoginService.js";

export default {
  data: () => ({
    user:{},
    userList:[],
     showPassword: false,
    nameRules: [(v) => !!v || "Name is required"],
    passwordRules: [(v) => !!v || "Name is required"]

  }),
   props: {hideToolbar:Function},
  mounted: function() {
  },
  methods: {
    clickLogin:function(){
      userService
        .loginAccount(this.user)
        .then((response) => {
          localStorage.setItem("user",JSON.stringify(response));
          this.hideToolbar(true);
          localStorage.setItem("isLoggedIn","true");
          this.$root.isLoggedIn = true;
      // if (response.password != undefined) {
      //   axios.defaults.headers.common["Authorization"] = `${response.password}`;
      // } else {
      //   axios.defaults.headers.common["Authorization"] = ``;
      // }
            if(response.userType=="ADMIN"){
        this.$router
          .push({
            path: "/useraccounts",
          })
          .catch(() => {});
      }else{
        this.$router
          .push({
            path: "/",
          })
          .catch(() => {});
      }
        })
        .catch((error) => {

        });
      // this.userList.push(this.user);
      // localStorage.setItem("name",JSON.stringify(this.userList));
    }
  },
  watch: {},
  components: {}
};
</script>
<style scoped>
.background-image{
  height: 100vh;
  width: 100vw;
  background-image: url('@/assets/skyblue.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
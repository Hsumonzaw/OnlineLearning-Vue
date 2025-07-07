<template>
  <!-- <v-row no-gutters float-right>
    <v-col cols="12" md="8">
      <v-text-field label="UserName" v-model="user.userName"></v-text-field>
    </v-col>
    <v-col cols="12" md="8">
      
      <v-text-field label="Password" v-model="user.password"></v-text-field>
    </v-col>
    <v-col cols="12" md="8">
      <v-btn @click="clickLogin()">Login</v-btn>
    </v-col> -->
    <!-- <v-col cols="12" md="12">
      <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Password
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in userList"
        :key="item.userName"
      >
        <td>{{ item.userName }}</td>
        <td>{{ item.password }}</td>
      </tr>
    </tbody>
  </v-table>
    </v-col> -->
  <!-- </v-row> -->
 <v-app my-5>
  <div class="background-image d-flex align-center justify-center">
   <v-card class="pa-8  bg-light-blue-lighten-4  " elevation="16" style="width: 400px; min-width: 300px;">
    <v-card-title class="text-h5 text-center">Log In</v-card-title>
    <v-col cols="12" md="12">
      <v-text-field label="UserName" v-model="user.userName" prepend-icon="mdi-account"></v-text-field>
    </v-col>
    <v-col cols="12" md="12">
      
      <v-text-field label="Password" v-model="user.password" prepend-icon="mdi-lock"></v-text-field>
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
      // if (response.password != undefined) {
      //   axios.defaults.headers.common["Authorization"] = `${response.password}`;
      // } else {
      //   axios.defaults.headers.common["Authorization"] = ``;
      // }
      this.$router.push({
              name: "one"
            });
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
</style>
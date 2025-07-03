<template>
  <v-row no-gutters>
    <v-col cols="12" md="8">
      <v-text-field label="UserName" v-model="user.userName"></v-text-field>
    </v-col>
    <v-col cols="12" md="8">
      
      <v-text-field label="Password" v-model="user.password"></v-text-field>
    </v-col>
    <v-col cols="12" md="8">
      <v-btn @click="clickLogin()">Login</v-btn>
    </v-col>
    <v-col cols="12" md="12">
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
    </v-col>
  </v-row>
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

</style>
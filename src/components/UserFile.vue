<template>
  <v-row no-gutters>
    <v-col cols="12" md="12">
      <v-toolbar dark color="primary pl-2 pr-2" density="compact">
        <v-toolbar-title>User CV File</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="$emit('closeDialog')">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </v-toolbar>
    </v-col>
      <v-col cols="12" md="12">
          <v-row class="ml-2">
            <!-- <v-col cols="12" md="12">
            <img :src="file" height="100%" width="700vh" />
            </v-col> -->
            <v-col cols="12" md="12">
              <input type="file" id="file" ref="file" @change="changeFile"/>
            </v-col>
            <v-col cols="12" md="12">
            <!-- <v-btn color="red" outlined @click="$emit('closeDialog')">Cancel</v-btn> -->
            <v-btn
              color="primary"
              outlined
              class="ml-2"
              @click="saveFile()"
            >Save</v-btn>
        </v-col>
        </v-row>
        </v-col>
    </v-row>
</template>
<script>
import axios from "../config";
import userService from "../service/UserAccountService.js";
export default {
  data: () => ({
    file:"",
  }),
   props: {user:Object},
  mounted: function() {
    //this.file = `${axios.defaults.baseURL}/userfile/${this.user?.file}.pdf`;
  },
  methods: {
    saveFile:function(){
var formData = new FormData();
      formData.append("file", this.$refs.file.files[0]);
      userService
        .updateFile(formData,this.user.userAccountId)
        .then(response => {
            this.$emit('loadUserList');
          this.$swal({
                title: "Successful",
                text: "Success!",
                type: "success",
                timer: 500,
              });
              //this.$emit('userMethod');
        })
        .catch(error => {
          this.$swal("မအောင်မြင်ပါ", error.response.data.message, "error");
        });
    },
        changeFile: function(e) {
      let image = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.file = e.target.result;
      };
    }
  },
  watch: {},
  components: {}
};
</script>
<style scoped>

</style>
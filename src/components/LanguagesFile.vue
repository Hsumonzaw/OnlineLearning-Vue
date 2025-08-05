<template>
  <v-row no-gutters>
    <v-col cols="12" md="12">
      <v-toolbar dark color="primary pl-2 pr-2" density="compact">
        <v-toolbar-title>To Add Book PDF</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="$emit('closeDialog')">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </v-toolbar>
    </v-col>
      <v-col cols="12" md="12">
          <v-row class="ml-2">
            <v-col cols="12" md="12" class="mt-8">
              <input type="file" id="file" ref="file" @change="changeFile"/>
            </v-col>
            <v-col cols="12" md="12"  >
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
import languageService from "../service/LanguageService.js";
export default {
  data: () => ({
    file:"",

  }),
   props: {language:Object},
  mounted: function() {
    this.file = `${axios.defaults.baseURL}/languagefile/${this.language?.pdf}.pdf`;
  },
  methods: {
    saveFile:function(){
    var formData = new FormData();
      formData.append("file", this.$refs.file.files[0]);
      languageService
        .updateLanFile(formData,this.language.languagesId)
        .then(response => {
            this.$emit('loadUserList');
            this.$emit("closeDialog");

          this.$swal({
            icon: "success",
                title: "Successful",
                text: "Successfully File Uploaded!",
                type: "success",
                
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
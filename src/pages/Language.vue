<template>
  <v-row no-gutters>
    <v-col cols="8" md="8">
      <v-table fixed-header height="92vh" density="compact">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center white--text bg-primary">No.</th>
              <th class="text-center white--text bg-primary">Name</th>
              <th class="text-center white--text bg-primary">Amount</th>
              <th class="text-center white--text bg-primary">Exam Link</th>
              <th class="text-center white--text bg-primary">Exam Fee</th>

              <th class="text-center white--text bg-primary">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in languageList"
              :key="index"
              @click="selectedOne = item"
              :style="{
                backgroundColor:
                  item.languagesId == selectedOne.languagesId
                    ? '#def3ff'
                    : 'transparent',
              }"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ item.name }}</td>
              
              <td class="text-center">{{ item.amount }}</td>

              <td class="text-start">{{ item.examLink }}</td>
              <td class="text-start">{{ item.examFee }}</td>

              

              <td class="text-center">
                
                <v-btn class="ml-1" small icon color="green" density="compact">
                  <v-icon size="small" @click="editUser(item)">mdi-pencil</v-icon></v-btn
                >
                <v-btn class="ml-1" small icon color="red" density="compact">
                  <v-icon size="small" @click="deleteUserMethod(item)">mdi-delete</v-icon></v-btn
                >
              </td>
            </tr>
            <v-divider />
          </tbody>
        </template>
      </v-table>
    </v-col>
    <v-col cols="4" md="4" class="pl-2">
      <v-row class="align-center login-full" no-gutters>
        <v-col>
          <v-card variant="outlined" class="mr-2 pl-2 pr-2">
            <v-row no-gutters class="pa-2">
              
              <v-col cols="12" md="12">
                <v-text-field
                  label="Name"
                  v-model="language.name"
                  :rules="[(v) => !!v || 'required']"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                type="number"
                  label="Amount"
                  v-model="language.amount"
                  :rules="[(v) => !!v || 'required']"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  label="Exam Link"
                  v-model="language.examLink"
                  :rules="[(v) => !!v || 'required']"
                   density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                type="number"
                  label="Exam Fee"
                  v-model="language.examFee"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              
              <v-col cols="12" md="12" class="text-right mb-2">
                <v-btn color="primary " @click="saveUser()">{{
                  saveOrupdate
                }}</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col>
      <v-dialog v-model="dialogDelete" width="500">
        <v-card>
          <v-card-title class="text-h5 white--text bg-red"> Delete </v-card-title>

          <v-card-text class="text-h6">
            Are you sure to delete({{ selectedOne.name }})?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="black" text @click="dialogDelete = false"> CANCEL </v-btn>
            <v-btn dark class="bg-red" text @click="clickDeleteDialog()"> DELETE </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
    <v-col>
          <v-bottom-sheet v-model="userPhotoDialog" fullscreen scrollable>
        <v-sheet class="information-window-v-sheet">
          <PhotoUser
          @closeDialog="userPhotoDialog=false"
          :user="selectedOne"
          @loadUserList="loadUserList"
          />
        </v-sheet>
      </v-bottom-sheet>
    </v-col>
  </v-row>
</template>
<script>
import { format } from "date-fns";
import languageService from "../service/LanguageService.js";
export default {
  data: () => ({
    selectedOne:{},
    language:{},
    saveOrupdate:"SAVE",
    languageList:[],
  }),
  props: {  },
  mounted: function () {
    this.languageListMethod();
  },
  methods: {
    
    saveUser: function () {
      if (this.saveOrupdate == "SAVE") {
        languageService
          .addLanguageList(this.language)
          .then((response) => {
            this.language = {};
            
            // this.user = {};
            // this.userListMethod();
            // this.$swal({
            //   icon: "success",
            //   title: "Your work has been saved",
            //   showConfirmButton: false,
            //   timer: 1000,
            // });
          })
          .catch((error) => {
            this.$swal("Fail!", error.response.data.message, "error");
          });
      } else {
        userService
          .updateUser(this.user)
          .then((response) => {
            this.saveOrupdate="SAVE";
            this.user = {};
            this.userListMethod();
            this.$swal({
              icon: "success",
              title: "Your work has been updated",
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .catch((error) => {
            this.$swal("Fail!", error.response.data.message, "error");
          });
      }
    },
    languageListMethod() {
      languageService
        .getLanguageList()
        .then((response) => {
          // console.log(response);
          
          this.languageList.splice(0);
          this.languageList.push(...response);
        })
        .catch((error) => {
          // this.$swal("Fail!", error.response.data.message, "error");
        });
    },
  },
  watch: {
    
  },
  components: {},
};
</script>
<style scoped>
table,
th,
td {
  border: 1px solid rgb(215, 215, 215);
  border-collapse: collapse;
  padding: 0 1px !important;
}

.login-full {
  height: 100vh;
}
.information-window-v-sheet {
  height: 100vh !important;
  overflow-x: scroll;
}
</style>

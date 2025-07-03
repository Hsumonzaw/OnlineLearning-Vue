<template>
  <v-row no-gutters>
    <v-col cols="8" md="8">
      <v-table fixed-header height="92vh" density="compact">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center white--text bg-primary">No.</th>
              <th class="text-center white--text bg-primary">StartDate</th>
              <th class="text-center white--text bg-primary">Name</th>
              <th class="text-center white--text bg-primary">UserName</th>
              <th class="text-center white--text bg-primary">Phone</th>
              <th class="text-center white--text bg-primary">Address</th>
              <th class="text-center white--text bg-primary">UserType</th>
              <th class="text-center white--text bg-primary">Photo</th>
              <th class="text-center white--text bg-primary">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in userList"
              :key="index"
              @click="selectedOne = item"
              :style="{
                backgroundColor:
                  item.userAccountId == selectedOne.userAccountId
                    ? '#def3ff'
                    : 'transparent',
              }"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ item.startDate }}</td>
              <td class="text-center">{{ item.name }}</td>
              
              <td class="text-center">{{ item.userName }}</td>

              <td class="text-start">{{ item.phonenum }}</td>
              <td class="text-start">{{ item.address }}</td>

              <td class="text-start">{{ item.userType }}</td>
              <td class="text-center">{{ item.photo }}</td>

              <td class="text-center">
                <v-btn class="ml-1" small icon color="black" density="compact">
                  <v-icon size="small" @click="photoMethod(item)">mdi-image</v-icon></v-btn
                >
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
                <v-menu
                  v-model="startMenu"
                  full-width
                  max-width="290px"
                  min-width="290px"
                  v-bind:close-on-content-click="false"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="user.startDate"
                      density="compact"
                      variant="outlined"
                      label="From Date"
                      readonly
                      v-bind="props"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startPicker"
                    color="primary"
                    hide-header
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  label="Name"
                  v-model="user.name"
                  :rules="[(v) => !!v || 'required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  label="User Name"
                  v-model="user.userName"
                  :rules="[(v) => !!v || 'required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  label="Password"
                  v-model="user.password"
                  :rules="[(v) => !!v || 'required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  label="Phone"
                  v-model="user.phonenum"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  label="Address"
                  v-model="user.address"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-autocomplete
                  v-model="user.userType"
                  item-text="userType"
                  item-title="userType"
                  :items="userTypeList"
                  label="UserType"
                  name="brand1212Name"
                  return-object
                  required
                  density="compact"
                  variant="outlined"
                  filled
                >
                </v-autocomplete>
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
import userService from "../service/UserAccountService.js";
export default {
  data: () => ({
    selectedOne: {},
    user: {},
    userList: [],
    userTypeList: ["STAFF", "STUDENT", "TEACHER", "ADMIN"],
    saveOrupdate: "SAVE",
    startPicker: new Date(),
    startMenu: false,
    dialogDelete:false,
    userPhotoDialog:false,
  }),
  props: { hideToolbar: Function },
  mounted: function () {
    this.user.startDate = format(this.startPicker, "dd-MM-yyyy");
    this.user.userType = this.userTypeList[1];
    this.userListMethod();
  },
  methods: {
    loadUserList:function(){
      this.userPhotoDialog = false;
      this.userListMethod();
    },  
    photoMethod:function(item){
        this.userPhotoDialog = true;
    },
    clickDeleteDialog:function(item){
        this.dialogDelete = false;
        userService
          .deleteUser(this.selectedOne)
          .then((response) => {
            this.saveOrupdate = "SAVE";
            this.user = {};
            this.userListMethod();
            this.$swal({
              icon: "success",
              title: "Your work has been deleted",
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .catch((error) => {
            this.$swal("Fail!", error.response.data.message, "error");
          });
    },
    deleteUserMethod:function(item){
        this.dialogDelete = true;
    },
    editUser:function(item){
      this.saveOrupdate = "UPDATE";
      this.user = Object.assign({},item);
    },
    formatDate(datePicker) {
      const [year, month, day] = datePicker.split("-");
      return `${day}-${month}-${year}`;
    },
    saveUser: function () {
      if (this.saveOrupdate == "SAVE") {
        userService
          .addUser(this.user)
          .then((response) => {
            this.user = {};
            this.userListMethod();
            this.$swal({
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1000,
            });
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
    userListMethod() {
      userService
        .getUserList()
        .then((response) => {
          this.userList.splice(0);
          this.userList.push(...response);
        })
        .catch((error) => {
          // this.$swal("Fail!", error.response.data.message, "error");
        });
    },
  },
  watch: {
    startPicker() {
      this.startMenu = false;
      this.user.startDate = format(this.startPicker, "dd-MM-yyyy");
    },
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

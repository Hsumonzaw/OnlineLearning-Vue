<template>
  <div>
    <!-- Table Section -->
    <v-row class="title"> 
      <v-col cols="12" >
        <h2 style="background-color:rgb(136, 210, 230);text-align: center;">User Informations</h2>
           <v-col cols="2" class="pl-1 pt-2">
      <v-autocomplete
        v-model="userType"
        item-text="userTypeName"
        :items="userTypeList"
        name="userType"
        label="User Type"
        return-object
        density="compact"
        variant="outlined"
        required
        small
        filled
        @update:modelValue="userListMethodByType"
      ></v-autocomplete>
    </v-col>
  <v-tooltip location="top">
  <template v-slot:activator="{ props }">
    <v-btn
      v-bind="props"
      icon
      color="blue"
      class="fab-button"
      @click="showForm = true"
    >
      <v-icon size="36" color="white">mdi-plus</v-icon>
    </v-btn>
  </template>
  <span>Add User</span>
</v-tooltip>

        <!-- Table Full Width -->
        <v-table fixed-header height="92vh" >
          <thead>
            <tr>
              <th class="text-center white--text bg-primary">No.</th>
              <th class="text-center white--text bg-primary">StartDate</th>
              <th class="text-center white--text bg-primary">Name</th>
              <th class="text-center white--text bg-primary">UserName</th>
              <th class="text-center white--text bg-primary">Age</th>
              <th class="text-center white--text bg-primary">NRC</th>
              <th class="text-center white--text bg-primary">Email</th>
              <th class="text-center white--text bg-primary">Phone</th>
              <th class="text-center white--text bg-primary">Address</th>
              <th class="text-center white--text bg-primary">UserType</th>
              <th class="text-center white--text bg-primary">Photo</th>
              <th class="text-center white--text bg-primary">Degree</th>
              <th class="text-center white--text bg-primary">File</th>
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
              <td class="text-center">{{ item.age || '-'}}</td>
              <td class="text-center">{{ item.nrc || '-'}}</td>
              <td class="text-center">{{ item.email || '-'}}</td>
              
              <td class="text-start">{{ item.phonenum || '-'}}</td>
              <td class="text-start">{{ item.address || '-'}}</td>
              <td class="text-start">{{ item.userType }}</td>
              <td class="text-center"><v-img
  :src="getUserPhotoUrl(item.photo)"
  alt="People Photo"
  max-width="80"
  max-height="80"
  contain
  loading="lazy"
/>
</td>
              <td class="text-center">{{ item.degree }}</td>
              <td class="text-center">{{ item.file }}</td>

              <td class="text-center">
                <v-btn class="ml-1" small icon color="black" density="compact">
                  <v-icon size="small" @click="FileMethod(item)">mdi-file</v-icon></v-btn
                >
                <v-btn class="ml-1" small icon color="black" density="compact">
                  <v-icon size="small" @click="photoMethod(item)">mdi-image</v-icon></v-btn
                >
                <v-btn class="ml-1" small icon color="green" density="compact"  @click.stop="editUser(item)">
                  <v-icon size="small">mdi-pencil</v-icon></v-btn
                >
                <v-btn class="ml-1" small icon color="red" density="compact" @click.stop="deleteUserMethod(item)">
                  <v-icon size="small" >mdi-delete</v-icon></v-btn
                >
              </td>
            </tr>
            <v-divider />
          </tbody>
        </v-table>
      </v-col>
    </v-row>

    <!-- Form Section (centered) -->
    <v-dialog v-model="showForm" max-width="600" style="height: 730px;">
      
        <v-card class="form pa-1" elevation="4" mb-0  >
        <v-card-title class="d-flex justify-space-between align-center">
      <span class="text-h4">Add User</span>
      <v-btn icon color="red" @click="showForm = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
            <v-card-text>
<v-menu
                  v-model="startMenu"
                  full-width
                  max-width="200px"
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
            
                <v-text-field
                  label="Name"
                  v-model="user.name"
                  :rules="[(v) => !!v || 'required']"
                ></v-text-field>

                <v-text-field
                  label="User Name"
                  v-model="user.userName"
                  :rules="[(v) => !!v || 'required']"
                ></v-text-field>

                <v-text-field
                  label="Age"
                  v-model="user.age"
                  :rules="[(v) => !!v || 'required']"
                ></v-text-field>

                     <v-text-field
                    v-model="user.nrc"
                    label="NRC"
                    :rules="[rules.required, rules.nrc]"
                    required
                  ></v-text-field>

               <v-text-field
                  v-model="user.email"
                  label="Email"
                  :rules="[rules.required, rules.email]"
                  required
                ></v-text-field>

                <v-text-field
                  label="Password"
                  v-model="user.password"
                  :rules="[(v) => !!v || 'required']"
                ></v-text-field>
              
                 <v-text-field
                v-model="user.phonenum"
                label="Phone Number"
                :rules="[rules.required, rules.phone]"
                required
              ></v-text-field>

                <v-text-field
                  label="Address"
                  v-model="user.address"
                ></v-text-field>

                <!-- <v-autocomplete
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
                ></v-autocomplete> -->
                <v-autocomplete
                v-model="user.userType"
                :items="userTypeList"
                label="UserType"
                required
                density="compact"
                variant="outlined"
                filled
              ></v-autocomplete>
              
              <v-text-field
                  label="Degree"
                  v-model="user.degree"
                  :rules="[(v) => !!v || 'required']"
                ></v-text-field>
                
                </v-card-text>
               <v-card-actions class="justify-end pr-5 ">  
                <v-btn  class="text-black"
                style="background-color: #2196f3;" 
                 @click="saveUser()">{{
                  saveOrupdate
                }}</v-btn>
              </v-card-actions>
      
        </v-card>
</v-dialog>

    <!-- Delete Dialog -->
    <v-dialog v-model="dialogDelete" width="500">
      <v-card>
        <v-card-title class="text-h5 white--text bg-red">Delete</v-card-title>
        <v-card-text class="text-h6">
          Are you sure to delete({{ selectedOne.name }})?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="black" text @click="dialogDelete = false">CANCEL</v-btn>
          <v-btn dark class="bg-red" text @click="clickDeleteDialog()">DELETE</v-btn>
        </v-card-actions>
      </v-card>
          
    </v-dialog>
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
     <v-col>
          <v-bottom-sheet v-model="UserFileDialog" fullscreen scrollable>
        <v-sheet class="information-window-v-sheet">
          <UserFile
          @closeDialog="UserFileDialog=false"
          :user="selectedOne"
          @loadUserList="loadUserList"          />
        </v-sheet>
      </v-bottom-sheet>
    </v-col>
    
  </div>
</template>
<script>
import { format } from "date-fns";
import axios from "../config";
import userService from "../service/UserAccountService.js";
export default {
  data: () => ({
    selectedOne: {},
    user: {},
    userList: [],
    userTypeList: ["ALL","STAFF", "STUDENT", "TEACHER", "ADMIN"],
    saveOrupdate: "SAVE",
    startPicker: new Date(),
    startMenu: false,
    dialogDelete:false,
    userPhotoDialog:false,
    showForm: false,
      loggedInUser: null,
      UserFileDialog :false,
      userType:"ALL",
      valid: false,
      email: "",
      phone: "",
      nrc: "",
      rules: {
        required: (v) => !!v || "This field is required",
        email: (v) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Invalid email format",
        phone: (v) =>
          /^(?:\+?95|0)(?:9\d{7,9})$/.test(v) || "Invalid Myanmar phone number",
        nrc: (v) =>
          /^\d{1,2}\/[A-Z]{3}\([A-Z]\)\d{6}$/.test(v) || "Invalid NRC format",
      },
      
  }),
  props: { hideToolbar: Function },
  mounted: function () {
    
    this.loggedInUser = JSON.parse(localStorage.getItem("user"));
    this.user.startDate = format(this.startPicker, "dd-MM-yyyy");
    this.user.userType = this.userTypeList[0];
    // this.userType = this.userTypeList[0];
    this.userListMethod();
    this.showForm = false;
    this.userListMethodByType();
    
  },
  methods: {
    getUserPhotoUrl(photo) {
  if (!photo) return "path/to/default-image.png"; // fallback image path
  return `${axios.defaults.baseURL}/userphoto/${photo}.png`;
},

        userListMethodByType() {
          // console.log(this.userType);
          
      userService
        .getUserList(this.userType)
        .then((response) => {
          // console.log(response);

          this.userList.splice(0, this.userList.length);
          this.userList.push(...response);
          console.log(this.userList);
          this.saveOrupdate = "SAVE";
        })
        .catch((error) => {
          this.$swal("Fail!", error.response.data.message, "error");
        });
    },
    FileMethod:function(item){
        this.selectedOne = item;
        this.showForm = false;
        this.UserFileDialog = true;
    },
    loadUserList:function(){
      this.userPhotoDialog = false;
      this.userListMethod();
      this.userFileDialog = false;
      this.showForm = false;


    },  
    photoMethod:function(item){
        this.userPhotoDialog = true;
    },
    clickDeleteDialog:function(item){
        // console.log("Deleting user ID:", this.selectedOne.userAccountId);
        this.dialogDelete = false;
        userService
          .deleteUser(this.selectedOne?.userAccountId)
          .then((response) => {
            this.saveOrupdate = "SAVE";
            this.user = {};
            this.userListMethod();
            this.userListMethodByType();
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
      this.selectedOne = item;
        this.dialogDelete = true;
    },
    editUser:function(item){
      this.showForm = true;
      this.saveOrupdate = "UPDATE";
      this.user = Object.assign({},item);
    },
    formatDate(datePicker) {
      const [year, month, day] = datePicker.split("-");
      return `${day}-${month}-${year}`;
    },
 
    async saveUser() {
  try {
    // Normalize userType
    let userType = this.user.userType;
    if (typeof userType === "object") {
      userType = userType.userType || userType.value || "";
    }

    // Re-assign normalized value back
    this.user.userType = userType;

    // Assign teacherId
    if (this.loggedInUser?.role === "TEACHER" && userType === "STUDENT") {
      this.user.teacherId = this.loggedInUser.userId;
    } else {
      this.user.teacherId = 0;
    }

    

    // Save or update
    if (this.saveOrupdate === "SAVE") {
      this.userListMethodByType();
      await userService
      .addUser(this.user);
      this.$swal({
        icon: "success",
        title: "User saved successfully!",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {

      await userService
      .updateUser(this.user);
      this.userListMethodByType();

      this.$swal({
        icon: "success",
        title: "User updated successfully!",
        showConfirmButton: false,
        timer: 1000,
      });
    }

    this.user = {};
    this.saveOrupdate = "SAVE";
    this.showForm = false;
    this.userListMethod();

  } catch (error) {
    console.error("User save failed", error);
    this.$swal("Error", error.response?.data?.message || "Failed to save user", "error");
  }
},



userListMethod() {
  userService
  .getUserList().then((response) => {
    const allUsers = response.data || response;
    this.loggedInUser = JSON.parse(localStorage.getItem("user"));



    if (this.loggedInUser?.role === "TEACHER") {  
      this.userList = allUsers.filter(
        user =>
          user.userType === "STUDENT" &&
          user.teacherId === this.loggedInUser.userId  
      );
    } else {
      this.userList = allUsers;
    }
  });
  
}

  },
  watch: {
    startPicker() {
      this.startMenu = false;
      this.user.startDate = format(this.startPicker, "dd-MM-yyyy");
    },
        showForm(newVal) {
    if (!newVal) {
      // Dialog closed → reset the form
      this.user = {};
      this.saveOrupdate = "SAVE";
    }
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
tbody{
  background-color: rgb(153, 207, 238);
}
tr:hover {
  background-color: rgb(78, 136, 243) !important;
  cursor: pointer;
}
.login-full {
  height: 100vh;
}
.information-window-v-sheet {
  height: 100vh !important;
  overflow-x: scroll;
}
.form{
  background-color: rgb(155, 207, 255);

}
.fab-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 999;
}
.title{
  padding-top: 70px;
}
</style>
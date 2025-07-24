<template>
  <div>
    <!-- Table Section -->
   <v-row class="title">
      <v-col cols="12">
        <h1 style="background-color: #b3e5fc; text-align: center;" class="mt-1 mb-1">Courses</h1>
        <v-row>
        <v-col cols="2" class="pl-1 pt-5">
      <v-autocomplete
        v-model="type"
        item-text="typeName"
        :items="courseList"
        name="type"
        label="Course Or Exam"
        return-object
        density="compact"
        variant="outlined"
        required
        small
        filled
        @update:modelValue="courseListMethodByType"
      ></v-autocomplete>
      </v-col>
      <v-col cols="2" class="pl-12 pt-6">
      <v-btn rounded="xl" size="large"  class="bg-blue" style="font-size: small;" @click="demand()"> 
        Customer Records
      </v-btn>
    </v-col>
       <v-col cols="2" class="pl-12 pt-6">
      <v-btn rounded="xl" size="large" block class="bg-blue" style="font-size: small;" @click="details()"> 
        Course Details
      </v-btn>
    </v-col>
    </v-row>
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
  <span>Add Course</span>
</v-tooltip>

        <!-- Table Full Width -->
        <v-table fixed-header height="92vh" >
          <thead>
<tr>
              <th class="text-center white--text bg-primary">No.</th>
              <th class="text-center white--text bg-primary">Received Date</th>
              <th class="text-center white--text bg-primary">Student Name</th>
              <th class="text-center white--text bg-primary">Language Name</th>
              <th class="text-center white--text bg-primary">Type</th>
              <th class="text-center white--text bg-primary">Amount</th>
              <th class="text-center white--text bg-primary" v-if="showdemand">Courses Photo</th>
              <!-- <th class="text-center white--text bg-primary">Exam Link</th> -->
              <th class="text-center white--text bg-primary" v-if="showdemand">Book Link</th>
              <th class="text-center white--text bg-primary" v-if="showdemand">Descriptions</th>
              
              <th class="text-center white--text bg-primary" v-if="showdemand">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in coursesList"
              :key="index"
              @click="selectedOne = item"
              :style="{
                backgroundColor:
                  item.coursesId == selectedOne.coursesId
                    ? '#def3ff'
                    : 'transparent',
              }"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ item?.receivedDate }}</td>

              <td class="text-center">{{ item.studentDto?.userName }}</td>

              <td class="text-center">{{ item.languagesDto?.name }}</td>
              <td class="text-center">{{ item?.type }}</td>
              <td class="text-center">{{ item?.amount }}</td>
              <td class="text-center" v-if="showdemand"><v-img
  :src="getCoursePhotoUrl(item.cphoto)"
  alt="Course Photo"
  max-width="80"
  max-height="80"
  contain
  loading="lazy"
/></td>
              <!-- <td class="text-start">{{ item?.examLink }}</td> -->
              <td class="text-center" v-if="showdemand">{{ item?.pdf }}</td>

              <!-- <td class="text-center" v-if="showdemand">{{ item?.description }}</td> -->
               <td class="text-center" v-if="showdemand">
                <div>
                  <span v-if="!item.showFull">
                    {{ item.description?.length > 100 ? item.description.slice(0, 50) + '...' : item.description }}
                    <a v-if="item.description?.length > 50" href="#" @click.prevent="item.showFull = true">See more</a>
                  </span>
                  <span v-else>
                    {{ item.description }}
                    <a href="#" @click.prevent="item.showFull = false">See less</a>
                  </span>
                </div>
              </td>

              
              <td class="text-center" v-if="showdemand"> 
                <v-btn class="ml-1" small icon color="black" density="compact">
                  <v-icon size="small" @click="FileMethod(item)">mdi-file</v-icon></v-btn
                >

                 <v-btn class="ml-1" small icon color="black" density="compact">
                  <v-icon size="small" @click="photoMethod(item)">mdi-image</v-icon></v-btn
                >
                <v-btn class="ml-1" small icon color="green" density="compact">
                  <v-icon size="small" @click="clickEdit(item)"
                    >mdi-pencil</v-icon
                  ></v-btn
                >
                <v-btn class="ml-1" small icon color="red" density="compact">
                  <v-icon size="small" @click="clickDelete(item)"
                    >mdi-delete</v-icon
                  ></v-btn
                >
              </td>
            </tr>
            <v-divider />
          </tbody>
        </v-table>
      </v-col>
    </v-row>

    <!-- Form Section (centered) -->
<v-dialog v-model="showForm" max-width="500">
        <v-card class="form pa-4" elevation="4">
          
      <v-card-title class="d-flex justify-space-between align-center">
      <span class="text-h4">Add Course</span>
      <v-btn icon color="red" @click="showForm = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
                <v-menu
                  v-model="receivedMenu"
                  full-width
                  max-width="290px"
                  min-width="290px"
                  v-bind:close-on-content-click="false"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="courses.receivedDate"
                      label="Received Date"
                      readonly
                      v-bind="props"
                      density="compact"
                      variant="outlined"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="receivedPicker"
                    color="primary"
                    hide-header
                    :max="new Date()"
                  ></v-date-picker>
                </v-menu>

                <v-autocomplete
                v-if="showTeacher"
                  v-model="courses.studentDto"
                  :items="studentList"
                  item-text="userName"
                  item-title="userName"
                  item-value="student"
                  label="Student Name"
                  return-object
                  density="compact"
                  variant="outlined"
                  :rules="[(v) => !!v || 'Student is required']"
                />

                <v-autocomplete
                  v-model="courses.languagesDto"
                  :items="languageList"
                  item-text="name"
                  item-title="name"
                  item-value="language"
                  label="Language Name"
                  return-object
                  density="compact"
                  variant="outlined"
                  :rules="[(v) => !!v || 'Language is required']"
                   @update:model-value="changeType()"
                />

                <v-autocomplete
                  v-model="courses.type"
                  :items="courseList"
                  item-text="type"
                  item-title="type"
                  item-value="type"
                  label="Course Type"
                  return-object
                  density="compact"
                  variant="outlined"
                  :rules="[(v) => !!v || 'Language is required']"
                  @update:model-value="changeType()"
                />

                <!-- <v-text-field
                  label="Exam Link"
                  v-model.number="courses.examLink"
                  :rules="[(v) => !!v || 'required']"
                  density="compact"
                  variant="outlined"
                ></v-text-field> -->

                <!-- <v-text-field
                  label="Book Link (PDF)"
                  v-model.number="courses.pdf"
                  :rules="[(v) => !!v || 'required']"
                  density="compact"
                  variant="outlined"
                ></v-text-field> -->

                <v-text-field
                  type="number"
                  label="Amount"
                  v-model.number="courses.amount"
                  :rules="[(v) => !!v || 'required']"
                  density="compact"
                  variant="outlined"
                ></v-text-field>

                 <v-text-field
                  label="Descriptions"
                  v-model.number="courses.description"
                  :rules="[(v) => !!v || 'required']"
                  density="compact"
                  variant="outlined"
                ></v-text-field>

                           </v-card-text>
               <v-card-actions class="justify-end pr-5">  
                <v-btn  class="text-black"
                style="background-color: #2196f3;" 
                 @click="saveCourse()">{{
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
          <v-bottom-sheet v-model="courseFileDialog" fullscreen scrollable>
        <v-sheet class="information-window-v-sheet">
          <CourseFile
          @closeDialog="courseFileDialog=false"
          :courses="selectedOne"
          @loadUserList="loadUserList"
          />
        </v-sheet>
      </v-bottom-sheet>
    </v-col>

      <v-col>
          <v-bottom-sheet v-model="coursePhotoDialog" fullscreen scrollable>
        <v-sheet class="information-window-v-sheet">
          <CoursePhoto
          @closeDialog="coursePhotoDialog=false"
          :courses="selectedOne"
          @loadUserList="loadUserList"
          />
        </v-sheet>
      </v-bottom-sheet>
    </v-col>
    </div>
</template>
<script>
import { format } from "date-fns";
import axios from "../config";
// import { format, isValid } from "date-fns"; // make sure isValid is imported
import userAccountService from "../service/UserAccountService.js";
import languageService from "../service/LanguageService.js";
import coursesService from "../service/CoursesService.js";
export default {
  data: () => ({
    selectedOne: {},
    saveOrupdate: "SAVE",
    studentList: [],
    courses: {
      amount: 0,
    },
    receivedPicker: new Date(),
    receivedMenu: false,
    userType: "STUDENT",
    languageList: [],
    courseList: ["ALL","COURSES", "EXAM"],
    coursesList: [],
    dialogDelete: false,
    showForm:false,
    coursePhotoDialog: false,
    courseFileDialog : false,
    showTeacher: false,
    userData : {},
    type: "ALL",
    showdemand : true,
  }),
  props: {},
  mounted: function () {
       this.userData = JSON.parse(localStorage.getItem("user"));
    if(this.userData.role=="TEACHER"){
      this.showTeacher = false;
    }else{
      this.showTeacher = true;
    }
    this.courses.receivedDate = format(this.receivedPicker, "dd-MM-yyyy");
    // this.courses.receivedDate = format(this.receivedPicker, "yyyy-MM-dd");

    this.studentListMethod();
    this.languageListMethod();



    this.coursesListMethod();
    this.courses.type = this.courseList[0];
    this.showForm = false;
    this.courseListMethodByType();

  },
  methods: {
    demand(){
      this.showdemand = false;
    },
    details(){
      this.showdemand = true;
    },
    getCoursePhotoUrl(cphoto) {
  if (!cphoto) return "path/to/default-image.png"; // fallback image path
  return `${axios.defaults.baseURL}/coursephoto/${cphoto}.png`;
},
    courseListMethodByType() {
  coursesService.getCourseList()
    .then((response) => {
      if (this.type === 'ALL') {
        this.coursesList = response;
      } else {
        this.coursesList = response.filter(item => item.type === this.type);
      }
    })
    .catch((err) => console.error("Fetch error:", err));
},


       loadUserList:function(){
      this.coursePhotoDialog = false;
      this.coursesListMethod();
      this.courseFileDialog = false;
      this.showForm = false;

    },  

     FileMethod:function(item){
        this.selectedOne = item;
        this.courseFileDialog = true;
    },
    photoMethod:function(item){
        this.coursePhotoDialog = true;
    },
    changeType(){
      if(this.courses.type=="COURSES"){
        this.courses.amount = this.courses.languagesDto.amount;
      }else{
          this.courses.amount = this.courses.languagesDto.examFee;
      }
    },
    studentListMethod() {
      userAccountService
        .getUserList(this.userType)
        .then((response) => {
          this.studentList.splice(0);
          this.studentList.push(...response);
          this.courses.studentDto = this.studentList[0];
        })
        .catch((error) => {
          this.$swal("Fail!", error.response.data.message, "error");
        });
    },
    languageListMethod() {
      languageService
        .getLanguageList()
        .then((response) => {
          this.languageList.splice(0);
          this.languageList.push(...response);
          this.courses.languagesDto = this.languageList[0];
        })
        .catch((err) => console.error("Fetch error:", err));
    },
    coursesListMethod() {
      this.showTeacher = false;
      coursesService
        .getCourseList()
        .then((response) => {
          this.coursesList.splice(0);
          this.coursesList.push(...response);
        })
        .catch((err) => console.error("Fetch error:", err));
    },
    saveCourse: function () {
  //       this.courses.receivedDate = format(this.receivedPicker, "yyyy-MM-dd"); // short date
  // this.courses.date = format(this.courses.date, "yyyy-MM-dd HH:mm:ss"); // full datetime
  // this.courses.modifiedDate = format(this.courses.modifiedDate, "yyyy-MM-dd HH:mm:ss"); // full datetime

  const received = new Date(this.receivedPicker);
  const start = new Date(this.courses.date);
  const modified = new Date(this.courses.modifiedDate);

  // if (isValid(this.receivedPicker)) {
  //   this.courses.receivedDate = format(this.receivedPicker, "dd-MM-yyyy HH:mm:ss");
  // } else {
  //   console.error("Invalid receivedPicker:", this.receivedPicker);
  //   return;
  // }
  


      if (this.saveOrupdate == "SAVE") {
        coursesService
          .addCourse(this.courses)
          .then((response) => {
            console.log("this.receivedPicker", this.receivedPicker);
            this.courses = {

              // receivedDate: format(this.receivedPicker, "yyyy-MM-dd"),

              receivedDate: format(this.receivedPicker, "dd-MM-yyyy"),
              studentDto: this.studentList[0],
              languagesDto: this.languageList[0],
              type: this.courseList[0],
              amount: 0,
            };
            this.showForm =false;
             this.courseListMethodByType();
          this.$swal({
          icon: "success",
          title: "Your work saved successfully!",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          this.showForm = false;
        });
            this.coursesListMethod();
          })
        
      } else {
        coursesService
          .updateCourse(this.courses)
          
          .then((response) => {
            this.saveOrupdate = "SAVE";
            this.courses = {
              // receivedDate: format(this.receivedPicker, "yyyy-MM-dd"),

              receivedDate: format(this.receivedPicker, "dd-MM-yyyy"),
              studentDto: this.studentList[0],
              languagesDto: this.languageList[0],
              type: this.courseList[0],
              amount: 0,
            };
            this.coursesListMethod();
            this.showForm =false;
             this.courseListMethodByType();
            this.$swal({
          icon: "success",
          title: "Your work updated successfully!",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          this.showForm = false;
        });

          })
         
      }
    },
    clickEdit(item) {
       this.showForm = true;
      this.courses = {
        ...item,
      };
      this.courses.studentDto.userName = item.studentDto.userName;
      this.saveOrupdate = "UPDATE";
    },
    clickDelete(item) {
      this.selectedOne = { ...item };
      this.dialogDelete = true;
    },
    clickDeleteDialog() {
      coursesService
        .deleteCourse(this.selectedOne)
        .then((response) => {

          this.dialogDelete = false;
          this.courseListMethodByType();
          this.$swal({
            icon: "success",
            title: "Your work has been deleted",
            showConfirmButton: false,
            timer: 1000,
          });
          this.coursesListMethod();
        })
        .catch((error) => {
          this.$swal("Fail!", error.response.data.message, "error");
        });
    },
    resetForm() {
  this.courses = {
    receivedDate: format(new Date(), "dd-MM-yyyy"),
    studentDto: this.studentList[0],
    languagesDto: this.languageList[0],
    type: this.courseList[0],
    amount: 0,
  };
  this.showForm = false;
  this.saveOrupdate = "SAVE";
}
  },
  watch: {
    receivedPicker() {
      this.receivedMenu = false;
      // this.courses.receivedDate = format(this.receivedPicker, "yyyy-MM-dd");

      this.courses.receivedDate = format(this.receivedPicker, "dd-MM-yyyy");
    },
        showForm(newVal) {
    if (!newVal) {
      // Dialog closed → reset the form
      this.courses = {};
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
  border: 1px solid #b3e5fc;
  border-collapse: collapse;
  padding: 0 1px !important;
}
tbody{
  background-color: #b3e5fc;
}
tr:hover {
  background-color: #e1f5fe !important;
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
.v-data-table {
  table-layout: fixed;
  width: 100%;
}

.v-data-table th,
.v-data-table td {
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
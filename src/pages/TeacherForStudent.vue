<template>
  <div>
      <!-- Table Section -->
    <v-row class="title">
      <v-col cols="12" >
        <h2 style="background-color:rgb(136, 210, 230);text-align: center;">My Students</h2>
  <v-tooltip location="top">
  <!-- <template v-slot:activator="{ props }">
    <v-btn
      v-bind="props"
      icon
      color="blue"
      class="fab-button"
      @click="showForm = true"
    >
      <v-icon size="36" color="white">mdi-plus</v-icon>
    </v-btn>
  </template> -->
  <span>Add Student</span>
</v-tooltip>


      <v-table fixed-header height="92vh">
          <thead>
            <tr>
              <th class="text-center white--text bg-primary">No.</th>
              <th class="text-center white--text bg-primary">Language Name</th>
              <th class="text-center white--text bg-primary">Student Name</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in studentList"
              :key="index"
              @click="selectedOne = item"
              :style="{
                backgroundColor:
                  item.lessonsId == selectedOne.lessonsId
                    ? '#def3ff'
                    : 'transparent',
              }"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ item.languagesDto?.name }}</td>

              <td class="text-start">{{ item.studentDto?.name }}</td>

              

            </tr>
            <v-divider />
          </tbody>
      </v-table>
    </v-col>
    </v-row>  




   
  </div>
</template>

<script>
import { format } from "date-fns";
import userService from "../service/UserAccountService.js";
import languageService from "../service/LanguageService.js";
export default {
  data: () => ({
    selectedOne: {},
    student: {
    },
    userData: {},
    saveOrupdate: "SAVE",
    studentList: [],
    dialogDelete: false,
    showForm: false,
    showTeacher : false,

    languageList: [],
  }),
  props: {},
  mounted: function () {
    
    this.userData = JSON.parse(localStorage.getItem("user"));
    if(this.userData.role=="TEACHER"){
      this.showTeacher = false;
    }else{
      this.showTeacher = true;
    }
 if (this.userData.role === "TEACHER") {
    this.showTeacher = false;
    this.studentListMethod(); // only call this for teacher
  } else {
    this.showTeacher = true;
    this.loadStudents(); // only call this for admin or others
  }

    this.showForm = false;
    this.loadLanguages();
  },
  methods: {
studentListMethod() {
  userService
    .getStudentsForTeacher()
    .then((response) => {
      console.log("Raw teacher-student list:", response);

      // Filter only entries that contain valid nested DTOs
      const filtered = response.filter(
        (item) => item.studentDto && item.languagesDto
      );

      this.studentList.splice(0);
      this.studentList.push(...filtered);
    })
    .catch((error) => {
      this.$swal("Fail!", error.response?.data?.message || "Fetch error", "error");
    });
},


    loadLanguages() {
      languageService
        .getLanguageList()
        .then((response) => {
          this.languageList.splice(0);
          this.languageList.push(...response);
          this.student.languagesDto = this.languageList[0];
        })
        .catch((err) => console.error("Fetch error:", err));
    },
    loadStudents() {
      userService
        .getUserList()
        .then((response) => {
          this.studentList.splice(0);
          this.studentList.push(...response);
        })
        .catch((err) => console.error("Fetch error:", err));
    },
    
  },
  watch: {
    receivedPicker() {
      this.receivedMenu = false;
      this.student.receivedDate = format(this.receivedPicker, "dd-MM-yyyy");
    },
        showForm(newVal) {
    if (!newVal) {
      // Dialog closed → reset the form
      this.student = {};
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
</style>
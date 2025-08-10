<template>
  <div>
    <v-row class="title">
      <v-col cols="12">
        <h1 style="background-color: #b3e5fc; text-align: center" class="mt-1 mb-1">
          User Informations
        </h1>
      
          <v-btn color="green" class="ml-2" @click="exportToWord">
            <v-icon left>mdi-microsoft-word</v-icon>
            Export to Word
          </v-btn> 
          <v-btn color="orange" class="ml-2" @click="exportToExcel">
           <v-icon left>mdi-microsoft-excel</v-icon>
               Export to Excel
          </v-btn>
        </v-col>
        
        <v-table fixed-header height="92vh">
          <thead>
            <tr>
              <th class="text-center white--text bg-primary">No.</th>
              <th class="text-center white--text bg-primary">StartDate</th>
              <th class="text-center white--text bg-primary">Full Name</th>
              <th v-if="isStudent" class="text-center white--text bg-primary">Language Name</th>
              <th class="text-center white--text bg-primary">Gender</th>
              <th class="text-center white--text bg-primary">NRC</th>
              <th class="text-center white--text bg-primary">Email</th>
              <th class="text-center white--text bg-primary">Phone</th>
              <th class="text-center white--text bg-primary">Address</th>
              <th class="text-center white--text bg-primary">Photo</th>
              <!-- <th v-if="!isStudent" class="text-center white--text bg-primary">Degree</th> -->
              <!-- <th v-if="!isStudent" class="text-center white--text bg-primary">File</th> -->
              <th v-if="isStudent"  class="text-center white--text bg-primary">Exam Mark</th>
              <th v-if="isStudent" class="text-center white--text bg-primary">Generate Certificate</th>
              <!-- <th class="text-center white--text bg-primary">Action</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in userList" :key="index" @click="selectedOne = item" :style="{
                backgroundColor:
                  item.userAccountId == selectedOne.userAccountId
                    ? '#def3ff'
                    : 'transparent',
              }">
  <td class="text-center">{{ index + 1 }}</td>
  <td class="text-center">{{ item.startDate }}</td>
  <td class="text-center">{{ item.name || item.studentDto?.name }}</td>
  <td v-if="isStudent" class="text-center">{{ item.languagesDto?.name || '-' }}</td>
  <td class="text-center">{{ item.gender || item.studentDto?.gender }}</td>
  <td class="text-center">{{ item.nrc || item.studentDto?.nrc }}</td>
  <td class="text-center">{{ item.email || item.studentDto?.email }}</td>
  <td class="text-start">{{ item.phonenum || item.studentDto?.phonenum }}</td>
  <td class="text-start">{{ item.address || item.studentDto?.address }}</td>
  <td class="text-center">
    <v-img :src="getUserPhotoUrl(item.photo)" 
    alt="People Photo"
                  max-width="80"
                  max-height="80"
                  contain
                  loading="lazy" />
  </td>
  <!-- <td v-if="!isStudent" class="text-center">{{ item.degree || item.studentDto?.degree}}</td> -->
  <!-- <td v-if="!isStudent" class="text-center">{{ item.file || item.studentDto?.file}}</td> -->
  <td v-if="isStudent" class="text-center">{{ item.examDto?.examMark ?? '-' }}</td> 
 <td v-if="isStudent" class="text-center">
  <v-icon v-if="item.examDto?.examMark > 50" color="green" title="Pass">mdi-check-circle</v-icon>
  <v-icon v-else color="red" title="Fail">mdi-close-circle</v-icon>
</td>
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
import axios from "../config";
import userService from "../service/UserAccountService.js";
import * as XLSX from "xlsx";
export default {
  data: () => ({
    selectedOne: {},
    user: {},
    userList: [],
    userTypeListSearch: ["ALL", "STUDENT", "TEACHER", "ADMIN"],
    userTypeList: ["STUDENT", "TEACHER", "ADMIN"],
    saveOrupdate: "SAVE",
    startPicker: new Date(),
    startMenu: false,
    birthPicker: new Date(),
    dateBirth: false,
    dialogDelete: false,
    userPhotoDialog: false,
    showForm: false,
    loggedInUser: null,
    UserFileDialog: false,
    userType: "ALL",
    valid: false,
    email: "",
    phone: "",
    nrc: "",
    name: "",
    genderList: ["Male", "Female"],
    rules: {
      required: (v) => !!v || "This field is required",
      email: (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Invalid email format",
      phone: (v) =>
        /^(?:0|\+95)9[24679]\d{7,9}$/.test(v) || "Invalid Myanmar phone number",
      nrc: (v) =>
        /^\d{1,2}\/[A-Z]{3}\([NPE]\)\d{6}$/.test(v) || "Invalid NRC format",
      name: (v) =>
        /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(v) || "Invalid name format",
    },
    showPassword: false,
  }),
  props: { hideToolbar: Function },
  mounted: function () {
    this.loggedInUser = JSON.parse(localStorage.getItem("user"));
    this.user.startDate = format(this.startPicker, "dd-MM-yyyy");
    this.user.age = format(this.birthPicker, "dd-MM-yyyy");
    this.user.userType = this.userTypeListSearch[0];
    this.showForm = false;
    // Updated to use a single, more robust fetch method
    this.fetchUserList();
  },
  methods: {

    // Renamed for clarity and to be consistent with the logic
fetchUserList() {
  userService.getUserList(this.userType)
    .then((data) => {   // rename param to data to avoid confusion
      console.log("Received user list data:", data);
      this.userList.splice(0);
      if (Array.isArray(data)) {
        this.userList.push(...data);
      }
    })
    .catch((error) => {
      console.error(error);
      this.$swal("Fail!", error.response?.data?.message || "Failed to load user list.", "error");
    });
},


    // exportToWord() {
    //   const tableHTML = document.querySelector("table").outerHTML;
    //   const wordHTML = `
    //     <html xmlns:o='urn:schemas-microsoft-com:office:office' 
    //           xmlns:w='urn:schemas-microsoft-com:office:word' 
    //           xmlns='http://www.w3.org/TR/REC-html40'>
    //     <head><meta charset="utf-8"><title>User Informations</title></head>
    //     <body>
    //       <h2 style="text-align:center;">User Informations</h2>
    //       ${tableHTML}
    //     </body>
    //     </html>
    //   `;
    //   const blob = new Blob(['\ufeff', wordHTML], { type: 'application/msword' });
    //   const url = URL.createObjectURL(blob);
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.download = "User_Informations.doc";
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // },
    exportToExcel() {
  try {
    const data = this.userList.map((item, index) => {
      // safe handling for fields that might be absent
      const startDate = item.startDate ? new Date(item.startDate).toLocaleDateString() : "";
      const fullName = item.name || item.studentDto?.name || "";
      const languageName = item.languagesDto?.name || "-";
      const gender = item.gender || item.studentDto?.gender || "";
      const nrc = item.nrc || item.studentDto?.nrc || "";
      const email = item.email || item.studentDto?.email || "";
      const phone = item.phonenum || item.studentDto?.phonenum || "";
      const address = item.address || item.studentDto?.address || "";
      const photoUrl = this.getUserPhotoUrl(item.photo) || "";
      const degree = item.degree || item.studentDto?.degree || "";
      const file = item.file || item.studentDto?.file || "";
      const examMark = item.examDto?.examMark ?? "";

      // Build row object; include columns conditionally to match UI
      const row = {
        "No.": index + 1,
        "Start Date": startDate,
        "Full Name": fullName,
        "Gender": gender,
        "NRC": nrc,
        "Email": email,
        "Phone": phone,
        "Address": address,
        "Photo URL": photoUrl
      };

      if (this.isStudent) {
        row["Language Name"] = languageName;
        row["Exam Mark"] = examMark;
      } else {
        row["Degree"] = degree;
        row["File"] = file;
      }

      return row;
    });

    // Create worksheet & workbook and save file
    const worksheet = XLSX.utils.json_to_sheet(data);
      worksheet['!cols'] = [
      { wch: 5 },   // No.
      { wch: 12 },  // Start Date
      { wch: 20 },  // Full Name
      { wch: 10 },  // Gender
      { wch: 20 },  // NRC
      { wch: 20 },  // Email
      { wch: 13 },  // Phone
      { wch: 20 },  // Address 
      { wch: 50 },  // Photo URL 
    ];
    if (this.isStudent) {
      worksheet['!cols'].push(
        { wch: 15 }, // Language Name
        { wch: 10 }  // Exam Mark
      );
    } else {
      worksheet['!cols'].push(
        { wch: 20 }, // Degree
        { wch: 30 }  // File
      );
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Informations");
    XLSX.writeFile(workbook, "User_Informations.xlsx");
  } catch (error) {
    console.error("Export to Excel failed", error);
    this.$swal("Error", "Failed to export to Excel", "error");
  }
},
    getUserPhotoUrl(photo) {
      if (!photo) return "path/to/default-image.png";
      return `${axios.defaults.baseURL}/userphoto/${photo}.png`;
    },
    FileMethod: function (item) {
      this.selectedOne = item;
      this.showForm = false;
      this.UserFileDialog = true;
    },
    loadUserList: function () {
      this.userPhotoDialog = false;
      this.fetchUserList();
      this.userFileDialog = false;
      this.showForm = false;
    },
    photoMethod: function (item) {
      this.userPhotoDialog = true;
    },
    clickDeleteDialog: function () {
      this.dialogDelete = false;
      userService
        .deleteUser(this.selectedOne?.userAccountId)
        .then(() => {
          this.saveOrupdate = "SAVE";
          this.user = {};
          this.fetchUserList();
          this.$swal({
            icon: "success",
            title: "Your work has been deleted",
            showConfirmButton: false,
            timer: 1000,
          });
        })
        .catch((error) => {
          this.$swal("Fail!", error.response?.data?.message || "Failed to delete user.", "error");
        });
    },
    deleteUserMethod: function (item) {
      this.selectedOne = item;
      this.dialogDelete = true;
    },
    editUser: function (item) {
      this.showForm = true;
      this.saveOrupdate = "UPDATE";
      this.user = Object.assign({}, item);
    },
    formatDate(datePicker) {
      const [year, month, day] = datePicker.split("-");
      return `${day}-${month}-${year}`;
    },
    async saveUser() {
      try {
        let userType = this.user.userType;
        if (typeof userType === "object") {
          userType = userType.userType || userType.value || "";
        }
        this.user.userType = userType;
        if (this.loggedInUser?.role === "TEACHER" && userType === "STUDENT") {
          this.user.teacherId = this.loggedInUser.userId;
        } else {
          this.user.teacherId = 0;
        }
        if (this.saveOrupdate === "SAVE") {
          await userService.addUser(this.user);
          this.$swal({
            icon: "success",
            title: "User saved successfully!",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          await userService.updateUser(this.user);
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
        this.fetchUserList();
      } catch (error) {
        //console.error("User save failed", error);
        this.$swal("Error", error.response?.data?.message || "Failed to save user", "error");
      }
    },
    calculateAge(dob) {
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
  },
   computed: {
    isStudent() {
      return this.userType === "STUDENT";
    },
    isAdminOrTeacherOrAll() {
      return ["ADMIN", "ALL", "TEACHER"].includes(this.userType);
    },
  },
  // ... rest of your code

  watch: {
    startPicker(newDate) {
      this.startMenu = false;
      this.user.startDate = format(newDate, "dd-MM-yyyy");
    },
    birthPicker(newDate) {
      this.dateBirth = false;
      this.user.age = format(newDate, "dd-MM-yyyy");
    },
    showForm(newVal) {
      if (!newVal) {
        this.user = {};
        this.saveOrupdate = "SAVE";
      }
    },
    userType() {
        this.fetchUserList();
    }
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
tbody {
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
.form {
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
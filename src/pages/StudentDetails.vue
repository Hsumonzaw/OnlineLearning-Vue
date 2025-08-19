<template>
  <div>
    <v-row class="title">
      <v-col cols="12">
        <h1 style="background-color: #b3e5fc; text-align: center" class="mt-1 mb-1">
          Student Records
        </h1>
        <v-row>
          <!-- Language filter -->
          <v-col cols="2" class="pl-1 pt-5">
          <v-autocomplete
            v-model="selectedLanguage"
            :items="languages"
            item-text="name"
            item-title="name"
            item-value="languagesId"
            label="Select Language"
            clearable
            dense
            outlined
            return-object
          />
        </v-col>
       
          <v-col cols="2" class="pl-1 pt-5">
          <v-btn color="orange" class="ml-2" @click="exportToExcel">
            <v-icon left>mdi-microsoft-excel</v-icon>
            Export to Excel
          </v-btn>
        </v-col>
        </v-row>

        <v-table fixed-header height="92vh">
          <thead>
            <tr>
              <th class="text-center white--text bg-primary">No.</th>
              <th class="text-center white--text bg-primary">StartDate</th>
              <th class="text-center white--text bg-primary">Full Name</th>
              <th v-if="isStudent" class="text-center white--text bg-primary">Language Name</th>
              <!-- <th class="text-center white--text bg-primary">Type</th> -->

              <th class="text-center white--text bg-primary">Gender</th>
              <th class="text-center white--text bg-primary">NRC</th>
              <th class="text-center white--text bg-primary">Email</th>
              <th class="text-center white--text bg-primary">Phone</th>
              <th class="text-center white--text bg-primary">Address</th>
              <!-- <th class="text-center white--text bg-primary">Photo</th> -->
              <th v-if="isStudent" class="text-center white--text bg-primary">Exam Mark</th>
              <th v-if="isStudent" class="text-center white--text bg-primary">Generate Certificate</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in filteredUserList"
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
              <td class="text-center">{{ item.name || item.studentDto?.name }}</td>
              <td v-if="isStudent" class="text-center">{{ item.languagesDto?.name || '-' }}</td>
              <!-- <td class="text-center">{{ item.type || item.coursesDto?.type }}</td> -->

              <td class="text-center">{{ item.gender || item.studentDto?.gender }}</td>
              <td class="text-center">{{ item.nrc || item.studentDto?.nrc }}</td>
              <td class="text-center">{{ item.email || item.studentDto?.email }}</td>
              <td class="text-start">{{ item.phonenum || item.studentDto?.phonenum }}</td>
              <td class="text-start">{{ item.address || item.studentDto?.address }}</td>
              <!-- <td class="text-center">
                <v-img
                  :src="getUserPhotoUrl(item.photo)"
                  alt="People Photo"
                  max-width="80"
                  max-height="80"
                  contain
                  loading="lazy"
                />
              </td> -->
              <td v-if="isStudent" class="text-center">{{ item.examDto?.examMark ?? '-' }}</td>
              <td v-if="isStudent" class="text-center">
                <v-icon v-if="item.examDto?.examMark >= 50" color="green" title="Pass"
                  >mdi-check-circle</v-icon
                >
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
import * as XLSX from "xlsx";
import axios from "axios";
import userService from "../service/UserAccountService.js";
import languageService from "../service/LanguageService.js";


export default {
  data() {
    return {
      languages: [],
      userList: [],
      selectedLanguage: null,
      userType: "STUDENT",
      selectedOne: {},
    };
  },
  mounted() {
    this.loadStudents();
    this.fetchLanguages();
  },
  methods: {
   async fetchLanguages() {
  try {
    const allLanguages = await languageService.getLanguageList();
    this.languages = allLanguages;
    // Remove this to start with no selection
    // if (!this.selectedLanguage && this.languages.length > 0) {
    //   this.selectedLanguage = this.languages[0];
    // }
    this.selectedLanguage = null;  // start with no selection so all users show
  } catch (error) {
    this.$swal("Fail!", error.message || "Failed to load languages", "error");
  }
},



    loadStudents() {
      userService
        .getUserListFree("STU")
        .then((response) => {
          // If your response data is inside response.data, use that
          this.userList = response.data || response;
        })
        .catch(() => {
          this.$swal("Error", "Failed to load student list", "error");
        });
    },


    exportToExcel() {
      try {
        let title = "";
        if (this.userType === "ADMIN") title = "Admin List";
        else if (this.userType === "STUDENT") title = "Student List";
        else if (this.userType === "TEACHER") title = "Teacher List";
        else title = "User List";

        const data = this.userList.map((item, index) => {
          const startDate = item.startDate
            ? new Date(item.startDate).toLocaleDateString()
            : "";
          const fullName = item.name || item.studentDto?.name || "";
          const languageName = item.languagesDto?.name || "-";
          const gender = item.gender || item.studentDto?.gender || "";
          const nrc = item.nrc || item.studentDto?.nrc || "";
          const email = item.email || item.studentDto?.email || "";
          const phone = item.phonenum || item.studentDto?.phonenum || "";
          const address = item.address || item.studentDto?.address || "";
          const degree = item.degree || item.studentDto?.degree || "";
          const file = item.file || item.studentDto?.file || "";
          const examMark = item.examDto?.examMark ?? "";

          const row = {
            "No.": index + 1,
            "Start Date": startDate,
            "Full Name": fullName,
            Gender: gender,
            NRC: nrc,
            Email: email,
            Phone: phone,
            Address: address,
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

        const sampleRow = data[0] || {
          "No.": "",
          "Start Date": "",
          "Full Name": "",
          Gender: "",
          NRC: "",
          Email: "",
          Phone: "",
          Address: "",
          ...(this.isStudent
            ? { "Language Name": "", "Exam Mark": "" }
            : { Degree: "", File: "" }),
        };
        const headers = Object.keys(sampleRow);
        const colCount = headers.length;

        const worksheet = XLSX.utils.json_to_sheet(data, { origin: "A3" });

        worksheet["A1"] = { t: "s", v: title };
        worksheet["!merges"] = worksheet["!merges"] || [];
        worksheet["!merges"].push({
          s: { r: 0, c: 0 },
          e: { r: 0, c: colCount - 1 },
        });

        worksheet["A1"].s = {
          font: { name: "Arial", sz: 16, bold: true, color: { rgb: "FFFFFFFF" } },
          fill: { fgColor: { rgb: "4F81BD" } },
          alignment: { horizontal: "center", vertical: "center" },
        };

        for (let c = 0; c < colCount; c++) {
          const cellAddress = XLSX.utils.encode_cell({ c: c, r: 2 });
          const cell = worksheet[cellAddress];
          if (cell) {
            cell.s = {
              font: { bold: true },
              alignment: { horizontal: "center", vertical: "center" },
              fill: { fgColor: { rgb: "B3E5FC" } },
            };
          }
        }

        worksheet["!cols"] = [
          { wch: 5 },
          { wch: 12 },
          { wch: 20 },
          { wch: 10 },
          { wch: 20 },
          { wch: 20 },
          { wch: 13 },
          { wch: 20 },
        ];
        if (this.isStudent) {
          worksheet["!cols"].push({ wch: 15 }, { wch: 10 });
        } else {
          worksheet["!cols"].push({ wch: 20 }, { wch: 30 });
        }

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "User Informations");
        XLSX.writeFile(workbook, "User_Informations.xlsx");
      } catch (error) {
        console.error("Export to Excel failed", error);
        this.$swal("Error", "Failed to export to Excel", "error");
      }
    },
    // getUserPhotoUrl(photo) {
    //   if (!photo) return "path/to/default-image.png";
    //   return `${axios.defaults.baseURL}/userphoto/${photo}.png`;
    // },
  },
  computed: {
    isStudent() {
      return this.userType === "STUDENT";
    },
   filteredUserList() {
  if (!this.selectedLanguage) return this.userList;

  const selectedId = String(this.selectedLanguage.languagesId);
  return this.userList.filter(user => 
    String(user.languagesDto?.languagesId) === selectedId
  );
},

  },
  watch: {
    userType() {
      this.loadStudents();
    },
    // selectedLanguage() {
    //   this.fetchLanguages();
    // },
  },
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

<template>
  <div>
    <v-row class="title">
      <v-col cols="12">
        <h1 style="background-color: #b3e5fc; text-align: center" class="mt-1 mb-1">
          Teacher-Courses OverView
        </h1>

<v-col cols="2" class="pl-1 pt-5">
<v-btn color="blue" @click="clickRouter('/useraccount')">
            Back (User Account)
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
              <th v-if="isStudent" class="text-center white--text bg-primary">Degree</th>
              <th v-if="isStudent" class="text-center white--text bg-primary">File</th>
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

              <td class="text-center">{{ item.gender || item.studentDto?.gender }}</td>
              <td class="text-center">{{ item.nrc || item.studentDto?.nrc }}</td>
              <td class="text-center">{{ item.email || item.studentDto?.email }}</td>
              <td class="text-start">{{ item.phonenum || item.studentDto?.phonenum }}</td>
              <td class="text-start">{{ item.address || item.studentDto?.address }}</td>
              <td class="text-center">
                <v-img
                  :src="getUserPhotoUrl(item.photo)"
                  alt="People Photo"
                  max-width="80"
                  max-height="80"
                  contain
                  loading="lazy"
                />
              </td>
              <td v-if="isStudent" class="text-center">{{ item.degree }}</td>
              <td v-if="isStudent" class="text-center">{{ item.file }}</td>

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
      userType: "TEACHER",
      selectedOne: {},
    };
  },
  mounted() {
    this.loadStudents();
    this.fetchLanguages();
  },
  methods: {
    clickRouter(path) {
      this.$router.push(path);
    },
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
        .getUserListFree("TEACHAL")
        .then((response) => {
          // If your response data is inside response.data, use that
          this.userList = response.data || response;
        })
        .catch(() => {
          this.$swal("Error", "Failed to load student list", "error");
        });
    },


    
    getUserPhotoUrl(photo) {
      if (!photo) return "path/to/default-image.png";
      return `/userphoto/${photo}.png`; // adjust to your backend baseURL
    },
  },
  computed: {
    isStudent() {
      return this.userType === "TEACHER";
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

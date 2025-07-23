<template>
  <div>
    <!-- Table Section -->
   <v-row class="title">
      <v-col cols="12">
        <h2 style="background-color:rgb(136, 210, 230); text-align: center;" >Student Answers</h2>
        <v-col cols="2" class="pl-1 pt-2">
 <!-- <v-autocomplete
  v-model="selectedUserId"
  :items="userList"
  item-title="name"
  item-value="userAccountId"
  label="Please Select The User Name"
  density="compact"
  variant="outlined"
  required
  @update:modelValue="NameListMethodByType"
/> -->


    </v-col>
       

        <!-- Table Full Width -->
        <v-table fixed-header height="92vh" >
          <thead>
<tr>
              <th class="text-center white--text bg-primary">No.</th>
              <th class="text-center white--text bg-primary">Language Name</th>
              <th class="text-center white--text bg-primary">User Name</th>
              <th class="text-center white--text bg-primary">Exam Mark</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in ansList"
              :key="index"
              @click="selectedOne = item"
              :style="{
                backgroundColor:
                  item.ansId == selectedOne.ansId
                    ? '#def3ff'
                    : 'transparent',
              }"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ item.languageName }}</td>
              <td class="text-center">{{ item.userName }}</td>
              <td class="text-center" >{{item.totalAns }}</td>

              
             
            </tr>
            <v-divider />
          </tbody>
        </v-table>
      </v-col>
    </v-row>

    <!-- Form Section (centered) -->


      
    </div>
</template>
<script>
import { format } from "date-fns";
import axios from "../config";
// import { format, isValid } from "date-fns"; // make sure isValid is imported
import userAccountService from "../service/UserAccountService.js";
import languageService from "../service/LanguageService.js";
import quizService from "../service/QuizService.js";
import ansService from "../service/AnsService.js";
export default {
  data: () => ({
    selectedOne: {},
    userList: [],
    userType: [],
    languageList: [],
    ansList : [],
    nameList:[],
    quizList : [],
    ans: {},
    selectedUserId : null,
    userData : {},
    examId :0,
    
  }),
  props: {},
 mounted() {
  this.userListMethod();
  this.languageListMethod();
},

methods: {
  languageListMethod() {
    languageService
      .getLanguageList()
      .then((response) => {
        this.languageList.splice(0);
        this.languageList.push(...response);
        this.ans.languages = this.languageList[0];
        // Now call ansListMethod with the first languageId
        if (this.languageList.length > 0) {
          this.ansListMethod(this.languageList[0].languagesId);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  },

 ansListMethod() {
  ansService
    .getExamMark()
    .then((response) => {
      this.ansList = response.map(item => ({
        languageName: item.coursesDto.name,   // from backend DTO
        userName: item.userAccountDto.name,
        totalAns: item.examMark               // exam mark
      }));
    })
    .catch((err) => console.error("Fetch error:", err));
},

   userListMethod() {
  userAccountService
    .getUserList()
    .then((response) => {
      this.userList = response.filter(user => user.userType === 'STUDENT');
    })
    .catch((error) => {
      this.$swal("Fail!", error.response.data.message, "error");
    });
},
},

  

  watch: {
    // receivedPicker() {
    //   this.receivedMenu = false;
    //   // this.courses.receivedDate = format(this.receivedPicker, "yyyy-MM-dd");

    //   this.quiz.date = format(this.receivedPicker, "yyyy-MM-dd HH:mm:ss");
    // },
        showForm(newVal) {
    if (!newVal) {
      // Dialog closed → reset the form
      this.quiz = {};
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
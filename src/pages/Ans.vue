<template>
  <div>
    <!-- Table Section -->
   <v-row class="title">
      <v-col cols="12">
        <h2 style="background-color:rgb(136, 210, 230); text-align: center;" >Student Answers</h2>
        <v-col cols="2" class="pl-1 pt-2">
 <v-autocomplete
  v-model="selectedUserId"
  :items="userList"
  item-title="name"
  item-value="userAccountId"
  label="Please Select The User Name"
  density="compact"
  variant="outlined"
  required
  @update:modelValue="NameListMethodByType"
/>


    </v-col>
       

        <!-- Table Full Width -->
        <v-table fixed-header height="92vh" >
          <thead>
<tr>
              <th class="text-center white--text bg-primary">No.</th>
              <th class="text-center white--text bg-primary">Language Name</th>
              <th class="text-center white--text bg-primary">User Name</th>
              <th class="text-center white--text bg-primary">Quiz Id</th>
              <th class="text-center white--text bg-primary">Questions</th>
              <th class="text-center white--text bg-primary">Option One</th>
              <th class="text-center white--text bg-primary">Option Two</th>
              <th class="text-center white--text bg-primary">Option Three</th>
              <th class="text-center white--text bg-primary">Correct Answer</th>
              <th class="text-center white--text bg-primary">Answer</th>
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
              <td class="text-center">{{ item.quiz.quizId}}</td>
              <td class="text-center">{{ item.quiz.name }}</td>
              <td class="text-center">{{ item.quiz.ansone }}</td>
              <td class="text-center" >{{ item.quiz.anstwo }}</td>
              <td class="text-center" >{{ item.quiz.ansthree }}</td>
              <td class="text-center" >{{ item.quiz.correct }}</td>
              <td class="text-center" >{{ item?.ans }}</td>

              
             
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
  }),
  props: {},
  mounted: function () {
        // this.userData = JSON.parse(localStorage.getItem("user"));
    // if(this.userData.role=="TEACHER"){
    //   this.showTeacher = false;
    // }else{
    //   this.showTeacher = true;
    // }
    // this.courses.receivedDate = format(this.receivedPicker, "dd-MM-yyyy");
    // this.courses.receivedDate = format(this.receivedPicker, "yyyy-MM-dd");

     this.userListMethod();
     this.languageListMethod();
     this.ansListMethod();
     this.quizListMethod();
     this.NameListMethodByType();

  },
  methods: {
   
    NameListMethodByType() {
  ansService.getAnsList()
    .then((response) => {
      if (!this.selectedUserId) {
        this.ansList = response; 

      } else {
        this.ansList = response.filter(item => 
            item.exam?.userAccountId == this.selectedUserId

        );
      }
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


    languageListMethod() {
      languageService
        .getLanguageList()
        .then((response) => {
          this.languageList.splice(0);
          this.languageList.push(...response);
          this.ans.languages = this.languageList[0];
        })
        .catch((err) => console.error("Fetch error:", err));
    },
    ansListMethod() {
      ansService
        .getAnsList()
        .then((response) => {
          this.ansList.splice(0);
          this.ansList.push(...response);
        })
        .catch((err) => console.error("Fetch error:", err));
    },
    quizListMethod() {
      quizService
        .getQuizList()
        .then((response) => {
          this.quizList.splice(0);
          this.quizList.push(...response);
          this.ans.quiz = this.quizList[0];
        })
        .catch((err) => console.error("Fetch error:", err));
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
<template>
  <div>
    <!-- Table Section -->
   <v-row class="title">
      <v-col cols="12">
        <h1 style="background-color:#b3e5fc; text-align: center;" >Quiz</h1>
        <v-col cols="2" class="pl-1 pt-2">
      <v-autocomplete
  v-model="type"
  :items="languageList"
  item-title="displayName"
  item-value="languagesId"
  label="Please Select The Languages"
  return-object
  density="compact"
  variant="outlined"
  required
  small
  filled
  @update:modelValue="languageListMethodByType"
/>



    </v-col>
        <v-tooltip location="top" v-if="showTeacher">
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
  <span>Add Quiz</span>
</v-tooltip>

        <!-- Table Full Width -->
        <v-table fixed-header height="92vh" >
          <thead>
<tr>
              <th class="text-center white--text bg-primary">No.</th>
              <th class="text-center white--text bg-primary">Language Name</th>
              <th class="text-center white--text bg-primary">Teacher Name</th>
              <th class="text-center white--text bg-primary">Questions</th>
              <th class="text-center white--text bg-primary">Option One</th>
              <th class="text-center white--text bg-primary">Option Two</th>
              <th class="text-center white--text bg-primary">Option Three</th>
              <th class="text-center white--text bg-primary">Correct Answer</th>
              <th class="text-center white--text bg-primary">Date</th>
              <th class="text-center white--text bg-primary">Modified Date</th>
              <th class="text-center white--text bg-primary" v-if="showTeacher">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in quizList"
              :key="index"
              @click="selectedOne = item"
              :style="{
                backgroundColor:
                  item.quizId == selectedOne.quizId
                    ? '#def3ff'
                    : 'transparent',
              }"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ item.languages?.name }}</td>

              <td class="text-center">{{ item.userAccount?.name }}</td>
              <td class="text-center">{{ item?.name}}</td>
              <td class="text-center">{{ item?.ansone }}</td>
              <td class="text-center" >{{ item?.anstwo }}</td>
              <td class="text-center" >{{ item?.ansthree }}</td>
              <td class="text-center" >{{ item?.correct }}</td>
              <td class="text-center" >{{ item?.date }}</td>
              <td class="text-center" >{{ item?.modifiedDate }}</td>

              
              <td class="text-center" v-if="showTeacher">

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
<v-dialog v-model="showForm" max-width="500" v-if="showTeacher">
        <v-card class="form pa-4" elevation="4">
          
      <v-card-title class="d-flex justify-space-between align-center">
      <span class="text-h4">Add Quiz</span>
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
                      v-model="quiz.date"
                      label="Date"
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
                  v-model="quiz.languages"
                  :items="languageList"
                  item-text="name"
                  item-title="name"
                  item-value="languagesId"
                  label="Language Name"
                  return-object
                  density="compact"
                  variant="outlined"
                  :rules="[(v) => !!v || 'Language is required']"
                />

                <v-text-field
                  label="Question"
                  v-model.number="quiz.name"
                  :rules="[(v) => !!v || 'required']"
                  density="compact"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  label="Option One"
                  v-model.number="quiz.ansone"
                  :rules="[(v) => !!v || 'required']"
                  density="compact"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  label="Option Two"
                  v-model.number="quiz.anstwo"
                  :rules="[(v) => !!v || 'required']"
                  density="compact"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  label="Option Three"
                  v-model.number="quiz.ansthree"
                  :rules="[(v) => !!v || 'required']"
                  density="compact"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  label="Correct Answer"
                  v-model.number="quiz.correct"
                  :rules="[(v) => !!v || 'required']"
                  density="compact"
                  variant="outlined"
                ></v-text-field>

            </v-card-text>
               <v-card-actions class="justify-end pr-5">  
                <v-btn  class="text-black"
                style="background-color: #2196f3;" 
                 @click="saveQuiz()">{{
                  saveOrupdate
                }}</v-btn>
                <v-btn  class="text-black"
                style="background-color: red;" 
                  @click="showForm = false">
                  CANCEL
              </v-btn>
              </v-card-actions>

            
        
        </v-card>
</v-dialog>
    <!-- Delete Dialog -->
    <v-dialog v-model="dialogDelete" width="500">
      <v-card>
        <v-card-title class="text-h5 white--text bg-red">Delete</v-card-title>
        <v-card-text class="text-h6">
          Are you sure to delete {{ selectedOne.languages?.name }}'s quiz?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="black" text @click="dialogDelete = false">CANCEL</v-btn>
          <v-btn dark class="bg-red" text @click="clickDeleteDialog()">DELETE</v-btn>
        </v-card-actions>
      </v-card>
          
    </v-dialog>

      
    </div>
</template>
<script>
import { format } from "date-fns";
import axios from "../config";
// import { format, isValid } from "date-fns"; // make sure isValid is imported
import userAccountService from "../service/UserAccountService.js";
import languageService from "../service/LanguageService.js";
import quizService from "../service/QuizService.js";
export default {
  data: () => ({
    selectedOne: {},
    saveOrupdate: "SAVE",
    userList: [],
    quiz : {},
    receivedPicker: new Date(),
    receivedMenu: false,
    userType: [],
    languageList: [],
    quizList : [],
    
    dialogDelete: false,
    showForm:false,
    showTeacher: false,
    userData : {},
    type: "ALL",
  }),
  props: {},
  mounted: function () {
         this.userData = JSON.parse(localStorage.getItem("user")) || {};
          console.log('User data from localStorage:', this.userData);
          if (this.userData?.role === "ADMIN") {
            this.showTeacher = false;
          } else {
            this.showTeacher = true;
          }
    // if(this.userData.role=="TEACHER"){
    //   this.showTeacher = false;
    // }else{
    //   this.showTeacher = true;
    // }
    // this.courses.receivedDate = format(this.receivedPicker, "dd-MM-yyyy");
    // this.courses.receivedDate = format(this.receivedPicker, "yyyy-MM-dd");

     this.userListMethod();
     this.languageListMethod();



     this.quizListMethod();
     this.showForm = false;
     this.languageListMethodByType();

  },
  methods: {
   
  languageListMethodByType() {
  quizService
    .getQuizList()
    .then((response) => {
      // Filter out any quiz items where languages or languagesId is missing
      const filtered = response.filter(item => item.languages && item.languages.languagesId);

      if (this.type === 'ALL') {
        this.quizList = filtered;
      } else {
        this.quizList = filtered.filter(item => item.languages.languagesId === this.type.languagesId);
      }
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      this.$swal('Error', 'Failed to load quiz data from server.', 'error');
      this.quizList = []; // fallback empty list
    });
},



    
    userListMethod() {
      userAccountService
        .getUserList(this.userType)
        .then((response) => {
          this.userList.splice(0);
          this.userList.push(...response);
          this.quiz.userAccount = this.userList[0];
        })
        .catch((error) => {
          this.$swal("Fail!", error.response.data.message, "error");
        });
    },
   languageListMethod() {
  languageService
    .getLanguageList()
    .then((response) => {

      
      this.languageList = response.map(lang => ({
        ...lang,
        displayName: lang.name || lang.languageName || lang.languagesName || "Unknown"
      }));

      if (this.languageList.length > 0) {
        this.quiz.languages = this.languageList[0];
      }
    })
    .catch((err) => console.error("Fetch error:", err));
},
    quizListMethod() {
      quizService
        .getQuizList()
        .then((response) => {
          
          this.quizList.splice(0);
          this.quizList.push(...response);
        })
        .catch((err) => console.error("Fetch error:", err));
    },
    saveQuiz() {
  const payload = {
        date: format(this.receivedPicker, 'yyyy-MM-dd HH:mm:ss'),
        modifiedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        // userAccount: this.quiz.userAccount?.userAccount,
        // languages: this.quiz.languages?.languages,
        userAccount: { userAccountId: this.userData.userId },
         languages: {
        languagesId: this.quiz.languages?.languagesId || this.languageList[0]?.languagesId,
        },
        name: this.quiz.name,
        ansone: this.quiz.ansone,
        anstwo: this.quiz.anstwo,
        ansthree: this.quiz.ansthree,
        correct: this.quiz.correct,
      };

  if (this.saveOrupdate === "SAVE") {
          this.quiz.userAccountId = this.userData.userId;

    quizService
    .addQuizList(payload)
      .then(() => {
        this.$swal("Success", "Quiz saved successfully!", "success");
        this.quizListMethod();
        this.showForm = false;
      })
      .catch(err => console.error("Save error:", err.response?.data || err));
  } else {
    const payload = {
    quizId: this.quiz.quizId,
    date: format(this.receivedPicker, 'yyyy-MM-dd HH:mm:ss'),
    modifiedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    userAccount: { userAccountId: this.userData.userId },
    languages: { languagesId: this.quiz.languages?.languagesId || this.languageList[0]?.languagesId },
    name: this.quiz.name,
    ansone: this.quiz.ansone,
    anstwo: this.quiz.anstwo,
    ansthree: this.quiz.ansthree,
    correct: this.quiz.correct,
  };
    this.quiz.userAccountId = this.userData.userId;
    quizService
    .updateQuiz(payload)
      .then(() => {
       
        this.$swal("Success", "Quiz updated successfully!", "success");
        this.quizListMethod();
        this.showForm = false;
        this.saveOrupdate = "SAVE";
        this.quiz = {quizId : 0}
        this.quizListMethod();
      })
      
      .catch(err => console.error("Update error:", err.response?.data || err));
  }
},

    clickEdit(item) {
       this.showForm = true;
      this.quiz = {
    ...item  };
      this.saveOrupdate = "UPDATE";
    },
    clickDelete(item) {
      this.selectedOne = { ...item };
      this.dialogDelete = true;
    },
    clickDeleteDialog() {
      quizService
        .deleteQuiz(this.selectedOne)
        .then((response) => {

          this.dialogDelete = false;
          this.languageListMethodByType();
          this.$swal({
            icon: "success",
            title: "Your work has been deleted",
            showConfirmButton: false,
            timer: 1000,
          });
          this.quizListMethod();
        })
        .catch((error) => {
          this.$swal("Fail!", error.response.data.message, "error");
        });
    },
    resetForm() {
            this.quiz = {

              date: format(this.receivedPicker, "yyyy-MM-dd HH:mm:ss"),
              modifiedDate: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
              userAccount: this.userList[0],
              languages: this.languageList[0],
              name: this.quiz.name,
              ansone: this.quiz.ansone,
              anstwo: this.quiz.anstwo,
              ansthree: this.quiz.ansthree,
              correct: this.quiz.correct,
              
            };
  this.showForm = false;
  this.saveOrupdate = "SAVE";
}
  },
  watch: {
    receivedPicker() {
      this.receivedMenu = false;
      // this.courses.receivedDate = format(this.receivedPicker, "yyyy-MM-dd");

      this.quiz.date = format(this.receivedPicker, "yyyy-MM-dd HH:mm:ss");
    },
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

</style>
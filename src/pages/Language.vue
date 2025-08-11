<template>
  <div>
      <!-- Table Section -->
    <v-row class="title">
      <v-col cols="12" >
        <h1 style="background-color:#b3e5fc;text-align: center;">Courses</h1>
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
  <span>Add Courses</span>
</v-tooltip>


      <v-table fixed-header height="92vh">
          <thead>
            <tr>
              <th class="text-center white--text bg-primary">No.</th>
              <th class="text-center white--text bg-primary">Course Name</th>
              <th class="text-center white--text bg-primary" v-if="showdemand">Course Images</th>

              <th class="text-center white--text bg-primary" v-if="showTeacher">Course Fees</th>
              <!-- <th class="text-center white--text bg-primary">Exam Link</th> -->
              <th class="text-center white--text bg-primary" v-if="showTeacher">Exam Fee</th>
              <th class="text-center white--text bg-primary" v-if="showdemand">Book Link</th>
              <th class="text-center white--text bg-primary" v-if="showdemand">Descriptions</th>

              <th class="text-center white--text bg-primary">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in languageList"
              :key="index"
              @click="selectedOne = item"
              :style="{
                backgroundColor:
                  item.languagesId == selectedOne.languagesId
                    ? '#def3ff'
                    : 'transparent',
              }"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ item?.name }}</td>
               <td class="text-center" v-if="showdemand"><v-img
  :src="getLanguagePhotoUrl(item?.lanPhoto)"
  alt="Language Photo"
  max-width="80"
  max-height="80"
  contain
  loading="lazy"
/></td>

              <td class="text-center" v-if="showTeacher">{{ item?.amount }}</td>

              <!-- <td class="text-start">{{ item?.examLink }}</td> -->
              <td class="text-center" v-if="showTeacher">{{ item?.examFee }}</td>
              <td class="text-center" v-if="showdemand">{{ item?.pdf }}</td>
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

              <td class="text-center">
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


<v-dialog v-model="showForm" max-width="500">
      
        <v-card class="form pa-4" elevation="4">
        <v-card-title class="d-flex justify-space-between align-center">
      <span class="text-h4">Add Language</span>
      <v-btn icon color="red" @click="showForm = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
            <v-card-text>
                <v-text-field
                  label="Name"
                  v-model="language.name"
                  :rules="[(v) => !!v || 'required']"
                  density="compact"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                v-if="showTeacher"
                  label="Amount"
                  v-model.number="language.amount"
                  :rules="[(v) => !!v || 'required']"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
<!-- 
                <v-text-field
                  label="Exam Link"
                  v-model="language.examLink"
                  :rules="[(v) => !!v || 'required']"
                  density="compact"
                  variant="outlined"
                ></v-text-field> -->

                <v-text-field
                  v-if="showTeacher"
                  label="Exam Fee"
                  v-model.number="language.examFee"
                  density="compact"
                  variant="outlined"
                ></v-text-field>

                <v-textarea
                  label="Descriptions"
                  v-model="language.description"
                  :rules="[(v) => !!v || 'required']"
                  density="compact"
                  variant="outlined"
                ></v-textarea>

                </v-card-text>
               <v-card-actions class="justify-end pr-5">  
                <v-btn  class="text-black"
                style="background-color: #2196f3;" 
                 @click="saveLanguage()">{{
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


    <v-col>
      <v-dialog v-model="dialogDelete" width="500">
        <v-card>
          <v-card-title class="text-h5 white--text bg-red">
            Delete
          </v-card-title>

          <v-card-text class="text-h6">
            Are you sure to delete({{ selectedOne.name }})?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="black" text @click="dialogDelete = false">
              CANCEL
            </v-btn>
            <v-btn dark class="bg-red" text @click="clickDeleteDialog()">
              DELETE
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
        <v-col>
          <v-bottom-sheet v-model="languageFileDialog" fullscreen scrollable>
        <v-sheet class="information-window-v-sheet">
          <LanguagesFile
          @closeDialog="languageFileDialog=false"
          :language="selectedOne"
          @loadUserList="loadUserList"
          />
        </v-sheet>
      </v-bottom-sheet>
    </v-col>

      <v-col>
          <v-bottom-sheet v-model="languagePhotoDialog" fullscreen scrollable>
        <v-sheet class="information-window-v-sheet">
          <LanguagesPhoto
          @closeDialog="languagePhotoDialog=false"
          :language="selectedOne"
          @loadUserList="loadUserList"
          />
        </v-sheet>
      </v-bottom-sheet>
    </v-col>
  </div>
</template>
<script>
import axios from "../config";
import LanguagesFile from "@/components/LanguagesFile.vue";
import languageService from "../service/LanguageService.js";
import lessonService from "../service/LessonsService.js";
import LanguagesPhoto from "@/components/LanguagesPhoto.vue";

export default {
  data: () => ({
    selectedOne: {},
    language: {
      amount: 0,
      examFee: 0,
    },
    userData: {},
    saveOrupdate: "SAVE",
    languageList: [],
    dialogDelete: false,
    showForm: false,
    showTeacher : false,
    showdemand : true,
    lessonList : [],
    languageFileDialog : false,
    languagePhotoDialog: false,
  }),
  props: {},
  mounted: function () {
    this.userData = JSON.parse(localStorage.getItem("user"));
    
    if(this.userData.role=="TEACHER"){
      this.showTeacher = false;
    }else{
      this.showTeacher = true;
    }
  //   this.lessonListMethod().then(() => {
  //   // Now lessonsDto is set
  //   this.languageListMethod();
  // });
    // this.lessonListMethod();
    this.languageListMethod();
    this.showForm = false;
  },
  methods: {
     loadUserList() {
    this.languageListMethod();
  },
        getLanguagePhotoUrl(lanPhoto) {
  if (!lanPhoto) return "path/to/default-image.png"; // fallback image path
   const baseURL = axios?.defaults?.baseURL || "";
       return lanPhoto ? `${baseURL}/languagephoto/${lanPhoto}.png` : "";
  //return `${axios.defaults.baseURL}/languagephoto/${lanPhoto}.png`;
},

     FileMethod:function(item){
        this.selectedOne = item;
        this.languageFileDialog = true;
    },
    photoMethod:function(item){
        this.languagePhotoDialog = true;
    },

    saveLanguage: function () {
  //     const languageDto = {
  //   languagesId: this.language.languagesId || 0,
  //   name: this.language.name,
  //   lanPhoto: this.language.lanPhoto,
  //   amount: this.language.amount,
  //   examFee: this.language.examFee,
  //   pdf: this.language.pdf,
  //   description: this.language.description,
  //   userAccountId: this.userData.userId
  // };
  if (this.saveOrupdate == "SAVE") {
    // this.language.userAccount = {
    //   userAccountId: this.userData.userId
    // };
      this.language.userAccountId = this.userData.userId;
      languageService
      .addLanguageList(this.language).then((response) => {
      this.showForm = false;
      this.$swal({
        icon: "success",
        title: "Your work saved successfully!",
        showConfirmButton: false,
        timer: 1000,
      });
      this.language = { languagesId: 0, amount: 0, examFee: 0 };
      this.languageListMethod();
    });
  } else {
   
      // this.language.userAccountId = this.userData.userId;
    languageService
    .updateLanguage(this.language).then((response) => {
      this.saveOrupdate = "SAVE";
      this.showForm = false;
      this.$swal({
        icon: "success",
        title: "Your work updated successfully!",
        showConfirmButton: false,
        timer: 1000,
      });
      this.language = { languagesId: 0, amount: 0, examFee: 0 };
      this.languageListMethod();
    });
  }
},

    languageListMethod() {
      languageService
        .getLanguageList()
        .then((response) => {

//          if (this.userData.role === "TEACHER") {
//        const filteredLessons = response.filter(language => {
//   const creatorId = 
//     language.userAccount?.userAccountId || 
//     language.userAccountId || 
//     language.lessonsDto?.userAccount?.userAccountId;

//   console.log("Language creator userAccountId:", creatorId);
//   console.log("Logged-in userId:", this.userData.userId);
//   console.log("Language item:", language);

//   return creatorId == this.userData.userId;
// });

//         this.languageList.splice(0);
//         this.languageList.push(...filteredLessons);
//       } else {
        this.languageList.splice(0);
        this.languageList.push(...response);
 //     }
        })
        .catch((error) => {
          this.$swal("Fail!", error.response.data.message, "error");
        });
    },
//     lessonListMethod() {
//     return lessonService
//     .getLessonList()
//     .then((response) => {

   
//         this.lessonList.splice(0);
//         this.lessonList.push(...response);
//         if (this.lessonList.length > 0) {
//   this.language.lessonsDto = this.lessonList[0];
// } else {
//   this.language.lessonsDto = null;
// }

//         this.languageListMethod();
//         this.language.lessonsDto = this.lessonList[0];
//         console.log("LessonsDto now set:", this.language.lessonsDto?.userAccountId);

//     })
//     .catch((error) => {
//       console.error("Failed to load lessons:", error);
//     });
// },
    clickEdit(item) {
      this.showForm = true;
      // this.language = { ...item };
      this.language = {
    ...item,
    lessonsDto: item.lessonsDto || { lessonsId: 0 } // Add fallback
  };
    //   this.language = {
    // languagesId: item.languagesId,
    // name: item.name,
    // amount: item.amount,
    // examFee: item.examFee,
    // description: item.description
  //};
      this.saveOrupdate = "UPDATE";
    },
    clickDelete(item) {
      this.selectedOne = { ...item };
      this.dialogDelete= true;
    },
    // clickDeleteDialog() {
    //   this.dialogDelete = false;
    //   languageService
    //     .deleteLanguage(this.selectedOne)
    //     .then((response) => {
    //       this.saveOrupdate = "SAVE";
    //       this.language = {};
    //       this.languageListMethod();
    //       this.$swal({
    //         icon: "success",
    //         title: "Your work has been deleted",
    //         showConfirmButton: false,
    //         timer: 1000,
    //       });
    //     })
    //     .catch((error) => {
    //       this.$swal("Fail!", error.response.data.message, "error");
    //     });
    // },
clickDeleteDialog() {
  this.dialogDelete = false;
  languageService
    .deleteLanguage(this.selectedOne)
    .then(() => {
      // This only runs if HTTP status is 2xx (success)
      this.saveOrupdate = "SAVE";
      this.language = {};
      this.languageListMethod();
      this.$swal({
        icon: "success",
        title: "Language deleted successfully",
        showConfirmButton: false,
        timer: 1000,
      });
    })
    .catch((error) => {
      
      const message ="You cannot delete this course as  it has active students and a teacher assigned.";
      this.$swal("Deletion Blocked", message, "error");
    });
}


  },
  watch: {
      showForm(newVal) {
    if (!newVal) {
      // Dialog closed → reset the form
      this.language = { languagesId: 0, amount: 0, examFee: 0 };
            this.saveOrupdate = "SAVE";
    }
  }
  },
  components: {},
  computed: {
    isFormValid() {
      return (
        this.language.name &&
        this.language.amount &&
        this.language.examFee &&
        this.language.pdf &&
        this.language.description
      );
    },
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
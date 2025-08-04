<template>
  <v-container
    fluid
    class=" login-full"
    style="background-color: #f0f4f8"
  >
    <v-row no-gutters>
      <!-- Sidebar -->
      <v-col md="2" class="pa-4" style=" background-color: white; box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);" >
        <h3 class="text-center font-weight-bold mb-4" style="color: #1565c0">
          Languages
        </h3>
        <v-list dense nav>
          <v-list-item
            v-for="(item, index) in languageList"
            :key="index"
            :active="item.languagesId == selectedOne.languagesId"
            active-class="selected-language"
            @click="clickLanguage(item)"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>

      <!-- Lessons -->
      <v-col md="10" class="pa-4">
        <v-row>
          <v-col
            v-for="(lesson, i) in lessonList"
            :key="i"
            cols="12"
            md="6"
            lg="4"
            class="mb-6"
          >
     <v-card elevation="5" class="rounded-xl bg-light-purple" style="height: 100%;">
              <v-card-title
                class="font-weight-bold text-primary "
                style="min-height: 64px"
              >
                {{ lesson.languagesDto?.name || "Untitled Lesson" }}
              </v-card-title>

              <v-responsive aspect-ratio="16/9">
                <iframe
                  :src="getYouTubeEmbedUrl(lesson?.youtube)"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowfullscreen
                   style="width: 100%; height: 100%;"
                ></iframe>
              </v-responsive>

              <v-card-text class="text-body-2 text-secondary">
                <p><strong>Type:</strong> {{ lesson.freeVideo }}</p>
                <p><strong>Date:</strong> {{ lesson.date }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-if="(userData.role == 'STUDENT' || userData.role == undefined) && showEnrollButton" class="justify-center mt-6 mb-16 handle">
      <v-btn color="primary" large @click="handleEnroll">
        Enroll to Access All Paid Videos
      </v-btn>
    </v-row>

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

    <v-dialog v-model="showForm" max-width="600" style="height: 730px">
      <v-card class="form pa-1" elevation="4" mb-0>
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

          <v-text-field label="Address" v-model="user.address"></v-text-field>

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
          <!-- <v-autocomplete
            v-model="user.userType"
            :items="userTypeList"
            label="UserType"
            required
            density="compact"
            variant="outlined"
            filled
          ></v-autocomplete> -->

          <v-text-field
            label="Degree"
            v-model="user.degree"
            :rules="[(v) => !!v || 'required']"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-end pr-5">
          <v-btn
            class="text-black"
            style="background-color: #2196f3"
            @click="saveUser()"
            >{{ saveOrupdate }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

        <v-dialog v-model="dialogBuyNow" width="500">
      <v-card>
        <v-card-title class="text-h5 white--text bg-red">Buy </v-card-title>
        <v-card-text class="text-h6">
         <v-radio-group v-model="rgType" inline>
  <v-radio label="Courses" value="COURSES"></v-radio>
  <v-radio label="Exam" value="EXAM"></v-radio>
</v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="black" text @click="dialogBuyNow = false">CANCEL</v-btn>
          <v-btn dark class="bg-red" text @click="clickBuyNowType()"
            >SAVE</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import languageService from "../service/LanguageService.js";
import lessonService from "../service/LessonsService.js";
import { format } from "date-fns";
import userService from "../service/UserAccountService.js";
import axios from "@/config";
import coursesService from "../service/CoursesService.js";
export default {
  data: () => ({
    languageList: [],
    selectedOne: {},
    userData: {},
    lessonList: [],
    showEnrollButton: true,
    showForm: false,
    user: { userType: "STUDENT" },
    saveOrupdate: "SAVE",
    rules: {
      required: (v) => !!v || "This field is required",
      email: (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Invalid email format",
      phone: (v) =>
        /^(?:\+?95|0)(?:9\d{7,9})$/.test(v) || "Invalid Myanmar phone number",
      nrc: (v) =>
        /^\d{1,12}\/[A-Z]{3}\([A-Z]\)\d{6}$/.test(v) || "Invalid NRC format",
    },
    userTypeList: ["ALL", "STAFF", "STUDENT", "TEACHER", "ADMIN"],
    startPicker: new Date(),
    startMenu: false,
    dialogBuyNow:false,
    rgType:"courses",
    languagesId:0,
  }),
  mounted() {
    this.user.startDate = format(this.startPicker, "dd-MM-yyyy");
    this.userData = JSON.parse(localStorage.getItem("user")) || {};
    this.languagesId = this.$route.query.languagesId;
  //  if (this.userData.role == undefined || this.userData?.role == "STUDENT") {
  //     this.showEnrollButton = true;
  //   }

    this.languageListMethod();
  },
  methods: {
    clickBuyNowType:function(){
      this.dialogBuyNow = false;
      let courses = {studentDto:{}};
      courses.type = this.rgType;
      courses.receivedDate = this.user.startDate;
      courses.studentDto.userAccountId = this.userData.userId;
      courses.languagesDto = this.selectedOne;
      courses.amount = this.selectedOne.amount;

       coursesService
          .addCourse(courses)
          .then((response) => {
            this.showEnrollButton = false;
          this.$swal({
          icon: "success",
          title: "Your work saved successfully!",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          //this.showForm = false;
        });
          })
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

        userService
          .saveFreeUserAccounts(this.user)
          .then((response) => {
            this.$router.push({ path: "/login" }).catch(() => {});
          })
          .catch((error) => {
            this.$swal("Fail!", error.response.data.message, "error");
          });

        //await userService.addUser(this.user);
      } catch (error) {
        console.error("User save failed", error);
        this.$swal(
          "Error",
          error.response?.data?.message || "Failed to save user",
          "error"
        );
      }
    },
    clickLanguage(item) {
      this.selectedOne = item;
      if (this.userData?.password) {
        this.loadLessons(item.languagesId);
      } else {
        this.loadLessonsFree(item.languagesId);
      }
    },
    loadLessonsFree(languagesId) {
      lessonService.getLessonListFree("FREE", languagesId).then((res) => {
        // this.lessonList = res;
        this.lessonList.splice(0);
        this.lessonList.push(...res);
        
      });
    },
    loadLessons(languagesId) {
      lessonService.getLessonList("ALL", languagesId).then((res) => {
        //this.lessonList = res;
        this.lessonList.splice(0);
        this.lessonList.push(...res);
                let tempList =  this.lessonList.filter((lesson)=> lesson.freeVideo=='PAID');
        if(tempList.length>0){
            this.showEnrollButton = false;
        }else{
          this.showEnrollButton = true;

        }
      });
    },
    loadLessonsFiltered(languagesId) {
      lessonService.getLessonList("ALL", languagesId).then((res) => {
        // Filter only FREE lessons
        this.lessonList = res.filter((lesson) => lesson.freeVideo === "FREE");
      });
    },

    // loadLessons(languagesId) {
    //   lessonService.getLessonList("ALL", languagesId).then((res) => {
    //     this.lessonList.splice(0);
    //     this.lessonList.push(...res);
    //   });
    // },

    getYouTubeEmbedUrl(url) {
      if (!url) return null;
      if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1]?.split("?")[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }
      if (url.includes("youtube.com/watch?v=")) {
        const videoId = url.split("v=")[1]?.split("&")[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }
      return null;
    },

    languageListMethod() {
      languageService
        .getLanguageListFree()
        .then((response) => {
          this.languageList.splice(0);
          this.languageList.push(...response);
          if(this.languagesId==undefined){
            this.selectedOne = this.languageList[0];
          }else{
          for(let i=0;i<this.languageList.length;i++){
            let obj = this.languageList[i];
              if(this.languagesId==obj.languagesId){
                this.selectedOne = obj;
              }
          }
          }

         
          this.clickLanguage(this.selectedOne); // auto-load first
        })
        .catch((error) => {
          this.$swal("Fail!", error.response.data.message, "error");
        });
    },

    handleEnroll() {
      if (this.userData.role == undefined) {
        this.$swal({
          title: "Enroll Now",
          text: "Register as a student to access all lessons.",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Register",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            //window.location.href = "/register";
            this.showForm = true;
          }
        });
      } else {
        this.$swal({
          title: "Buy Now",
          text: "Now Now",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Buy",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            //window.location.href = "/register";
            this.dialogBuyNow = true;
          }
        });
      }
    },
  },
  watch: {
    startPicker() {
      this.startMenu = false;
      this.user.startDate = format(this.startPicker, "dd-MM-yyyy");
    },
  },
};
</script>

<style scoped>
.login-full {
  flex-grow: 1;
  min-height: 100%;
  background: linear-gradient(to right, #e1f5fe, #ede7f6);

}
.selected-language {
 background-color: #c5cae9 !important;
  border-radius: 10px;
  font-weight: bold;
  color: #1a237e;
}
.v-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.v-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
.v-card-title {
  font-size: 18px;
  background-color: #ede7f6; /* light purple */
  border-bottom: 1px solid #d1c4e9;
}

.v-list-item {
  border-radius: 10px;
  transition: background-color 0.3s ease;
}
.v-list-item:hover {
  background-color: #e3f2fd;
}
.v-btn {
  border-radius: 12px;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 0.5px;
}
.bg-light-purple {
  background-color: #f3e5f5;
}
.handle{
  position: fixed;
  bottom: 24px;
  margin-left: 40%;
  border-radius: 20%;
  width: fit-content;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 999;
}
</style>

<template>
  <v-container fluid class="py-10" >
    
    <v-row no-gutters>
      <v-col cols="12" md="12" class="px-2 mt-6 pt-2 pb-1">
        <v-row no-gutters align="stretch">
          <v-col
            v-for="language in languageList"
          :key="language.languagesId "
           
            cols="12"
            sm="12"
            md="3"
            class="mt-4"
          >
            <v-card class="pa-6 text-center ml-2 h-100 d-flex flex-column" variant="text">
              <!-- <v-avatar size="250" class="mb-4 mx-auto course-avatar" rounded="circle">
                <v-img
                  :src="getCoursePhotoUrl(courses.cphoto)"
                  
                  alt="Course"
                  cover
                  loading="lazy"
                />
              </v-avatar> -->
<!-- :lazy-src="getCoursePhotoUrl(courses.cphoto) + '?thumb=true'" -->
              <div class="flex-grow-1 d-flex flex-column justify-center">
                <p class="mb-3 font-weight-bold text-wrap product-title" style="font-size: 18px">
                  {{  language.name }}
                </p>
              </div>
             <v-btn>
            <a v-if="language.buy==1" @click="clickTakeExam(language)" class="font-weight-bold  learn-more-btn">Take Exam</a>
            </v-btn>

              <!-- <div class="">
                <p class="mb-3 font-weight-bold product-detail" style="font-size: 15px">
                  {{ product?.detail }}
                </p>
              </div> -->
              <!-- <div class="pt-5">
                <v-btn
                  rounded
                  prepend-icon="mdi-download"
                  @click="downloadPdf(product.file)"
                  class="mt-5 buttontext"
                >
                  Download PDF
                </v-btn>
              </div> -->
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="showEnrollButton" class="justify-center mt-6 mb-16 handle">
      <v-btn>
  <a
    v-if="isRegistered(language.languagesId)"
    @click="clickTakeExam(language)"
    class="font-weight-bold learn-more-btn"
  >Take Exam</a>
  <a
    v-else
    @click="openRegistrationForm(language)"
    class="font-weight-bold learn-more-btn"
  >Register for Exam</a>
</v-btn>
    </v-row>
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
  </v-container>
</template>
<script>
import languageService from "../service/LanguageService.js";
import axios from "@/config";
export default {
  data: () => ({
   languageList: [],
    languagesId: 0,
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
    // startPicker: null,
    startMenu: false,
     saveOrupdate: "Register",
  }),
  mounted() {
    // const lessonsId = this.$route.query.lessonsId;
    // if (lessonsId !== undefined) {
    //   this.lessonsId = lessonsId;
    // }
    this.languageListMethod();
  },
  methods: {
    clickTakeExam:function(languages){
      let languagesId = languages.languagesId;
      let coursesId = languages.coursesId;
      let query = { languagesId,coursesId };
      this.$router.push({
        name: "userquiz",
        query,
      });
    },
    isRegistered(languageId) {
   return this.registeredLanguages.includes(languageId);
   },
   openRegistrationForm(language) {
  this.languagesId = language.languagesId;
  this.user = {
    name: "",
    userName: "",
    age: "",
    nrc: "",
    email: "",
    password: "",
    phonenum: "",
    address: "",
    degree: "",
    startDate: "",
  };
  this.showForm = true;
},
    // downloadPdf(pdf) {
    //   if (!pdf) {
    //     this.$swal("No PDF", "No PDF file available for this product.", "warning");
    //     return;
    //   }
    //   const baseURL = axios?.defaults?.baseURL || "";
    //   const pdfUrl = `${baseURL}/productfile/${pdf}.pdf`;
    //   window.open(pdfUrl, "_blank");
    // },
    // getCoursePhotoUrl(cphoto) {
    //   // const baseURL = axios?.defaults?.baseURL || "";
    //   // return cphoto ? `${baseURL}/coursephoto/${cphoto}.png` : "";
    //     return `${axios.defaults.baseURL}/coursephoto/${cphoto}.png`;
      
    // },
    languageListMethod() {
      languageService
        .getLanguageList(this.languagesId)
        .then((response) => {
          this.languageList.splice(0, this.languageList.length);
          this.languageList.push(...response);
          console.log(this.languageList);
        })
        .catch((error) => {
           this.$swal("Fail!", error.response.data.message, "error");
        });
    },
  },
};
</script>
<style scoped>
.v-container {
  background: linear-gradient(135deg, #79d4eb 0%, #5c83aa 60%, #42a5f5 100%);
}

p {
  margin: 0;
  line-height: 1.6;
}

.icon {
  border: 3px solid #084f91 !important;
}

.button {
  background-color: #084f91 !important;
  color: white !important;
}

.buttontext {
  background: rgba(255, 255, 255, 0.2) !important;
  color: #084f91 !important;
  /* font-weight: bold !important; */
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease-in-out;
}

.buttontext:hover {
  /* background: rgba(255, 255, 255, 0.4) !important; */
  background: white !important;
  transform: scale(1.03);
  font-weight: bold !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.product-title {
  animation: fadein-title 1.2s 0.2s cubic-bezier(0.4, 0, 0.2, 1) backwards;
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.product-detail {
  animation: fadein-title 1.2s 0.2s cubic-bezier(0.4, 0, 0.2, 1) backwards;
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

@keyframes fadein-title {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.courses-avatar {
  box-shadow: 0 4px 18px rgba(255, 255, 255, 0.1);
  animation: avatar-pop 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  contain: layout style;
}

@keyframes avatar-pop {
  0% {
    opacity: 0;
    transform: scale(0.7);
  }
  80% {
    opacity: 1;
    transform: scale(1.08);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Glassmorphism card */
.v-card {
  /* background: linear-gradient(120deg, #084f91 0%, #1976d2 100%); */
  background: transparent !important;

  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.5s ease;
  transition-delay: 0.1s;
  border-radius: 70px;
}

.v-card:hover {
  transform: translateY(-5px);
  border: 2px solid #fff;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
}
</style>

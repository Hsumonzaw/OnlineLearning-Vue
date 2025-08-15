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

   <v-row
  v-if="(userData.role === 'STUDENT' || !userData.role) && showEnrollButton"
  class="justify-center mt-6 mb-16 handle"
>
  <v-btn color="primary" large @click="handleEnroll">
    Enroll to Access All Paid Videos
  </v-btn>
</v-row>



    <v-dialog v-model="dialogBuyNow" max-width="400">
  <v-card>
    <v-card-title>Purchase {{ selectedType }}</v-card-title>
    <v-card-text>
      Amount to pay: <strong>{{ this.selectedOne.amount }}</strong>
    </v-card-text>
    <v-card-actions>
      <v-btn class="bg-blue" color="white" @click="proceedToPayment">Pay Now</v-btn>
      <v-btn class="bg-white" color="primary" text @click="dialogBuyNow = false">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

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
          <span class="text-h4">Registration Form</span>
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
                disabled
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
            :rules="[rules.required, rules.name]"
          ></v-text-field>

          <v-text-field
            label="User Name"
            v-model="user.userName"
            :rules="[(v) => !!v || 'required']"
          ></v-text-field>

         <v-menu
            v-model="dateBirth"
            full-width
            max-width="200px"
            min-width="290px"
            v-bind:close-on-content-click="false"
          >
            <template v-slot:activator="{ props }">
              <v-text-field
                v-model="user.age"
                density="compact"
                variant="outlined"
                label="Date Of Birth"
                :rules="[rules.required, rules.age]"
                readonly
                v-bind="props"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="birthPicker"
              color="primary"
              hide-header
            ></v-date-picker>
          </v-menu>

              <v-autocomplete
            v-model="user.gender"
            :items="genderList"
            label="Gender"
            required
            density="compact"
            variant="outlined"
            filled
          ></v-autocomplete>

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
            :type="showPassword ? 'text' : 'password'"
      :rules="passwordRules" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
       @click:append-inner="showPassword = !showPassword"
>
          </v-text-field>
                      <!-- :rules="[(v) => !!v || 'required']" -->


          <v-text-field
            v-model="user.phonenum"
            label="Phone Number"
            :rules="[rules.required, rules.phone]"
            required
          ></v-text-field>

          <v-textarea label="Address" v-model="user.address"></v-textarea>

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

          <!-- <v-text-field
            label="Degree"
            v-model="user.degree"
            :rules="[(v) => !!v || 'required']"
          ></v-text-field> -->
        </v-card-text>
        <v-card-actions class="justify-end pr-5">
          <v-btn
            class="text-black"
            style="background-color: #2196f3"
            @click="saveUser()"
            >{{ saveOrupdate }}</v-btn
          >

              <v-btn
            class="text-black"
            style="background-color: red"
            @click="showForm = false" 
           >CANCEL</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

        <!-- <v-dialog v-model="dialogBuyNow" width="500">
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
    </v-dialog> -->

   <v-dialog v-model="paymentDialog" max-width="400">
  <v-card>
    <v-card-title class="text-h5">Choose Your Payment</v-card-title>
    <v-card-text class="text-center">
      <div class="mb-4 text-h6">
        Amount to Pay: <strong>{{ this.selectedOne?.amount.toLocaleString() }} MMK</strong>
      </div>
      <v-btn color="blue" class="mx-2" @click="choosePayment('kpay')">KPay</v-btn>
      <v-btn color="yellow darken-2" class="mx-2" @click="choosePayment('wavepay')">WavePay</v-btn>
      <v-btn color="red" class="mx-2" @click="choosePayment('ayapay')">AYA Pay</v-btn>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="paymentDialog = false">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<!-- QR Code Dialog -->
<v-dialog v-model="qrDialog" max-width="300px" persistent>
  <v-card class="pa-4 text-center">
    <h3 class="mb-4">{{ paymentName }} - Please Scan with your Phone</h3>
    <img :src="paymentQR" alt="Payment QR" style="max-width:250px; margin:auto; display:block;" />
    <div class="payment-phone mt-2">09775988862</div>
    <v-btn @click="doneMethod()">DONE</v-btn>

    <v-btn class="mt-4" color="primary" @click="qrDialog = false">Close</v-btn>
  </v-card>
</v-dialog>
<v-dialog v-model="confirmFeeDialog" max-width="400">
  <v-card>
    <v-card-title class="text-h6">Confirm Payment</v-card-title>
    <v-card-text>
      You are about to pay <strong>{{ this.selectedOne.amount }}</strong>
      <!-- <strong>{{ rgType === 'COURSES' ? 'Course' : 'Exam' }}</strong>. -->
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="bg-blue" color="white" text @click="confirmFee">Confirm</v-btn>
      <v-btn class="bg-white" text color="primary" @click="confirmFeeDialog = false">Cancel</v-btn>

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
    confirmFeeDialog :false,
    languageList: [],
    selectedOne: {},
    userData: {},
    lessonList: [],
    showEnrollButton: true,
    showPassword : false,
    showForm: false,
    user: { userType: "STUDENT" },
    genderList: ["Male","Female"],
    birthPicker: new Date(),
    dateBirth : false,
    saveOrupdate: "SAVE",
    chosenAmount: 0,  
    selectedPayment: "", 
    showPaymentOptions: false,
    rules: {
      required: (v) => !!v || "This field is required",
      email: (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Invalid email format",
      phone: (v) =>
        /^(?:0|\+95)9[24679]\d{7,9}$/.test(v) || "Invalid Myanmar phone number",
      nrc: (v) =>
        /^\d{1,12}\/[A-Z]{3}\([NPE]\)\d{6}$/.test(v) || "Invalid NRC format",
        name: (v) =>
        /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(v) || "Invalid name format",
        age: (v) => {
    if (!v) return "Date of Birth is required";
    const today = new Date();
    const birthDate = new Date(v.split("-").reverse().join("-")); // Convert dd-MM-yyyy to yyyy-MM-dd
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 15 || "You must be at least 15 years old";
  }
    },
    userTypeList: ["ALL", "STAFF", "STUDENT", "TEACHER", "ADMIN"],
    startPicker: new Date(),
    startMenu: false,
     dialogBuyNow:false,
    rgType: "COURSES",
    languagesId:0,
    paymentDialog:false,
    qrDialog: false,
    images: [
  new URL('@/assets/kpay.jpg', import.meta.url).href,
  new URL('@/assets/wave.jpg', import.meta.url).href,
  new URL('@/assets/AYA.jpg', import.meta.url).href
],
doneStatus: ["PENDING","DONE"],
  }),
  mounted() {
    this.user.startDate = format(this.startPicker, "dd-MM-yyyy");
    this.user.age = format(this.birthPicker, "dd-MM-yyyy");
    this.userData = JSON.parse(localStorage.getItem("user")) || {};
    this.languagesId = this.$route.query.languagesId;
  //  if (this.userData.role == undefined || this.userData?.role == "STUDENT") {
  //     this.showEnrollButton = true;
  //   }
// const purchased = JSON.parse(localStorage.getItem("purchasedLanguages") || "[]");
// if (purchased.includes(this.selectedOne.languagesId)) {
//     this.showEnrollButton = false;
// } else {
//     this.showEnrollButton = true;
// }

    this.languageListMethod();
  },
  methods: {
   
    proceedToPayment() {
      this.dialogBuyNow = false;
      this.confirmFeeDialog = true;
    },
    confirmFee() {
      this.confirmFeeDialog = false;
      this.paymentDialog = true;
    },
    selectPayment(method) {
      this.selectedPayment = method;
      this.qrDialog = true; // Show QR code dialog when payment method selected
    },
   
    // clickBuyNowType:function(){
    //     this.dialogBuyNow = false; // Close the Buy Now dialog
    //     this.paymentDialog = true;
    //     this.showPaymentOptions = true;  // show payment buttons now
  
    // },
      choosePayment(method) {
    this.selectedPayment = method;
    this.paymentDialog = false;   // Close Payment options dialog
    this.qrDialog = true;         // Open QR code dialog
  },
doneMethod() {
  this.qrDialog = false;
  if (!this.selectedOne?.languagesId) return;

  let course = {
    type: "COURSES",
    receivedDate: this.user.startDate,
    studentDto: { userAccountId: this.userData.userId },
    languagesDto: this.selectedOne,
    amount: this.selectedOne?.amount || 0
  };

  let purchased = JSON.parse(localStorage.getItem("purchasedLanguages") || "[]");

  if (!purchased.includes(this.selectedOne.languagesId)) {
    coursesService.addCourse(course)
      .then(() => {
        purchased.push(this.selectedOne.languagesId);
        localStorage.setItem("purchasedLanguages", JSON.stringify(purchased));

        // Hide enroll button immediately
        this.updateEnrollButton();

        this.$swal("Success", "Course purchased successfully! Please Wait a few minutes and refresh the page Admin Team are checking" , "success");
      })
      .catch(err => {
        console.error(err);
        this.$swal("Error", "Failed to purchase course. Try again.", "error");
      });
  } else {
    this.$swal("Info", "You have already purchased this course!", "info");
  }
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
    updateEnrollButton() {
  if (!this.selectedOne?.languagesId) {
    this.showEnrollButton = true; // show button if no language selected
    return;
  }

  const purchased = JSON.parse(localStorage.getItem("purchasedLanguages") || "[]");

  if (!this.userData?.role || this.userData.role === 'STUDENT') {
    // Only hide if already purchased
    this.showEnrollButton = !purchased.includes(this.selectedOne.languagesId);
  } else {
    // Hide for other roles
    this.showEnrollButton = false;
  }
},

  // Load lessons depending on user login
  loadLessonsForSelected() {
    if (!this.selectedOne?.languagesId) return;
    if (this.userData?.password) {
      this.loadLessons(this.selectedOne.languagesId);
    } else {
      this.loadLessonsFree(this.selectedOne.languagesId);
    }
  },
clickLanguage(item) {
  this.selectedOne = item;
  localStorage.setItem("selectedLanguage", JSON.stringify(item));

  // Update enroll button visibility whenever language changes
  this.updateEnrollButton();

  // Load lessons for selected language
  this.loadLessonsForSelected();
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
    this.lessonList.splice(0);
    this.lessonList.push(...res);

   
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
  languageService.getLanguageListFree()
    .then((response) => {
      this.languageList.splice(0);
      this.languageList.push(...response);

      // Restore saved language from localStorage
      const savedLang = JSON.parse(localStorage.getItem("selectedLanguage"));
      if (savedLang) {
        const foundLang = this.languageList.find(
          lang => lang.languagesId === savedLang.languagesId
        );
        this.selectedOne = foundLang || this.languageList[0];
      } else if (this.languagesId) {
        this.selectedOne = this.languageList.find(
          lang => lang.languagesId == this.languagesId
        ) || this.languageList[0];
      } else {
        this.selectedOne = this.languageList[0];
      }

      // **Directly set enroll button visibility here**
      this.updateEnrollButton();

      // Load lessons for selected language
      this.loadLessonsForSelected();
    })
    .catch((error) => {
      this.$swal("Fail!", error.response?.data?.message || error.message, "error");
    });
},


 handleEnroll() {
  if (!this.userData.role) {
    // Not logged in, ask to register first
    this.$swal({
      title: "Enroll Now",
      text: "Register as a student to access all lessons.",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Register",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        this.showForm = true;
      }
    });
  } else {
    // Logged in: show the dialog to choose course or exam first
    this.dialogBuyNow = true;  // Open dialog to select course or exam type
   // this.paymentDialog = true;
  }
},

// clickBuyNowType() {
//   // console.log("Selected item:", this.selectedOne);
//   // if (!this.rgType) {
//   //   this.$swal('Please select either Courses or Exam');
//   //   return;
//   // }

//   // Set chosen amount according to selection
//   // if (this.rgType === 'COURSES') {
//   //  this.chosenAmount = this.selectedOne?.amount || 0;
//   // } else if (this.rgType === 'EXAM') {
//   //   this.chosenAmount = this.selectedOne?.examFee  || 0;
//   // }

//   this.dialogBuyNow = false; 
//   const messageText =
//     this.rgType === "COURSES"
//       //  `Couses + Free Exam Fees: ${this.chosenAmount.toLocaleString()} MMK`;
//       // : `Exam Fees: ${this.chosenAmount.toLocaleString()} MMK`;
//       const dialogTitle =
//     this.rgType === "COURSES"
//        `Are you sure want to buy  ${this.selectedOne.name} course?`;
//       // : `Are you sure want to buy  ${this.selectedOne.name} exam?`;

//   // Show confirmation dialog with price and Buy/Cancel buttons
//   this.$swal({
//     title: dialogTitle,
//     text: messageText,
//     icon: "info",
//     showCancelButton: true,
//     confirmButtonText: "Buy",
//     cancelButtonText: "Cancel",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       this.paymentDialog = true;  // open payment methods dialog
//     }
//   });
// },



     
  },
  computed: {
 paymentQR() {
  switch (this.selectedPayment) {
    case "kpay": return this.images[0];
    case "wavepay": return this.images[1];
    case "ayapay": return this.images[2];
    default: return "";
  }
},

  paymentName() {
    switch (this.selectedPayment) {
      case "kpay": return "KPay";
      case "wavepay": return "WavePay";
      case "ayapay": return "AYA Pay";
      default: return "";
    }
  }
},
  watch: {
    startPicker() {
      this.startMenu = false;
      this.user.startDate = format(this.startPicker, "dd-MM-yyyy");
    },
     birthPicker(){
      this.dateBirth = false;
      this.user.age = format(this.birthPicker,"dd-MM-yyyy");
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

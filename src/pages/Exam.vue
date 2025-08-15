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
            <a v-if="language.buy==1 || isTeacher" @click="clickTakeExam(language)" class="font-weight-bold  learn-more-btn">Take Exam</a>
            <a v-else @click="handleExam(language)" class="font-weight-bold  learn-more-btn d-flex align-center" style="cursor: pointer;">
              Subscribe Now
            <v-img src="@/assets/lock.png" alt="Logo"  style="width: 40px; height: 35px; margin-right: 8px;" />
            </a>

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
  </v-container>
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
              v-model="user.password"
              label="Password"
              
              :type="showPassword ? 'text' : 'password'"
              :rules="passwordRules" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPassword = !showPassword"
              variant="outlined"
              density="compact"
            />

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
    <!-- Choose Type Dialog -->
<!-- Choose Type Dialog -->
<v-dialog v-model="dialogChooseType" max-width="400">
  <v-card>
    <v-card-title>Choose Access Type</v-card-title>
    <v-card-text>
      <v-btn color="blue" block @click="confirmChoice('course')">Course</v-btn>
      <v-btn color="green" block @click="confirmChoice('exam')">Exam</v-btn>
    </v-card-text>
  </v-card>
</v-dialog>
    <!-- Buy Now Dialog -->
<v-dialog v-model="dialogBuyNow" max-width="400">
  <v-card>
    <v-card-title>Purchase {{ selectedType }}</v-card-title>
    <v-card-text>
      Amount to pay: <strong>{{ amountToPay }}</strong>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="proceedToPayment">Pay Now</v-btn>
      <v-btn text @click="dialogBuyNow = false">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
              <!-- Payment Options Dialog -->
<v-dialog v-model="paymentDialog" max-width="400">
  <v-card>
    <v-card-title class="text-h5">Choose Your Payment</v-card-title>
    <v-card-text class="text-center">
      <v-btn color="blue" class="mx-2" @click="choosePayment('kpay')">KPay</v-btn>
      <v-btn color="yellow darken-2" class="mx-2" @click="choosePayment('wavepay')">WavePay</v-btn>
      <v-btn color="red" class="mx-2" @click="choosePayment('ayapay')">AYA Pay</v-btn>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="dialogBuyNow = false">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<!-- QR Code Dialog -->
<v-dialog v-model="qrDialog" max-width="300px" persistent>
  <v-card class="pa-4 text-center">
    <h3 class="mb-2">{{ paymentName }}</h3>
    <p class="mb-4">Amount: {{ formattedAmount }}</p>
    <img :src="paymentQR" alt="Payment QR" style="max-width:250px; margin:auto;" />
    <div class="payment-phone mt-2">092556774574</div>
    <v-btn class="mt-4" @click="doneMethod()">DONE</v-btn>
    <v-btn class="mt-2" color="primary" @click="qrDialog = false">Close</v-btn>
  </v-card>
</v-dialog>

<v-dialog v-model="confirmFeeDialog" max-width="400">
  <v-card>
    <v-card-title class="text-h6">Confirm Payment</v-card-title>
    <v-card-text>
      You are about to pay <strong>{{ formattedAmount }}</strong> for
      <strong>{{ rgType === 'COURSES' ? 'Course' : 'Exam' }}</strong>.
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="confirmFeeDialog = false">Cancel</v-btn>
      <v-btn color="primary" text @click="confirmFee">Confirm</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>


</template>
<script>
import languageService from "../service/LanguageService.js";
import userService from "../service/UserAccountService.js";
import coursesService from "../service/CoursesService.js";

import { format } from "date-fns";
import axios from "@/config";

export default {
  data() {
    return {
      languageList: [],
      selectedOne: {},
      userData: {},
      showForm: false,
      user: { userType: "STUDENT" },
      genderList: ["Male", "Female"],
      saveOrupdate: "SAVE",
      startPicker: new Date(),
      birthPicker: new Date(),
      startMenu: false,
      dateBirth: false,
      dialogChooseType: false,
      dialogBuyNow: false,
      paymentDialog: false,
      qrDialog: false,
      confirmFeeDialog: false,
      selectedPayment: "",
      amountToPay: 0,
      selectedType: "",
      images: [
        new URL('@/assets/kpay.jpg', import.meta.url).href,
        new URL('@/assets/wave.jpg', import.meta.url).href,
        new URL('@/assets/AYA.jpg', import.meta.url).href,
      ],
      showPassword: false,
      rules: {
        required: (v) => !!v || "This field is required",
        email: (v) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Invalid email format",
        phone: (v) =>
          /^(?:\+?95|0)(?:9\d{7,9})$/.test(v) || "Invalid Myanmar phone number",
        nrc: (v) =>
          /^\d{1,12}\/[A-Z]{3}\([NPE]\)\d{6}$/.test(v) || "Invalid NRC format",
        name: (v) =>
          /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(v) || "Invalid name format",
        age: (v) => {
          if (!v) return "Date of Birth is required";
          const today = new Date();
          const birthDate = new Date(v.split("-").reverse().join("-")); // dd-MM-yyyy to yyyy-MM-dd
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          return age >= 15 || "You must be at least 15 years old";
        },
      },
    };
  },
  mounted() {
    this.user.startDate = format(this.startPicker, "dd-MM-yyyy");
    this.user.age = format(this.birthPicker, "dd-MM-yyyy");

    this.userData = JSON.parse(localStorage.getItem("user")) || {};
    if (this.userData.password) {
      this.languageListMethod();
    } else {
      this.languageListMethodFree();
    }
  },
  methods: {
    handleExam(language) {
      this.selectedOne = language;
      if (!this.userData?.role) {
        this.$swal({
          title: "You need to register or login first",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Register/Login",
          cancelButtonText: "Cancel",
        }).then((res) => {
          if (res.isConfirmed) {
            this.showForm = true;
          }
        });
        return;
      }
      
    },

    clickTakeExam(language) {
      const languagesId = language.languagesId;
      const coursesId = language.coursesId;
      this.$router.push({
        name: "userquiz",
        query: { languagesId, coursesId },
      });
    },

    confirmChoice(choice) {
      this.selectedType = choice; // 'course' or 'exam'
      this.amountToPay =
        choice === "course"
          ? this.selectedOne.courseFee || this.selectedOne.amount || 0
          : this.selectedOne.examFee || this.selectedOne.amount || 0;
      this.dialogChooseType = false;
      this.dialogBuyNow = true;
    },

    proceedToPayment() {
      this.dialogBuyNow = false;
      this.confirmFeeDialog = true;
    },

    confirmFee() {
      this.confirmFeeDialog = false;
      this.paymentDialog = true;
    },

    choosePayment(method) {
      this.selectedPayment = method;
      this.paymentDialog = false;
      this.qrDialog = true;
    },

    doneMethod() {
      this.qrDialog = false;

      let courses = {
        type: this.selectedType,
        receivedDate: this.user.startDate,
        studentDto: { userAccountId: this.userData.userId },
        languagesDto: { languagesId: this.selectedOne.languagesId },
        amount: this.amountToPay,
      };

      coursesService.addCourse(courses).then(() => {
        if (this.userData.password) {
          this.languageListMethod();
        } else {
          this.languageListMethodFree();
        }
        this.$swal({
          icon: "success",
          title: "Purchase successful!",
          timer: 1000,
          showConfirmButton: false,
        });
      });
    },

    languageListMethod() {
      languageService
        .getLanguageList()
        .then((response) => {
          this.languageList.splice(0);
          this.languageList.push(...response);
        })
        .catch((error) => {
          this.$swal("Fail!", error.response.data.message, "error");
        });
    },

    languageListMethodFree() {
      languageService
        .getLanguageListFree()
        .then((response) => {
          this.languageList.splice(0);
          this.languageList.push(...response);
        })
        .catch((error) => {
          this.$swal("Fail!", error.response.data.message, "error");
        });
    },

    async saveUser() {
      try {
        let userType = this.user.userType;
        if (typeof userType === "object") {
          userType = userType.userType || userType.value || "";
        }
        this.user.userType = userType;

        userService
          .saveFreeUserAccounts(this.user)
          .then(() => {
            this.$router.push({ path: "/login" }).catch(() => {});
          })
          .catch((error) => {
            this.$swal("Fail!", error.response.data.message, "error");
          });
      } catch (error) {
        this.showForm = false;
        console.error("User save failed", error);
        this.$swal(
          "Error",
          error.response?.data?.message || "Failed to save user",
          "error"
        );
      }
    },
  },
  computed: {
    paymentQR() {
      switch (this.selectedPayment) {
        case "kpay":
          return this.images[0];
        case "wavepay":
          return this.images[1];
        case "ayapay":
          return this.images[2];
        default:
          return "";
      }
    },
    paymentName() {
      switch (this.selectedPayment) {
        case "kpay":
          return "KPay";
        case "wavepay":
          return "WavePay";
        case "ayapay":
          return "AYA Pay";
        default:
          return "";
      }
    },
    formattedAmount() {
      const amount = this.amountToPay || 0;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "MMK",
        minimumFractionDigits: 0,
      }).format(amount);
    },
    isTeacher() {
    return this.userData?.role === "TEACHER";
  },
  },
  watch: {
    startPicker() {
      this.startMenu = false;
      this.user.startDate = format(this.startPicker, "dd-MM-yyyy");
    },
    birthPicker() {
      this.dateBirth = false;
      this.user.age = format(this.birthPicker, "dd-MM-yyyy");
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
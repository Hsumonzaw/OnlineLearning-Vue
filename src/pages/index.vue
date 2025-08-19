<template>
  <v-app>
 <v-container fluid class="modern-contact px-0 py-0"> 
    <section class="hero-section modern-hero">
      <v-row class="align-center justify-center mt-0" no-gutters>
          <v-col cols="12" md="6" class="pl-10">
          <Motion preset="slideVisibleBottom" :duration="600" :delay="200">
            <div class="hero-badge mb-4 d-flex align-center">
              <v-icon color="success" size="28" class="mr-2">mdi-flower</v-icon>
              <span class="font-weight-bold text-success">Speak the Language. Write the Code. Shape Your Future.</span>
            </div>
            <h1 class="hero-title mb-4 gradient-text" style="font-size: 2.6rem; font-weight: 800">
              Empower Your Learning
            </h1>
            <p class="hero-subtitle mb-8" style="font-size: 1.25rem; color: #607d8b">
         Dive into coding with fun, hands-on courses in Java, Python, and more. Want to speak Japanese or boost your English? <br />
              Join expert-led courses in programming, tech, and world languages all in one place.
            </p>
            
              <router-link to="/aboutus" class="font-weight-bold  learn-more-btn">
           Get Started  
        
            </router-link>
 

             </Motion>
         </v-col>
         <v-col cols="12" md="6" class="hero-image-col d-flex justify-center mt-5">
          <Motion preset="slideVisibleRight" :duration="600" :delay="400">
            <div class="hero-image-container modern-hero-img">
            
               <v-img
                v-for="(img, i) in images"
                 :key="i"
               :src="img"
                class="hero-image"
               
                style="
                  border-radius: 32px;
                  box-shadow: 0 12px 40px rgba(25, 118, 210, 0.18);
                  border: 6px solid ; "
                 >
               </v-img>
            </div>
          </Motion>
        </v-col>
      </v-row>
      </section>
</v-container>

<!-- courses -->
<v-container fluid class="py-10 px-4" style="background: #e3f2fd;">
  <h1 class="text-center font-weight-bold mb-6" style="color: #1976d2">
  Latest Courses
  </h1>

  <v-row justify="center" no-gutters>
  
    <v-col
      v-for="(languages, index) in latestUserLanguages"
      :key="languages.languagesId"
     cols="12" sm="6" md="3" class="px-2 mb-6">

      <Motion preset="slideVisibleBottom" :duration="500" :delay="index * 200">
     <v-card
  class="glass-card text-center d-flex flex-column align-center justify-space-between"
  elevation="8"
  style="border-radius: 30px; padding: 20px; transition: transform 0.3s; height: 500px; max-height: 500px;"
>
  <v-avatar size="180" class="mb-4 mx-auto" rounded="circle">
    <v-img
      :src="getLanguagePhotoUrl(languages.lanPhoto)"
      alt="Course"
      cover
      loading="lazy"
    />
  </v-avatar>

  <div class="mt-2" style="flex: 1; width: 100%;">
    <h3 class="text-h6 font-weight-bold mb-2" style="color:#4577ed;">
      {{ languages.name }}
    </h3>

    <!-- Updated Description Section -->
    <div
      style="
        color: #546e7a;
        font-size: 14px;
        max-height: 100px;
        overflow-y: auto;
        text-align: left;
        padding: 6px 10px;
        border-radius: 8px;
        
      "
    >
      {{ languages.description }}
    </div>
  </div>

  <v-chip
    color="green lighten-2"
    text-color="white"
    class="mb-2 font-weight-bold"
    style="font-size: 16px;"
  >
    💵 Fee: {{ languages.amount }} MMK
  </v-chip>

  <v-btn
    color="primary"
    @click="goToUserCourses(languages.languagesId)"
    class="mt-4 px-6 py-2 text-uppercase font-weight-bold"
    style="background: linear-gradient(45deg, #4fc3f7, #1976d2); color: white; border-radius: 25px; transition: 0.3s ease;"
  >
    Interested
  </v-btn>
</v-card>

   


          </Motion>
    </v-col>
  </v-row>
  <v-container class="d-flex justify-end" mb-0>
   <router-link to="/usercourses" class="font-weight-bold  learn-more-btn">
     Learn More
      <v-icon end>mdi-chevron-right</v-icon>
</router-link>
</v-container>
</v-container>

<!-- Teachers -->
 <v-container fluid class="py-8 px-4" style="background:  #e1f5fe;">
  <h1 class="text-center font-weight-bold mb-16" style="color: #1976d2;">
    Meet Our Teachers
  </h1>
      <Motion preset="slideVisibleRight" :duration="500" :delay="index * 200">

  <v-row justify="center">
   <v-hover
  v-for="(teacher, i) in teachers.slice(0, 4)"
  :key="i"
  v-slot:default="{ isHovering, props }"
>
  <v-card
    v-bind="props"
    class="mx-4 my-10 pt-10 d-flex flex-column align-center"
    elevation="8"
    style="width: 280px; border-radius: 20px; position: relative; transition: 0.3s ease-in-out;"
    :style="{ transform: isHovering ? 'scale(1.05)' : 'scale(1)' }"
  >
    <!-- Floating Avatar -->
   <div
  class="d-flex justify-center"
  style="position: absolute; top: 0; left: 50%; transform: translate(-50%, -50%); overflow: visible;"
>
      <v-avatar size="120" class="elevation-6" color="white" >
        <v-img :src="getUserPhotoUrl(teacher.photo)" cover />
      </v-avatar>
    </div>
<!-- formatTeacherName(teacher) -->
    <!-- Card Content -->
    <v-card-text class="text-center mt-10 px-4 pb-6">
      <h3 class="text-h6 font-weight-bold" style="color:#1976d2;">{{ teacher.name }}</h3>
      <p style="color: #607d8b;">🎓 Degree: {{ teacher.degree }}</p>
      <p style="color: #607d8b;">📧 {{ teacher.email }}</p>
    </v-card-text>
  </v-card>
   </v-hover>
    </v-row>
   </Motion>


  
      <Motion preset="slideVisibleLeft" :duration="500" :delay="index * 200">

    <v-container class="d-flex justify-center" mb-0>
      
   <router-link to="/userteacher" class="font-weight-bold  learn-more-btn">
     See All Teachers
      <v-icon end>mdi-chevron-right</v-icon>
</router-link>

</v-container>
</Motion>
</v-container>


<v-container
  fluid
  class="py-10 px-4"
  style="background: #e1f5fe; display: flex; align-items: center; justify-content: center; gap: 24px;"
>
  <!-- Hiring Text -->
  <div style="flex: 1; max-width:600x; margin-left: 150px;">
    <h2 class="font-weight-bold" style="color: #0288d1; font-size: 4rem; margin-bottom: 12px;">
    We're  Hiring
    </h2>

    <p style="color: #455a64; font-size: 1rem;">
      Join our growing team! We're looking for passionate instructors and tech enthusiasts to empower learners worldwide.We’re more than just a learning platform; we’re a family of educators and students who grow together. If you have the passion to teach and inspire, we’d love to welcome you to our team.
    </p>
     <div style="margin-top: 24px;">
      
    <h3 style="color: #0288d1; font-size: 1.5rem; margin-bottom: 12px;">
      Job Requirements
    </h3>
    <ul style="color: #455a64; font-size: 1rem; line-height: 1.8; padding-left: 20px;" class="requirement-list">
      <li>Minimum qualification: <strong>B.A (English), B.A (Japanese), B.C.Sc, or higher</strong>.</li>
      <li>At least <strong>3 years of teaching experience</strong>.</li>
      <li>Strong communication and presentation skills.</li>
      <li>Ability to create engaging lessons and motivate students.</li>
      <li>Knowledge of modern teaching methods and digital tools is a plus.</li>
      <li>Commitment to professionalism and continuous learning.</li>
    </ul>
  </div>
    <v-btn
      color="primary"
      class="mt-4"
     @click="showForm=true"
    >
      Apply Now
    </v-btn>
  </div>

  <!-- Hiring Image -->
  <v-img
    src="@/assets/hiring1.jpg"
    alt="Hiring Invitation"
    
    style="border-radius: 16px;  width: 500px; height: 500px;"
  />
  <v-dialog v-model="showForm" max-width="700px">
    <v-card class="rounded-xl" elevation="12" style="background-color: #f0f4f8;">
      
      <v-card-title class="d-flex justify-space-between align-center px-6 pt-6">
        <span class="text-h5 font-weight-bold" style="color: #1a237e;">Join Our Team</span>
        <v-btn icon color="red" @click="showForm = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-6 overflow-y-auto" style="max-height: 500px;">
        <v-form ref="form" v-model="valid">
          <v-row dense>
            <!-- <v-col cols="12" class="d-flex flex-column align-center">
              <v-avatar size="120" class="mb-4 elevation-6" style="border: 4px solid #fff;">
                <v-img
                  v-if="photoPreview"
                  :src="photoPreview"
                  alt="Profile Photo Preview"
                  cover
                ></v-img>
                <v-icon v-else size="80" color="grey lighten-1">mdi-account-circle</v-icon>
              </v-avatar>
              <v-file-input
                v-model="photo"
                label="Upload Profile Photo"
                prepend-icon="mdi-camera"
                accept="image/*"
                @change="previewImage"
                variant="outlined"
                density="compact"
                class="mb-4"
              />
            </v-col> -->
               <v-col cols="12" sm="6">
              <v-select
                v-model="user.gender"
                :items="genderList"
                label="Gender"
                :rules="[(v) => !!v || 'Gender is required']"
                variant="outlined"
                density="compact"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                label="Full Name"
                v-model="formattedName"
                :rules="[rules.required, rules.name]"
                variant="outlined"
                density="compact"
              />
            </v-col>
            
            <v-col cols="12" sm="6">
              <v-text-field
                label="Username (for login)"
                v-model="user.userName"
                :rules="[(v) => !!v || 'Username is required']"
                variant="outlined"
                density="compact"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="user.password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                :rules="passwordRules"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword = !showPassword"
                variant="outlined"
                density="compact"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="user.email"
                label="Email"
                :rules="[rules.required, rules.email]"
                variant="outlined"
                density="compact"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="user.nrc"
                label="NRC"
                :rules="[rules.required, rules.nrc]"
                variant="outlined"
                density="compact"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="user.phonenum"
                label="Phone Number"
                :rules="[rules.required, rules.phone]"
                variant="outlined"
                density="compact"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-menu
                v-model="dateBirth"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-model="user.age"
                    label="Date of Birth"
                    :rules="[rules.required, rules.age]"
                    readonly
                    v-bind="props"
                    variant="outlined"
                    density="compact"
                  />
                </template>
                <v-date-picker
                  v-model="birthPicker"
                  color="primary"
                  hide-header
                  @update:modelValue="dateBirth = false"
                />
              </v-menu>
            </v-col>
         

            <v-col cols="12" sm="6">
              <v-select
                v-model="user.degree"
                :items="degreeOptions"
                label="Degree"
                :rules="[(v) => !!v || 'Degree is required']"
                variant="outlined"
                density="compact"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-menu
                v-model="startMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-model="user.startDate"
                    label="Apply Date"
                    readonly
                    v-bind="props"
                    variant="outlined"
                    density="compact"
                    disabled
                  />
                </template>
                <v-date-picker
                  v-model="startPicker"
                  color="primary"
                  hide-header
                  @update:modelValue="startMenu = false"
                />
              </v-menu>
            </v-col>

            <v-col cols="12" sm="6">
              <v-textarea
                v-model="user.address"
                label="Address"
                variant="outlined"
                density="compact"
              />
            </v-col>
            <!-- <v-col cols="12" sm="6">
              <v-file-input
                v-model="file"
                label="Please Upload Your CV"
                accept=".pdf"
                prepend-icon="mdi-file-document"
                variant="outlined"
                density="compact"
                :rules="[(v) => !!v || 'CV is required']"
              />
            </v-col> -->
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end px-6 pb-6">
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
  </v-app>
   
</template>


<script>
import languageService from "../service/LanguageService.js";
import axios from "@/config";
import { format } from "date-fns";
import userService from "@/service/UserAccountService";
export default {
  data() {
    return {
      images: [
      "/src/assets/homepage.jpg",
      "/src/assets/homepage1.jpg",
      "/src/assets/hpp.jpg",
      "/src/assets/homepageLanguage2.jpg",
    ],
    degreeOptions: [
      "B.C.Sc",
      "M.C.Sc",
      "Ph.D(IT)",
      "B.A (English)",
      "M.A (English)",
      "B.A (Japanese)",
      "M.A (Japanese)",
      "B.C.Tech",
      "M.C.Teach",
      "Ph.D (CHT)",
      "D.C.Sc",
      "M.A.Sc",
    ],
    genderList: ["Female", "Male"],
    photos: [],
    photo: null,
    photoPreview: null,
    file: null,
    latestUserLanguages: [],
    teachers: [],
    
    // This is the duplicate declaration that causes the problem
    // You have another 'valid: false' later on as well.
    // valid: false, 

    user: {
      userType: "TEACHER",
      name: "",
      gender: "",
      degree: "",
      startDate: "",
      age: "",
      userName: "",
      password: "",
      nrc: "",
      email: "",
      phonenum: "",
      address: ""
    },
    userAccounts: [],
    showForm: false, // Keep this one and initialize it
    valid: false, // Keep this one and initialize it
    email: "",
    phone: "",
    nrc: "",
    showPassword: false,
    birthPicker: new Date(),
    dateBirth: false,
    rules: {
      required: (v) => !!v || "This field is required",
      email: (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Invalid email format",
      phone: (v) =>
        /^(?:0|\+95)9[24679]\d{7,9}$/.test(v) || "Invalid Myanmar phone number",
    nrc: (v) =>
        /^\d{1,12}\/[A-Z]{3}\([NPE]\)\d{6}$/.test(v) || "Invalid NRC format",
        name: (v) =>
        /^(?:Dr\.\s*)?[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(v) || "Invalid name format",
        // password: (v)=> /[A-Za-z0-9]\d{8}/.test(v) || "invalid",

        age: (v) => {
    if (!v) return "Date of Birth is required";
    const today = new Date();
    const birthDate = new Date(v.split("-").reverse().join("-")); // Convert dd-MM-yyyy to yyyy-MM-dd
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return (age >= 23 && age <= 70) || "You must be between 23 and 70 years old ";
  }
    },
    startPicker: new Date(),
    startMenu: false,
    userTypeList: ["ALL", "STAFF", "STUDENT", "TEACHER", "ADMIN"],
    saveOrupdate: "SAVE",

   
     
  }
},
  
  mounted() {
    this.user.startDate = format(this.startPicker, "dd-MM-yyyy");
    
    this.getLatestUserLanguages();
    this.getTeachers();
    this.showForm = false;
    
  },
  methods: {
    
formatTeacherName(teacher) {
  if (teacher.degree?.includes("Ph.D")) {
    return `Dr. ${teacher.name}`;
  } else {
    return teacher.gender === "Female"
      ? `Daw ${teacher.name}`
      : `U ${teacher.name}`;
  }
},


    
      // saveUser() {
      //     this.showForm = false;
      //     userService.addUser(this.user);
      //     this.$swal({
      //       icon: "success",
      //       title: "Rigister successfully!",
      //       showConfirmButton: false,
      //       timer: 1000,
      //     });
      previewImage() {
  if (this.photo) {
    this.photoPreview = URL.createObjectURL(this.photo);
  }
},
async saveUser() {
  try {
    // Prepare user object to save with formattedName
    const userToSave = { ...this.user, name: this.formattedName };

    // Create user (returns ID)
    const createdUserId = await userService.addUserFree(userToSave);

    // Upload photo if provided
    if (this.photo) {
      const formData = new FormData();
      formData.append("file", this.photo);
      await userService.updatePhoto(formData, createdUserId);
    }
    if (this.file) {
      const fileForm = new FormData();
      fileForm.append("file", this.file);
      await userService.updateFile(fileForm, createdUserId);
    }

    this.showForm = false;
    this.$swal({
      icon: "success",
      title: "Congratulations!",
      text: "You are now a Learn Hub Teacher. Please log in.",
      showConfirmButton: true,
      confirmButtonText: "OK",
      timer: 10000,
    });
  } catch (error) {
    console.error("Registration failed", error);
    this.$swal({
      icon: "error",
      title: "Registration failed!",
      text: "Please try again later.",
    });
  }
},



     getLatestUserLanguages() {
      languageService.getLanguageListFree() 
        .then((response) => {
          // console.log("Course list response:", response);
          // Sort by ID (or createdAt if available), then take the latest 4
          const sorted = response.sort((a, b) => b.languagesId - a.languagesId);
          this.latestUserLanguages = sorted.slice(0, 3);
        })
        .catch((error) => {
          console.error("Failed to fetch languages:", error);
        });
    },
     getLanguagePhotoUrl(lanPhoto) {
      return `${axios.defaults.baseURL}/languagephoto/${lanPhoto}.png`;
    },
    goToUserCourses(languages){
     
      let languagesId = languages.languagesId;
      let query = { languagesId };
      this.$router.push({
        name: "userlessons",
        query,
      });

    },
    
    
getTeachers() {
  userService.getUserListFree("TE")
    .then((response) => {
      const sorted = response
        .filter(user => user.userType === "TEACHER")
        .sort((a, b) => b.id - a.id); // Or use createdAt if available

      this.teachers = sorted.slice(0, 4); //
    })
    .catch((error) => {
      console.error("Failed to fetch teachers:", error);
    });
},

  getUserPhotoUrl(photo) {
  if (!photo) return "/default-avatar.png"; // fallback image
  return `${axios.defaults.baseURL}/userphoto/${photo}.png`;
},
// submitCV() {
//   if (this.$refs.cvForm.validate()) {
//     console.log("Form data:", this.form); 

    
//     const newUser = {
//       name: this.form.name,
//       email: this.form.email,
//       phone: this.form.phone,
//       cv: this.form.cv?.name || "No file", // show file name if any
//     };

    
//     this.userAccounts.push(newUser);

//     // Reset form
//     this.form = {
//       name: "",
//       email: "",
//       phone: "",
//       cv: "",
//     };
//     this.dialog = false;

//     this.$nextTick(() => {
//       this.$refs.cvForm.resetValidation(); // clear validation states
//     });

//     alert("Your CV has been submitted successfully!");
//   } else {
//     alert("Please fill all fields correctly.");
//   }
// }


  

},
computed: {
formattedName: {
  get() {
    const rawName = this.user.name.replace(/^(Dr\.|U|Daw)\s*/, '');
    if (this.user.degree?.includes("Ph.D")) {
      return `Dr. ${rawName}`;
    }
    const prefix = this.user.gender === "Female" ? "Daw" : "U";
    return `${prefix} ${rawName}`;

    
  },
  set(value) {
    this.user.name = value.replace(/^(Dr\.|U|Daw)\s*/, '');
  }
}

  
},



  watch: {
    'user.degree'(newDegree) {
    if (newDegree && newDegree.includes("Ph.D")) {
      if (!this.user.name?.startsWith("Dr.")) {
        this.user.name = "Dr. " + (this.user.name || "");
      }
    }
  },
   birthPicker(){
      this.dateBirth = false;
      this.user.age = format(this.birthPicker,"dd-MM-yyyy");
    },
    startPicker() {
      this.startMenu = false;
      this.user.startDate = format(this.startPicker, "dd-MM-yyyy");
    },},
   components: {}
};

</script>

<style scoped>

.modern-contact {
  background: linear-gradient(135deg, #b3cce7, #5999f8);
  color: #333;
}


.modern-hero-img{
  margin-top: 50px;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px; 
  width: 500px; 
  opacity: 1;
  transform: translateZ(5px);
  /* transition: transform 0.3s ease, box-shadow 0.3s ease; */
  cursor: pointer;
}

.hero-image {
   border-radius: 12px;
  aspect-ratio: 1;
  object-fit: cover;
  width: 100%;
  display: block;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}
.hero-image:hover{
   transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.gradient-text {
  background: linear-gradient(90deg, #1976d2, #42a5f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.v-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.glass-card {
  background: antiquewhite;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.glass-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}
.learn-more-btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 20px;
  margin-top: 10px;
  border-radius: 25px;
  font-weight: bold;
  color: white;
  background: linear-gradient(45deg, #4fc3f7, #1976d2);
  text-decoration: none;
  transition: 0.3s ease;
}
.learn-more-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.v-card {
  overflow: visible !important;
}
.v-hover {
  overflow: visible !important;
}
.v-col {
  overflow: visible !important;
}
.requirement-list {
  list-style: none;
  padding-left: 0;
  font-size: 1rem;
  color: #455a64;
}
.requirement-list li {
  position: relative;
  margin-bottom: 10px;
  padding-left: 28px;
}
.requirement-list li::before {
  content: "✔";
  position: absolute;
  left: 0;
  color: #0288d1;
  font-weight: bold;
}





</style>
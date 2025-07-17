<template>
  
  <v-app>
  
 <v-container fluid class="modern-contact px-0 py-0"> 
    <section class="hero-section modern-hero">
      <v-row class="align-center justify-center" no-gutters>
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
            <v-btn color="primary" large class="white--text">
      Get Started
    </v-btn>
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
      v-for="(courses, index) in latestUserCourses"
      :key="courses.coursesId"
     cols="12" sm="6" md="3" class="px-2 mb-6">

      <Motion preset="slideVisibleBottom" :duration="500" :delay="index * 200">
      <v-card
     class="glass-card text-center d-flex flex-column align-center justify-space-between"
     elevation="8"
     style="border-radius: 30px; padding: 20px; transition: transform 0.3s;">
        <v-avatar size="180" class="mb-4 mx-auto" rounded="circle">
          <v-img
            :src="getCoursePhotoUrl(courses.cphoto)"
            alt="Course"
            cover
            loading="lazy"
          />
        </v-avatar>
         <div class="mt-2">
        <h3 class="text-h6 font-weight-bold mb-2" style="color:#4577ed;">
        {{ courses.languagesDto?.name }}
        </h3>

        <!-- description -->
        <p class="text-subtitle-2 mt-1" style="color: #546e7a;">
          {{ courses?.description }}
       </p>
        </div>
        <v-chip
      color="green lighten-2"
      text-color="white"
      class="mb-2 font-weight-bold"
      style="font-size: 16px;"
    >
      💵 Fee: {{ courses.amount }} MMK
    </v-chip>
        <v-btn
          color="primary"
          :href="`/lessons/${lessonsId}`"
           class="mt-4 px-6 py-2 text-uppercase font-weight-bold"
         style=" background: linear-gradient(45deg, #4fc3f7, #1976d2);color: white;border-radius: 25px;transition: 0.3s ease; "
        >Interested
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

    <!-- Card Content -->
    <v-card-text class="text-center mt-10 px-4 pb-6">
      <h3 class="text-h6 font-weight-bold" style="color:#1976d2;">{{ teacher.name }}</h3>
      <p style="color: #607d8b;">🎓 Degree: {{ teacher.degree }}</p>
      <p style="color: #607d8b;">📧 {{ teacher.email }}</p>
    </v-card-text>
  </v-card>
</v-hover>
    </v-row>
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
    <p style="color: #455a64; font-size: 2rem;">
      Join our growing team! We're looking for passionate instructors and tech enthusiasts to empower learners worldwide.
    </p>
    <v-btn
      color="primary"
      class="mt-4"
     @click="dialog=true"
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

  <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="text-h5 font-weight-bold" style="text-align: center;">Submit Your CV</v-card-title>
        <v-card-text>
          <v-form ref="cvForm">
            <v-text-field label="Full Name" v-model="form.name" required prepend-icon="mdi-account "></v-text-field>
            <v-text-field label="Email" v-model="form.email" type="email" required prepend-icon="mdi-email-variant"></v-text-field>
            <v-text-field label="Phone Number" v-model="form.phone" required prepend-icon="mdi-phone-in-talk"></v-text-field>
            <v-file-input
              label="Upload CV (PDF/DOC)"
              v-model="form.cv"
              accept=".pdf,.doc,.docx"
              required
              prepend-icon="mdi-paperclip"
            ></v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="submitCV">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-container>
  </v-app>
</template>


<script>
import coursesService from "@/service/CoursesService";
import axios from "@/config";
import userService from "@/service/UserAccountService";
export default {
  data() {
    return {
      images:[
        "/src/assets/homepage.jpg",
        "/src/assets/homepage1.jpg",
        "/src/assets/hpp.jpg",
        "/src/assets/homepageLanguage2.jpg",

      ],
       photos: [],
      latestUserCourses: [],
      teachers:[],
      dialog:false,
      form:{
        name:"",
        email:"",
        phone:"",
        cv:null,
      }
       
      
    //   isLoggedIn: false,
    //  showHero: false,
    //   courses:[
    //     {
    //       name:"java",
    //       img:"@/assets/java.jp",
    //       description:"asdfgjkjgkjlgjljgkjgljldjalsjfsjfdkj",
    //     },
    //   ],
    // };
  }
},
  
  mounted() {
    this.getLatestUserCourses();
    this.getTeachers();
  },
  methods: {
     getLatestUserCourses() {
      coursesService.getCourseList() 
        .then((response) => {
          // console.log("Course list response:", response);
          // Sort by ID (or createdAt if available), then take the latest 4
          const sorted = response.sort((a, b) => b.coursesId - a.coursesId);
          this.latestUserCourses = sorted.slice(0, 3);
        })
        .catch((error) => {
          console.error("Failed to fetch courses:", error);
        });
    },
    getCoursePhotoUrl(cphoto) {
      return `${axios.defaults.baseURL}/coursephoto/${cphoto}.png`;
    },
    
 getTeachers() {
  userService.getUserList()
    .then((response) => {
      const sorted = response
        .filter(user => user.userType === "TEACHER")
        .sort((a, b) => b.id - a.id); // Or use createdAt if available

      this.teachers = sorted.slice(0, 4); // Only latest 4
    })
    .catch((error) => {
      console.error("Failed to fetch teachers:", error);
    });
},
  getUserPhotoUrl(photo) {
  if (!photo) return "/default-avatar.png"; // fallback image
  return `${axios.defaults.baseURL}/userphoto/${photo}.png`;
},
submitCV() {
      if (
        this.form.name &&
        this.form.email &&
        this.form.phone &&
        this.form.cv
      ) {
        // You can upload the CV file to a server here
        console.log("Submitted:", this.form);
        alert("CV submitted successfully!");
        this.dialog = false;
      } else {
        alert("Please fill all fields and upload your CV.");
      }
    },




  

},
  watch: {},
   components: {}
};

</script>

<style scoped>

.modern-contact {
  background: linear-gradient(135deg, #b3cce7, #5999f8);
  color: #333;
}


.modern-hero-img{
  margin-top: 100px;
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




</style>

 
 

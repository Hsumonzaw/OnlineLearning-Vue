<template>
  
  <v-app>
   <v-app-bar flat height="70" color="#2196f3"  class="px-8">
       <v-toolbar-title class="d-flex align-center font-weight-bold white--text">
    <v-avatar size="60" class="mr-2" color="white">
  <v-img
    src="@/assets/unilogo.png"
    alt="Logo"
    cover
  />
</v-avatar>
      CodeLingo
  </v-toolbar-title>
    <v-spacer></v-spacer>

     <div class="centered-nav ">
    <v-btn text  to="/">Home</v-btn>
    <v-btn text to="/usercourses">Courses</v-btn>
    <v-btn text to="">Teachers</v-btn>
    <v-btn text to="">Exam</v-btn>
    </div>
  </v-app-bar>
  <!-- <v-spacer></v-spacer> -->
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
<v-container fluid class="py-10 px-4" style="background: #e3f2fd;">
  <h2 class="text-center font-weight-bold mb-6" style="color: #1976d2">
  Latest Courses
  </h2>

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
</v-container>
  <v-container fluid class="d-flex flex-wrap justify-center pa-6">
    <v-hover v-slot:default="{ isHovering, props }" v-for="(teacher, i) in teachers" :key="i">
      <v-card
        v-bind="props"
        class="mx-4 my-6 pa-4"
        elevation="8"
        :style="isHovering ? 'height: 420px;' : 'height: 240px;'"
        style="width: 300px; transition: 0.3s ease-in-out; overflow: hidden; position: relative;"
      >
        <div
          style="width: 260px; height: 260px; margin: auto; margin-top: -60px; z-index: 1; box-shadow: 0 5px 20px rgba(0,0,0,0.5); border-radius: 4px; overflow: hidden;"
        >
          <v-img :src="teacher.img" cover height="100%" />
        </div>

        <div
          :style="{
            opacity: isHovering ? 1 : 0,
            visibility: isHovering ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease, margin-top 0.3s ease',
            marginTop: isHovering ? '-40px' : '-140px',
            textAlign: 'center',
            padding: '10px 15px',
            position: 'relative',
          }"
        >
          <h3 class="text-h6 font-weight-bold">{{ teacher.name }}</h3>
          <p class="mt-2" style="color: #444;">{{ teacher.description }}</p>
        </div>
      </v-card>
    </v-hover>
  </v-container>

  </v-app>
</template>


<script>
import coursesService from "@/service/CoursesService";
import axios from "@/config";
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
       
      ]
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
  },
  methods: {
     getLatestUserCourses() {
      coursesService.getCourseList() // Use your existing method
        .then((response) => {
          console.log("Course list response:", response);
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
.centered-nav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
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


</style>

 
 

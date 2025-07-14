<template>
  
  <v-app>
    <v-app-bar elevation="2" color="#d3ebf0" dark >
    <v-toolbar-title class="font-weight-bold">
      CodeLingo
    </v-toolbar-title>
    <v-spacer></v-spacer>

     <div class="centered-nav ">
    <v-btn text  to="/">Home</v-btn>
    <v-btn text to="">Courses</v-btn>
    <v-btn text to="">Teachers</v-btn>
    <v-btn text to="">Exam</v-btn>
    </div>
  </v-app-bar>
  <!-- <v-spacer></v-spacer> -->
      <v-container fluid class="main py-12">
        <v-row align="center" justify="center">

    <v-col cols="12" md="6" class="text-center">
      <h1 class="display-2 font-weight-bold mb-4 white--text">Empower Your Learning</h1>
      <p class="mb-6 white--text">Professional courses & expert instructors for your success.</p>
      <v-btn color="primary" large class="white--text">Get Started</v-btn>
    </v-col>

    <v-col cols="12" md="6" class="pa-0 ma-0">
        <div class="image-grid-gap">

      <v-img
       v-for="(img, i) in images"
      :key="i"
        :src="img"
        class="grid-image"
      />
   

  </div>
</v-col>
    </v-row>
</v-container>
  </v-app>

<v-container class="d-flex flex-wrap justify-center">
    <v-hover
      v-for="(course, i) in courses"
      :key="i"
      v-slot="{ isHovering, props }"
    >
      <v-card
        v-bind="props"
        class="ma-4 -card"
        elevation="8"
        :style="isHovering ? 'height: 420px;' : 'height: 215px;'"
      >
        <v-img
          :src="course.img"
          class="mx-auto course-img"
          width="260"
          height="260"
          cover
        ></v-img>

        <div
          class="content text-center px-4 transition-fast-in-fast-out"
          :class="{ 'visible-content': isHovering }"
        >
          <h3 class="text-h6 font-weight-bold">{{ course.name }}</h3>
          <p class="text-body-2">{{ course.description }}</p>
        </div>
      </v-card>
    </v-hover>
  </v-container>


</template>
<script>
export default {
  data() {
    return {
      images:[
        "/src/assets/homepage.jpg",
        "/src/assets/homepage1.jpg",
        "/src/assets/hpp.jpg",
        "/src/assets/homepageLanguage2.jpg",

      ],
      isLoggedIn: false,
      courses:[
        {
          name:"java",
          img:"@/assets/java.jp",
          description:"asdfgjkjgkjlgjljgkjgljldjalsjfsjfdkj",
        },
      ],
    };
  },
  
  mounted() {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  },
  methods: {},
  watch: {},
   components: {}
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
}
.centered-nav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
}
.v-btn:hover {
  background-color:  #61cfd6;
 
}
.main {
  min-height: 85vh;
  background: linear-gradient(135deg, #b3cce7, #5999f8);
}
.image-grid-gap {
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

.grid-image {
   border-radius: 12px;
  aspect-ratio: 1;
  object-fit: cover;
  width: 100%;
  display: block;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}
.grid-image:hover{
   transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  z-index: 2;
}
.course-card {
  width: 300px;
  transition: height 0.3s ease-in-out;
  overflow: hidden;
  padding-top: 30px;
  position: relative;
}
.course-img {
  margin-top: -60px;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  z-index: 1;
  position: relative;
}
.content {
  opacity: 0;
  visibility: hidden;
  margin-top: -100px;
  transition: opacity 0.3s ease-in-out, margin-top 0.3s ease-in-out;
}
.visible-content {
  opacity: 1;
  visibility: visible;
  margin-top: -40px;
  transition-delay: 0.3s;
}

</style>

 
 

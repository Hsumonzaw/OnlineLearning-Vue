
<template>
<!-- Video Card Section -->
<v-container v-if="lessonList && lessonList.length">
  <h2 class="text-center font-weight-bold mb-6" style="color: #1565c0">
    Watch Lessons
  </h2>
  <v-row>
    <v-col
      v-for="(lesson, i) in lessonList"
      :key="lesson.lessonsId"
      cols="12"
      md="6"
      lg="4"
      class="mb-6"
    >
     <v-card elevation="10" class="rounded-xl">
  <v-card-title class="font-weight-bold text-primary">
    {{ lesson.languagesDto?.name || 'Untitled Lesson' }}
  </v-card-title>
        <v-responsive aspect-ratio="16/9">
  <!-- FREE videos -->
  <iframe
    v-if="lesson.freeVideo === 'FREE'"
    :src="getYouTubeEmbedUrl(lesson?.youtube)"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen
  ></iframe>

  <!-- PAID videos visible to ADMIN, TEACHER, or if access approved -->
  <iframe
    v-else-if="lesson.freeVideo === 'PAID' && (
      userData?.role === 'ADMIN' ||
      userData?.role === 'TEACHER' ||
      paidAccessList.includes(lesson.lessonsId)
    )"
    :src="getYouTubeEmbedUrl(lesson?.youtube)"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen
  ></iframe>

  <!-- PAID but not accessible yet -->
  <div
    v-else
    class="d-flex align-center justify-center"
    style="height: 100%; background-color: #e3f2fd;"
  >
    <div class="text-center">
      <p class="font-weight-bold mb-2" style="color: #1976d2;">
         This video is for paid users only.
      </p>
      <v-btn
        color="primary"
        @click="requestAccess(lesson)"
        class="text-uppercase font-weight-bold"
      >
        Buy Now
      </v-btn>
    </div>
  </div>
</v-responsive>



        <!-- Description -->
        <v-card-text class="text-body-2 text-secondary">
    <p><strong>Video Type:</strong> {{ lesson.freeVideo }}</p>
    <p><strong>Date:</strong> {{ lesson.date }}</p>
  </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-container>

</template>
<script>
import lessonService from "../service/LessonsService.js";
export default {
  data: () => ({
      lessonList: [],
        userData: JSON.parse(localStorage.getItem("userData") || "{}"),
           paidAccessList: [],
    
  }),
   props: {},  
  mounted: function() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    // console.log(this.userData.role);
    
    
     this.loadLessons();
  },
  methods: {
    loadLessons() {
    lessonService.getLessonList().then((res) => {
      this.lessonList = res; // ✅ update lessonList
    });
  },
   requestAccess(lesson) {
    // console.log(lesson);
    // lesson.freeVideo = "FREE"
    // lessonService
    //   .updateLesson(lesson)
    //   .then((response) => {
    //     console.log(response);
    //     this.loadLessons();
    //   })

    // setTimeout(() => {
  //   const confirmed = confirm(`Admin approved access to: ${lesson.languagesDto?.name}`);
  //   if (confirmed) {
  //     this.paidAccessList.push(lesson.lessonsId);
  //   }
  // }, 1000);

  },
  getYouTubeEmbedUrl(url) {
  if (!url) return null;

  // Handle youtu.be short links
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  // Handle standard youtube.com/watch?v= links
  if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  return null;
},
    
  // Simulate API call and approval response
  

  
},

  
 
  watch: {},
  components: {}
};
</script>
<style scoped>

</style>

<template>
  <v-row no-gutters class="mt-12 login-full " style="background-color:#C0C0C0 " >
    <v-col class="mt-6">
      <v-row no-gutters>
        <v-col md="2" class=" login-full bg-white">
          <v-table >
          <tbody>
            <tr
              v-for="(item, index) in languageList"
              :key="index"
              :style="{
                backgroundColor:
                  item.languagesId == selectedOne.languagesId
                    ? '#C0C0C0'
                    : 'transparent',
              }"
                @click="clickLanguage(item)"
            >
              <td class="text-left black-text" >{{ item.name }}</td>
            </tr>
            <v-divider />
          </tbody>
        </v-table>
        </v-col>
        <v-col md="10" > 
        <v-row>
    <v-col
      v-for="(lesson, i) in lessonList"
      :key="i"

    >
          <!-- cols="12"
      md="6"
      lg="4"
      class="mb-6" -->
     <v-card elevation="10" class="rounded-xl">
  <v-card-title class="font-weight-bold text-primary">
    {{ lesson.languagesDto?.name || 'Untitled Lesson' }}
  </v-card-title>
        <v-responsive aspect-ratio="16/9">
  <!-- FREE videos -->
   <!-- v-if="lesson.freeVideo === 'FREE'" -->
  <iframe
    
    :src="getYouTubeEmbedUrl(lesson?.youtube)"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen
  ></iframe>

  <!-- PAID videos visible to ADMIN, TEACHER, or if access approved -->
   <!-- v-else-if="lesson.freeVideo === 'PAID' && (
      userData?.role === 'ADMIN' ||
      userData?.role === 'TEACHER' ||
      paidAccessList.includes(lesson.lessonsId)
    )" -->
  <!-- <iframe
    
    :src="getYouTubeEmbedUrl(lesson?.youtube)"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen
  ></iframe> -->

  <!-- PAID but not accessible yet -->
  <!-- <div
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
  </div> -->
</v-responsive>



        <!-- Description -->
        <v-card-text class="text-body-2 text-secondary">
    <p><strong>Video Type:</strong> {{ lesson.freeVideo }}</p>
    <p><strong>Date:</strong> {{ lesson.date }}</p>
  </v-card-text>
      </v-card>
    </v-col>
  </v-row>    
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import languageService from "../service/LanguageService.js";
import lessonService from "../service/LessonsService.js";
export default {
  data: () => ({
    languageList: [],
    selectedOne:{},
    userData:{},
    lessonList:[],

  }),
  props: {},
  mounted: function () {
    
    this.languageListMethod();
  },
  methods: {
    clickLanguage:function(item){
        this.selectedOne = item;
        this.userData = JSON.parse(localStorage.getItem("user"));
    if (this.userData?.password) {
        this.loadLessons(item.languagesId);
      } else {
        this.loadLessonsFree(item.languagesId);
      }
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
     loadLessonsFree(languagesId) {
    lessonService.getLessonListFree("FREE",languagesId).then((res) => {
     // this.lessonList = res; // ✅ update lessonList
      this.lessonList.splice(0);
          this.lessonList.push(...res);
    });
  },
    loadLessons(languagesId) {
    lessonService.getLessonList("ALL",languagesId).then((res) => {
      //this.lessonList = res; // ✅ update lessonList
      this.lessonList.splice(0);
          this.lessonList.push(...res);
    });
  },
    languageListMethod() {

      languageService
        .getLanguageList()
        .then((response) => {
          this.languageList.splice(0);
          this.languageList.push(...response);
          this.selectedOne = this.languageList[0];
        })
        .catch((error) => {
          this.$swal("Fail!", error.response.data.message, "error");
        });
    },
  },
  watch: {},
  components: {},
};
</script>
<style scoped>
.login-full {
  height: 100vh;
}
</style>

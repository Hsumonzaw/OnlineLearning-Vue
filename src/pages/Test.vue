<template>
  <v-container fluid class="pa-4 login-full" style="background-color: #f0f4f8;">
    <v-row no-gutters>
      <!-- Sidebar -->
      <v-col md="2" class="pa-4" style="background-color: white; box-shadow: 2px 0 8px rgba(0,0,0,0.05);">
        <h3 class="text-center font-weight-bold mb-4" style="color:#1565c0;">Languages</h3>
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
            <v-card elevation="5" class="rounded-xl" style="height: 100%;">
              <v-card-title class="font-weight-bold text-primary" style="min-height: 64px;">
                {{ lesson.languagesDto?.name || 'Untitled Lesson' }}
              </v-card-title>

              <v-responsive aspect-ratio="16/9">
                <iframe
                  :src="getYouTubeEmbedUrl(lesson?.youtube)"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowfullscreen
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
  </v-container>
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
  flex-grow: 1;
  min-height: 100%;
}
.selected-language {
  background-color: #c0c0c0 !important;
  border-radius: 8px;
}

.v-list-item {
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.v-list-item:hover {
  background-color: #e3f2fd;
}
</style>
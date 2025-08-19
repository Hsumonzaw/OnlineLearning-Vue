<template>
  <v-container
    class="d-flex flex-column align-center justify-center pa-12"
    style="max-width: 900px; margin: auto;"
  >
    <v-card
      elevation="8"
      class="pa-10"
     style="border-radius: 20px; border: 3px solid #1976d2; width: 900px; max-width: 100%;"
    >
      <!-- Content stays the same -->
      <v-row justify="center" class="mb-6">
        <v-img
          src="@/assets/unilogo.png"
          alt="University Logo"
          max-width="120"
          contain
        />
      </v-row>

      <v-row justify="center">
        <v-icon size="64" color="#1976d2">mdi-certificate</v-icon>
      </v-row>

      <h2
        class="text-h3 font-weight-bold text-center mb-8"
        style="color: #0d47a1;"
      >
        Certificate of Completion
      </h2>

      <p
        class="text-subtitle-1 text-center mb-1"
        style="color: #424242;"
      >
        This certificate is proudly presented to
      </p>

      <p
        class="text-h4 font-weight-bold text-center mb-6"
        style="color: #1a237e; letter-spacing: 1.2px;"
      >
        {{ name }}
      </p>

      <p
        class="text-subtitle-2 text-center mb-4"
        style="color: #616161; max-width: 400px; margin: 0 auto;"
      >
        For successfully completing {{ languagesName }} Exam
        
      </p>

      <p class="text-caption text-center mb-10" style="color: #757575;">
        Date: {{ date }}
      </p>

      <v-row justify="space-between" align="center" class="mt-12 px-8">

        <v-img
          src="@/assets/signature.jpg"
          alt="Signature"
          max-width="80"
          contain
        />
        </v-row>
        
       <v-row>
         <div
          class="text-subtitle-2"
          style="color: #424242; font-weight: 600;"
        >
          Principle of LearnHub
        </div>
  
       </v-row>

      <v-row justify="center" class="mt-8">
        <v-btn @click="pdfCertificate()" color="primary" rounded elevation="6" large style="text-transform: none;">
     <v-icon left>mdi-download</v-icon> Download Certificate
      </v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>


<script>
import Useraccount from './Useraccount.vue';
import quizService from "../service/QuizService.js";
import axios from "@/config";
export default {
  data: () => ({
      languagesId:0,
      coursesId:0,
      userData:{},
      score:0,
      total:0,
      name:"",
      languagesName:"",
  }),
   props: {},
  mounted: function() {
     this.languagesId = this.$route.query.languagesId;    
    this.coursesId = this.$route.query.coursesId;
    this.userData = JSON.parse(localStorage.getItem("user"));

       quizService
        .getExamMark(this.languagesId)
        .then((response) => {
          
          this.score = response;
          this.total = 100;
            
        })
        .catch(() => {
          this.loadError = true;
        }); 
       quizService.getQuizStudent(this.languagesId)
  .then((res) => {
    console.log(res);
          this.languagesName = res[0].languages.name;


    // if (Array.isArray(res) && res.length > 0) {
    //   this.languagesName = res[0].languages.name;
    // } else {
    //   this.languagesName = "Unknown";
    // }
  });


  this.name = this.userData.userName;
},
  methods: {
    pdfCertificate:function(){
       quizService.pdfCertificate(this.score,this.languagesName).then((data) => {
        const url = window.URL.createObjectURL(new Blob([data.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", this.name+" ("+new Date().toISOString().substr(0, 10)+").pdf");
        document.body.appendChild(link);
        link.click();
      });
    }
  },
  computed: {
    // name() {
    //   return this.$route.query.name || "Student";
    // },
    // score() {
    //   return this.$route.query.score || 0;
    // },
    // total() {
    //   return this.$route.query.total || 0;
    // },
    date() {
      const d = this.$route.query.date ? new Date(this.$route.query.date) : new Date();
      return d.toLocaleDateString();
    },
  },
};
</script>

<style scoped>
@media (max-width: 600px) {
  .pa-10 {
    padding: 24px !important;
  }
}
</style>


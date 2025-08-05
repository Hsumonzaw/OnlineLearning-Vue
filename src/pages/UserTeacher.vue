<template>
  <v-app>
    <v-container fluid class="py-8 px-4" style="background: #e1f5fe;">
      
      
      <v-slide-y-transition mode="in-out">
        <v-card
          elevation="3"
          class="pa-6 mx-auto mb-10"
          color="#e3f2fd"
          max-width="800"
        >
          <v-card-title class="text-h5 font-weight-bold text-primary mb-2">
            👋 Welcome to Our Learning Community!
          </v-card-title>

          <v-card-text class="text-body-1">
            Dear Students,<br /><br />
            We're thrilled to have you join us! Our mission is to make learning both effective and enjoyable.
            Whether you're diving into programming, exploring new languages, or mastering your skills, you're in the right place.<br /><br />

            <strong>Remember:</strong> Every expert was once a beginner. Stay curious, ask questions, and never stop learning.
            You've got this — and we're here to help you every step of the way.
            <br /><br />
            <em>“The beautiful thing about learning is that nobody can take it away from you.” – B.B. King</em>
          </v-card-text>
        </v-card>
      </v-slide-y-transition>

      <!-- Teacher Cards -->
      <v-row justify="center">
        <v-fade-transition group>
          <v-hover
            v-for="(teacher, i) in teachers"
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
                <v-avatar size="120" class="elevation-6" color="white">
                  <v-img :src="getUserPhotoUrl(teacher.photo)" cover />
                </v-avatar>
              </div>

              <!-- Card Content -->
              <v-card-text class="text-center mt-10 px-4 pb-6">
                <h3 class="text-h6 font-weight-bold" style="color:#1976d2;">
                  {{ teacher.name }}
                </h3>
                <p style="color: #607d8b;">🎓 Degree: {{ teacher.degree }}</p>
                <p style="color: #607d8b;">📧 {{ teacher.email }}</p>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-fade-transition>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from "@/config";
import userService from "../service/UserAccountService.js";
export default {
  data: () => ({
    teachers: [],
  }),

  mounted() {
    this.getTeachers();
  },

  methods: {
    getTeachers() {
      userService
        .getUserListFree("TE")
        .then((response) => {
          // console.log(response);

          this.teachers.splice(0, this.teachers.length);
          this.teachers.push(...response);

        })
        .catch((error) => {
          this.$swal("Fail!", error.response.data.message, "error");
        });
      // axios
      //   .get(`${axios.defaults.baseURL}/useraccounts`) 
      //   .then((res) => {
      //     this.teachers = res.data.sort((a, b) => b.id - a.id);
      //     console.log("Fetched teachers:", this.teachers);
      //   })
      //   .catch((error) => {
      //     console.error("Failed to fetch teachers:", error);
      //   });
    },

    getUserPhotoUrl(photo) {
      if (!photo) return "/default-avatar.png"; // fallback image
      return `${axios.defaults.baseURL}/userphoto/${photo}.png`;
    },
  },
//   computed: {
//   displayName() {
//     if (this.user.degree && this.user.degree.includes("Ph.D")) {
//       // If degree contains "Ph.D" prefix "Dr." if not already there
//       if (!this.user.name?.startsWith("Dr.")) {
//         return "Dr. " + (this.user.name || "");
//       }
//     }
//     return this.user.name || "";
//   }
// },
// watch: {
//     'user.degree'(newDegree) {
//     if (newDegree && newDegree.includes("Ph.D")) {
//       if (!this.user.name?.startsWith("Dr.")) {
//         this.user.name = "Dr. " + (this.user.name || "");
//       }
//     }
//   },
// }
};
</script>

<style scoped>
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

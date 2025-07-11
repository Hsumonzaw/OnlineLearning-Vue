<template>
  
  <v-app>
    <v-app-bar elevation="2" color="gray" dark >
    <v-toolbar-title class="font-weight-bold">
      Welcome
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text  to="/lessons">Lessons</v-btn>
  </v-app-bar>
    <v-main>
      <v-container class="fill-height d-flex align-center justify-center">
        <v-sheet
          elevation="8"
          rounded
          class="pa-10 text-center"
          max-width="600"
          width="100%"
        >
          <h1 class="text-h4 font-weight-bold mb-4">Welcome to Online Learning App</h1>

          <p class="text-subtitle-1">
            {{ loginStatusText }}
          </p>

          <p class="mt-6 text-body-2 text-grey">
            Explore courses, manage your learning, and grow your knowledge.
          </p>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  computed: {
    loginStatusText() {
      return this.isLoggedIn
        ? "✅ You are already logged in."
        : "🔒 You are not logged in.";
    },
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
</style>

 
 

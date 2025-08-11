<template>
  <v-container>
    <!-- Stat cards -->
    <v-row class="my-6" justify="center" align="center" dense>
      <!-- Students card -->
      <v-col cols="12" sm="4" md="3">
        <v-sheet
          elevation="6"
          rounded
          class="pa-6 d-flex flex-column align-center text-center"
          color="#2196f3"
          style="color: white"
        >
          <v-icon size="56" class="mb-4" color="white">mdi-account-group</v-icon>
          <div class="headline font-weight-bold mb-2">{{ totalStudents }}</div>
          <div class="subtitle-1 font-weight-medium">Total Students</div>
        </v-sheet>
      </v-col>

      <!-- Teachers card -->
      <v-col cols="12" sm="4" md="3">
        <v-sheet
          elevation="6"
          rounded
          class="pa-6 d-flex flex-column align-center text-center"
          color="#4caf50"
          style="color: white"
        >
          <v-icon size="56" class="mb-4" color="white">mdi-school</v-icon>
          <div class="headline font-weight-bold mb-2">{{ totalTeachers }}</div>
          <div class="subtitle-1 font-weight-medium">Total Teachers</div>
        </v-sheet>
      </v-col>

      <!-- Courses card -->
      <v-col cols="12" sm="4" md="3">
        <v-sheet
          elevation="6"
          rounded
          class="pa-6 d-flex flex-column align-center text-center"
          color="#ff9800"
          style="color: white"
        >
          <v-icon size="56" class="mb-4" color="white">mdi-book-open-page-variant</v-icon>
          <div class="headline font-weight-bold mb-2">{{ totalCourses }}</div>
          <div class="subtitle-1 font-weight-medium">Total Courses</div>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Bar chart -->
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">Popular Courses by Revenue</h2>
        <BarChart :chartData="popularCoursesData" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '@/config';
import BarChart from '@/components/BarChart.vue';

export default {
  components: { BarChart },
  data() {
    return {
      totalStudents: 0,
      totalTeachers: 0,
      totalCourses: 0,
      coursesList: [],
      totalRevenue: 0,
    };
  },
computed: {
  popularCoursesData() {
    // Aggregate total amount by course name (language)
    const totals = {};

    this.coursesList.forEach(item => {
      const courseName = item.languagesDto?.name || "Unknown";
      totals[courseName] = (totals[courseName] || 0) + (item.amount || 0);
    });

    return {
      labels: Object.keys(totals),            // ["Japanese N5", "English Basic", ...]
      datasets: [
        {
          label: "Total Revenue",
          backgroundColor: "#3f51b5",
          data: Object.values(totals),        // [1000, 2500, ...]
        },
      ],
    };
  }
  },
  mounted() {
    this.fetchAllCounts();
  },
  methods: {
    async fetchAllCounts() {
      try {
        // Fetch users
        const userRes = await axios.get('useraccounts');
        const users = userRes.data;
        this.totalStudents = users.filter(u => u.userType?.toUpperCase() === 'STUDENT').length;
        this.totalTeachers = users.filter(u => u.userType?.toUpperCase() === 'TEACHER').length;

        // Fetch courses/languages
       const courseRes = await axios.get('courses');
this.coursesList = courseRes.data;
this.totalCourses = this.coursesList.length;
this.totalRevenue = this.coursesList.reduce((sum, c) => sum + (c.amount || 0), 0);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      }
    }
  },
};
</script>


<style scoped>
.v-sheet {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: default;
}
.v-sheet:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 20px rgba(0,0,0,0.25);
  cursor: pointer;
}
</style>
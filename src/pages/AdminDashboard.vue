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
  <!-- Bar Chart -->
  <v-col cols="12" md="8">
    <h2 class="mb-4">Popular Courses by Revenue For This Year</h2>
    <BarChart :chartData="popularCoursesData" />
    
  
    <div style="margin-top: 16px; font-weight: 700; font-size: 1.8rem; color: #555;">
      Total Revenue: {{ formatCurrency(totalRevenue) }}
    </div>
  </v-col>

  <!-- <v-col cols="12" md="4" class="d-flex flex-column justify-center align-center">
    <div style="font-size: 1.5rem; font-weight: 600; color: #3f51b5; margin-bottom: 12px;">
      Legend
    </div>
    <div class="d-flex align-center" style="gap: 10px; cursor: default;">
      <div 
        style="width: 24px; height: 24px; background-color: #3f51b5; border-radius: 4px;">
      </div>
      <div style="font-weight: 700; font-size: 1.25rem;">
        Total Revenue
      </div>
    </div>
  </v-col> -->
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
      languagesList: [],
      totalRevenue: 0,
      coursesList: [],
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
const uniqueLanguages = new Set(
  this.coursesList.map(c => c.languagesDto?.name).filter(name => !!name)
);

this.totalCourses = uniqueLanguages.size;  
this.totalRevenue = this.coursesList.reduce((sum, c) => sum + (c.amount || 0), 0);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      }
    },
     formatCurrency(amount) {
    return new Intl.NumberFormat('en-MM', { style: 'currency', currency: 'MMK' }).format(amount);
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
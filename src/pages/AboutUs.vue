<template>
  <v-container class="pa-4 pt-16" fluid>
    <v-row>
      <v-col cols="12" class="text-center mb-8">
        <h1 class="display-1 font-weight-bold" style="color:#1565c0;">
          About Us
          <v-icon size="48" color="#1565c0" class="ml-2">mdi-school</v-icon>
        </h1>
        <p class="subtitle-1 mx-auto" style="max-width: 600px; color:#555;">
          Learn more about our mission, values, and the passionate team behind our platform.
        </p>
      </v-col>
    </v-row>


    <v-card elevation="5" class="rounded-xl pa-6 mb-10" width="100%" color="#F4ECA3">
      <v-row class="align-center">
        <!-- Carousel -->
        <v-col cols="12" md="4" class="d-flex justify-center">
          <v-carousel
            hide-delimiter-background
            height="250"
            class="rounded-xl elevation-3"
            show-arrows
            cycle
            hide-delimiters
          >
            <v-carousel-item v-for="(img, i) in images" :key="i">
              <v-img
                :src="img"
                class="rounded-xl"
                cover
                height="250"
                transition="fade-transition"
              ></v-img>
            </v-carousel-item>
          </v-carousel>
        </v-col>

        <!-- Text Content -->
        <v-col cols="12" md="7" class="mt-4 mt-md-0">
          <h2 class="font-weight-bold">
            Upgrade your languages and coding skills with our online courses
          </h2>
          <p class="text-body-1">
            Ready to gain in-demand skills to kickstart your tech career?
            Our online platform offers <strong>free trial courses</strong> on
            coding, language learning, and more — all taught by industry professionals.
          </p>
          <div class="mt-4 d-flex align-center">
            <v-btn color="#4fc3f7" dark @click="goToCourses">Start now</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <!-- Language & Coding Skill Cards -->
    <v-row class="mb-8" justify="center" align="center" dense>
      <v-col cols="12" md="6">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            elevation="8"
            class="pa-6 transition-swing text-center"
            :style="{
              background: isHovering ? '#f8bbd0' : '#fce4ec',
              transform: isHovering ? 'scale(1.03)' : 'scale(1)',
              borderRadius: '24px',
              transition: 'all 0.4s ease-in-out'
            }"
          >
            <v-img
              src="@/assets/hpp.jpg"
              class="mb-5 mx-auto rounded-xl"
              contain
              style="max-width: 320px; height: auto;"
            />
            <h3 class="text-h6 font-weight-bold d-flex justify-center align-center mb-2" style="color:#6a1b9a;">
              <v-icon left color="#6a1b9a" class="mr-2">mdi-translate</v-icon>
              Language Learning
            </h3>
            <p class="text-body-2 px-4" style="color:#4a148c">
              Master languages with bite-sized lessons, live conversation rooms, and AI-based pronunciation feedback.
            </p>
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="12" md="6">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            elevation="8"
            class="pa-6 transition-swing text-center"
            :style="{
              background: isHovering ? '#b3e5fc' : '#e1f5fe',
              transform: isHovering ? 'scale(1.03)' : 'scale(1)',
              borderRadius: '24px',
              transition: 'all 0.4s ease-in-out'
            }"
          >
            <v-img
              src="@/assets/hpp.jpg"
              class="mb-5 mx-auto rounded-xl"
              contain
              style="max-width: 320px; height: auto;"
            />
            <h3 class="text-h6 font-weight-bold d-flex justify-center align-center mb-2" style="color:#0277bd;">
              <v-icon left color="#0277bd" class="mr-2">mdi-code-tags</v-icon>
              Coding Skills
            </h3>
            <p class="text-body-2 px-4" style="color:#01579b">
              Learn programming through hands-on projects, real-time feedback, and mentor-led code reviews.
            </p>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <!-- Core Info -->
    <v-container class="py-10">
      <v-row>
        <v-col cols="12" md="4" v-for="(item, i) in coreInfo" :key="i">
          <v-card class="pa-6" elevation="3" color="#e8f5e9" rounded="xl">
            <v-icon size="40" color="green darken-2" class="mb-4">{{ item.icon }}</v-icon>
            <h3 class="text-h6 font-weight-bold mb-2">{{ item.title }}</h3>
            <p class="text-body-2">{{ item.description }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- What We Offer -->
    <v-container class="py-8">
      <v-card elevation="2" rounded="xl" class="pa-8" color="#f3e5f5">
        <h2 class="text-h5 font-weight-bold mb-4 text-center" style="color:#6a1b9a;">
          What We Offer
        </h2>
        <v-row>
          <v-col cols="12" md="3" v-for="(offer, i) in offers" :key="i" class="text-center">
            <v-icon size="40" color="deep-purple darken-2" class="mb-2">{{ offer.icon }}</v-icon>
            <h4 class="text-subtitle-1 font-weight-bold">{{ offer.title }}</h4>
            <p class="text-body-2 px-2">{{ offer.text }}</p>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <!-- Our Values -->
    <v-container class="py-12">
      <v-row>
        <v-col cols="12" md="6" lg="3" v-for="(value, i) in values" :key="i">
          <v-card
            class="pa-6 text-left transition-swing"
            elevation="6"
            style="border-left: 5px solid #4a148c; background-color: #f3e5f5; border-radius: 16px;"
            hover
          >
            <v-icon size="40" class="mb-3" color="deep-purple darken-3">{{ value.icon }}</v-icon>
            <h3 class="text-h6 font-weight-bold mb-2" style="color: #4a148c;">{{ value.title }}</h3>
            <p class="text-body-2" style="color: #4a148c;">{{ value.text }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Join Community -->
    <v-row justify="center">
      <v-col cols="12" md="8" class="text-center">
        <v-card elevation="3" class="pa-8" color="#bbdefb">
          <h2 class="text-h5 font-weight-bold mb-4" style="color:#0d47a1;">
            <v-icon left color="#0d47a1">mdi-account-multiple-plus</v-icon>
            Join Our Learning Community
          </h2>
          <p>
            Ready to start your learning journey? Join thousands of learners who trust us to guide them towards success. Follow us on social media, subscribe to our newsletter, and participate in live events.
          </p>
          <v-btn
            class="mt-6"
            color="primary"
            href="https://facebook.com"
            target="_blank"
            rounded
            elevation="2"
          >
            Follow us on Facebook
            <v-icon right>mdi-facebook</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AboutUsWithCarousel",
  data() {
    return {
      images: [
        "/src/assets/homepage.jpg",
        "/src/assets/homepage1.jpg",
        "/src/assets/hpp.jpg",
        "/src/assets/homepageLanguage2.jpg",
      ],
      coreInfo: [
        {
          title: 'Our Vision',
          icon: 'mdi-eye-outline',
          description: 'Empowering students through accessible, quality tech and language education.',
        },
        {
          title: 'Our Mission',
          icon: 'mdi-target',
          description: 'To provide engaging and affordable courses to learners everywhere.',
        },
        {
          title: 'Who We Are',
          icon: 'mdi-account-group-outline',
          description: 'A passionate team of educators, developers, and language experts.',
        },
      ],
      offers: [
        { icon: 'mdi-laptop', title: 'Coding Courses', text: 'Learn HTML, CSS, JS, Python, and more.' },
        { icon: 'mdi-translate', title: 'Languages', text: 'Japanese, English, and real-life conversation practice.' },
        { icon: 'mdi-certificate-outline', title: 'Certification', text: 'Get certified and boost your career.' },
      ],
      values: [
        { icon: 'mdi-lightbulb-on-outline', title: 'Innovation', text: 'We embrace the future of learning.' },
        { icon: 'mdi-heart-outline', title: 'Passion', text: 'Driven by love for teaching and tech.' },
        { icon: 'mdi-account-check-outline', title: 'Integrity', text: 'We uphold honesty and transparency.' },
        { icon: 'mdi-earth', title: 'Accessibility', text: 'Education for everyone, everywhere.' },
      ],
    };
  },
  methods: {
    goToCourses() {
      this.$router.push('/usercourses');
    },
  },
};
</script>

<style scoped>
.v-card > .v-img {
  border-radius: 12px;
}
@media (max-width: 600px) {
  h2 {
    font-size: 20px;
  }
}
</style>

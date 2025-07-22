<template>
  <v-container class="pt-16">
    <h2 class="text-h5"> JavaScript Quiz</h2>

    <div v-for="(q, index) in questions" :key="index">
      <p>{{ index + 1 }}. {{ q.question }}</p>
      <v-radio-group v-model="answers[index]">
        <v-radio
          v-for="(opt, i) in q.options"
          :key="i"
          :label="opt"
          :value="opt"
          
        />
      </v-radio-group>
    </div>

    <v-btn color="primary" @click="submitQuiz">Submit</v-btn>

    <div v-if="submitted">
      <p class="mt-5">Your score: {{ score }}/{{ questions.length }}</p>

      <div v-if="passed">
        <p class="green--text"> Passed</p>
        <v-btn color="success" @click="askCertificate = true">
          Generate Certificate
        </v-btn>
      </div>
      <div v-else>
        <p class="red--text"> You didn't pass. Try again!</p>
      </div>
    </div>

    <!-- Certificate Dialog -->
    <v-dialog v-model="askCertificate" max-width="600px">
      <v-card>
        <v-card-title>Certificate Info</v-card-title>
        <v-card-text>
          <v-text-field label="Enter your name" v-model="userName" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="askCertificate = false">Cancel</v-btn>
          <v-btn color="green" text @click="goToCertificate">Generate</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {
          question: "Which one is a JavaScript framework?",
          options: ["Vue", "Laravel", "Django"],
          answer: "Vue",
        },
        {
          question: "Which language runs in the browser?",
          options: ["Python", "Ruby", "JavaScript"],
          answer: "JavaScript",
        },
        {
          question: "Which is a JavaScript keyword?",
          options: ["def", "function", "endif"],
          answer: "function",
        },
      ],
      answers: {},
      submitted: false,
      score: 0,
      askCertificate: false,
      userName: "",
    };
  },
  computed: {
    passed() {
      return this.score >= 2;
    },
  },
  methods: {
    submitQuiz() {
      this.score = 0;
      this.questions.forEach((q, i) => {
        if (this.answers[i] === q.answer) this.score++;
      });
      this.submitted = true;
    },
    goToCertificate() {
      this.$router.push({
        name: "certificate",
        query: { name: this.userName, score: this.score },
      });
    },
  },
};
</script>
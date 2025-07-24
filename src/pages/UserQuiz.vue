<template>
  <v-container class="pa-8" max-width="700">
    <h2 class="text-h4 mb-6 text-center">Quiz</h2>

    <!-- <v-alert
      v-if="loadError"
      type="error"
      class="mb-6"
      dense
      border="left"
      colored-border
    >
      Failed to load quiz.
    </v-alert> -->
    <span>{{ minutes }}</span>
    <div v-if="quizList.length">
      <v-form ref="form" @submit.prevent="submitQuiz">
        <v-row v-for="(quiz, index) in quizList" :key="quiz.quizId" class="mb-6">
          <v-col cols="12">
            <div class="font-weight-medium mb-2">
              Q{{ index + 1 }}: {{ quiz.name }}
            </div>
            <v-radio-group
              v-model="quiz.ans"
              :mandatory="true"
              :disabled="showResult"
            >
              <v-radio
                :label="quiz.ansone"
                :value="1"
                dense
                color="primary"
              />
              <v-radio
                :label="quiz.anstwo"
                :value="2"
                dense
                color="primary"
              />
              <v-radio
                :label="quiz.ansthree"
                :value="3"
                dense
                color="primary"
              />
            </v-radio-group>
          </v-col>
        </v-row>

        <v-btn
          color="primary"
          class="mt-4"
          type="submit"
        >
          Submit
        </v-btn>
      </v-form>
    </div>

    <!-- Result Card -->
    <v-card v-if="showResult" class="mt-6 pa-4" outlined>
      <v-card-title>Your Result</v-card-title>
      <v-card-text>
        <div>
          You scored {{ score }} out of {{ quizList.length }} (
          {{ ((score / quizList.length) * 100).toFixed(2) }}% )
        </div>
        <div v-if="score >= passingScore" class="text-success font-weight-bold mt-2">
          🎉 Congratulations! You passed and can generate your certificate.
        </div>
        <div v-else class="text-error font-weight-bold mt-2">
          Sorry, you did not pass. Please try again.
        </div>
        <v-btn
      v-if="score >= passingScore * quizList.length"
      color="success"
      class="mt-4"
      @click="goToCertificate('/certificate')"
    >  Generate Certificate
    </v-btn>
      </v-card-text>
    </v-card>

    <!-- Review Section -->
    <v-card v-if="showResult" class="mt-6 pa-4" outlined>
      <v-card-title>Review Your Answers</v-card-title>
      <v-card-text>
        <v-list dense>
          <v-list-item
            v-for="(quiz, index) in quizList"
            :key="quiz.quizId"
          >
            <v-list-item-content>
              <div>
                <strong>Q{{ index + 1 }}: </strong>{{ quiz.name }}
              </div>
              <div>
                Your Answer:
                <span
                  :class="{
                    'text-success': userAnswers[quiz.quizId] === quiz.correct,
                    'text-error': userAnswers[quiz.quizId] !== quiz.correct
                  }"
                >
                  {{ userAnswers[quiz.quizId] }}
                  <v-icon
                    small
                    v-if="userAnswers[quiz.quizId] === quiz.correct"
                    color="green"
                  >mdi-check-circle</v-icon>
                  <v-icon
                    small
                    v-else
                    color="red"
                  >mdi-close-circle</v-icon>
                </span>
              </div>
              <div v-if="userAnswers[quiz.quizId] !== quiz.correct">
                Correct Answer: <strong>{{ quiz.correct }}</strong>
              </div>
              
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { getMinutes } from "date-fns";
import quizService from "../service/QuizService.js";

export default {
  data() {
    return {
      quizList: [],
      userAnswers: {},
      loadError: false,
      showResult: false,
      score: 0,
      passingScore: 0.6, // 60%
      languagesId :0,
      coursesId:0,
      minutes:"abc",
      minutesCount:0,
    };
  },
  mounted() {
    this.startTimer();
    this.languagesId = this.$route.query.languagesId;
    this.coursesId = this.$route.query.coursesId;
       quizService
        .getExamMark(this.languagesId)
        .then((response) => {
          if(response>0){
             this.$router
          .push({
            path: "/certificate",
          })
          .catch(() => {});
          }else{
            this.fetchQuiz();
          }
        })
        .catch(() => {
          this.loadError = true;
        });
    //
  },
  methods: {
   startTimer() {
    this.timerSeconds = setInterval(() => {
    this.minutesCount += 1;
    const minutes = Math.floor(this.minutesCount / 60);
    const seconds = this.minutesCount % 60;
    this.minutes = `${minutes}m ${seconds}s`;
  }, 1000);
},
    goToCertificate:function(path){
        this.$router.push({ path }).catch(() => {});
    },
    fetchQuiz() {
      quizService
        .getQuizStudent(this.languagesId)
        .then((response) => {
          this.quizList = response;
          this.quizList.forEach((q) => {
            this.$set(this.userAnswers, q.quizId, null);
          });
        })
        .catch(() => {
          this.loadError = true;
        });
    },
    submitQuiz() {
       clearInterval(this.timerSeconds)

      const allAnswered = this.quizList.every(
        (q) => this.userAnswers[q.quizId] !== null
      );
      if (!allAnswered) {
        this.$swal("Please answer all questions before submitting.");
        return;
      }

      // Calculate score
     this.score = this.quizList.reduce((acc, q) => {
     const correctAnswerText = this.getCorrectAnswerText(q);
     return acc + (this.userAnswers[q.quizId] === correctAnswerText ? 1 : 0);}, 0);

      this.showResult = true;
      const resultPayload = {
      studentName: localStorage.getItem("userName"), 
      score: this.score,
      total: this.quizList.length,
      date: new Date().toISOString(),
      answers: this.userAnswers,
     
      };
   quizService
        .saveAns(this.coursesId,this.quizList,this.minutesCount)
        .then((response) => {

        })
        .catch(() => {
          this.loadError = true;
        });



    },
    getCorrectAnswerText(quiz) {
  switch (quiz.correct) {
    case 1:
      return quiz.ansone;
    case 2:
      return quiz.anstwo;
    case 3:
      return quiz.ansthree;
    default:
      return null;
  }
}

  },
};
</script>

<style scoped>
.text-success {
  color: #4caf50;
}
.text-error {
  color: #f44336;
}
</style>

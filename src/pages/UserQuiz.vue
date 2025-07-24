<template>
  <v-container class="pa-8" max-width="700">
    <h2 class="text-h4 mb-6 text-center font-weight-bold " style="color:blue;">Quiz</h2>
    <p class="text-subtitle-1 text-center mb-4" style="color: #546e7a;">
    Achieve a minimum of 50 to pass. A score of 60 or higher qualifies you for a certificate.
   </p>

    <v-chip v-if="!showResult" class="ma-2" color="blue lighten-4" text-color="blue darken-2">
  ⏳ Time: {{ minutes }}
</v-chip>
    <div v-if="quizList.length && !showResult">
     <v-form ref="form" @submit.prevent="submitQuiz">
    <transition-group name="fade-slide" tag="div">
      <v-row
        v-for="(quiz, index) in quizList"
        :key="quiz.quizId"
        class="mb-4"
      >
        <v-col cols="12">
          <v-card
            elevation="4"
            class="pa-4"
            style="border-radius: 16px; background: #e1f5fe ;"
          >
            <div class="font-weight-bold mb-3 text-subtitle-1" style="color: #1976d2;">
              Q{{ index + 1 }}. {{ quiz.name }}
            </div>

            <v-radio-group
              v-model="quiz.ans"
              :mandatory="true"
              :disabled="showResult"
            >
              <v-radio
                :label="quiz.ansone"
                :value="1"
                color="blue darken-2"
                class="mb-2"
              />
              <v-radio
                :label="quiz.anstwo"
                :value="2"
                color="blue darken-2"
                class="mb-2"
              />
              <v-radio
                :label="quiz.ansthree"
                :value="3"
                color="blue darken-2"
              />
            </v-radio-group>
          </v-card>
        </v-col>
      </v-row>
    </transition-group>

    <div class="text-center mt-6">
      <v-btn
        color="primary"
        class="px-6 py-3 text-uppercase font-weight-bold"
        style="border-radius: 25px; background: linear-gradient(45deg, #42a5f5, #1565c0);"
        type="submit"
      >
        Submit Quiz
      </v-btn>
    </div>
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
      @click="goToCertificate()"
    >  Generate Certificate
    </v-btn>
      </v-card-text>
    </v-card>

    <!-- Review Section -->
    <!-- <v-card v-if="showResult" class="mt-6 pa-4" outlined>
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
    </v-card> -->
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
      passingScore: 0.6, 
      languagesId :0,
      coursesId:0,
      minutes:"0m 0s",
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
            let languagesId = this.languagesId;
      let coursesId = this.coursesId;
      let query = { languagesId,coursesId };
             this.$router
          .push({
            path: "/certificate",
             query,
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
    goToCertificate:function(){
        let languagesId = this.languagesId;
      let coursesId = this.coursesId;
      let query = { languagesId,coursesId };
             this.$router
          .push({
            path: "/certificate",
             query,
          })
          .catch(() => {});
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
     this.score = 0;
     for(let i=0;i<this.quizList.length;i++){
        let obj = this.quizList[i];
        if(obj.ans==obj.correct){
             this.score+=1
        }
     }
    //  this.quizList.reduce((acc, q) => {
    //  const correctAnswerText = this.getCorrectAnswerText(q);
    //  return acc + (this.userAnswers[q.quizId] === correctAnswerText ? 1 : 0);}, 0);

      this.showResult = true;
      // const resultPayload = {
      // studentName: localStorage.getItem("userName"), 
      // score: this.score,
      // total: this.quizList.length,
      // date: new Date().toISOString(),
      // answers: this.userAnswers,
     
      // };
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

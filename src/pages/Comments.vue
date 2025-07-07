<template>
<!-- <v-row no-gutters>
    <v-col cols="8" md="8">
      <v-table fixed-header height="92vh" density="compact">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center white--text bg-primary">No.</th>
              <th class="text-center white--text bg-primary">UserName</th>
              <th class="text-center white--text bg-primary">Lesson</th>
              <th class="text-center white--text bg-primary">Comments</th>
              <th class="text-center white--text bg-primary">Date</th>
              <th class="text-center white--text bg-primary">ModifiedDate</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in commentsList"
              :key="item.commentsId"
              @click="selectedOne = item"
              :style="{
                backgroundColor:
                  item.commentsId == selectedOne?.commentsId
                    ? '#def3ff'
                    : 'transparent',
              }"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ item.user?.name }}</td>
              <td class="text-center">{{ item.lesson?.lessonId }}</td>
              
              <td class="text-center">{{ item.messages }}</td>

              <td class="text-start">{{ item.date }}</td>
              <td class="text-start">{{ item.modifiedDate }}</td>
            </tr>
          </tbody>
        </template>
      </v-table>
    </v-col>
   </v-row> -->
  <v-data-table
    :headers="headers"
    :items="commentsList"
    item-value="commentsId"
      hide-default-footer
  >
    <template #item="{ item, index }">
      <tr>
        <td class="text-center">{{ index + 1 }}</td>
        <td class="text-center">{{ item.userAccountDto?.name || '-' }}</td>
        <td class="text-center">{{ item.lessonsDto?.lessonsId || '-'}}</td>
        <td class="text-center">{{ item.messages }}</td>
        <td class="text-center">{{ formatDate(item.date) }}</td>
        <td class="text-center">{{ formatDate(item.modifiedDate) }}</td>
      </tr>
    </template>
  </v-data-table>
</template>
<script>
import { format } from "date-fns";
import rateService from "../service/RatingService.js";
export default {
  data: () => ({
    headers: [
        { title: "No.", key: "no" },
        { title: "User Name", key: "userAccountDto" },
        { title: "Lesson ID", key: "lessonsDto" },
        { title: "Comments", key: "messages" },
        { title: "Date", key: "date" },
        { title: "Modified Date", key: "modifiedDate" },
      ],

    ratingList:[],
    rate : {},
    startPicker: new Date()
  }),
   props: {},
  mounted: function() {
    this.rate.startDate = format(this.startPicker, "dd-MM-yyyy");
    this.ratingListMethod();

  },
  methods: {
    // loadUserList:function(){
    //   this.ratingListMethod();
    // }, 
    formatDate(datePicker) {
      const [year, month, day] = datePicker.split("-");
      return `${day}-${month}-${year}`;
    },
    ratingListMethod() {
      rateService
        .getRatingList()
        .then((response) => {
             console.log("Rating Data:", response);
          this.ratingList.splice(0);
          this.ratingList.push(...response);
        })
        .catch((err) => console.error("Fetch error:", err));
        // .catch((error) => {
        //   // this.$swal("Fail!", error.response.data.message, "error");
        // });
    },
  },
  watch: {
    startPicker() {
      this.startMenu = false;
      this.rate.startDate = format(this.startPicker, "dd-MM-yyyy");
    },
  },
  components: {}
};
</script>
<style scoped>
table,
th,
td {
  border: 1px solid rgb(215, 215, 215);
  border-collapse: collapse;
  padding: 0 1px !important;
}

.login-full {
  height: 100vh;
}
.information-window-v-sheet {
  height: 100vh !important;
  overflow-x: scroll;

}

</style>
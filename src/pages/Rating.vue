<template>
<v-row no-gutters>
    <v-col cols="8" md="8">
      <v-table fixed-header height="92vh" density="compact">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center white--text bg-primary">No.</th>
              <th class="text-center white--text bg-primary">UserName</th>
              <th class="text-center white--text bg-primary">Lesson</th>
              <th class="text-center white--text bg-primary">Rate</th>
              <th class="text-center white--text bg-primary">Date</th>
              <th class="text-center white--text bg-primary">ModifiedDate</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in ratingList"
              :key="index"
              @click="selectedOne = item"
              :style="{
                backgroundColor:
                  item.ratingsId == selectedOne.ratingsId
                    ? '#def3ff'
                    : 'transparent',
              }"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ item?.name }}</td>
              <td class="text-center">{{ item?.lessonsDto.lessonsId }}</td>
              
              <td class="text-center">{{ item.rate }}</td>

              <td class="text-start">{{ item.date }}</td>
              <td class="text-start">{{ item.modifiedDate }}</td>
            </tr>
            <v-divider />
          </tbody>
        </template>
      </v-table>
    </v-col>
  </v-row>
</template>
<script>
import { format } from "date-fns";
import rateService from "../service/RatingService.js";
export default {
  data: () => ({
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
    loadUserList:function(){
      this.ratingListMethod();
    }, 
    formatDate(datePicker) {
      const [year, month, day] = datePicker.split("-");
      return `${day}-${month}-${year}`;
    },
    ratingListMethod() {
      rateService
        .getRatingList()
        .then((response) => {
          this.ratingList.splice(0);
          this.ratingList.push(...response);
        })
        .catch((error) => {
           this.$swal("Fail!", error.response.data.message, "error");
        });
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
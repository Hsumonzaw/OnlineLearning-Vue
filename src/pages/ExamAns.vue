<template>
 <v-row no-gutters>
    <v-col cols="8" md="8">
      <v-table fixed-header height="92vh" density="compact">
    <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center white--text bg-primary">No</th>

              <th class="text-center white--text bg-primary">CourseId</th>
              <th class="text-center white--text bg-primary">pdf</th>
              <th class="text-center white--text bg-primary">Exam Mark</th>
              <th class="text-center white--text bg-primary">Date </th>
              <th class="text-center white--text bg-primary">Status</th>
              <th class="text-center white--text bg-primary">Action</th>

            </tr>
          </thead>
          <!-- <tbody>
            <tr
              v-for="(item, index) in examList"
              :key="index"
              @click="selectedOne = item"
              :style="{
                backgroundColor:
                  item.examId == selectedOne.examId
                    ? '#def3ff'
                    : 'transparent',
              }"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ item.CoursesDto.coursesId }}</td>
              
              <td class="text-center">{{ item.pdf }}</td>

              <td class="text-start">{{ item.examMark }}</td>
              <td class="text-start">{{ item.date }}</td>

              <td class="text-start">{{ item.status }}</td>

              <td class="text-center">
                <v-btn class="ml-1" small icon color="black" density="compact">
                  <v-icon size="small" @click="photoMethod(item)">mdi-image</v-icon></v-btn>
                <v-btn class="ml-1" small icon color="green" density="compact">
                  <v-icon size="small" @click="editUser(item)">mdi-pencil</v-icon></v-btn>
                <v-btn class="ml-1" small icon color="red" density="compact">
                  <v-icon size="small" @click="deleteUserMethod(item)">mdi-delete</v-icon></v-btn>
              </td>
            </tr>
          </tbody> -->
        </template>
      </v-table>
      <v-col>
        <v-col cols="12" md="12">
        <v-text-field
          label="Courses Id"
          v-model="exam.coursesId"
          :items="coursesList"
          :rules="[(v) => !!v || 'required']" 
          density="compact"
          variant="outlined">
        </v-text-field>
        </v-col>
         <v-col cols="12" md="12">
        <v-text-field
          label="Exam Question"
          v-model="exam.pdf"
          :rules="[(v) => !!v || 'required']"
          density="compact"
          variant="outlined" >
        </v-text-field>
        </v-col>
        <v-col cols="12" md="12">
        <v-text-field
          label="Exam Marks"
          v-model="exam.examMark"
          :rules="[(v) => !!v || 'required']" >
        </v-text-field>
        </v-col>
         <v-col cols="4" md="4" class="pl-2">
      <v-row class="align-center login-full" no-gutters>
        <v-col>
          <v-card variant="outlined" class="mr-2 pl-2 pr-2">
            <v-row no-gutters class="pa-2">
              <v-col cols="12" md="12">
                <v-menu
                  v-model="startMenu"
                  full-width
                  max-width="290px"
                  min-width="290px"
                  v-bind:close-on-content-click="false"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="exam.startDate"
                      density="compact"
                      variant="outlined"
                      label="From Date"
                      readonly
                      v-bind="props"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startPicker"
                    color="primary"
                    hide-header
                  ></v-date-picker>
                </v-menu>
              </v-col>
        <v-col cols="12" md="12">
                <v-autocomplete
                  v-model="exam.status"
                  item-text="status"
                  item-title="status"
                  :items="statusTypeList"
                  label="status"
                  name="status1"
                  return-object
                  required
                  density="compact"
                  variant="outlined"
                  filled
                >
                </v-autocomplete>
          </v-col>
          <v-col cols="12" md="12" class="text-right mb-2">
                <v-btn color="primary " @click="saveData()">{{
                  saveOrupdate
                }}</v-btn>
              </v-col>
     </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    </v-col>
     <!-- <v-col>
      <v-dialog v-model="dialogDelete" width="500">
        <v-card>
          <v-card-title class="text-h5 white--text bg-red"> Delete </v-card-title>

          <v-card-text class="text-h6">
            Are you sure to delete({{ selectedOne.name }})?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="black" text @click="dialogDelete = false"> CANCEL </v-btn>
            <v-btn dark class="bg-red" text @click="clickDeleteDialog()"> DELETE </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col> -->

    </v-col>
    </v-row>

</template>
<script>
import { format } from "date-fns";
import ExamAnsService from "../service/ExamAnsService.js";
// import CoursesService from "../service/CoursesService.js";
import Swal from 'sweetalert2';

export default {
  data: () => ({
    selectedOne :{},
    exam :{},
    examList :[],
    statusTypeList: ["PENDING", "DONE"],
    startPicker: new Date(),
    startMenu: false,
    dialogDelete:false,
    saveOrupdate : "SAVE",
    coursesList:[], 
  }),
   props: {},
  mounted: function() {
    this.exam.startDate = format(this.startPicker, "dd-MM-yyyy");
    this.examListMethod();
    this.coursesListMethod();
  },
  methods: {
     examListMethod() {
      ExamAnsService.getExamList().then((res) => {
              // console.log("examList =>", res);
         this.examList = res;
      });
    },
    saveData: function () {
      if (this.saveOrupdate == "SAVE") {
        ExamAnsService
        .addExamList(this.exam)
          .then((response) => {
            // console.log(response);
            this.exam = {};
            this.examListMethod();
            this.$swal({
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .catch((error) => {
            this.$swal("Fail!", error.response.data.message, "error");
            //  console.error("Save error:", error);

          });
      } else {
        ExamAnsService
          .updateExam(this.exam)
          .then((response) => {
            this.saveOrupdate="SAVE";
            this.exam = {};
            this.examListMethod();
            this.$swal({
              icon: "success",
              title: "Your work has been updated",
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .catch((error) => {
            this.$swal("Fail!", error.response.data.message, "error");
          });
      }
    },
    formatDate(datePicker) {
      const [year, month, day] = datePicker.split("-");
      return $`{day}-${month}-${year}`;
    },
  },
  watch: {
     startPicker() {
      this.startMenu = false;
      this.exam.startDate = format(this.startPicker, "dd-MM-yyyy");
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
</style>s
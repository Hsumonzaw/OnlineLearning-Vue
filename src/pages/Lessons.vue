<template>
<v-row no-gutters>
    <v-col cols="8" md="8">
      <v-table fixed-header height="92vh" density="compact">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center white--text bg-primary">No.</th>
              <!-- <th class="text-center white--text bg-primary">UserName</th> -->
              <th class="text-center white--text bg-primary">Languages Name</th>
              <th class="text-center white--text bg-primary">youtube</th>
              <th class="text-center white--text bg-primary">pdf</th>
              <th class="text-center white--text bg-primary">Video Type</th>
              <th class="text-center white--text bg-primary">Amount</th>

              <th class="text-center white--text bg-primary">Date</th>
              <th class="text-center white--text bg-primary">ModifiedDate</th>

              <th class="text-center white--text bg-primary">Action</th>

            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in lessonList"
              :key="index"
              @click="selectedOne = item"
              :style="{
                backgroundColor:
                  item.lessonsId == selectedOne?.lessonsId
                    ? '#def3ff'
                    : 'transparent',
              }"
            >
              <td class="text-center">{{ index + 1 }}</td>
             
              <td class="text-center">{{ item.languagesDto.name }}</td>
              <td class="text-center">{{ item.youtube }}</td>
              <td class="text-center">{{ item.pdf }}</td>
              <td class="text-center">{{ item.freeVideo || '-' }}</td>
              <td class="text-center">{{ item.amount || '-' }}</td>

              <td class="text-start">{{ item.date }}</td>
              <td class="text-start">{{ item.modifiedDate }}</td>

               <td class="text-center">
                <v-btn class="ml-1" small icon color="green" density="compact">
                  <v-icon size="small" @click="editLesson(item)">mdi-pencil</v-icon></v-btn
                >
                <v-btn class="ml-1" small icon color="red" density="compact">
                  <v-icon size="small" @click="deleteLessonMethod(item)">mdi-delete</v-icon></v-btn
                >
              </td>
            </tr>
            <v-divider />
          </tbody>
        </template>
      </v-table>
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
                      v-model="lesson.startDate"
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
              <!-- <v-col cols="12" md="12">
              <v-autocomplete
                v-model="lesson.userAccountDto"
                :items="userList"
                item-text="name"
                item-value="id"
                label="Select User"
                outlined
                dense
                return-object
                :rules="[v => !!v  'User required']"
              />
              </v-col> -->
            <v-col cols="12" md="12">
           <v-autocomplete
            v-model="lesson.languagesDto"
            :items="languageList"
            item-text="name"
            item-title="name"
            item-value="language"
            label="Select Language"
            return-object
            dense
            outlined
           :rules="[(v) => !!v || 'language is required']"
          />

            </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  label="Youtube Link"
                  v-model="lesson.youtube"
                  :rules="[(v) => !!v || 'required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  label="Pdf"
                  v-model="lesson.pdf"
                  :rules="[(v) => !!v || 'required']"
                ></v-text-field>
              </v-col>
              
             
             
              <v-col cols="12" md="12">
                <!-- <v-autocomplete
                  v-model="lesson.freeVideo"
                  item-text="freeVideo"
                  item-title="freeVideo"
                  :items="VideoList"
                  label="Video Type"
                
                  return-object
                  required
                  density="compact"
                  variant="outlined"
                  filled
                >
                </v-autocomplete> -->
                <v-autocomplete
                  v-model="lesson.freeVideo"
                  :items="VideoList"
                  label="Video Type"
                  required
                  density="compact"
                  variant="outlined"
                  filled
                ></v-autocomplete>

              </v-col>
                <v-col cols="12" md="12">
           <v-autocomplete
            v-model="lesson.languagesDto"
            :items="languageList"
            item-text="amount"
            item-title="amount"
            item-value="language"
            label="Amount"
            return-object
            dense
            outlined
           :rules="[(v) => !!v || ' required']"
          />

            </v-col>

              <v-col cols="12" md="12" class="text-right mb-2">
                <v-btn color="primary " @click="saveLesson()">{{
                  saveOrupdate
                }}</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col>
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
    </v-col>
    <v-col>
    

    </v-col>
  </v-row>
</template>
<script>
import { format } from "date-fns";
import lessonService from "../service/LessonsService.js";
import languageService from "../service/LanguageService.js";
import Swal from 'sweetalert2';


export default {
  data: () => ({
    selectedOne: {},
     startMenu: false,
    dialogDelete:false,
    lesson: {},
    lessonList:[],
    VideoList : ["FREE", "PAID"],
    startPicker: new Date(),
    saveOrupdate: "SAVE",
    languageList:[],

  }),
   props: {},
  mounted: function() {
    this.lesson.startDate = format(this.startPicker, "dd-MM-yyyy");
    this.languageListMethod();
    this.lessonListMethod();

    //  this.$swal("Hello", "SweetAlert2 is working!", "success");

    //  console.log(this.$swal);
    //  Swal.fire("Title", "Message", "success")
    },
  methods: {
    loadUserList:function(){
      this.lessonListMethod();
    }, 
    //     clickDeleteDialog:function(item){
    //     this.dialogDelete = false;
    //     lessonService
    //       .deleteLesson(this.selectedOne)
    //       .then((response) => {
    //         this.saveOrupdate = "SAVE";
    //         this.lesson = {};
    //         this.lessonListMethod();
    //         this.$swal({
    //           icon: "success",
    //           title: "Your work has been deleted",
    //           showConfirmButton: false,
    //           timer: 1000,
    //         });
    //       })
    //       .catch((error) => {
    //         this.$swal("Fail!", error.response.data.message, "error");
    //       });
    // },
    // deleteLessonMethod:function(item){
    //     this.dialogDelete = true;
    // },
    editLesson:function(item){
      this.saveOrupdate = "UPDATE";
      this.lesson = Object.assign({},item);

      console.log("Editing lesson:", item);
  console.log("freeVideo value:", item.freeVideo);
    },
    formatDate(datePicker) {
      const [year, month, day] = datePicker.split("-");
      return $`{day}-${month}-${year}`;
    },
    saveLesson: function () {
      if (this.saveOrupdate == "SAVE") {
        lessonService
          .addLesson(this.lesson)
          .then((response) => {
          console.log(response);
          
            this.lesson = {};
            this.lessonListMethod();
            Swal.fire({
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .catch((error) => {
            Swal.fire("Fail!", error.response.data.message, "error");
          });
      } else {
        lessonService
          .updateLesson(this.lesson)
          .then((response) => {
            this.saveOrupdate="SAVE";
            this.lesson = {};
            this.lessonListMethod();
            Swal.fire({
              icon: "success",
              title: "Your work has been updated",
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .catch((error) => {
            Swal.fire("Fail!", error.response.data.message, "error");
          });
      }
    },
    lessonListMethod() {
      lessonService
        .getLessonList()
        .then((response) => {
            //  console.log("Rating Data:", response);
          this.lessonList.splice(0);
          this.lessonList.push(...response);
        })
        // .catch((err) => console.error("Fetch error:", err));
        // .catch((error) => {
        //   // this.$swal("Fail!", error.response.data.message, "error");
        // });
      },
       languageListMethod() {
      languageService
        .getLanguageList()
        .then((response) => {
            //  console.log("Rating Data:", response);
          this.languageList.splice(0);
          this.languageList.push(...response);
          this.lesson.languagesDto = this.languageList[0];
        })
        .catch((err) => console.error("Fetch error:", err));
        // .catch((error) => {
        //   // this.$swal("Fail!", error.response.data.message, "error");
        // });
      }
    },

  watch: {
    startPicker() {
      this.startMenu = false;
      this.lesson.startDate = format(this.startPicker, "dd-MM-yyyy");
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
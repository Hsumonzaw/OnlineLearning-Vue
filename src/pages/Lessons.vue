<template>
  <div>
    <!-- Table Section -->
    <v-row>
      <v-col cols="12">
        <h1 style="background-color:rgb(136, 210, 230);text-align: center;">Lessons</h1>
 <v-tooltip location="top">
  <template v-slot:activator="{ props }">
    <v-btn
      v-bind="props"
      icon
      color="blue"
      class="fab-button"
      @click="showForm = true"
    >
      <v-icon size="36" color="white">mdi-plus</v-icon>
    </v-btn>
  </template>
  <span>Add Lesson</span>
</v-tooltip>


        <!-- Table Full Width -->
        <v-table fixed-header height="92vh" >
          <thead>
            <tr>
              <th class="text-center white--text bg-primary">No.</th>
              <th class="text-center white--text bg-primary">UserName</th>
              <th class="text-center white--text bg-primary">Languages Name</th>
              <th class="text-center white--text bg-primary">Youtube</th>
              <th class="text-center white--text bg-primary">PDF</th>
              <th class="text-center white--text bg-primary">Video Type</th>
              <th class="text-center white--text bg-primary" v-if="showTeacher">Amount</th>
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
              <td class="text-center">{{ item.userAccount?.userName }}</td>
              <td class="text-center">{{ item.languagesDto?.name }}</td>
              <td class="text-center">{{ item.youtube }}</td>
              <td class="text-center">{{ item.pdf }}</td>
              <td class="text-center">{{ item.freeVideo || '-' }}</td>
              <td class="text-center" v-if="showTeacher">{{ item.languagesDto.amount || '-' }}</td>
              <td class="text-start">{{ item.date }}</td>
              <td class="text-start">{{ item.modifiedDate }}</td>
              <td class="text-center">
                <v-btn class="ml-1" small icon color="black" density="compact">
                  <v-icon size="small" @click="FileMethod(item)">mdi-file</v-icon></v-btn
                >
                <v-btn class="ml-1" small icon color="green" density="compact" @click="clickEdit(item)" >
                  <v-icon size="small" >mdi-pencil</v-icon>
                </v-btn>
                <v-btn class="ml-1" small icon color="red" density="compact">
                  <v-icon size="small" @click.stop="clickDelete(item)">mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
            <v-divider />
          </tbody>
        </v-table>
      </v-col>
    </v-row>

    <!-- Form Section (centered) -->
    <v-dialog v-model="showForm" max-width="500">

        <v-card class="form pa-4" elevation="4">
          
              <v-card-title class="d-flex justify-space-between align-center">
      <span class="text-h4">Add Lessons</span>
      <v-btn icon color="red" @click="showForm = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    
              <v-card-text>
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
              
           <v-autocomplete
            v-model="lesson.languagesDto"
            :items="languageList"
            item-text="name"
            item-title="name"
            item-value="languagesId"
            label="Select Language"
            return-object
            dense
            outlined
           :rules="[(v) => !!v ||  'language is required']"
           
          />

                <v-text-field
               
                  label="Youtube Link"
                  v-model="lesson.youtube"
                  :rules="[(v) => !!v ||  'required']"
                ></v-text-field>

                <v-autocomplete
                  v-model="lesson.freeVideo"
                  :items="VideoList"
                  label="Video Type"
                  required
                  density="compact"
                  variant="outlined"
                  filled
                ></v-autocomplete>

              <v-text-field
               v-if="showTeacher"
                  label="Amount"
                  :value="lesson.languagesDto?.amount || 0"
                  readonly
                  dense
                  outlined
                ></v-text-field>
                </v-card-text>
                <v-card-actions class="justify-end pr-5">  
                <v-btn  class="text-black"
                style="background-color: #2196f3;" 
                 @click="saveLesson()">{{
                  saveOrupdate
                }}</v-btn>
              </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Delete Dialog -->
    <v-dialog v-model="dialogDelete" width="500">
      <v-card>
        <v-card-title class="text-h5 white--text bg-red">Delete</v-card-title>
        <v-card-text class="text-h6">
          Are you sure to delete({{ selectedOne.name }})?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="black" text @click="dialogDelete = false">CANCEL</v-btn>
          <v-btn dark class="bg-red" text @click="clickDeleteDialog()">DELETE</v-btn>
        </v-card-actions>
      </v-card>
          
    </v-dialog>
    <v-col>
          <v-bottom-sheet v-model="lessonFileDialog" fullscreen scrollable>
        <v-sheet class="information-window-v-sheet">
          <LessonFIle
          @closeDialog="lessonFileDialog=false"
          :lesson="selectedOne"
          @loadLessonList="loadLessonList"
          />
        </v-sheet>
      </v-bottom-sheet>
    </v-col>
    
  </div>
</template>

<script>
import { format } from "date-fns";
import lessonService from "../service/LessonsService.js";
import userService from "../service/UserAccountService.js";

import languageService from "../service/LanguageService.js";
import Swal from 'sweetalert2';


export default {
  data: () => ({
    selectedOne: {},
     startMenu: false,
    dialogDelete:false,
    lesson: {},
    lessonList:[],
    userList:[],
    userType: "STUDENT",
    VideoList : ["FREE", "PAID"],
    startPicker: new Date(),
    saveOrupdate: "SAVE",
    languageList:[],
    showForm: false,
    lessonFileDialog:false,
userData:{},
    showTeacher:false,
  }),
   props: {},
  mounted: function() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    if(this.userData.role=="TEACHER"){
      this.showTeacher = false;
    }else{
      this.showTeacher = true;
    }
    this.lesson.startDate = format(this.startPicker, "dd-MM-yyyy");
    this.languageListMethod();
    this.lessonListMethod();
    this.userListMethod();

    },
  methods: {
     loadLessonList:function(){
      this.lessonFileDialog = false;
       this.lessonListMethod();
       this.showForm = false;
     }, 
     FileMethod:function(item){
        this.selectedOne = item;
        this.lessonFileDialog = true;
    },

     clickDelete:function(item){
        this.selectedOne = { ...item };
        this.dialogDelete = true;
    },
    clickDeleteDialog() {
      lessonService
        .deleteLesson(this.selectedOne)
        .then((response) => {
          this.dialogDelete = false;
          this.$swal({
            icon: "success",
            title: "Your work has been deleted",
            showConfirmButton: false,
            timer: 1000,
          });
          this.lessonListMethod();
        })
        .catch((error) => {
          this.$swal("Fail!", error.response.data.message, "error");
        });
    },
    formatDate(datePicker) {
      const [year, month, day] = datePicker.split("-");
      return $`{day}-${month}-${year}`;
    },
    
    saveLesson: function () {
  if (!this.lesson.languagesDto || !this.lesson.languagesDto.languagesId) {
    this.showForm = false;
    Swal.fire("Error", "Please select a language.", "error").then(() => {
      this.showForm = true;
    });
    return;
  }
  if (!this.lesson.youtube || !this.lesson.freeVideo) {
      this.showForm = false;
    Swal.fire("Error", "Please fill all required fields.",
     "error").then(() => {
      this.showForm = true;
    });
    return;
  }
  

    // Build minimal DTO for backend
  const lessonDto = {
    lessonsId: this.lesson.lessonsId || 0,
    languagesDto: { languagesId: this.lesson.languagesDto.languagesId },
    youtube: this.lesson.youtube,
    pdf: this.lesson.pdf,
    freeVideo: this.lesson.freeVideo,
    date: format(this.startPicker, "yyyy-MM-dd"),
    // no modifiedDate, backend handles it
  };

  // Set lesson.date from date picker
  this.lesson.date = format(this.startPicker, "yyyy-MM-dd");

  // Clear modifiedDate; the backend should set it
  delete this.lesson.modifiedDate;

  if (this.saveOrupdate === "SAVE") {
    lessonService
      .addLesson(this.lesson)
      .then((response) => {
        
        this.lesson.languagesDto = this.languageList[0];
        this.lesson.freeVideo = this.VideoList[0];
        this.startPicker = new Date();
        this.lesson.startDate = format(this.startPicker, "dd-MM-yyyy");

        //this.saveOrupdate = "SAVE";
        this.showForm = false;
       Swal.fire({
  icon: "success",
  title: "Lesson saved successfully!",
  showConfirmButton: false,
  timer: 1000,
}).then(() => {
  this.showForm = false;
});
        this.lesson = {}; // Reset form
        this.lessonListMethod(); // Reload list
      })
  } else {
    lessonService
      .updateLesson(this.lesson)
      .then((response) => {
        
        this.saveOrupdate = "SAVE";
        this.showForm = false;
       Swal.fire({
  icon: "success",
  title: "Lesson updated successfully!",
  showConfirmButton: false,
  timer: 1000,
}).then(() => {
  this.showForm = false;
});
        this.lesson = {};
        this.lessonListMethod();
        
      })

  }
},

 clickEdit:function(item) {
    
    this.lesson = { ...item };

    if (item.date && !isNaN(Date.parse(item.date))) {
  this.startPicker = new Date(item.date);
  this.lesson.startDate = format(this.startPicker, "dd-MM-yyyy");
} else {
  this.startPicker = new Date(); // fallback
  this.lesson.startDate = format(this.startPicker, "dd-MM-yyyy");
}

    this.saveOrupdate = "UPDATE";
    this.showForm = true;
 
},
    lessonListMethod() {
      lessonService
        .getLessonList()
        .then((response) => {
          console.log("Lesson list response:", response);
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
      },
          userListMethod() {
          userService
        .getUserList(this.userType)
        .then((response) => {
          this.userList.splice(0);
          this.userList.push(...response);
          this.lesson.userAccountDto = this.userList[0];
        })
        .catch((error) => {
          this.$swal("Fail!", error.response.data.message, "error");
        });
    }
    },

  watch: {
    startPicker() {
    this.startMenu = false;
    try {
      this.lesson.startDate = format(this.startPicker, "dd-MM-yyyy");
    } catch (e) {
      console.warn("Invalid startPicker format:", this.startPicker);
    }
    },
    showForm(newVal) {
    if (!newVal) {
      // Dialog closed → reset the form
      this.lesson = {};
      this.saveOrupdate = "SAVE";
    }
  },
},
  components: {}
};
</script>
<style scoped>
table,
th,
td {
  border: 1px solid rgb(175, 175, 175);
  border-collapse: collapse;
  padding: 0 1px !important;
  
}
tbody{
  background-color: rgb(153, 207, 238);

}
tr:hover {
  background-color: rgb(78, 136, 243) !important;
  cursor: pointer;
}



thead{
  background-color: rgb(25, 130, 216);
}
.login-full {
  height: 100vh;
}
.information-window-v-sheet {
  height: 100vh !important;
  overflow-x: scroll;
}

.form{
  background-color: rgb(155, 207, 255);

}
.fab-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 999;
}


</style>
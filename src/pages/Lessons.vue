<template>
  <div>
    <!-- Table Section -->
    <v-row class="title">
      <v-col cols="12">
        <h1 style="background-color:#b3e5fc;text-align: center;">Lessons</h1>

        <!-- Filters -->
        <v-row>
          <!-- Language filter -->
          <v-col cols="2" class="pl-1 pt-5">
            <v-autocomplete
              v-model="selectedLanguage"
              :items="languageList"
              item-text="name"
              item-title = "name"
              item-value="languagesId"
              label="Select Language"
              :item-disabled="isLanguageDisabled"
              return-object
              dense
              outlined
              clearable
            />
          </v-col>
                        <!-- :rules="[(v) => !!v || 'Language is required']" -->


          <!-- Lesson type filter -->
          <v-col cols="2" class="pl-1 pt-5">
            <v-autocomplete
              v-model="selectedLessonType"
              :items="lessonListType"
              label="Lesson Type"
              density="compact"
              variant="outlined"
              required
              small
              filled
            />
          </v-col>
        </v-row>

        <!-- Add Lesson Button -->
        <v-tooltip location="top" v-if="showTeacher">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon
              color="blue"
              class="fab-button"
              @click="openAddForm"
            >
              <v-icon size="36" color="white">mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Add Lesson</span>
        </v-tooltip>

        <!-- Lessons Table -->
        <v-table fixed-header height="92vh">
          <thead>
            <tr>
              <th class="text-center white--text bg-primary">No.</th>
              <th class="text-center white--text bg-primary">Teacher Name</th>
              <th class="text-center white--text bg-primary">Language</th>
              <th class="text-center white--text bg-primary">Youtube</th>
              <th class="text-center white--text bg-primary">Video Type</th>
              <th class="text-center white--text bg-primary">Date</th>
              <th class="text-center white--text bg-primary">Modified Date</th>
              <th class="text-center white--text bg-primary" v-if="showTeacher">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in lessonList"
              :key="item.lessonsId"
              @click="selectedOne = item"
              :style="{ backgroundColor: item.lessonsId === selectedOne?.lessonsId ? '#def3ff' : 'transparent' }"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ item.userAccount?.userName || '-' }}</td>
              <td class="text-center">{{ item.languagesDto?.name || '-' }}</td>
              <td class="text-center">{{ item.youtube || '-' }}</td>
              <td class="text-center">{{ item.freeVideo || '-' }}</td>
              <td class="text-start">{{ item.date || '-' }}</td>
              <td class="text-start">{{ item.modifiedDate || '-' }}</td>
              <td class="text-center" v-if="showTeacher">
                <v-btn
                  class="ml-1"
                  small
                  icon
                  color="green"
                  density="compact"
                  @click.stop="clickEdit(item)"
                  :title="'Edit lesson'"
                >
                  <v-icon size="small">mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  class="ml-1"
                  small
                  icon
                  color="red"
                  density="compact"
                  @click.stop="clickDelete(item)"
                  :title="'Delete lesson'"
                >
                  <v-icon size="small">mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
            <v-divider />
          </tbody>
        </v-table>
      </v-col>
    </v-row>

    <!-- Add/Edit Form Dialog -->
    <v-dialog v-model="showForm" max-width="500" v-if="showTeacher">
      <v-card class="form pa-4" elevation="4">
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="text-h4">{{ saveOrupdate === "SAVE" ? "Add Lesson" : "Update Lesson" }}</span>
          <v-btn icon color="red" @click="closeForm">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <!-- Date picker -->
          <v-menu
            v-model="startMenu"
            full-width
            max-width="290px"
            min-width="290px"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ props }">
              <v-text-field
                v-model="lesson.startDate"
                density="compact"
                variant="outlined"
                label="From Date"
                readonly
                v-bind="props"
              />
            </template>
            <v-date-picker v-model="startPicker" color="primary" @input="startMenu = false" hide-header />
          </v-menu>

          <!-- Language select -->
          <v-autocomplete
            v-model="selectedLanguage"
            :items="languageList"
            item-text="name"
            item-title="name"
            item-value="languagesId"
            label="Select Language"
            return-object
            dense
            outlined
            :rules="[(v) => !!v || 'Language is required']"
          />

          <!-- Youtube link -->
          <v-text-field
            label="Youtube Link"
            v-model="lesson.youtube"
            :rules="[(v) => !!v || 'Required']"
          />

          <!-- Video Type -->
          <v-autocomplete
            v-model="lesson.freeVideo"
            :items="VideoList"
            label="Video Type"
            required
            density="compact"
            variant="outlined"
            filled
          />
        </v-card-text>

        <v-card-actions class="justify-end pr-5">
          <v-btn class="text-black" style="background-color: #2196f3;" @click="saveLesson">
            {{ saveOrupdate }}
          </v-btn>
          <v-btn class="text-black" style="background-color: red;" @click="closeForm">
            CANCEL
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="dialogDelete" max-width="500">
      <v-card>
        <v-card-title class="text-h5 white--text bg-red">Delete</v-card-title>
        <v-card-text class="text-h6">
          Are you sure to delete {{ selectedOne.languagesDto?.name }}'s this video?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="black" text @click="dialogDelete = false">CANCEL</v-btn>
          <v-btn dark class="bg-red" text @click="clickDeleteDialog">DELETE</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { format } from "date-fns";
import lessonService from "../service/LessonsService.js";
import languageService from "../service/LanguageService.js";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      selectedOne: null,
      startMenu: false,
      dialogDelete: false,
      lesson: {},
      lessonList: [],
      VideoList: ["FREE", "PAID"],
      startPicker: new Date(),
      saveOrupdate: "SAVE",
      languageList: [],
      showForm: false,
      showTeacher: false,
      userData: {},
      selectedLanguage: null,
      selectedLessonType: "ALL",
      lessonListType: ["ALL", "FREE", "PAID"],
    };
  },
  mounted() {
    this.userData = JSON.parse(localStorage.getItem("user")) || {};
    this.showTeacher = this.userData.role !== "ADMIN";

    this.lesson.startDate = format(this.startPicker, "dd-MM-yyyy");

    this.loadLanguages();
    this.loadLessons();
  },
  watch: {
    selectedLanguage() {
      this.loadLessons();
    },
    selectedLessonType() {
      this.loadLessons();
    },
    startPicker(newDate) {
      this.lesson.startDate = format(newDate, "dd-MM-yyyy");
      this.startMenu = false;
    },
    showForm(newVal) {
      if (!newVal) {
        this.resetForm();
      }
    },
  },
  methods: {
    isLanguageDisabled(lang) {
  if (this.userData.role === "TEACHER") {
    return this.lessonList.some(
      (lesson) =>
        lesson.userAccount?.userAccountId === this.userData.userId &&
        lesson.languagesDto?.languagesId === lang.languagesId
    );
  }
  return false;
},


    closeForm() {
      this.showForm = false;
    },

    openAddForm() {
      this.resetForm();
      this.showForm = true;
    },

    async loadLanguages() {
      try {
        const allLanguages = await languageService.getLanguageListFree();
        if (this.userData.role === "TEACHER" && this.userData.languagesIds?.length) {
          this.languageList = allLanguages.filter((lang) =>
            this.userData.languagesIds.includes(lang.languagesId)
          );
        } else {
          this.languageList = allLanguages;
        }
        // this.selectedLanguage = this.languageList[0] || null;
                this.selectedLanguage = null;

      } catch (error) {
        Swal.fire("Fail!", error.message || "Failed to load languages", "error");
      }
    },

    async loadLessons() {
      try {
        const allLessons = await lessonService.getLessonList();
        let filteredLessons = allLessons;

        if (this.userData.role === "TEACHER") {
          filteredLessons = filteredLessons.filter(
            (lesson) => lesson.userAccount?.userAccountId == this.userData.userId
          );
        }

        if (this.selectedLanguage && this.selectedLanguage.languagesId) {
          filteredLessons = filteredLessons.filter(
            (lesson) => lesson.languagesDto?.languagesId === this.selectedLanguage.languagesId
          );
        }

        if (this.selectedLessonType && this.selectedLessonType !== "ALL") {
          filteredLessons = filteredLessons.filter(
            (lesson) => lesson.freeVideo === this.selectedLessonType
          );
        }

        this.lessonList = filteredLessons;
      } catch (error) {
        Swal.fire("Fail!", error.message || "Failed to load lessons", "error");
      }
    },

    resetForm() {
      this.lesson = {};
      this.selectedLanguage = this.languageList[0] || null;
      this.saveOrupdate = "SAVE";
      this.startPicker = new Date();
    },

    saveLesson() {
      if (!this.selectedLanguage || !this.selectedLanguage.languagesId) {
        Swal.fire("Error", "Please select a language.", "error");
        return;
      }

      this.lesson.languagesDto = this.selectedLanguage;

      if (!this.lesson.youtube || !this.lesson.freeVideo) {
        Swal.fire("Error", "Please fill all required fields.", "error");
        return;
      }

      this.lesson.date = format(this.startPicker, "yyyy-MM-dd");
      delete this.lesson.modifiedDate;

      if (this.saveOrupdate === "SAVE") {
        lessonService
          .addLesson(this.lesson)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Lesson saved successfully!",
              timer: 1000,
              showConfirmButton: false,
            });
            this.closeForm();
            this.loadLessons();
            this.resetForm();
          })
          .catch((error) => {
  this.showForm = false;

  // Check if server returned a message, else use custom one
  let msg = "Another teacher has already added a lesson for this language.";

  if (error.response && error.response.status === 400) {
    // If backend sends a message, show that instead (optional)
    msg = error.response.data.message || msg;
  } 

  Swal.fire("Adding BLocked", msg, "error");
});

      } else {
        lessonService
          .updateLesson(this.lesson)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Lesson updated successfully!",
              timer: 1000,
              showConfirmButton: false,
            });
            this.closeForm();
            this.loadLessons();
            this.resetForm();
          })
          .catch((error) => {
            Swal.fire("Fail!", error.message || "Failed to update lesson", "error");
          });
      }
    },

    clickEdit(item) {
      this.lesson = { ...item };
      this.selectedLanguage = item.languagesDto || null;

      if (item.date && !isNaN(Date.parse(item.date))) {
        this.startPicker = new Date(item.date);
        this.lesson.startDate = format(this.startPicker, "dd-MM-yyyy");
      } else {
        this.startPicker = new Date();
        this.lesson.startDate = format(this.startPicker, "dd-MM-yyyy");
      }

      this.saveOrupdate = "UPDATE";
      this.showForm = true;
    },

    clickDelete(item) {
      this.selectedOne = { ...item };
      this.dialogDelete = true;
    },

    clickDeleteDialog() {
      lessonService
        .deleteLesson(this.selectedOne)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Deleted successfully!",
            timer: 1000,
            showConfirmButton: false,
          });
          this.dialogDelete = false;
          this.loadLessons();
        })
        .catch((error) => {
          Swal.fire("Fail!", error.message || "Failed to delete lesson", "error");
        });
    },
  },
};
</script>

<style scoped>
table,
th,
td {
  border: 1px solid #b3e5fc;
  border-collapse: collapse;
  padding: 0 1px !important;
}
tbody {
  background-color: #b3e5fc;
}
tr:hover {
  background-color: #e1f5fe !important;
  cursor: pointer;
}
thead {
  background-color: #b3e5fc;
}
.form {
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

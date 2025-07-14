<template>
  <div>
      <!-- Table Section -->
    <v-row>
      <v-col cols="12" >
        <h2 style="background-color:rgb(136, 210, 230);text-align: center;">Languages</h2>
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
  <span>Add Language</span>
</v-tooltip>


      <v-table fixed-header height="92vh">
          <thead>
            <tr>
              <th class="text-center white--text bg-primary">No.</th>
              <th class="text-center white--text bg-primary">Name</th>
              <th class="text-center white--text bg-primary">Amount</th>
              <th class="text-center white--text bg-primary">Exam Link</th>
              <th class="text-center white--text bg-primary">Exam Fee</th>
              <th class="text-center white--text bg-primary">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in languageList"
              :key="index"
              @click="selectedOne = item"
              :style="{
                backgroundColor:
                  item.languagesId == selectedOne.languagesId
                    ? '#def3ff'
                    : 'transparent',
              }"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ item?.name }}</td>

              <td class="text-start">{{ item?.amount }}</td>

              <td class="text-start">{{ item?.examLink }}</td>
              <td class="text-start">{{ item?.examFee }}</td>

              <td class="text-center">
                <v-btn class="ml-1" small icon color="green" density="compact">
                  <v-icon size="small" @click="clickEdit(item)"
                    >mdi-pencil</v-icon
                  ></v-btn
                >
                <v-btn class="ml-1" small icon color="red" density="compact">
                  <v-icon size="small" @click="clickDelete(item)"
                    >mdi-delete</v-icon
                  ></v-btn
                >
              </td>
            </tr>
            <v-divider />
          </tbody>
      </v-table>
    </v-col>
    </v-row>  


<v-dialog v-model="showForm" max-width="500">
      
        <v-card class="form pa-4" elevation="4">
        <v-card-title class="d-flex justify-space-between align-center">
      <span class="text-h4">Add Language</span>
      <v-btn icon color="red" @click="showForm = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
            <v-card-text>
                <v-text-field
                  label="Name"
                  v-model="language.name"
                  :rules="[(v) => !!v || 'required']"
                  density="compact"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  type="number"
                  label="Amount"
                  v-model.number="language.amount"
                  :rules="[(v) => !!v || 'required']"
                  density="compact"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  label="Exam Link"
                  v-model="language.examLink"
                  :rules="[(v) => !!v || 'required']"
                  density="compact"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  type="number"
                  label="Exam Fee"
                  v-model.number="language.examFee"
                  density="compact"
                  variant="outlined"
                ></v-text-field>

                </v-card-text>
               <v-card-actions class="justify-end pr-5">  
                <v-btn  class="text-black"
                style="background-color: #2196f3;" 
                 @click="saveLanguage()">{{
                  saveOrupdate
                }}</v-btn>
              </v-card-actions>
          </v-card>
</v-dialog>


    <v-col>
      <v-dialog v-model="dialogDelete" width="500">
        <v-card>
          <v-card-title class="text-h5 white--text bg-red">
            Delete
          </v-card-title>

          <v-card-text class="text-h6">
            Are you sure to delete({{ selectedOne.name }})?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="black" text @click="dialogDelete = false">
              CANCEL
            </v-btn>
            <v-btn dark class="bg-red" text @click="clickDeleteDialog()">
              DELETE
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>
<script>
import languageService from "../service/LanguageService.js";
export default {
  data: () => ({
    selectedOne: {},
    language: {
      amount: 0,
      examFee: 0,
    },
    saveOrupdate: "SAVE",
    languageList: [],
    dialogDelete: false,
    showForm: false,
  }),
  props: {},
  mounted: function () {
    this.languageListMethod();
    this.showForm = false;
  },
  methods: {
    saveLanguage: function () {
      if (this.saveOrupdate == "SAVE") {
        languageService
          .addLanguageList(this.language)
          .then((response) => {
            this.showForm = false;
            this.$swal({
          icon: "success",
          title: "Your work saved successfully!",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          this.showForm = false;
        });
            this.language = {
              amount: 0,
              examFee: 0,
            };
            this.languageListMethod();
          })
       
      } else {
        languageService
          .updateLanguage(this.language)
          .then((response) => {
            this.saveOrupdate="SAVE";
            this.showForm = false;
            this.$swal({
          icon: "success",
          title: "Your work updated successfully!",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          this.showForm = false;
        });
            this.language = {
              amount: 0,
              examFee: 0,
            };
            this.languageListMethod();
          })

      }
    },
    languageListMethod() {
      languageService
        .getLanguageList()
        .then((response) => {
          this.languageList.splice(0);
          this.languageList.push(...response);
        })
        .catch((error) => {
          this.$swal("Fail!", error.response.data.message, "error");
        });
    },
    clickEdit(item) {
      this.showForm = true;
      this.language = { ...item };
      this.saveOrupdate = "UPDATE";
    },
    clickDelete(item) {
      this.selectedOne = { ...item };
      this.dialogDelete= true;
    },
    clickDeleteDialog() {
      this.dialogDelete = false;
      languageService
        .deleteLanguage(this.selectedOne)
        .then((response) => {
          this.saveOrupdate = "SAVE";
          this.language = {};
          this.languageListMethod();
          this.$swal({
            icon: "success",
            title: "Your work has been deleted",
            showConfirmButton: false,
            timer: 1000,
          });
        })
        .catch((error) => {
          this.$swal("Fail!", error.response.data.message, "error");
        });
    },
  },
  watch: {
      showForm(newVal) {
    if (!newVal) {
      // Dialog closed → reset the form
      this.language = { amount: 0, examFee: 0 };
      this.saveOrupdate = "SAVE";
    }
  }
  },
  components: {},
  computed: {
    isFormValid() {
      return (
        this.language.name &&
        this.language.amount &&
        this.language.examLink &&
        this.language.examFee
      );
    },
  },
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

tbody{
  background-color: rgb(153, 207, 238);
}
tr:hover {
  background-color: rgb(78, 136, 243) !important;
  cursor: pointer;
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
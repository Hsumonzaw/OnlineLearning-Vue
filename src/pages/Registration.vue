<!-- <template>
  <v-app class="d-flex align-center justify-center">
    <div class="background-image d-flex align-center justify-center">
      <v-card class="pa-8 bg-light-blue-lighten-4" elevation="16" style="width: 400px; min-width: 300px;">
        <div class="text-center">
          <img src="@/assets/user-profile.png" alt="" class="login mb-4">
          <v-card-title class="text-h5 font-weight-bold">Register</v-card-title>
        </div>
        <v-form @submit.prevent="registerAccount">
          <v-text-field label="Username" v-model="newUser.userName" prepend-inner-icon="mdi-account" variant="outlined"
            :rules="nameRules" class="mt-4"></v-text-field>

          <v-text-field label="Password" v-model="newUser.password" prepend-inner-icon="mdi-lock" variant="outlined"
            :type="showPassword ? 'text' : 'password'" :rules="passwordRules"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="showPassword = !showPassword"
            class="mt-2"></v-text-field>

          <v-text-field label="Confirm Password" v-model="newUser.confirmPassword" prepend-inner-icon="mdi-lock-check"
            variant="outlined" :type="showPassword ? 'text' : 'password'" :rules="confirmPasswordRules" class="mt-2"></v-text-field>

          <v-btn block color="success" class="mt-4" type="submit">Register</v-btn>
          <v-btn block text class="mt-2" @click="$emit('switch-form')">Already have an account? Log In</v-btn>
        </v-form>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import userService from "../service/LoginService.js";

export default {
  data: () => ({
    newUser: {
      userName: '',
      password: '',
      confirmPassword: ''
    },
    showPassword: false,
    nameRules: [(v) => !!v || "Username is required"],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => v.length >= 6 || "Password must be at least 6 characters"
    ],
    confirmPasswordRules: [
      (v) => !!v || "Confirm Password is required",
      (v) => v === this.newUser.password || "Passwords do not match"
    ]
  }),
  methods: {
    registerAccount: function() {
      // You'll need to create a `registerAccount` method in your `userService`
      userService.registerAccount(this.newUser)
        .then(() => {
          // You could show a success message here
          console.log('Registration successful!');
          // Then switch back to the login form
          this.$emit('switch-form');
        })
        .catch((error) => {
          // Handle registration errors here
          console.error('Registration failed:', error);
        });
    }
  }
};
</script>

<style scoped>
.background-image {
  height: 100vh;
  width: 100vw;
  background-image: url('@/assets/skyblue.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.login {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}
</style> -->
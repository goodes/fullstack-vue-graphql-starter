<template>
  <v-container align-center mt-5 pt-5>
    <!-- Signing Title -->
    <v-row align="center" justify="center">
      <v-flex xs512 sm6 offset-sm3>
        <h1>Get Started Here</h1>
      </v-flex>
    </v-row>

    <!-- Error Alert -->
    <v-layout row wrap v-if="error">
      <v-flex xs512 sm6 offset-sm3>
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>

    <!-- Signin Form -->
    <v-flex xs512 sm6 offset-sm3 align-center>
      <v-card color="accent" dark>
        <!-- lazily set the valid of isFormValid through lazy-validation -->
        <v-form
          @submit.prevent="handleSignupUser"
          v-model="isFormValid"
          lazy-validation
          ref="form"
        >
          <v-card-text>
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              prepend-icon="mdi-face"
              label="Username"
              type="text"
              required
            >
            </v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              prepend-icon="mdi-email"
              label="Email"
              type="text"
              required
            >
            </v-text-field>

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              prepend-icon="mdi-puzzle"
              label="Password"
              type="password"
              required
              dark
            >
            </v-text-field>

            <v-text-field
              v-model="passwordConfirmation"
              :rules="passwordRules"
              prepend-icon="mdi-puzzle"
              label="Confirm Password"
              type="password"
              required
              dark
            >
            </v-text-field>

            <v-row class="justify-center">
              <v-btn
                :loading="loading"
                color="info"
                type="submit"
                :disabled="!isFormValid || loading"
                ><span slot="loader" class="custom-loader">
                  <v-icon light>mdi-cached</v-icon> </span
                >Signup</v-btn
              >
            </v-row>
            <v-row class="justify-center">
              <h4>
                Already have an account?
                <router-link to="/signin">Signin</router-link>
              </h4>
            </v-row>
          </v-card-text>
          <!-- </v-card-actions> -->
        </v-form>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Signup",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      usernameRules: [
        // check is userame is defined
        username => !!username || "Username is required",
        // length < 10
        username =>
          username.length < 10 || "Username must be less then 10 characters"
      ],
      passwordRules: [
        password => !!password || "Password is required",
        // length < 10
        password =>
          password.length >= 4 || "Password must be at least 4 characters",
        passwordConfirmation =>
          passwordConfirmation === this.password || "Passwords must match"
      ],
      emailRules: [
        email => !!email || "Email is required",
        email => /.@+./.test(email) || "Email must be valid"
      ],

      isFormValid: true
    };
  },
  methods: {
    handleSignupUser() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("signupUser", {
          username: this.username,
          email: this.email,
          password: this.password
        });
      }
    }
  },
  watch: {
    user(value) {
      // if user value changes null -> object, redirect to home page
      if (value) {
        this.$router.push("/");
      }
    }
  },
  computed: {
    ...mapGetters(["error", "loading", "user"])
  }
};
</script>
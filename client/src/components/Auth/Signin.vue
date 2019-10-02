<template>
  <v-container align-center mt-5 pt-5>
    <!-- Signing Title -->
    <v-row align="center" justify="center">
      <v-flex xs512 sm6 offset-sm3>
        <h1>Welcome Back</h1>
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
      <v-card color="secondary" dark>
        <!-- lazily set the valid of isFormValid through lazy-validation -->
        <v-form
          @submit.prevent="handleSigninUser"
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
              v-model="password"
              :rules="passwordRules"
              prepend-icon="mdi-puzzle"
              label="Password"
              type="password"
              required
              dark
            >
            </v-text-field>
            <v-row class="justify-center">
              <v-btn
                :loading="loading"
                color="accent"
                type="submit"
                :disabled="!isFormValid"
                ><span slot="loader" class="custom-loader">
                  <v-icon light>mdi-cached</v-icon> </span
                >Signin</v-btn
              >
            </v-row>
            <v-row class="justify-center">
              <h4>
                Dont have an account?
                <router-link to="/signup">Signup</router-link>
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
  name: "Signin",
  data() {
    return {
      isFormValid: true,
      username: "",
      password: "",
      usernameRules: [
        // check is userame is defined
        username => !!username || "Username is required",
        // length < 10
        username =>
          username.length < 10 || "Username must be then less characters"
      ],
      passwordRules: [
        password => !!password || "Password is required",
        // length < 10
        password =>
          password.length >= 4 || "Password must be atleat 4 characters"
      ]
    };
  },
  computed: {
    ...mapGetters(["user", "error", "loading"])
  },
  watch: {
    user(value) {
      // if user value changes null -> object, redirect to home page
      if (value) {
        console.log("redirecting");
        this.$router.push("/");
      }
    }
  },
  methods: {
    handleSigninUser() {
      // because we did <v-form v-model="isFormValid" lazy-validation ref="form" ...>
      // we can now access the form and validate it
      if (this.$refs.form.validate()) {
        this.$store.dispatch("signinUser", {
          username: this.username,
          password: this.password
        });
      }
    }
  }
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
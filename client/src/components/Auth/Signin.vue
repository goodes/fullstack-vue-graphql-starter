<template>
  <v-container align-center mt-5 pt-5>
    <!-- Signing Title -->
    <v-row align="center" justify="center">
      <v-flex xs512 sm6 offset-sm3>
        <h1>Welcome Back</h1>
      </v-flex>
    </v-row>
    <!-- Signin Form -->
    <v-flex xs512 sm6 offset-sm3 align-center>
      <v-card color="secondary" dark>
        <v-form @submit.prevent="handleSigninUser">
          <v-card-text>
            <v-text-field
              v-model="username"
              prepend-icon="mdi-face"
              label="Username"
              type="text"
              required
            >
            </v-text-field>

            <v-text-field
              v-model="password"
              prepend-icon="mdi-puzzle"
              label="Password"
              type="password"
              required
              dark
            >
            </v-text-field>
            <v-row class="justify-center">
              <v-btn color="accent" type="submit">Signin</v-btn>
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
export default {
  name: "Signin",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    handleSigninUser() {
      this.$store.dispatch("signinUser", {
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>
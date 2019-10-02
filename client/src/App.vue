<template>
  <v-app style="background: #E3E3EE">
    <!-- Side NavBar -->
    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-app-bar color="accent" dark flat>
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="title pl-3">VueShare</h1>
        </router-link>
      </v-app-bar>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          ripple
          v-for="item in sideNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{ item.title }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="user" @click="handleSignoutUser">
          <v-list-item-action>
            <v-icon class="hidden-sm-only">mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>Signout</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Horizonatal NavBar -->
    <v-app-bar fixed color="primary" dark>
      <!-- App Title -->
      <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">
          VueShare
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Search Input -->
      <v-text-field
        flex
        prepend-icon="mdi-magnify"
        placeholder="Search posts"
        color="accent"
        single-line
        hide-details
      ></v-text-field>

      <v-spacer> </v-spacer>
      <!-- Horizonatal Navbar Links -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          v-for="item in horizontalNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon left class="hidden-sm-only">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

        <!-- profile button  -->
        <v-btn text to="/profile" v-if="user">
          <v-icon class="hidden-sm-only" left> mdi-account-box</v-icon>
          <v-badge right color="blue darken-2">
            <!-- <span slot="badge">1</span> -->
            Profile
          </v-badge>
        </v-btn>
        <v-btn text v-if="user" @click="handleSignoutUser">
          <v-icon class="hidden-sm-only" left>mdi-exit-to-app</v-icon>
          Signout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <main>
      <v-container class="mt-10">
        <transition name="fade">
          <router-view />
        </transition>

        <v-snackbar
          v-model="authSnackbar"
          color="success"
          :timeout="5000"
          bottom
          left
        >
          <v-icon class="mr-3">mdi-check-circle</v-icon>
          <h3>You are now signed in!</h3>
          <v-btn dark text @click="authSnackbar = false">Close</v-btn>
        </v-snackbar>

        <!-- auth error snackbar -->
        <v-snackbar
          v-if="authError"
          v-model="authErrorSnackbar"
          color="info"
          :timeout="10000"
          bottom
          left
        >
          <v-icon class="mr-3">mdi-cancel</v-icon>
          <h3>{{ authError.message }}</h3>
          <v-btn dark text to="/signin">Signin</v-btn>
        </v-snackbar>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      sideNav: false,
      authSnackbar: false,
      authErrorSnackbar: false
    };
  },
  watch: {
    user(newValue, oldValue) {
      // if no value previously then show the snackbar
      if (oldValue === null) {
        this.authSnackbar = true;
      }
    },
    authError(value) {
      if (value !== null) {
        this.authErrorSnackbar = true;
      }
    }
  },
  computed: {
    ...mapGetters(["user", "authError"]),
    horizontalNavItems() {
      let items = [
        { icon: "mdi-chat", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In ", link: "/signin" },
        { icon: "mdi-pencil", title: "Sign Up ", link: "/signup" }
      ];
      if (this.user) {
        items = [
          { icon: "mdi-chat", title: "Posts", link: "/posts" }
          // { icon: "mdi-star-circle", title: "Create Post", link: "/post/add" },
          // { icon: "mdi-account-box", title: "Profile", link: "/profile" }
        ];
      }
      return items;
    },
    sideNavItems() {
      let items = [
        { icon: "mdi-chat", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In ", link: "/signin" },
        { icon: "mdi-pencil", title: "Sign Up ", link: "/signup" }
      ];
      if (this.user) {
        items = [
          { icon: "mdi-chat", title: "Posts", link: "/posts" },
          { icon: "mdi-star-circle", title: "Create Post", link: "/post/add" },
          { icon: "mdi-account-box", title: "Profile", link: "/profile" }
        ];
      }
      return items;
    }
  },
  methods: {
    handleSignoutUser() {
      this.$store.dispatch("signoutUser");
    },
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: all;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(-25px);
}
</style>
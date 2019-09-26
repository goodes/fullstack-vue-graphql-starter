<template>
  <v-app>
    <v-app-bar
      fixed
      color="primary"
      dark
    >
      <!-- App Title -->
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link
          to="/"
          tag="span"
          style="cursor: pointer"
        > VueShare </router-link>
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

      <v-spacer>

      </v-spacer>
      <!-- Horizonatal Navbar Links -->
      <v-toolbar-items class=" hidden-xs-only">
        <v-btn
          flat
          color="primary"
          v-for="item in horizontalNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon
            left
            class="hidden-sm-only"
          >{{item.icon}} </v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>

    </v-app-bar>

    <main>
      <v-container class="mt-10">
        <router-view />
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    horizontalNavItems() {
      return [
        { icon: "mdi-chat", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In ", link: "/signin" },
        { icon: "mdi-pencil", title: "Sign Up ", link: "/signup" }
      ];
    }
  }
};
</script>
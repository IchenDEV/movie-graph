<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="mini = !mini"></v-app-bar-nav-icon>
        <h1>Movie Grpah</h1>
      </div>
      <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest"
             text
      >
        <span class="mr-2">About</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app :mini-variant.sync="mini" dark permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Movie Grpah
          </v-list-item-title>
          <v-list-item-subtitle>
            Just for movie
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link @click="$router.push(item.route)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    items: [
      {title: "Home", route: "/", icon: 'mdi-view-dashboard'},
      {title: "Community", route: "/community", icon: 'mdi-image'},
      {title: "Node", route: "/node", icon: 'mdi-help-box'},
      {title: "Relation", route: "/relation", icon: 'mdi-help-box'},
    ],
    mini: true
  }),
};
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <img
          :src="logosrc"
          transition="scale-transition"
          width="40"
        />
        <v-toolbar-title>Merry Christmas</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/" target="_blank" text>
        <span class="mr-2">music</span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import logo from '@/assets/bell.png'
export default {
  name: 'App',
  data () {
    return {
      logosrc: logo
    }
  }
}
</script>

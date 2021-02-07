<template>
  <v-app>
    <navbar />
    <router-view />
    <notification />
  </v-app>
</template>

<script>
import Navbar from "@/views/templates/Navbar.vue";
import Notification from "./views/templates/Notification.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Notification,
  },
  beforeCreate() {
    this.$store.dispatch("registerWeb3");
  },
};
</script>

<style>
</style>
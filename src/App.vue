<template>
  <v-app>
    <navbar />
    <router-view />
  </v-app>
</template>

<script>
import Navbar from "@/views/templates/Navbar.vue";
export default {
  name: "App",
  components: { Navbar },
  beforeCreate() {
    this.$store.dispatch("registerWeb3");
  },
};
</script>

<style>
</style>
<template>
  <v-app>
    <navbar />
    <router-view v-if="networkConnection" />
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
  computed: {
    networkConnection() {
      return this.$store.state.web3.isInjected !== null;
    },
  },
};
</script>

<style>
</style>
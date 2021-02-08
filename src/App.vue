<template>
  <v-app>
    <navbar />
    <v-content class="mx-4 mb-4 mt-4">
      <router-view v-if="networkConnection" />
    </v-content>
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
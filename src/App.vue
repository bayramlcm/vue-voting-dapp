<template>
  <v-app>
    <navbar />
    <router-view />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  components: { Navbar },
  beforeCreate () {
    console.log('Metamask bağlantısı sağlanıyor...')
    this.$store.dispatch('registerWeb3')
  },
};
</script>

<style>
</style>
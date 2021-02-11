<template>
  <v-toolbar dense>
    <v-app-bar-nav-icon
      class="inline"
      @click="drawerToggle()"
      v-if="hideDrawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title class="inline">Bitay</v-toolbar-title>

    <v-spacer></v-spacer>

    <navbar-status />
  </v-toolbar>
</template>

<script>
import NavbarStatus from "@/views/molecules/Navbar/NavbarStatus.vue";

export default {
  components: { NavbarStatus },
  props: ["drawerToggle"],
  computed: {
    hideDrawer() {
      return !["/metamaskerror", "/register"].includes(this.$route.path.toLowerCase());
    },
  },
};
</script>

<style>
</style>
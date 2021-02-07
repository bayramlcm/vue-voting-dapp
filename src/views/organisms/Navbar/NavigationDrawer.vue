<template>
  <v-navigation-drawer v-model="drawerOpen" app clipped temporary>
    <drawer-header />
    <v-divider></v-divider>
    <drawer-menu :links="links" />
  </v-navigation-drawer>
</template>

<script>
import DrawerHeader from "@/views/molecules/Navbar/DrawerHeader";
import DrawerMenu from "@/views/molecules/Navbar/DrawerMenu";

export default {
  props: ["drawer", "links"],
  components: { DrawerHeader, DrawerMenu },
  mounted() {
    this.drawerOpen = this.drawer;
  },
  data: () => ({
    drawerOpen: false,
  }),
  watch: {
    drawer() {
      this.drawerOpen = !this.drawerOpen;
    },
  },
};
</script>

<style>
</style>
<template>
  <nav>
    <navigation-drawer :drawer="drawer" :links="links" />

    <navbar-toolbar :drawerToggle="drawerToggle" />
  </nav>
</template>

<script>
import NavbarToolbar from "@/views/organisms/Navbar/NavbarToolbar";
import NavigationDrawer from "@/views/organisms/Navbar/NavigationDrawer.vue";

export default {
  components: {
    NavbarToolbar,
    NavigationDrawer,
  },
  name: "Navbar",
  data: () => ({
    drawer: null,
    links: [
      {
        icon: "mdi-home-outline",
        text: "Anasayfa",
        route: "/",
      },
      {
        header: "Yönetim",
        icon: "mdi-account-multiple-outline",
        text: "Kullanıcılar",
        route: "/userList",
      },
      {
        icon: "mdi-ballot-outline",
        text: "Oylamalar",
        route: "/votingList",
      },
    ],
  }),
  methods: {
    drawerToggle() {
      this.drawer = !this.drawer;
    },
  },
};
</script>

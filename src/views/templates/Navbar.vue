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
        role: 1,
      },
      {
        header: "User Yetkisi",
        icon: "mdi-vote-outline",
        text: "Oy Kullan",
        route: "/voteList",
        role: 1,
      },
      {
        header: "Admin Yetkisi",
        icon: "mdi-account-multiple-outline",
        text: "Kullanıcılar",
        route: "/userList",
        role: 10,
      },
      {
        icon: "mdi-ballot-outline",
        text: "Oylamalar",
        route: "/votingList",
        role: 10,
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

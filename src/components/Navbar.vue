<template>
  <nav>
    <v-navigation-drawer v-model="drawer" app clipped temporary>
      <template v-slot:prepend>
        <v-list-item two-line router to="/my">
          <v-list-item-avatar>
            <v-icon size="45">mdi-account-circle</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Bayram ALAÇAM</v-list-item-title>
            <v-list-item-subtitle>Admin</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list>
        <div v-for="item in links" :key="item.title">
          <!-- <v-subheader>Sub Header</v-subheader> -->
          <v-list-item link router :to="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group v-if="!item.route" no-action value="true">
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="subItem in item.sub"
              :key="subItem.title"
              link
              router
              :to="subItem.route"
            >
              <v-list-item-title v-text="subItem.text"></v-list-item-title>
              <v-list-item-action>
                <v-icon v-text="subItem.icon"></v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dense>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Bitay</v-toolbar-title>

      <v-spacer></v-spacer>

      <span class="pr-2">
        <span class="body-1"> Metamask: </span>
        <v-icon color="green" v-if="web3.isInjected === true"
          >mdi-check-circle-outline</v-icon
        >
        <v-icon color="red" v-if="web3.isInjected === false"
          >mdi-close-circle-outline</v-icon
        >
        <v-progress-circular
          indeterminate
          color="primary"
          size="20"
          width="2"
          v-if="web3.isInjected === null"
        ></v-progress-circular>
      </span>

      <v-btn icon router to="/my">
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn icon router to="/logout">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  components: {},
  name: "Navbar",
  data: () => ({
    drawer: false,
    links: [
      {
        icon: "mdi-home-outline",
        text: "Anasayfa",
        route: "/",
      },
    ],
  }),
  methods: {},
  computed: {
    web3() {
      console.log(this.$store.state.web3.web3);
      return this.$store.state.web3.web3;
    },
  },
};
</script>

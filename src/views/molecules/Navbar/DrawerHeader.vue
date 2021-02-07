<template v-slot:prepend>
  <v-list-item two-line router to="/my">
    <v-list-item-avatar>
      <v-icon size="45">mdi-account-circle</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ getName }}</v-list-item-title>
      <v-list-item-subtitle>Admin</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  computed: {
    getName() {
      return this.$store.state.user.name;
    },
  },
};
</script>
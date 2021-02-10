<template>
  <v-toolbar flat color="white">
    <v-toolbar-title>Oylama Listesi</v-toolbar-title>
    <v-divider class="mx-4" inset vertical></v-divider>
    <v-text-field
      append-icon="mdi-magnify"
      label="Ara"
      single-line
      hide-details
    ></v-text-field>
    <v-spacer></v-spacer>
    <voting-add />
  </v-toolbar>
</template>

<script>
import VotingAdd from "@/views/organisms/VotingList/VotingAdd.vue";
export default {
  components: { VotingAdd },
};
</script>

<style>
</style>
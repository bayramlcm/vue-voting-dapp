<template>
  <v-toolbar flat color="white">
    <v-toolbar-title>Oy Kullan</v-toolbar-title>
    <v-divider class="mx-4" inset vertical></v-divider>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Ara"
      single-line
      hide-details
    ></v-text-field>
  </v-toolbar>
</template>

<script>
export default {
  props: ["setSearch"],
  data: () => ({
    search: "",
  }),
  watch: {
    search(_str) {
      this.setSearch(_str);
    },
  },
};
</script>

<style>
</style>
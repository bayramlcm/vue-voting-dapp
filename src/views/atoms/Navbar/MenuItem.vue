<template>
  <v-list-item link router :to="item.route">
    <v-list-item-icon>
      <v-icon>{{ item.icon }}</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title>{{ item.text }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: ["item"],
};
</script>
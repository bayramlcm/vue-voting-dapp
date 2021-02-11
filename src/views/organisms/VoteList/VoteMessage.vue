<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text> {{ content }} </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">
          Tamam
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["title", "content", "dialogOpen", "dialogClose"],
  data: () => ({
    dialog: false,
  }),
  watch: {
    dialogOpen(open) {
      if (open) this.dialog = true;
    },
    dialog(open) {
      if (!open) this.dialogClose();
    }
  }
};
</script>

<style>
</style>
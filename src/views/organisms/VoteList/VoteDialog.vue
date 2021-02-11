<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-text>
        <v-container class="pt-5 pb-5">
          <div class="text-h5 font-weight-medium text-center">
            {{ subject }}
          </div>
          <div class="text-body-1 font-weight-regular pt-5 text-center pb-4">
            {{ detail }}
          </div>
        </v-container>
        <v-row>
          <v-col cols="6" class="text-center">
            <v-btn color="red white--text" @click="voteUse(false)">HAYIR</v-btn>
          </v-col>
          <v-col cols="6" class="text-center">
            <v-btn color="blue white--text" @click="voteUse(true)">EVET</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialogOpen", "dialogClose", "item"],
  data: () => ({
    dialog: false,
    id: "",
    subject: "",
    detail: "",
  }),
  methods: {
    voteUse(vote) {
      this.$store
        .dispatch("votesUse", {
          id: this.id,
          vote,
        })
        .then(() => (this.dialog = false));
    },
  },
  watch: {
    dialogOpen(open) {
      if (open) this.dialog = true;
    },
    dialog(open) {
      if (!open) this.dialogClose();
    },
    item(_item) {
      if ("id" in _item) {
        this.id = _item.id;
        this.subject = _item.subject;
        this.detail = _item.detail;
      }
    },
  },
};
</script>

<style>
</style>
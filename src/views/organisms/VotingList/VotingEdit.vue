<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Oylama Durumunu Güncelle</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-select
            v-model="status"
            :items="items"
            item-text="text"
            item-value="status"
            label="Select"
            persistent-hint
            single-line
          ></v-select>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text>İptal</v-btn>
        <v-btn color="blue darken-1" text @click="save()">Güncelle</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialogOpen", "dialogClose", "item"],
  data: () => ({
    id: 0,
    status: "0",
    dialog: false,
    items: [
      { status: "0", text: "Kapalı" },
      { status: "1", text: "Açık" },
      { status: "2", text: "Donduruldu" },
    ],
  }),
  methods: {
    save() {
      this.$store
        .dispatch("votingSetStatus", {
          id: this.id,
          status: this.status,
        })
        .then(() => this.dialog = false)
        .catch((err) => console.log("Değiştirilemedi :(", { err }));
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
        this.status = _item.status;
        this.id = _item.id;
      }
    },
  },
  computed: {},
};
</script>

<style>
</style>
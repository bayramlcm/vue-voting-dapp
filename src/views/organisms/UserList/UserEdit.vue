<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Yetkiyi Güncelle</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-select
            v-model="role"
            :items="items"
            item-text="text"
            item-value="role"
            label="Select"
            persistent-hint
            single-line
          ></v-select>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialogClose()">İptal</v-btn>
        <v-btn color="blue darken-1" text @click="save()">Güncelle</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialogOpen", "dialogClose", "item"],
  data: () => ({
    address: "",
    role: "0",
    dialog: false,
    items: [
      { role: "1", text: "User" },
      { role: "10", text: "Admin" },
    ],
  }),
  methods: {
    save() {
      this.$store
        .dispatch("usersSetRole", {
          address: this.address,
          role: this.role,
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
      if ("address" in _item) {
        this.role = _item.role;
        this.address = _item.address;
      }
    },
  },
  computed: {},
};
</script>

<style>
</style>
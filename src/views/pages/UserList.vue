<template>
  <div>
    <v-data-table
      :loading="loading"
      loading-text="Kullanıcı listesi alınıyor..."
      :headers="headers"
      :items="userList"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <user-list-toolbar />
      </template>
      <!-- Yetki -->
      <template v-slot:[`item.role`]="{ item }">
        <v-chip v-if="item.role === '1'" small color="blue white--text">
          User
        </v-chip>
        <v-chip v-if="item.role === '10'" small color="red white--text">
          Admin
        </v-chip>
      </template>
      <template v-slot:[`item.process`]="{ item }">
        <v-icon small class="mr-2" @click="editUser(item)">mdi-pencil</v-icon>
      </template>
      <!-- Bulunamadı -->
      <template v-slot:no-data>Kullanıcılar bulunamadı</template>
    </v-data-table>
    <user-edit
      :dialogOpen="userEditDialog"
      :item="editItem"
      :dialogClose="() => (userEditDialog = false)"
    />
  </div>
</template>

<script>
import { timeConverter } from "@/util/atom";
import UserListToolbar from "@/views/organisms/UserList/UserListToolbar.vue";
import UserEdit from "../organisms/UserList/UserEdit.vue";

export default {
  components: { UserListToolbar, UserEdit },
  mounted() {
    this.$store.dispatch("users").then(() => {
      this.loading = false;
    });
  },
  data: () => ({
    loading: true,
    headers: [
      { text: "Adı Soyadı", value: "name" },
      { text: "Adresi", value: "address" },
      { text: "Yetki", value: "role" },
      { text: "İşlem", value: "process" },
    ],
    search: "",
    // Edit
    editItem: {},
    userEditDialog: false,
  }),
  methods: {
    timeConverter,
    editUser(item) {
      this.editItem = item;
      this.userEditDialog = true;
      // if (item.status === "0") {
      //   this.messageContent = "Kapalı olan oylama durumu değiştirilemez.";
      //   this.messageDialog = true;
      // } else if (+new Date() / 1000 > parseInt(item.endDate)) {
      //   this.messageContent = "Bitiş tarihi geçmiş oylama değiştirilemez.";
      //   this.messageDialog = true;
      // } else {
      //   this.editItem = { ...item };
      // }
    },
  },
  computed: {
    userList() {
      return this.$store.state.users.userList;
    },
  },
};
</script>
<style>
.selectStatus {
  width: 126px;
}
</style>
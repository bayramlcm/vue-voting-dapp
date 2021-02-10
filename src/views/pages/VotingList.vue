<template>
  <div>
    <v-data-table
      :loading="loading"
      loading-text="Oylama listesi alınıyor..."
      :headers="headers"
      :items="votingList"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <voting-list-toolbar />
      </template>
      <!-- Başlangıç Tarihi -->
      <template v-slot:[`item.startDate`]="{ item }">
        {{ timeConverter(item.startDate) }}
      </template>
      <!-- Bitiş Tarihi -->
      <template v-slot:[`item.endDate`]="{ item }">
        {{ timeConverter(item.endDate) }}
      </template>
      <!-- Oylama durumu -->
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="statusItems[item.status].color" small :key="item.id">
          {{ statusItems[item.status].text }}
        </v-chip>
      </template>
      <template v-slot:[`item.process`]="{ item }">
        <v-icon small class="mr-2" @click="editVoting(item)">mdi-pencil</v-icon>
      </template>
      <!-- Bulunamadı -->
      <template v-slot:no-data>Oylamalar bulunamadı</template>
    </v-data-table>
    <voting-edit
      :dialogOpen="votingEditDialog"
      :item="editItem"
      :dialogClose="() => (votingEditDialog = false)"
    />
    <voting-message
      :title="messageTitle"
      :content="messageContent"
      :dialogOpen="messageDialog"
      :dialogClose="() => (messageDialog = false)"
    />
    <v-btn color="primary" @click="create()">OLUŞTUR</v-btn>
  </div>
</template>

<script>
import VotingEdit from "@/views/organisms/VotingList/VotingEdit.vue";
import VotingListToolbar from "@/views/organisms/VotingList/VotingListToolbar.vue";
import VotingMessage from "@/views/organisms/VotingList/VotingMessage.vue";

import { timeConverter } from "@/util/atom";

export default {
  components: { VotingListToolbar, VotingEdit, VotingMessage },
  mounted() {
    this.$store.dispatch("voting").then(() => {
      this.loading = false;
    });
  },
  data: () => ({
    loading: true,
    dialog: false,
    votingEditDialog: false,
    editItem: {},
    headers: [
      { text: "Id", value: "id" },
      { text: "Oylama Konusu", value: "subject" },
      { text: "Oylama Konusunun Detayı", value: "detail" },
      { text: "Başlangıç Tarihi", value: "startDate" },
      { text: "Bitiş Tarihi", value: "endDate" },
      { text: "Oylama Durumu", value: "status" },
      { text: "İşlem", value: "process" },
    ],
    search: "",
    statusItems: {
      0: { text: "Kapalı", color: "red white--text" },
      1: { text: "Açık", color: "green white--text" },
      2: { text: "Donduruldu", color: "orange white--text" },
    },
    // Message Dialog
    messageTitle: "İşlem Başarısız",
    messageContent: "",
    messageDialog: false,
  }),
  methods: {
    timeConverter,
    create() {},
    editVoting(item) {
      if (item.status === "0") {
        this.messageContent = "Kapalı olan oylama durumu değiştirilemez.";
        this.messageDialog = true;
      } else if (+new Date() / 1000 > parseInt(item.endDate)) {
        this.messageContent = "Bitiş tarihi geçmiş oylama değiştirilemez.";
        this.messageDialog = true;
      } else {
        this.editItem = { ...item };
        this.votingEditDialog = true;
      }
    },
  },
  computed: {
    votingList() {
      return this.$store.state.voting.votingList;
    },
  },
};
</script>
<style>
.selectStatus {
  width: 126px;
}
</style>
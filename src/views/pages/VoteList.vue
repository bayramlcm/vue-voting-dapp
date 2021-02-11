<template>
  <div>
    <v-data-table
      :loading="loading"
      loading-text="Oy listesi alınıyor..."
      :headers="headers"
      :items="votingList"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <vote-list-toolbar :setSearch="(newSearch) => (search = newSearch)" />
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
        <v-btn
          color="primary"
          class="mr-4"
          small
          :disabled="item.status !== '1' || item.used"
          @click="useVote(item)"
        >
          <span v-if="item.used">KULLANILDI</span>
          <span v-if="!item.used && item.status === '1'">OY KULLAN</span>
          <span v-if="!item.used && item.status !== '1'">OYLAMA KAPALI</span>
        </v-btn>
        <!-- <v-icon small class="mr-2" @click="editVoting(item)">mdi-pencil</v-icon> -->
      </template>
      <!-- Bulunamadı -->
      <template v-slot:no-data>Oylamalar bulunamadı</template>
    </v-data-table>
    <vote-message
      :title="messageTitle"
      :content="messageContent"
      :dialogOpen="messageDialog"
      :dialogClose="() => (messageDialog = false)"
    />
    <vote-dialog
      :item="voteItem"
      :dialogOpen="voteDialog"
      :dialogClose="() => (voteDialog = false)"
    />
  </div>
</template>

<script>
import VoteListToolbar from "@/views/organisms/VoteList/VoteListToolbar.vue";
import VoteMessage from "@/views/organisms/VoteList/VoteMessage.vue";

import { timeConverter } from "@/util/atom";
import VoteDialog from "@/views/organisms/VoteList/VoteDialog.vue";

export default {
  components: { VoteListToolbar, VoteMessage, VoteDialog },
  mounted() {
    this.$store.dispatch("votes").then(() => {
      this.loading = false;
    });
  },
  data: () => ({
    loading: true,
    dialog: false,
    voteDialog: false,
    voteItem: {},
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
    useVote(item) {
      this.voteItem = item;
      this.voteDialog = true;
    },
  },
  computed: {
    votingList() {
      return this.$store.state.votes.votesList;
    },
  },
};
</script>
<style>
.selectStatus {
  width: 126px;
}
</style>
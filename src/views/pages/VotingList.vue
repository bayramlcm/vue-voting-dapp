<template>
  <div>
    <v-data-table
      :loading="loading"
      loading-text="Oylama listesi alınıyor..."
      :headers="headers"
      :items="votes"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <voting-list-toolbar />
      </template>
      <template v-slot:no-data>Oylamalar bulunamadı</template>
    </v-data-table>
    <v-btn color="primary" @click="create()">OLUŞTUR</v-btn>
  </div>
</template>

<script>
import VotingListToolbar from "../organisms/VotingList/VotingListToolbar.vue";
export default {
  components: { VotingListToolbar },
  beforeMount() {
    this.$store.dispatch("votingGetCount").then((count) => {
      console.log({ count });
      this.$store.dispatch("votingGetList");
    });
  },
  data: () => ({
    loading: false,
    dialog: false,
    headers: [
      { text: "Id", value: "id" },
      { text: "Oylama Konusu", value: "subject" },
      { text: "Oylama Konusunun Detayı", value: "detail" },
      { text: "Başlangıç Tarihi", value: "startDate" },
      { text: "Bitiş Tarihi", value: "endDate" },
      { text: "Oylama Durumu", value: "status" },
    ],
    search: "",
    votes: [
      {
        id: 1,
        subject: "İstanbul Belediyesi Sizce Kimdir?",
        detail:
          "Geçmiş dönemdeki belediye seçimlerinde hangi adaya oy vermiştiniz?",
        startDate: 1612740316,
        endDate: 1612750316,
        status: "freeze",
      },
    ],
  }),
  methods: {
    create() {
      this.$store.dispatch("voteCreate", {
        subject: "Bunu yazan kişi kim?",
        detail: "Bu arayüzü ve akıllı sözleşmeyi yazanı biliyor musunuz?",
        startDate: Math.floor(+new Date() / 1000),
        endDate: Math.floor(+new Date() / 1000),
      });
    },
  },
};
</script>

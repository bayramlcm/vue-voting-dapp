<template>
  <v-container>
    <div v-if="!load">
      <center class="py-5">
        <v-progress-circular
          indeterminate
          color="primary"
          size="40"
        ></v-progress-circular>
      </center>
    </div>
    <div v-if="load">
      <table width="100%">
        <tr>
          <td class="text-subtitle-2" width="250px">Oylama Konusu:</td>
          <td>{{ item.subject }}</td>
        </tr>
        <tr>
          <td class="text-subtitle-2">Oylama Konusunun Detayı:</td>
          <td>{{ item.detail }}</td>
        </tr>
        <tr>
          <td class="text-subtitle-2">Başlangıç Tarihi:</td>
          <td>{{ timeConverter(item.startDate) }}</td>
        </tr>
        <tr>
          <td class="text-subtitle-2">Bitiş Tarihi:</td>
          <td>{{ timeConverter(item.endDate) }}</td>
        </tr>
        <tr>
          <td colspan="2">
            <hr />
          </td>
        </tr>
        <tr>
          <td class="text-subtitle-2">Oy Kullanan Kişi Sayısı:</td>
          <td>{{ voteTotal }}</td>
        </tr>
        <tr>
          <td class="text-subtitle-2">Evet Oyu Kullanan Kişi Sayısı:</td>
          <td>{{ voteYes }}</td>
        </tr>
        <tr>
          <td class="text-subtitle-2">Hayır Oyu Kullanan Kişi Sayısı:</td>
          <td>{{ voteNo }}</td>
        </tr>
      </table>
    </div>
  </v-container>
</template>

<script>
import { timeConverter } from "@/util/atom";

export default {
  props: ["item"],
  mounted() {
    this.$store
      .dispatch("votingGetDetail", this.item.id)
      .then((detail) => {
        this.voteYes = detail.yes;
        this.voteNo = detail.no;
        this.voteTotal = detail.total;
        this.load = true;
        console.log("Oylama detayları alındı!");
      })
      .catch(() =>
        this.$store.commit("notificationSet", {
          text: "Oylama detayları alınamadı",
          color: "error",
        })
      );
    // console.log("Sayfa yüklendi :)");
    // console.log(this.item);
  },
  data: () => ({
    load: false,
    voteYes: 0,
    voteNo: 0,
    voteTotal: 0,
  }),
  methods: {
    timeConverter,
  },
};
</script>

<style>
</style>
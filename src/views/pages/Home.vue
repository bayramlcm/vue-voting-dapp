<template>
  <v-container :class="!load ? 'fill-height' : ''">
    <v-row v-if="!load" align="center" justify="center">
      <v-col class="text-center">
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
    <div v-if="load">
      <home-header />
      <home-user />
      <home-admin v-if="role === 10" />
    </div>
  </v-container>
</template>

<script>
import HomeHeader from "@/views/organisms/Home/HomeHeader.vue";
import HomeAdmin from "@/views/organisms/Home/HomeAdmin.vue";
import HomeUser from "@/views/organisms/Home/HomeUser.vue";
export default {
  mounted() {
    this.$store
      .dispatch("home")
      .then(() => {
        this.load = true;
      })
      .catch(() =>
        this.$store.commit("notificationSet", {
          text: "Bilgiler alınırken hata meydana geldi",
          color: "red",
        })
      );
  },
  computed: {
    role() {
      return this.$store.state.user.role;
    },
  },
  data: () => ({
    load: false,
  }),
  components: { HomeHeader, HomeAdmin, HomeUser },
};
</script>

<style>
.card-icon {
  max-width: 90px;
}
</style>
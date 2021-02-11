<template>
  <div class="pt-10">
    <div class="text-h5 font-weight-regular">Yönetim</div>
    <v-row>
      <v-col>
        <v-card class="mt-4 mx-auto">
          <v-card-text class="">
            <v-row>
              <v-col class="card-icon">
                <v-icon size="78">mdi-account-group-outline</v-icon>
              </v-col>
              <v-col class="text-left">
                <div class="text-h6 text-left">Toplam Kullanıcı</div>
                <span class="text-h4">{{ totalUser }}</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mt-4 mx-auto">
          <v-card-text class="">
            <v-row>
              <v-col class="card-icon">
                <v-icon size="78">mdi-account-multiple-check-outline</v-icon>
              </v-col>
              <v-col class="text-left">
                <div class="text-h6 text-left">Toplam Admin Yetkili</div>
                <span class="text-h4">{{ admin }}</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mt-4 mx-auto">
          <v-card-text class="">
            <v-row>
              <v-col class="card-icon">
                <v-icon size="78">mdi-account-multiple-outline</v-icon>
              </v-col>
              <v-col class="text-left">
                <div class="text-h6 text-left">Toplam User Yetkili</div>
                <span class="text-h4">{{ user }}</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    totalUser() {
      return this.$store.state.home.totalUser;
    },
    admin() {
      return this.$store.state.home.admin;
    },
    user() {
      return this.$store.state.home.user;
    },
  },
};
</script>

<style>
</style>
<template>
  <div class="pt-5">
    <div class="text-h5 font-weight-regular">Genel</div>
    <v-row>
      <v-col>
        <v-card class="mt-4 mx-auto">
          <v-card-text class="">
            <v-row>
              <v-col class="card-icon">
                <v-icon size="78">mdi-ballot-outline</v-icon>
              </v-col>
              <v-col class="text-left">
                <div class="text-h6 text-left">Toplam Oylama</div>
                <span class="text-h4">{{ totalVote }}</span>
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
                <v-icon size="78">mdi-ballot-recount-outline</v-icon>
              </v-col>
              <v-col class="text-left">
                <div class="text-h6 text-left">Katılmadığınız Oylama</div>
                <span class="text-h4">{{ unusedVote }}</span>
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
                <v-icon size="78">mdi-vote-outline</v-icon>
              </v-col>
              <v-col class="text-left">
                <div class="text-h6 text-left">Katıldığınız Oylama</div>
                <span class="text-h4">{{ usedVote }}</span>
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
    totalVote() {
      return this.$store.state.home.totalVote;
    },
    unusedVote() {
      return this.$store.state.home.unusedVote;
    },
    usedVote() {
      return this.$store.state.home.usedVote;
    },
  },
};
</script>

<style>
</style>
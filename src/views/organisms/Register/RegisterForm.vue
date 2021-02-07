<template>
  <v-form v-on:submit.prevent>
    <v-card class="elevation-12">
      <v-toolbar flat>
        <v-toolbar-title>Giriş Yap</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-text-field
          label="Adresiniz"
          prepend-icon="mdi-lock"
          type="text"
          required
          v-model="getAddress"
          disabled
        ></v-text-field>
        <v-text-field
          label="Adınız Soyadınız"
          prepend-icon="mdi-account"
          type="text"
          required
          v-model="fullnameInput"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="register()" :disabled="!connected" type="submit">
          Kayıt Ol
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  props: ["fullname", "register"],
  data: () => ({}),
  computed: {
    getAddress() {
      return this.$store.state.web3.web3.coinbase;
    },
    connected() {
      return this.$store.state.web3.web3.isInjected;
    },
    fullnameInput: {
      get() {
        return this.fullname;
      },
      set(fullname) {
        this.$emit("fullnameChange", fullname);
      },
    },
  },
};
</script>

<style>
</style>
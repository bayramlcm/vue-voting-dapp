<template>
  <span>
    <span class="body-1"> Metamask: </span>
    <v-icon color="green" v-if="connected === true"
      >mdi-check-circle-outline</v-icon
    >
    <v-icon color="red" v-if="connected === false"
      >mdi-close-circle-outline</v-icon
    >
    <v-progress-circular
      indeterminate
      color="primary"
      size="20"
      width="2"
      v-if="connected === null"
    ></v-progress-circular>
  </span>
</template>

<script>
export default {
  computed: {
    connected() {
      return this.$store.state.web3.web3.isInjected;
    },
  },
};
</script>

<style>
</style>
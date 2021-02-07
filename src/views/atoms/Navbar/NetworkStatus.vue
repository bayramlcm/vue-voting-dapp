<template>
  <span class="pl-2">
    <span class="body-1"> Network: </span>
    <span class="subtitle-2">{{ getNetworkName }}</span>
  </span>
</template>

<script>
export default {
  computed: {
    getNetworkName() {
      switch (this.$store.state.web3.networkId) {
        case 1:
          return "Mainnet";
        case 3:
          return "Ropsten";
        case 4:
          return "Rinkedby";
        case 5:
          return "Goerli";
        case 42:
          return "Kovan";
        case 4447:
          return "Truffle";
        case 5777:
          return "Ganache";
        default:
          return "Bilinmeyen";
      }
    },
  },
};
</script>

<style>
</style>
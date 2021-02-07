<template>
  <div>
    <span class="pr-2">
      <metamask-status />
      <network-status />
    </span>
  </div>
</template>

<script>
import MetamaskStatus from "@/views/atoms/Navbar/MetamaskStatus";
import NetworkStatus from '@/views/atoms/Navbar/NetworkStatus.vue';

export default {
  components: {
    MetamaskStatus,
    NetworkStatus
  },
};
</script>
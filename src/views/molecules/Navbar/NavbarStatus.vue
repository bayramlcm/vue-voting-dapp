<template>
  <div>
    <span class="pr-2">
      <metamask-status />
      <network-status />
    </span>
    
    <v-btn icon router to="/my">
        <v-icon>mdi-account</v-icon>
    </v-btn>
    
    
    <v-btn icon router to="/logout">
        <v-icon>mdi-exit-to-app</v-icon>
    </v-btn>
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
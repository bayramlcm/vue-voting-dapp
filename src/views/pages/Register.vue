<template>
  <register
    :fullname="fullname"
    :register="register"
    @fullnameChange="(newFullname) => (fullname = newFullname)"
  />
</template>

<script>
import Register from "@/views/templates/Register.vue";

export default {
  components: { Register },
  data: () => ({
    fullname: "",
  }),
  mounted() {
    if (this.$store.state.web3.isInjected) {
      this.$store.dispatch("contractRegister");
    }
  },
  methods: {
    register() {
      this.$store.dispatch("userRegister", {
        name: this.fullname,
      });
    },
  },
};
</script>

<style>
</style>
<template>
  <register
    :fullname="fullname"
    :register="register"
    @fullnameChange="(newFullname) => (fullname = newFullname)"
  />
  <!-- (this.fullname = newFullname) -->
</template>

<script>
import Register from "@/views/templates/Register.vue";

export default {
  components: { Register },
  data: () => ({
    fullname: "",
  }),
  mounted() {},
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
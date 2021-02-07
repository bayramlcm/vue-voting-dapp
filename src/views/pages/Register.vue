<template>
  <register
    :fullname="fullname"
    :register="register"
    @fullnameChange="(newFullname) => (fullname = newFullname)"
  />
</template>

<script>
import Register from "@/views/templates/Register.vue";
/* eslint-disable */
export default {
  components: { Register },
  data: () => ({
    fullname: "",
  }),
  methods: {
    register() {
      this.$store.dispatch("contractRegister");
      // if (this.$refs.form.validate()) {
      //   this.$refs.form.$el.submit();
      // }
    },
  },
};
</script>

<style>
</style>
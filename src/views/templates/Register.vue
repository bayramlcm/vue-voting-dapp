<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <register-form
          :fullname="fullname"
          :register="register"
          @fullnameChange="
            (newFullname) => this.$emit('fullnameChange', newFullname)
          "
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RegisterForm from "@/views/organisms/Register/RegisterForm";

export default {
  props: ["fullname", "register"],
  components: { RegisterForm },
};
</script>

<style>
</style>
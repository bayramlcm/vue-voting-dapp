<template>
  <div class="pb-5">
    <h1 class="text-h5 font-weight-regular">Hoşgeldin, {{ name }}</h1>
  </div>
</template>

<script>
export default {
  computed: {
    name() {
      return this.$store.state.user.name;
    }
  }
};
</script>

<style>
</style>
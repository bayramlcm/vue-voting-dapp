<template>
  <v-list>
    <div v-for="item in links" :key="item.title">
      <menu-item :item="item" />
    </div>
  </v-list>
</template>

<script>
import MenuItem from "../../atoms/Navbar/MenuItem.vue";
export default {
  props: ["links"],
  components: { MenuItem },
};
</script>
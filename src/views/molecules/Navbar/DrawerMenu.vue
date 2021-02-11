<template>
  <v-list>
    <div v-for="item in links" :key="item.title">
      <v-subheader v-if="!!item.header && !!item.role && getRole >= item.role">
        {{ item.header }}
      </v-subheader>
      <menu-item :item="item" v-if="!!item.role && getRole >= item.role" />
    </div>
  </v-list>
</template>

<script>
import MenuItem from "../../atoms/Navbar/MenuItem.vue";
export default {
  props: ["links"],
  components: { MenuItem },
  computed: {
    getRole() {
      return this.$store.state.user.role;
    },
  },
};
</script>
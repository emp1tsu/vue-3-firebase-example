<template>
  <div class="content">
    <nav-bar />
    <router-view />
  </div>
</template>

<script lang="ts">
import NavBar from "./components/NavBar.vue";

export default {
  components: { NavBar },
};
</script>

<style lang="scss">
.content {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
}
</style>

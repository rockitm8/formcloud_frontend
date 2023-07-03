<template>
  <div class="app container">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.state.user_token = localStorage.getItem('token');
  },
};
</script>

<style>
#app {
}
</style>

<template>
  <div class="hero">
    <Navigation />
    <LoginForm />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import LoginForm from '../components/LoginForm.vue';

export default {
  name: 'GetStartedView',
  methods: {},
  mounted() {
    if (this.$store.state.user_token != '') {
      router.push({ path: `/tasks` });
    }
  },
  components: {
    LoginForm,
    Navigation,
  },
};
</script>

<style scoped>
* {
  font-family: sans-serif;
  font-size: 16px;
}
.hero {
  height: 100%;
  width: 100%;
  /* background: url(../assets/bg.jpg);
  background-position: center;
  background-size: cover;
  position: absolute; */
}
</style>

<template>
  <div class="confirm-view">
    <Navigation />

    <div class="area">
      <h1>ACCOUNT ACTIVATED!</h1>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'ConfirmView',
  data() {
    return {
      uid: '',
      token: '',
    };
  },
  methods: {
    async sendConfirmation() {
      console.log(`${this.$store.state.backend_url}/api/activate/${this.uid}/${this.token}/`)
      axios
        .get(
          `${this.$store.state.backend_url}/api/activate/${this.uid}/${this.token}/`
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.uid = router.currentRoute.value.query.uidb64;
    this.token = router.currentRoute.value.query.token;

    this.sendConfirmation();
  },
  components: { Navigation },
};
</script>

<style scoped>
.area {
  margin-top: 100px;
  margin-left: 50px;
}
</style>

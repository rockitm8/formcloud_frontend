<template>
  <div class="preset-view">
    <Navigation />
    <PresetForm />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import PresetForm from '@/components/PresetForm.vue';
export default {
  name: 'PresetView',
  components: {
    Navigation,
    PresetForm,
  },
};
</script>

<style scoped></style>

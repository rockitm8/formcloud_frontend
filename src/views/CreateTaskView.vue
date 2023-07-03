<template>
  <div class="create-task">
    <Navigation />
    <TaskForm />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import TaskForm from '@/components/TaskForm.vue';
export default {
  components: { Navigation, TaskForm },
  name: 'CreateTaskView',
};
</script>

<style scoped></style>

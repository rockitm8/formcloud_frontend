<template>
  <div class="tasks-view">
    <Navigation />
    <TasksTable />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import TasksTable from '../components/TasksTable.vue';
// @ is an alias to /src
export default {
  name: 'TasksView',
  components: { Navigation, TasksTable },
};
</script>

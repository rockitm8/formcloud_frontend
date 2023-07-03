import { createRouter, createWebHistory } from 'vue-router';
import TasksView from '../views/TasksView.vue';
import GetStartedView from '../views/GetStartedView.vue';
import MessagesView from '../views/MessagesView.vue';
import TaskInfoView from '../views/TaskInfoView.vue';
import CreateTaskView from '../views/CreateTaskView.vue';
import FormFillerView from '../views/FormFillerView.vue';
import PresetView from '../views/PresetView.vue';
import ConfirmationView from '../views/ConfirmationView.vue';

const routes = [
  {
    path: '/tasks',
    name: 'task_view',
    component: TasksView,
  },
  {
    path: '/form',
    name: 'form_filler',
    component: FormFillerView,
  },
  {
    path: '/preset',
    name: 'preset_view',
    component: PresetView,
  },
  {
    path: '/',
    name: 'get_Started_view',
    component: GetStartedView,
  },
  {
    path: '/messages',
    name: 'messages_view',
    component: MessagesView,
  },
  {
    path: '/task-info/:id',
    name: 'task_info_view',
    component: TaskInfoView,
  },
  {
    path: '/create-task',
    name: 'create_task_view',
    component: CreateTaskView,
  },
  {
    path: '/activateAccount',
    name: 'confirmation_view',
    component: ConfirmationView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

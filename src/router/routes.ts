import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/username',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/absences', component: () => import('pages/AbsencesPage.vue') },
      { path: '/team', component: () => import('pages/TeamPage.vue') },
      { path: '/tasks', component: () => import('pages/TaskPage.vue') }
    ],
  },
  {
    path: '/',
      component: () => import('layouts/LoginLayout.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

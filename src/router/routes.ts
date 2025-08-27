import type { RouteRecordRaw } from 'vue-router';

const isUserAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (token === null || token === undefined) {
    return false;
  }
  return true;
};

const routes: RouteRecordRaw[] = [
  {
    path: '/username',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from, next) => {
      const isAuthenticated = isUserAuthenticated();
      if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' });
      else next();
    },
    children: [
      { path: '', component: () => import('pages/EmployeePage.vue') },
      { path: '/vacations', component: () => import('pages/VacationsPage.vue') },
      { path: '/team', component: () => import('pages/TeamPage.vue') },
      { path: '/calendar', component: () => import('pages/MyCalendarPage.vue') },
    ],
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('layouts/LoginLayout.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

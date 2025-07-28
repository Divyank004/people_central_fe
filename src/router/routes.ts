import type { RouteRecordRaw } from 'vue-router';


const isUserAuthenticated = () => {
  const token = localStorage.getItem('token');
  // check for expired token happens at every api request and redirects to login if expired
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
      if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
      else next()
    },
    children: [{ path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/absences', component: () => import('pages/AbsencesPage.vue') },
      { path: '/team', component: () => import('pages/TeamPage.vue') },
      { path: '/calendar', component: () => import('pages/MyCalendarPage.vue') },
      // { path: '/tasks', component: () => import('pages/TimesheetsPage.vue') },
    ],
  },
  {
    path: '/',
    name: 'Login',
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

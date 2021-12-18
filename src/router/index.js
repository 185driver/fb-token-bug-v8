import Vue from 'vue';
import VueRouter from 'vue-router';
import * as fb from '@/firebase.config';
import About from '../views/About.vue';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/login',
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: { requiresAuth: true },
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const { currentUser } = fb.auth;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && (!currentUser || !from.name)) {
    next('login');
  } else {
    next();
  }
});

export default router;

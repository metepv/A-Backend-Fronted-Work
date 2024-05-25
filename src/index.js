import { createRouter, createWebHistory } from 'vue-router';
import Login from './login_vue.vue';
import Admin from './admin_vue.vue';
import User from './user_vue.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/admin', component: Admin, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/user', component: User, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next('/login');
    } else if (to.meta.role && role !== to.meta.role) {
      next('/user'); // Redirect to user page if not admin
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

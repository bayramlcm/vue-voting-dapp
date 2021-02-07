import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/pages/Home'
import Login from '@/views/pages/Login'
import Register from '@/views/pages/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '*',
      redirect: '/',
    },
  ]
})
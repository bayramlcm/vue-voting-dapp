import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/pages/Home'
import Login from '@/views/pages/Login'
import Register from '@/views/pages/Register'
import MetamaskError from '@/views/pages/MetamaskError'

import store from '../store'

Vue.use(Router)
const routes = [
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
    path: '/metamask-error',
    name: 'Metamask Error',
    component: MetamaskError,
  },
  {
    path: '*',
    redirect: '/',
  },
];
const router = new Router({
  routes,
});

router.beforeEach((to, from, next) => {
  // Kullanıcı girişi başarılı ve kayıt ekranında değilse izin ver
  if (store.state.user.login === true && '/register' !== to.path.toLowerCase()) return next();

  // Metamask bağlantı hatası sayfası
  if ('/metamask-error' === to.path.toLowerCase()) {
    next();
  } else {
    let interval = setInterval(() => {
      // Metamask bağlanamazsa yönlendir
      if (store.state.web3.isInjected !== null) clearInterval(interval);

      if (store.state.web3.isInjected === false) {
        console.log("Metamask bağlantısı kurulamadı!");
        router.push('/metamask-error');
        next();

      } else if (store.state.web3.isInjected === true) {
        console.log("Metamask bağlantısı başarılı!");
        // Akıllı sözleşmeyi çalıştır
        store.dispatch('contractRegister').then(() => {
          // Kullanıcı kaydı kontrol
          store.dispatch('userLogin').then(() => {
            console.warn("Kullanıcı daha önce kayıt olmuş");
            router.push('/');
            next();
          }).catch(() => {
            console.error("Kullanıcı daha önce kayıt olmamış");
            router.push('/register')
            next();
          });
        });

      }
    }, 100);
  }
});

export default router;
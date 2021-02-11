import Vue from 'vue'
import Router from 'vue-router'

import store from '../store'

Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/pages/Home'),
  },
  {
    path: '/votingList',
    name: 'VotingList',
    component: () => import('@/views/pages/VotingList'),
  },
  {
    path: '/voteList',
    name: "VoteList",
    component: () => import("@/views/pages/VoteList"),
  },
  {
    path: '/userList',
    name: 'userList',
    component: () => import('@/views/pages/UserList'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/pages/Register'),
  },
  {
    path: '/metamaskError',
    name: 'MetamaskError',
    component: () => import('@/views/pages/MetamaskError'),
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
  // Metamask bağlantı hatası sayfası
  if ('/metamaskerror' === to.path.toLowerCase()) {
    next();
  } else {
    // Kullanıcı girişi başarılı ve kayıt ekranında değilse izin ver
    if (store.state.user.login === true && '/register' !== to.path.toLowerCase()) return next();

    let interval = setInterval(() => {
      // Metamask bağlanamazsa yönlendir
      if (store.state.web3.isInjected !== null) clearInterval(interval);

      if (store.state.web3.isInjected === false) {
        console.log("Metamask bağlantısı kurulamadı!");
        router.push('/metamaskerror');
        next();

      } else if (store.state.web3.isInjected === true) {
        console.log("Metamask bağlantısı başarılı!");
        // Akıllı sözleşmeyi çalıştır
        store.dispatch('contract').then(() => {
          // Kullanıcı kaydı kontrol
          store.dispatch('userLogin').then(() => {
            console.warn("Kullanıcı daha önce kayıt olmuş");
            if ('/register' === to.path.toLowerCase()) router.push('/');
            next();
          }).catch(() => {
            console.error("Kullanıcı daha önce kayıt olmamış");
            // Giriş yapmamış ve register sayfasındaysa yönlendirmeden devam et
            if ('/register' === to.path.toLowerCase()) return next();
            router.push('/register')
            next();
          });
        });

      }
    }, 100);
  }
});

export default router;
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Settings from '@/plugins/appSettings'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/Home.vue'),
    meta: {
      requiresAuth: true,
      breadcrumb: {
        breadcrumb: '',
        icon: '',
        title: Settings.applicationSettings.homeTitle,
        subTitle: Settings.applicationSettings.homeSubTitle
      }
    }
  },
  {
    path: '/myProfile',
    name: 'MyProfile',
    component: () => import('@/views/MyProfile.vue'),
    meta: {
      requiresAuth: true,
      breadcrumb: {
        breadcrumb: '',
        icon: 'mdi-home',
        title: '',
        subTitle: 'My Profile'
      }
    }
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: () => import('@/views/accounts/AccountView.vue'),
    props: true,
    meta: {
      requiresAuth: true,
      breadcrumb: {
        breadcrumb: '',
        icon: 'mdi-home',
        title: 'Accounts',
        subTitle: ''
      }
    },
    children: [
      {
        path: '/savings',
        name: 'Savings',
        component: () => import('@/views/accounts/Savings.vue'),
        meta: {
          requiresAuth: true,
          breadcrumb: {
            breadcrumb: '',
            icon: 'mdi-home',
            title: 'Accounts',
            subTitle: 'Savings'
          }
        }
      },
      {
        path: '/current',
        name: 'Current',
        component: () => import('@/views/accounts/Current.vue'),
        meta: {
          requiresAuth: true,
          breadcrumb: {
            breadcrumb: '',
            icon: 'mdi-home',
            title: 'Accounts',
            subTitle: 'Current'
          }
        }
      },
      {
        path: '/deposits',
        name: 'Deposits',
        component: () => import('@/views/accounts/Deposits.vue'),
        meta: {
          requiresAuth: true,
          breadcrumb: {
            breadcrumb: '',
            icon: 'mdi-home',
            title: 'Accounts',
            subTitle: 'Deposits'
          }
        }
      }
    ]
  },
  {
    path: '/savings',
    name: 'Savings',
    component: () => import('@/views/accounts/Savings.vue'),
    meta: {
      requiresAuth: true,
      breadcrumb: {
        breadcrumb: '',
        icon: 'mdi-home',
        title: 'Accounts',
        subTitle: 'Savings'
      }
    }
  },
  {
    path: '/current',
    name: 'Current',
    component: () => import('@/views/accounts/Current.vue'),
    meta: {
      requiresAuth: true,
      breadcrumb: {
        breadcrumb: '',
        icon: 'mdi-home',
        title: 'Accounts',
        subTitle: 'Current'
      }
    }
  },
  {
    path: '/deposits',
    name: 'Deposits',
    component: () => import('@/views/accounts/Deposits.vue'),
    meta: {
      requiresAuth: true,
      breadcrumb: {
        breadcrumb: '',
        icon: 'mdi-home',
        title: 'Accounts',
        subTitle: 'Deposits'
      }
    }
  },
  {
    path: '/accountDetails',
    name: 'AccountDetails',
    component: () => import('@/views/accounts/accountDetails/AccountDetails.vue'),
    meta: {
      requiresAuth: true,
      breadcrumb: {
        breadcrumb: '',
        icon: 'mdi-home',
        title: 'Accounts',
        subTitle: 'Account Details'
      }
    }
  },
  {
    path: '/contact',
    name: 'ContactUs',
    component: () => import('@/views/ContactUs.vue'),
    props: true,
    meta: {
      requiresAuth: true,
      breadcrumb: {
        breadcrumb: '',
        icon: 'mdi-home',
        title: 'Contact Us'
      }
    }
  },
  {
    path: '*',
    redirect: '/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

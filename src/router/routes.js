
const routes = [
  {
    path: '/about/introduction',
    component: () => import('layouts/DefaultLayout'),
    meta: {
      dir: '0-about/1-introduction',
      icon: 'grade',
      status: 'empty',

      menu: {
        header: {
          icon: 'contact_support',
          name: 'about'
        }
      },
      layouts: {
        footer: true
      },
      pages: {
        showcase: false
      }
    },

    children: [
      {
        path: '',
        component: () => import('pages/sources/0-about/1-introduction'),
        meta: {
          status: 0
        }
      }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/DefaultLayout'),
    meta: {
      layouts: {
        footer: false,
        submenu: false
      },
      pages: {}
    },

    children: [
      {
        path: '',
        component: () => import('pages/sources/BootPage'),
        meta: {
          icon: 'home',
          menu: 'home'
        }
      },
      {
        path: '/changelog',
        component: () => import('pages/sources/ChangelogPage'),
        meta: {
          icon: 'assignment',
          menu: 'changelog'
        }
      },
      {
        path: '/sponsor',
        component: () => import('pages/sources/SponsorPage'),
        meta: {
          icon: 'favorite',
          menu: 'sponsor'
        }
      },
      {
        path: '*',
        component: () => import('pages/sources/404Page'),
        meta: {
          menu: '_404'
        }
      }
    ]
  }
]

export default routes

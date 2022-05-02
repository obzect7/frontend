import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'

// 라우팅 구성
const options = {
  routes: [
    {
      path: '/login',
      name: '로그인 페이지',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '첫페이지',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: {
            icon: 'dashboard'
          },
          component: BlankView,
          children: [
            {
              path: 'workplace',
              name: '작업공간',
              meta: {
                page: {
                  closable: false
                }
              },
              component: () => import('@/pages/dashboard/workplace'),
            },
            {
              path: 'analysis',
              name: '분석',
              component: () => import('@/pages/dashboard/analysis'),
            }
          ]
        },
        {
          path: 'form',
          name: 'Form',
          meta: {
            icon: 'form',
            page: {
              cacheAble: false
            }
          },
          component: PageView,
          children: [
            {
              path: 'basic',
              name: 'Basic',
              component: () => import('@/pages/form/basic'),
            },
            {
              path: 'step',
              name: 'Step',
              component: () => import('@/pages/form/step'),
            },
            {
              path: 'advance',
              name: 'Advance',
              component: () => import('@/pages/form/advance'),
            }
          ]
        },
        {
          path: 'list',
          name: 'List',
          meta: {
            icon: 'table'
          },
          component: PageView,
          children: [
            {
              path: 'query',
              name: 'Query',
              meta: {
                authority: 'queryForm',
              },
              component: () => import('@/pages/list/QueryList'),
            },
            {
              path: 'query/detail/:id',
              name: '세부정보',
              meta: {
                highlight: '/list/query',
                invisible: true
              },
              component: () => import('@/pages/Demo')
            },
            {
              path: 'primary',
              name: 'Standard List',
              component: () => import('@/pages/list/StandardList'),
            },
            {
              path: 'card',
              name: 'Card List',
              component: () => import('@/pages/list/CardList'),
            },
            {
              path: 'auigrid',
              name: 'AUI GRID',
              component: () => import('@/pages/list/AuiGridList'),
            },
            {
              path: 'search',
              name: 'Search',
              component: () => import('@/pages/list/search/SearchLayout'),
              children: [
                {
                  path: 'article',
                  name: 'Acticle',
                  component: () => import('@/pages/list/search/ArticleList'),
                },
                {
                  path: 'application',
                  name: 'Application',
                  component: () => import('@/pages/list/search/ApplicationList'),
                },
                {
                  path: 'project',
                  name: 'Project',
                  component: () => import('@/pages/list/search/ProjectList'),
                }
              ]
            }
          ]
        },
        {
          path: 'details',
          name: '세부정보 페이지',
          meta: {
            icon: 'profile'
          },
          component: BlankView,
          children: [
            {
              path: 'basic',
              name: 'Basic',
              component: () => import('@/pages/detail/BasicDetail')
            },
            {
              path: 'advance',
              name: 'Advance',
              component: () => import('@/pages/detail/AdvancedDetail')
            }
          ]
        },
        {
          path: 'result',
          name: 'Result',
          meta: {
            icon: 'check-circle-o',
          },
          component: PageView,
          children: [
            {
              path: 'success',
              name: 'Success',
              component: () => import('@/pages/result/Success')
            },
            {
              path: 'error',
              name: 'Error',
              component: () => import('@/pages/result/Error')
            }
          ]
        },
        {
          path: 'exception',
          name: 'Exception',
          meta: {
            icon: 'warning',
          },
          component: BlankView,
          children: [
            {
              path: '404',
              name: 'Exp404',
              component: () => import('@/pages/exception/404')
            },
            {
              path: '403',
              name: 'Exp403',
              component: () => import('@/pages/exception/403')
            },
            {
              path: '500',
              name: 'Exp500',
              component: () => import('@/pages/exception/500')
            }
          ]
        },
        {
          path: 'components',
          name: 'Components',
          meta: {
            icon: 'appstore-o'
          },
          component: PageView,
          children: [
            {
              path: 'taskCard',
              name: 'TaskCard',
              component: () => import('@/pages/components/TaskCard')
            },
            {
              path: 'palette',
              name: 'Palette',
              component: () => import('@/pages/components/Palette')
            },
            {
              path: 'table',
              name: 'Table',
              component: () => import('@/pages/components/table')
            }
          ]
        },
        {
          name: 'Auth/form',
          path: 'auth/form',
          meta: {
            icon: 'file-excel',
            authority: {
              permission: 'form'
            }
          },
          component: () => import('@/pages/form/basic')
        },
        {
          name: 'Router/query',
          path: 'router/query',
          meta: {
            icon: 'project',
            query: {
              name: '메뉴 기본 매개변수'
            }
          },
          component: () => import('@/pages/Demo')
        },
        {
          name: '동적라우팅메뉴',
          path: 'router/dynamic/:id',
          meta: {
            icon: 'project',
            params: {
              id: 123
            }
          },
          component: () => import('@/pages/Demo')
        },
        /*
        {
          name: 'Ant Design Vue',
          path: 'antdv',
          meta: {
            icon: 'ant-design',
            link: 'https://www.antdv.com/docs/vue/introduce-cn/'
          }
        },
        {
          name: 'Document',
          path: 'document',
          meta: {
            icon: 'file-word',
            link: 'https://iczer.gitee.io/vue-antd-admin-docs/'
          }
        }
        */
      ]
    },
  ]
}

export default options

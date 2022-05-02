---
title: 비동기식 라우팅 및 메뉴
lang: ko-KR
---
# 비동기 경로 및 메뉴
실제 비즈니스에서는 사용자의 역할에 따라 시스템의 라우팅 및 메뉴가 변경되거나 사용자의 권한에 따라 라우팅 메뉴가 
동적으로 생성되는 시나리오가 있습니다. 이를 위해 완전한 비동기 로딩 솔루션 세트를 준비했습니다.
이를 통해 서버에서 라우팅 및 메뉴 구성을 쉽게 로드하고 시스템에 적용할 수 있습니다.
## 경로를 비동기식으로 로드
동적 라우팅의 구현은 주로 다음 4단계로 이루어집니다.：
### 비동기 라우팅 설정 활성화
 `/config/config.js` 파일에 설정 `asyncRoutes` 값 true:
```js {7}
module.exports = {
  theme: {
    color: '#13c2c2',
    mode: 'night'
  },
  multiPage: true,
  asyncRoutes: true,       //비동기식으로 경로 로드, true: 활성화, false: 비활성화
  animate: {
    name: 'roll',
    direction: 'default'
  }
}
```
### 라우팅 구성 요소 등록
기본 라우팅 구성 요소에는 기본 라우팅 구성과 해당 보기 구성 요소가 포함되어 있습니다. `/router/async/router.map.js` 파일을 등록합니다. 기본적으로 일반 라우팅 구성과 동일하며, 등록을 위해 전체 라우팅을 단일 라우팅 구성으로 분할하여 나중에 동적 라우팅 구성을 위한 좋은 기반을 마련하는 것과 같습니다.  
단일 라우팅 구성 요소 등록의 예는 다음과 같습니다.
```jsx
registerName: {                               //라우팅 구성 요소 등록 이름, 고유 식별자
  path: 'path',                               //라우팅path，기본적으로 경로 등록 이름 registerName의 값으로 기본 설정될 수 있습니다.
  name: '데모페이지',                          //경로명
  redirect: '/login',                         //경로 리다이렉션
  component: () => import('@/pages/demo'),    //경로보기
  icon: 'permission',                         //경로의 메뉴 아이콘이 경로 메타데이터 메타에 삽입됩니다.
  invisible: false,                           //메뉴 항목을 숨길지 여부, true는 숨김, false는 숨기지 않고 라우팅 메타데이터 메타에 삽입됩니다.
  authority: {                                //라우팅 권한 구성은 라우팅 메타데이터 메타에 삽입됩니다. 기본값으로 지정할 수 있습니다. 기본값은 '*'입니다. 즉, 권한 제한이 없습니다.
    permission: 'form',                       //라우팅에 필요한 권한  
    role: 'admin'                             //라우팅에 필요한 역할. 권한이 설정되지 않은 경우 역할을 통해 권한 확인
  },                     
  page: {                                     //라우트된 페이지 데이터는 라우트 메타데이터 메타에 주입됩니다.
    title: '데모페이지',                       //페이지 제목
    breadcrumb: ['첫 페이지', '데모 페이지']   //페이지 이동 경로
  }             
}
```

:::details 전체 경로 등록 예를 보려면 클릭하십시오.
```js
// 보기 구성 요소
const view = {
  tabs: () => import('@/layouts/tabs'),
  blank: () => import('@/layouts/BlankView'),
  page: () => import('@/layouts/PageView')
}

// 라우팅 구성 요소 등록
const routerMap = {
  login: {
    authority: '*',
    path: '/login',
    component: () => import('@/pages/login')
  },
  demo: {
    name: '데모페이지',
    renderMenu: false,
    component: () => import('@/pages/demo')
  },
  exp403: {
    authority: '*',
    name: 'exp403',
    path: '403',
    component: () => import('@/pages/exception/403')
  },
  exp404: {
    name: 'exp404',
    path: '404',
    component: () => import('@/pages/exception/404')
  },
  exp500: {
    name: 'exp500',
    path: '500',
    component: () => import('@/pages/exception/500')
  },
  root: {
    path: '/',
    name: '첫페이지',
    redirect: '/login',
    component: view.tabs
  },
  parent1: {
    name: '부모경로1',
    icon: 'dashboard',
    component: view.blank
  },
  parent2: {
    name: '부모경로2',
    icon: 'form',
    component: view.page
  },
  exception: {
    name: '예외페이지',
    icon: 'warning',
    component: view.blank
  }
}
export default routerMap
```
:::
### 기본 라우팅 구성
경로가 없으면 앱에 액세스할 수 없으므로 로그인 페이지, 404, 403과 같은 일부 기본 경로를 로컬로 구성해야 합니다. 
`/router/async/config.async.js` 파일에서 필요한 로컬 경로를 구성합니다. 다음과 같이
```js
const routesConfig = [
  'login',                      //router.map.js에 등록된 경로를 registerName = login과 일치시킵니다.
  'root',                       //router.map.js에 등록된 경로를 registerName = root로 일치시킵니다.
  {
    router: 'exp404',           //router.map.js에 등록된 registerName = exp404와 경로를 일치시킵니다.
    path: '*',                  //exp404 경로의 경로 속성 재정의
    name: '404'                 //exp404 경로의 이름 속성 재정의
  },
  {
    router: 'exp403',           //router.map.js에 등록된 registerName = exp403과 경로를 일치시킵니다.
    path: '/403',               //exp403 경로의 경로 속성 재정의
    name: '403'                 //exp403 경로의 이름 속성 재정의
  }
]
```
구성이 완료되면 'routesConfig' 및 등록된 'routerMap'에서 [router.options.routes]를 생성할 수 있습니다.
(https://router.vuejs.org/zh/api/#router-%E6%9E%84%E5%BB%BA%E9%80%89%E9%A1%B9) 다음과 같이 구성：
```js
const options = {
  routes: parseRoutes(routesConfig, routerMap)
}
```
:::전체 config.async.js 코드를 보려면 클릭하세요.
```js
import routerMap from './router.map'
import {parseRoutes} from '@/utils/routerUtil'

// 비동기 라우팅 구성
const routesConfig = [
  'login',
  'root',
  {
    router: 'exp404',
    path: '*',
    name: '404'
  },
  {
    router: 'exp403',
    path: '/403',
    name: '403'
  }
]
const options = {
  routes: parseRoutes(routesConfig, routerMap)
}
export default options
```
:::
위의 설정을 완료하면 이미 로그인, 404, 403 페이지를 포함하는 경로가 로컬에 있으며 이러한 경로는 직접 액세스할 수 있습니다.
### 비동기식으로 경로 구성 가져오기
사용자가 로그인한 경우(또는 기타 전제 조건) 사용자에 따라 다른 경로와 메뉴를 로드할 수 있습니다.
그런 다음 백엔드 서비스에서 먼저 비동기 라우팅 구성을 가져와야 합니다. 
백엔드에서 반환된 비동기 라우팅 구성 'routesConfig'는 다음 형식이어야 하는 비동기 라우팅 구성 배열입니다.
```jsx
[{
  router: 'root',                           //router.map.js에서 등록 이름 registerName = root와 경로를 일치시킵니다.
  children: [                               //root 루트의 하위 루트 구성
    {
      router: 'dashboard',                  //라우터.map.js에서 등록 이름 registerName = 대시보드와 경로를 일치시킵니다.
      children: ['workplace', 'analysis'],  //registerName이 작업장인 경로와 차례로 분석되는 대시보드 경로의 하위 경로 구성
    },
    {
      router: 'form',                       //라우터.map.js에서 등록 이름 registerName = 형식과 경로를 일치시킵니다.
      children: [                           //form 경로의 하위 경로 구성
        'basicForm',                        //라우터.map.js에서 등록 이름 registerName = basicForm과 경로를 일치시킵니다.
        'stepForm',                         //router.map.js에서 등록 이름 registerName = stepForm과 경로를 일치시킵니다.
        {
          router: 'advanceForm',            //router.map.js에서 등록 이름 registerName = advanceForm과 경로를 일치시킵니다.
          path: 'advance'                   //AdvanceForm 경로의 경로 속성 재정의
        }
      ]   
    },
    {
      router: 'basicForm',                  //라우터.map.js에서 등록 이름 registerName = basicForm과 경로를 일치시킵니다.
      name: '验权表单',                     //basicForm 경로의 name 속성 재정의
      icon: 'file-excel',                   //basicForm 경로의 icon 속성 재정의
      authority: 'form'                     //basicForm 경로의 권한 속성 재정의
    }
  ]
}]
```
'router' 속성은 'router.map.js'에 등록된 '기본 라우트'의 등록명 'registerName'에 해당하며, 
'children' 속성은 라우트의 중첩된 하위 경로 구성입니다.
경우에 따라 등록된 경로의 속성을 재정의할 수 있습니다. 
'routesConfig'에서 같은 이름으로 속성을 구성하여 이를 재정의할 수 있습니다. 
예를 들어 위의 '인증 양식' 경로는 등록된 경로의 '이름', '아이콘' 및 '권한' 속성을 재정의합니다.

### 경로 로드 및 적용
우리는 라우트 로딩 도구를 제공합니다. 다음과 같이 이전 단계에서 얻은 'routesConfig'를 로드하기 위해
`/utils/routerUtil.js`의 `loadRoutes` 메소드를 호출하기만 하면 됩니다.
```js {3}
getRoutesConfig().then(result => {
  const routesConfig = result.data.data
  loadRoutes(routesConfig)
})
```
이 시점에서 비동기 라우트의 로드가 완료되고 비동기적으로 로드된 라우트에 액세스할 수 있습니다.
:::tip
위의 비동기 경로를 가져오는 코드는 /pages/login/Login.vue 파일에서 찾을 수 있습니다. 
loadRoutes 메서드는 /router/async/config.async.js 파일에 구성된 기본 경로를 병합합니다.
:::
:::세부 정보 loadRoutes의 세부 코드를 보려면 클릭하십시오.
```js
/**
 * 로드 경로
 * @param routesConfig 라우팅 구성
 */
function loadRoutes(routesConfig) {
  // routeConfig에 값이 있으면 로컬로 업데이트하고 그렇지 않으면 로컬에서 가져옵니다.
  if (routesConfig) {
    store.commit('account/setRoutesConfig', routesConfig)
  } else {
    routesConfig = store.getters['account/routesConfig']
  }
  // 비동기 라우팅이 활성화된 경우 비동기 라우팅 구성을 로드합니다.
  const asyncRoutes = store.state.setting.asyncRoutes
  if (asyncRoutes) {
    if (routesConfig && routesConfig.length > 0) {
      const routes = parseRoutes(routesConfig, routerMap)
      formatAuthority(routes)
      const finalRoutes = mergeRoutes(router.options.routes, routes)
      router.options = {...router.options, routes: finalRoutes}
      router.matcher = new Router({...router.options, routes:[]}).matcher
      router.addRoutes(finalRoutes)
    }
  }
  // 관리자 백그라운드 메뉴 데이터 초기화
  const rootRoute = router.options.routes.find(item => item.path === '/')
  const menuRoutes = rootRoute && rootRoute.children
  if (menuRoutes) {
    mergeI18nFromRoutes(i18n, menuRoutes)
    store.commit('setting/setMenuData', menuRoutes)
  }
}
```
:::

## 메뉴를 비동기적으로 로드
Vue Antd Admin의 메뉴는 라우팅 설정에 따라 자동으로 생성되며, 
기본적으로 루트 `'/'` 아래의 모든 하위 루트는 메뉴 설정으로 가져옵니다.
비동기 라우트 로드를 마치면 다른 작업을 수행할 필요 없이 메뉴도 변경됩니다. 
주요 코드는 다음과 같습니다.
```js
// 관리자 백그라운드 메뉴 데이터 초기화
  const rootRoute = router.options.routes.find(item => item.path === '/')
  const menuRoutes = rootRoute && rootRoute.children
  if (menuRoutes) {
    mergeI18nFromRoutes(i18n, menuRoutes)
    store.commit('setting/setMenuData', menuRoutes)
  }
```
:::tip
루트 경로 `'/'`에서 메뉴 데이터를 가져오지 않으려면 필요에 따라 변경할 수 있습니다.
:::

import routerMap from '@/router/async/router.map'
import {mergeI18nFromRoutes} from '@/utils/i18n'
import Router from 'vue-router'
import deepMerge from 'deepmerge'
import basicOptions from '@/router/async/config.async'

//애플리케이션 구성
let appOptions = {
  router: undefined,
  i18n: undefined,
  store: undefined
}

/**
 * 애플리케이션 구성 설정
 * @param options
 */
function setAppOptions(options) {
  const {router, store, i18n} = options
  appOptions.router = router
  appOptions.store = store
  appOptions.i18n = i18n
}

/**
 * 라우팅 구성 및 라우팅 컴포넌트 등록에 따른 라우팅 분석
 * @param routesConfig 라우팅 구성
 * @param routerMap 로컬 라우팅 구성 요소 등록 구성
 */
function parseRoutes(routesConfig, routerMap) {
  let routes = []
  routesConfig.forEach(item => {
    // routerMap에 등록된 라우터를 가져오고 routeCfg를 초기화합니다.
    let router = undefined, routeCfg = {}
    if (typeof item === 'string') {
      router = routerMap[item]
      routeCfg = {path: (router && router.path) || item, router: item}
    } else if (typeof item === 'object') {
      router = routerMap[item.router]
      routeCfg = item
    }
    if (!router) {
      console.warn(`can't find register for router ${routeCfg.router}, please register it in advance.`)
      router = typeof item === 'string' ? {path: item, name: item} : item
    }
    // 라우터 및 routeCfg에서 경로 확인
    const meta = {
      authority: router.authority,
      icon: router.icon,
      page: router.page,
      link: router.link,
      params: router.params,
      query: router.query,
      ...router.meta
    }
    const cfgMeta = {
      authority: routeCfg.authority,
      icon: routeCfg.icon,
      page: routeCfg.page,
      link: routeCfg.link,
      params: routeCfg.params,
      query: routeCfg.query,
      ...routeCfg.meta
    }
    Object.keys(cfgMeta).forEach(key => {
      if (cfgMeta[key] === undefined || cfgMeta[key] === null || cfgMeta[key] === '') {
        delete cfgMeta[key]
      }
    })
    Object.assign(meta, cfgMeta)
    const route = {
      path: routeCfg.path || router.path || routeCfg.router,
      name: routeCfg.name || router.name,
      component: router.component,
      redirect: routeCfg.redirect || router.redirect,
      meta: {...meta, authority: meta.authority || '*'}
    }
    if (routeCfg.invisible || router.invisible) {
      route.meta.invisible = true
    }
    if (routeCfg.children && routeCfg.children.length > 0) {
      route.children = parseRoutes(routeCfg.children, routerMap)
    }
    routes.push(route)
  })
  return routes
}

/**
 * 로드 경로
 * @param routesConfig {RouteConfig[]} 라우팅 구성
 */
function loadRoutes(routesConfig) {
  //0.6.1 이하 버전과 호환 가능
  /*************** 호환 version < v0.6.1 *****************/
  console.log('arguments.length == ',arguments.length);
  console.log('routesConfig == ',routesConfig);
  if (arguments.length > 0) {
    const arg0 = arguments[0]
    if (arg0.router || arg0.i18n || arg0.store) {
      routesConfig = arguments[1]
      console.error('the usage of signature loadRoutes({router, store, i18n}, routesConfig) is out of date, please use the new signature: loadRoutes(routesConfig).')
      console.error('方法签名 loadRoutes({router, store, i18n}, routesConfig) 的用法已过时, 请使用新的方法签名 loadRoutes(routesConfig)。')
    }
  }
  /*************** 호환 version < v0.6.1 *****************/

  // 애플리케이션 구성
  const {router, store, i18n} = appOptions

  // routeConfig에 값이 있으면 로컬로 업데이트하고 그렇지 않으면 로컬에서 가져옵니다.
  if (routesConfig) {
    console.log('@@@@@@@@@@@@@');
    store.commit('account/setRoutesConfig', routesConfig)
  } else {
    console.log('###########');
    routesConfig = store.getters['account/routesConfig']
  }
  // 비동기 라우팅이 활성화된 경우 비동기 라우팅 구성을 로드합니다.
  const asyncRoutes = store.state.setting.asyncRoutes
  if (asyncRoutes) {
    if (routesConfig && routesConfig.length > 0) {
      const routes = parseRoutes(routesConfig, routerMap)
      const finalRoutes = mergeRoutes(basicOptions.routes, routes)
      formatRoutes(finalRoutes)
      router.options = {...router.options, routes: finalRoutes}
      router.matcher = new Router({...router.options, routes:[]}).matcher
      router.addRoutes(finalRoutes)
    }
  }
  // 라우팅 국제화 데이터 추출
  mergeI18nFromRoutes(i18n, router.options.routes)
  // 관리자 백그라운드 메뉴 데이터 초기화
  const rootRoute = router.options.routes.find(item => item.path === '/')
  const menuRoutes = rootRoute && rootRoute.children
  if (menuRoutes) {
    store.commit('setting/setMenuData', menuRoutes)
  }
}

/**
 * 라우팅 병합
 * @param target {Route[]}
 * @param source {Route[]}
 * @returns {Route[]}
 */
function mergeRoutes(target, source) {
  const routesMap = {}
  target.forEach(item => routesMap[item.path] = item)
  source.forEach(item => routesMap[item.path] = item)
  return Object.values(routesMap)
}

/**
 * 심층 병합 라우팅
 * @param target {Route[]}
 * @param source {Route[]}
 * @returns {Route[]}
 */
function deepMergeRoutes(target, source) {
  // 지도 경로 배열
  const mapRoutes = routes => {
    const routesMap = {}
    routes.forEach(item => {
      routesMap[item.path] = {
        ...item,
        children: item.children ? mapRoutes(item.children) : undefined
      }
    })
    return routesMap
  }
  const tarMap = mapRoutes(target)
  const srcMap = mapRoutes(source)

  // 라우팅 병합
  const merge = deepMerge(tarMap, srcMap)

  // 경로 배열로 변환
  const parseRoutesMap = routesMap => {
    return Object.values(routesMap).map(item => {
      if (item.children) {
        item.children = parseRoutesMap(item.children)
      } else {
        delete item.children
      }
      return item
    })
  }
  return parseRoutesMap(merge)
}

/**
 * 형식 라우팅
 * @param routes 라우팅 구성
 */
function formatRoutes(routes) {
  routes.forEach(route => {
    const {path} = route
    if (!path.startsWith('/') && path !== '*') {
      route.path = '/' + path
    }
  })
  formatAuthority(routes)
}

/**
 * 라우팅 권한 구성 형식 지정
 * @param routes 라우팅
 * @param pAuthorities 상위 라우팅 권한 구성 컬렉션
 */
function formatAuthority(routes, pAuthorities = []) {
  routes.forEach(route => {
    const meta = route.meta
    const defaultAuthority = pAuthorities[pAuthorities.length - 1] || {permission: '*'}
    if (meta) {
      let authority = {}
      if (!meta.authority) {
        authority = defaultAuthority
      }else if (typeof meta.authority === 'string') {
        authority.permission = meta.authority
      } else if (typeof meta.authority === 'object') {
        authority = meta.authority
        const {role} = authority
        if (typeof role === 'string') {
          authority.role = [role]
        }
        if (!authority.permission && !authority.role) {
          authority = defaultAuthority
        }
      }
      meta.authority = authority
    } else {
      const authority = defaultAuthority
      route.meta = {authority}
    }
    route.meta.pAuthorities = pAuthorities
    if (route.children) {
      formatAuthority(route.children, [...pAuthorities, route.meta.authority])
    }
  })
}

/**
 * 라우팅 경로에서 i18n 키 구문 분석
 * @param path
 * @returns {*}
 */
function getI18nKey(path) {
  const keys = path.split('/').filter(item => !item.startsWith(':') && item != '')
  keys.push('name')
  return keys.join('.')
}

/**
 * 네비게이션 가드 로드
 * @param guards
 * @param options
 */
function loadGuards(guards, options) {
  const {beforeEach, afterEach} = guards
  const {router} = options
  beforeEach.forEach(guard => {
    if (guard && typeof guard === 'function') {
      router.beforeEach((to, from, next) => guard(to, from, next, options))
    }
  })
  afterEach.forEach(guard => {
    if (guard && typeof guard === 'function') {
      router.afterEach((to, from) => guard(to, from, options))
    }
  })
}

export {parseRoutes, loadRoutes, formatAuthority, getI18nKey, loadGuards, deepMergeRoutes, formatRoutes, setAppOptions}

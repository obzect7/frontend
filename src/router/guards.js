import {hasAuthority} from '@/utils/authority-utils'
import {loginIgnore} from '@/router/index'
import {checkAuthorization} from '@/utils/request'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

/**
 * 진행률 표시줄 시작
 * @param to
 * @param form
 * @param next
 */
const progressStart = (to, from, next) => {
  // start progress bar
  if (!NProgress.isStarted()) {
    NProgress.start()
  }
  next()
}

/**
 * 로그인 체크
 * @param to
 * @param form
 * @param next
 * @param options
 */
const loginGuard = (to, from, next, options) => {
  const {message} = options
  if (!loginIgnore.includes(to) && !checkAuthorization()) {
    message.warning('로그인이 만료되었습니다. 다시 로그인하세요.')
    next({path: '/login'})
  } else {
    next()
  }
}

/**
 * 인증(Auth) 체크
 * @param to
 * @param form
 * @param next
 * @param options
 */
const authorityGuard = (to, from, next, options) => {
  const {store, message} = options
  const permissions = store.getters['account/permissions']
  const roles = store.getters['account/roles']
  if (!hasAuthority(to, permissions, roles)) {
    message.warning(`죄송합니다. 페이지에 액세스할 수 있는 권한이 없습니다.: ${to.fullPath}，관리자에게 문의하세요`)
    next({path: '/403'})
    // NProgress.done()
  } else {
    next()
  }
}

/**
 * 하이브리드 탐색 모드에서 다음 수준 메뉴 리다이렉트
 * @param to
 * @param from
 * @param next
 * @param options
 * @returns {*}
 */
const redirectGuard = (to, from, next, options) => {
  const {store} = options
  const getFirstChild = (routes) => {
    const route = routes[0]
    if (!route.children || route.children.length === 0) {
      return route
    }
    return getFirstChild(route.children)
  }
  if (store.state.setting.layout === 'mix') {
    const firstMenu = store.getters['setting/firstMenu']
    if (firstMenu.find(item => item.fullPath === to.fullPath)) {
      store.commit('setting/setActivatedFirst', to.fullPath)
      const subMenu = store.getters['setting/subMenu']
      if (subMenu.length > 0) {
        const redirect = getFirstChild(subMenu)
        return next({path: redirect.fullPath})
      }
    }
  }
  next()
}

/**
 * 진행률 표시줄 끝
 * @param to
 * @param form
 * @param options
 */
const progressDone = () => {
  // finish progress bar
  NProgress.done()
}

export default {
  beforeEach: [progressStart, loginGuard, authorityGuard, redirectGuard],
  afterEach: [progressDone]
}

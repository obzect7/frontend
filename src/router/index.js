import Vue from 'vue'
import Router from 'vue-router'
import {formatRoutes} from '@/utils/routerUtil'

Vue.use(Router)

// 로그인 가로채기가 필요하지 않은 라우팅 구성
const loginIgnore = {
  names: ['404', '403'],      //경로 이름으로 일치
  paths: ['/login'],   //경로 fullPath에 따라 일치
  /**
   * 경로가 구성에 포함되어 있는지 확인
   * @param route vue-router 경로 개체
   * @returns {boolean}
   */
  includes(route) {
    return this.names.includes(route.name) || this.paths.includes(route.path)
  }
}

/**
 * 라우팅 인스턴스 초기화
 * @param isAsync 비동기 라우팅 모드
 * @returns {VueRouter}
 */
function initRouter(isAsync) {
  const options = isAsync ? require('./async/config.async').default : require('./config').default
  formatRoutes(options.routes)
  return new Router(options)
}
export {loginIgnore, initRouter}

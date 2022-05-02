import {loadRoutes, loadGuards, setAppOptions} from '@/utils/routerUtil'
import {loadInterceptors} from '@/utils/request'
import guards from '@/router/guards'
import interceptors from '@/utils/axios-interceptors'

/**
 * 부트스트랩 방법
 * 앱이 시작될 때 수행해야 하는 작업이 여기에 배치됩니다.
 * @param router 애플리케이션 라우팅 인스턴스
 * @param store 앱의 vuex.store 인스턴스
 * @param i18n 애플리케이션의 vue-i18n 인스턴스
 * @param i18n 애플리케이션의 메시지 인스턴스
 */
function bootstrap({router, store, i18n, message}) {
  // 앱 구성 설정
  setAppOptions({router, store, i18n})
  // axios 인터셉터 로드
  loadInterceptors(interceptors, {router, store, i18n, message})
  // 로드 경로
  loadRoutes()
  // 경로 가드 로드
  loadGuards(guards, {router, store, i18n, message})
}

export default bootstrap

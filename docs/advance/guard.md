---
title: 루트 가드
lang: ko-KR
---
# 루트 가드
Vue Antd Admin은 vue-router를 사용하여 경로 탐색을 구현하므로 경로에 대한 일부 가드를 구성할 수 있습니다.
router/guards.js 파일에서 탐색 가드를 균일하게 구성합니다.

## 프론트 가드
Vue Antd Admin  to,from,next,options 4개의 매개변수
* `to: Route`: 들어오는 대상 [경로 개체](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)
* `from: Route`: 현재 탐색이 떠나는 경로 개체
* `next: Function`: 후크를 해결하려면 이 메서드를 호출해야 합니다. 실행 효과는 다음 메소드의 호출 매개변수에 따라 다릅니다. 자세한 내용은 [Vue 라우터 #내비게이션가드]를 참조하세요.
(https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)
* `options: Object`: 다음을 포함한 애플리케이션 구성: {router, i18n, store, message}필요에 따라 확장할 수 있습니다.  
다음은 로그인 가로채기 탐색 가드의 정의입니다.
```js
const loginGuard = (to, from, next, options) => {
  const {message} = options
  if (!loginIgnore.includes(to) && !checkAuthorization()) {
    message.warning('로그인이 만료되었습니다. 다시 로그인하십시오.')
    next({path: '/login'})
  } else {
    next()
  }
}
```

## 리어 가드
게시물 탐색 가드를 정의할 수도 있습니다.，Vue Antd Admin 각 게시물 탐색 기능에 대한 주입 to,from,options 세 가지 매개변수：
* `to: Route`: 들어오는 대상 [경로 개체](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)
* `from: Route`: 현재 탐색이 떠나는 경로 개체
* `options: Object`: 다음을 포함한 애플리케이션 구성: {router, i18n, store, message}, 필요에 따라 확장할 수 있습니다.  
다음은 후방 내비게이션 가드의 정의입니다.
```js
const afterGuard = (to, from, options) => {
  const {store, message} = options
  // something do it
  message.info('do something')
}
```

## 가드 구성 내보내기
탐색 가드를 정의한 후 카테고리를 따르십시오. guard.js 에 내보낼 수 있습니다. `프론트 가드`와 `포스트 가드`의 두 가지 범주로 나뉩니다. 다음과 같이:
```js
export default {
  beforeEach: [loginGuard, authorityGuard],
  afterEach: [afterGuard]
}
```

:::details 전체 Navigation Guard 구성을 보려면 클릭하세요.
```js
import {loginIgnore} from '@/router/index'
import {checkAuthorization} from '@/utils/request'

/**
 * 로그인 가드
 * @param to
 * @param form
 * @param next
 * @param options
 */
const loginGuard = (to, from, next, options) => {
  const {message} = options
  if (!loginIgnore.includes(to) && !checkAuthorization()) {
    message.warning('로그인이 만료되었습니다. 다시 로그인하십시오.')
    next({path: '/login'})
  } else {
    next()
  }
}

/**
 * 허가 가드
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
    message.warning(`죄송합니다. 페이지에 액세스할 수 있는 권한이 없습니다.: ${to.fullPath}，관리자에게 문의하세요.`)
    next({path: '/403'})
  } else {
    next()
  }
}

/**
 * 리어 가드
 * @param to
 * @param form
 * @param options
 */
const afterGuard = (to, from, options) => {
  const {store, message} = options
  // do something
  message.info('do something')
}

export default {
  beforeEach: [loginGuard, authorityGuard],
  afterEach: [afterGuard]
}
```
:::
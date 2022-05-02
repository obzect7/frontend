---
title: 로그인 인증
lang: ko-KR
---
# 로그인 인증
Vue Antd Admin은 js-cookie.js를 사용하여 사용자의 토큰을 관리하며, 
axios 구성과 결합하여 각 요청 헤더에 토큰 정보를 추가할 수 있습니다.

## token 이름
백엔드 시스템은 일반적으로 요청 헤더에서 사용자의 토큰을 가져오므로 백엔드가 사용자의 토큰을 올바르게 식별할 수 있도록 토큰 이름을 구성해야 합니다.
Vue Antd Admin 기본 토큰 이름은 'Authorization'이며 /utils/request.js에서 수정할 수 있습니다.
```js{5}
import axios from 'axios'
import Cookie from 'js-cookie'

// 도메인 간 인증 정보 헤더 이름
const xsrfHeaderName = 'Authorization'
...
```
## 토큰 설정
로그인 인터페이스를 호출한 후 사용자의 토큰과 토큰일(일이 없으면 무시 가능)을 얻고 /utils/request.js #setAuthorization 메소드를 사용하여 토큰을 저장한다.
```js{5}
import {setAuthorization} from '@/utils/request'

login(name, password).then(res => {
  const {token, expireAt} = res.data
  setAuthorization({token, expireAt: new Date(expireAt)})
})
```
## token 확인
Vue Antd Admin은 기본적으로 로그인 네비게이션 가드를 추가하는데, 로컬 쿠키에 토큰 정보가 없는 것으로 
확인되면 가로채서 로그인 페이지로 이동합니다. /router/index.js에서 구성할 수 있습니다.
로그인 차단이 필요하지 않은 경로
```js
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
```
또는 /router/guards.js에서 로그인 가드를 제거하십시오.
```diff
...
export default {
-  beforeEach: [loginGuard, authorityGuard, redirectGuard],
+  beforeEach: [authorityGuard, redirectGuard],
  afterEach: []
}
```
## Api
### setAuthorization(auth, authType)
출처：/utils/request.js  
이 메소드는 사용자 토큰을 저장하는 데 사용되며 두 개의 매개변수를 수신합니다.
* **auth**   
다음을 포함한 인증 정보 token、expireAt 및 기타 인증 데이터。  
* **authType**  
인증 유형, 기본값은 `AUTH_TYPE.BEARER`(AUTH_TYPE.BEARER는 기본적으로 토큰에 Bearer 식별 접두사를 추가함)이며, 자신의 인증 유형에 따라 확장할 수 있습니다. 

### checkAuthorization(authType)
이 메서드는 사용자 토큰이 만료되었는지 확인하고 매개변수를 받는 데 사용됩니다.
* **authType**  
인증 유형, 기본값은 `AUTH_TYPE.BEARER`

### removeAuthorization(authType)
이 메서드는 사용자가 로컬에 저장한 토큰을 제거하는 데 사용되며 하나의 매개변수를 허용합니다.
* **authType**  
인증 유형, 기본값은 `AUTH_TYPE.BEARER`
:::tip
위의 API는 /utils/request.js 파일에서 찾을 수 있습니다.
:::
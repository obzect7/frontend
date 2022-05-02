---
title: 서버 상호 작용
lang: ko-KR
---
# 서버 상호 작용
데이터 서비스는 응용 프로그램의 각 기능 모듈의 정상적인 작동을 구동하는 응용 프로그램의 영혼입니다. Vue Antd Admin은 서비스 모듈에서 서버 측 상호 작용을 캡슐화하고 API 형태로 모든 기술 스택의 서버 측 애플리케이션과 함께 작동할 수 있습니다.
## 服务交互流程
Vue Antd Admin에서 서버 측 상호 작용 프로세스는 다음과 같습니다.
* 컴포넌트 내에서 서비스 서비스 API 호출
* 서비스 서비스 API는 요청 데이터를 캡슐화하여 request.js를 통해 요청을 보냅니다.
* 구성 요소는 서비스에서 반환된 데이터를 가져오고 보기 데이터를 업데이트하거나 다른 작업을 트리거합니다.

로그인을 예로 들어보겠습니다.Login.vue 구성 요소에서 사용자는 계정 암호를 입력하고 로그인을 클릭하고 services/user/login API를 호출합니다.
```vue {5,17}
<template>
  ...
</template>
<script>
import {login} from '@/services/user'
...
export default {
  name: 'Login',
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          this.logging = true
          const name = this.form.getFieldValue('name')
          const password = this.form.getFieldValue('password')
          login(name, password).then(res => this.afterLogin(res))
        }
      })
    }
  }
}
</script>
```
`services/user/login`은 계정 비밀번호 데이터를 캡슐화하고 `request.js`를 통해 로그인 서비스 요청을 보냅니다.
```js
import {request, METHOD} from '@/utils/request'
/**
 * 로그인 서비스
 * @param name 계정 이름
 * @param password 계정 암호
 * @returns {Promise<AxiosResponse<T>>}
 */
async function login(name, password) {
  return request(LOGIN, METHOD.POST, {
    name: name,
    password: password
  })
}
```
Login.vue 로그인 서비스에서 반환된 데이터를 가져오고 후속 작업을 수행합니다.
```vue {14,18-23}
<template>
  ...
</template>
<script>
import {login} from '@/services/user'
...
export default {
  name: 'Login',
  methods: {
    onSubmit (e) {
      this.form.validateFields((err) => {
        if (!err) {
          ...
          login(name, password).then(res => this.afterLogin(res))
        }
      })
    },
    afterLogin(res) {
      if (res.data.code >= 0) {                 //성공적 로그인
        ...
      } else {                                  //로그인 실패
        this.error = loginRes.message
      }
    }
  }
}
</script>
```
## 서비스 모듈 구조
서비스 모듈의 구조는 다음과 같습니다.
```bash
...
├── src
│   └── services                # 데이터 서비스 모듈
│       ├── user.js             # 사용자 데이터 서비스
│       ├── product.js          # 제품 서비스
│       ...           
│       ├── api.js              # API 주소 관리
│       └── index.js            # 서비스 모듈 내보내기
...
│   └── utils                   # 데이터 서비스 모듈
│       ├── request.js          # axios 기반 http 요청 도구
...
```
services 폴더 아래, api.js 서비스 요청 주소의 통합 관리에 사용되며, index.js는 모듈화된 내보내기 서비스에 사용되며, 기타 *.js 파일은 각 서비스 모듈에 해당합니다.
## request.js
request.js 기반으로 axios 일반적으로 사용되는 일부 기능은 다음과 같이 캡슐화됩니다.  
```js
export {
  METHOD,                 //http method 일정한
  AUTH_TYPE,              //자격 증명 인증 유형 상수
  request,                //http 요청 기능
  setAuthorization,       //자격 증명 설정 기능
  removeAuthorization,    //자격 증명 기능 제거
  checkAuthorization      //자격 증명이 만료되었는지 확인 기능
}
```
:::tip
자격 증명 인증 유형은 기본적으로 [Bearer](https://www.jianshu.com/p/8f7009456abc), 필요에 따라 다른 유형의 인증을 구현할 수 있습니다.
:::
## Base url 구성
프로젝트 루트 디렉터리의 환경 변수 파일(.env 및 .env.development)에서 API 서비스 기본 URL 주소를 구성할 수 있습니다.

프로덕션 환경, .env 파일
```properties
VUE_APP_API_BASE_URL=https://www.server.com
```
개발 환경, .env.development 파일:
```properties
VUE_APP_API_BASE_URL=https://localhost:8000
```
## 교차 도메인 설정
개발 환경에서 일반적으로 Vue 애플리케이션과 서비스 애플리케이션은 다른 주소나 포트에서 실행됩니다. 프런트 엔드 요청을 설정하고 프록시하는 것만으로 도메인 간 문제를 피할 수 있습니다. 다음과 같이  

먼저 services/api.js 파일에 API_PROXY_PREFIX 상수를 설정하고 BASE_URL은 아래와 같이 설정합니다.：
```js {2,4}
//교차 출처 프록시 접두사
const API_PROXY_PREFIX='/api'
//base url
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
//API 서비스 주소 내보내기
module.exports = {
  LOGIN: `${BASE_URL}/login`,
  ROUTES: `${BASE_URL}/routes`
}
```
그런 다음 vue.config.js 파일에서 프록시를 구성합니다.
```js
model.exports = {
  devServer: {
    proxy: {
      '/api': {               // /services/api.js  API_PROXY_PREFIX 값은 동일하게 유지
        target: process.env.VUE_APP_API_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
```
:::tip
이 프록시 구성은 개발 환경에만 적용할 수 있습니다. 프로덕션 환경의 교차 도메인 프록시를 자체 웹 서버에서 구성하십시오.
:::

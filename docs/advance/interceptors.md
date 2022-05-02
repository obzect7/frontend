---
title: 인터셉터 구성
lang: ko-KR
---
# 인터셉터 구성
Vue Antd Admin은 aixos를 기반으로 http 통신 기능을 캡슐화하고 http 요청 응답에 대한 일부 인터셉터를 구성할 수 있습니다. 
인터셉터는 /utils/axios-interceptors.js 파일에 균일하게 구성됩니다.
## 요청 인터셉터
각 요청 인터셉터에 대해 'onFulfilled' 또는 'onRejected' 두 개의 후크 기능을 구성할 수 있습니다.
### onFulfilled
onFulfilled 후크 기능에 구성 및 옵션을 삽입합니다.
* `config: AxiosRequestConfig`: axios 요청 구성은 [axios 요청 구성]을 참조하십시오.](http://www.axios-js.com/zh-cn/docs/#%E8%AF%B7%E6%B1%82%E9%85%8D%E7%BD%AE)
* `options: Object`: {router, i18n, store, message}를 포함한 애플리케이션 구성은 필요에 따라 확장될 수 있습니다.

### onRejected
onFulfilled 후크 함수에 두 개의 매개변수 오류와 옵션을 삽입합니다.
* `error: Error`: axios 요청 오류 개체
* `options: Object`: {router, i18n, store, message}를 포함한 애플리케이션 구성은 필요에 따라 확장될 수 있습니다.  
  
다음과 같이 완전한 요청 인터셉터 구성을 위해:
```js
const tokenCheck = {
  // 요청을 보내기 전에 해야 할 일
  onFulfilled(config, options) {
    const {message} = options
    const {url, xsrfCookieName} = config
    if (url.indexOf('login') === -1 && xsrfCookieName && !Cookie.get(xsrfCookieName)) {
      message.warning('인증 토큰이 만료되었습니다. 다시 로그인하십시오.')
    }
    return config
  },
  // 요청이 잘못되었을 때 해야 할 일
  onRejected(error, options) {
    const {message} = options
    message.error(error.message)
    return Promise.reject(error)
  }
}
```
## 응답 인터셉터
응답 인터셉터는 'onFulfilled' 또는 'onRejected' 두 개의 후크 기능으로 구성할 수도 있습니다.
### onFulfilled
onFulfilled 후크 함수에 응답 및 옵션 매개변수를 삽입합니다.：
* `response: AxiosResponse`: 응답 객체, 자세한 내용은 [axios 응답 객체] 참조](http://www.axios-js.com/zh-cn/docs/#%E5%93%8D%E5%BA%94%E7%BB%93%E6%9E%84)
* `options: Object`: {router, i18n, store, message}를 포함한 애플리케이션 구성은 필요에 따라 확장될 수 있습니다.

### onRejected
onFulfilled 후크 함수에 두 개의 매개변수 오류와 옵션을 삽입합니다.
* `error: Error`: axios 요청 오류 개체
* `options: Object`: {router, i18n, store, message}를 포함한 애플리케이션 구성은 필요에 따라 확장될 수 있습니다.

다음과 같이 완전한 응답 인터셉터 구성을 위해:
```js
const resp401 = {
  // 데이터에 응답하기 전에 무언가를 하십시오
  onFulfilled(response, options) {
    const {message} = options
    if (response.status === 401) {
      message.error('이 인터페이스에 대한 권한이 없습니다.')
    }
    return response
  },
  // 응답이 잘못되었을 때 해야 할 일
  onRejected(error, options) {
    const {message} = options
    if (response.status === 401) {
      message.error('이 인터페이스에 대한 권한이 없습니다.')
    }
    return Promise.reject(error)
  }
}
```
## 수출 인터셉터
인터셉터를 정의한 후 axios-interceptors.js 파일에 내보내기만 하면 됩니다. '요청 인터셉터'와 '응답 인터셉터'의 두 가지 범주로 나뉩니다. 다음과 같이:
```js
export default {
  request: [tokenCheck], // 차단 요청
  response: [resp401] // 응답 가로채기
}
```

:::details 전체 샘플 인터셉터 구성을 보려면 클릭하십시오.
```js
import Cookie from 'js-cookie'
// 401 가로채기
const resp401 = {
  onFulfilled(response, options) {
    const {message} = options
    if (response.status === 401) {
      message.error('이 인터페이스에 대한 권한이 없습니다.')
    }
    return response
  },
  onRejected(error, options) {
    const {message} = options
    message.error(error.message)
    return Promise.reject(error)
  }
}

const resp403 = {
  onFulfilled(response, options) {
    const {message} = options
    if (response.status === 403) {
      message.error(`요청 거부`)
    }
    return response
  }
}

const reqCommon = {
  onFulfilled(config, options) {
    const {message} = options
    const {url, xsrfCookieName} = config
    if (url.indexOf('login') === -1 && xsrfCookieName && !Cookie.get(xsrfCookieName)) {
      message.warning('인증 토큰이 만료되었습니다. 다시 로그인하십시오.')
    }
    return config
  },
  onRejected(error, options) {
    const {message} = options
    message.error(error.message)
    return Promise.reject(error)
  }
}

export default {
  request: [reqCommon], // 차단 요청
  response: [resp401, resp403] // 응답 가로채기
}
```
:::
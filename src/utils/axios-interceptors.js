import Cookie from 'js-cookie'
// 401 Interceptor
const resp401 = {
  /**
   * 데이터에 응답하기 전에 해야 할 일
   * @param response 응답 객체
   * @param options 애플리케이션 구성에는 다음이 포함됩니다.: {router, i18n, store, message}
   * @returns {*}
   */
  onFulfilled(response, options) {
    const {message} = options
    if (response.code === 401) {
      message.error('해당 권한 없음')
    }
    return response
  },
  /**
   * 응답이 잘못된 경우 실행
   * @param error 오류 Obj
   * @param options 애플리케이션 구성에는 다음이 포함됩니다.: {router, i18n, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const {message} = options
    const {response} = error
    if (response.status === 401) {
      message.error('해당 권한 없음')
    }
    return Promise.reject(error)
  }
}

const resp403 = {
  onFulfilled(response, options) {
    const {message} = options
    if (response.code === 403) {
      message.error('요청 거부됨')
    }
    return response
  },
  onRejected(error, options) {
    const {message} = options
    const {response} = error
    if (response.status === 403) {
      message.error('요청 거부됨')
    }
    return Promise.reject(error)
  }
}

const reqCommon = {
  /**
   * 요청을 보내기 전에 해야 할 일
   * @param config axios config
   * @param options 애플리케이션 구성에는 다음이 포함됩니다.: {router, i18n, store, message}
   * @returns {*}
   */
  onFulfilled(config, options) {
    const {message} = options
    const {url, xsrfCookieName} = config
    if (url.indexOf('login') === -1 && xsrfCookieName && !Cookie.get(xsrfCookieName)) {
      message.warning('인증이 만료되었습니다. 다시 로그인하십시오.')
    }
    return config
  },
  /**
   * 요청이 잘못되었을 때 해야 할 일
   * @param error 에러 객체
   * @param options 애플리케이션 구성에는 다음이 포함됩니다.: {router, i18n, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const {message} = options
    message.error(error.message)
    return Promise.reject(error)
  }
}

export default {
  request: [reqCommon], // 가로채기 요청
  response: [resp401, resp403] // 응답 가로채기
}

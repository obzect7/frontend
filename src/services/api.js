//跨域代理前缀
// const API_PROXY_PREFIX='/api'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const BASE_URL = process.env.VUE_APP_API_BASE_URL
const REST_URL = 'http://localhost:7777'
module.exports = {
  // LOGIN: `${BASE_URL}/login`,
  LOGIN: `${REST_URL}/auth/login`,
  ROUTES: `${BASE_URL}/routes`,
  USERLIST : `${REST_URL}/userinfo/list`,
  GOODS: `${BASE_URL}/goods`,
  GOODS_COLUMNS: `${BASE_URL}/columns`,
}

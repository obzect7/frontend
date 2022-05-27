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
  SAVEUSER :`${REST_URL}/userinfo/save`,
  GOODS: `${BASE_URL}/goods`,
  GOODS_COLUMNS: `${BASE_URL}/columns`,

  CODEGRPLIST : `${REST_URL}/commcode/getCommonCodeGrpList`,
  CODELIST : `${REST_URL}/commcode/getCommonCodeList`,
  SAVECODEGRP : `${REST_URL}/commcode/saveCommonCodeGrp`,
  SAVECODECODE : `${REST_URL}/commcode/saveCommonCode`,
}

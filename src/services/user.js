import {LOGIN, ROUTES, USERLIST, SAVEUSER} from '@/services/api'
import {request, METHOD, removeAuthorization} from '@/utils/request'

/**
 * 로그인 서비스
 * @param name ID
 * @param password 비밀번호
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(name, password) {
  //console.log('login name ==',name)
  //console.log('login password ==',password)

  return request(LOGIN, METHOD.POST, {
    userid: name,
    password: password
  })
}

/**
 * 사용자조회
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function selectUserList(params) {
  //console.log('login name ==',name)
  //console.log('login password ==',password)

  return request(USERLIST, METHOD.POST, params)
}

export async function saveuser(params) {
  console.log('SAVEUSER ==',SAVEUSER)
  //console.log('login password ==',password)
  return request(SAVEUSER, METHOD.POST, [params])
}



export async function getRoutesConfig() {
  //console.log('ROUTES ==',ROUTES)
  return request(ROUTES, METHOD.GET)
}

/**
 * 로그아웃
 */
export function logout() {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
  removeAuthorization()
}
export default {
  login,
  logout,
  getRoutesConfig
}

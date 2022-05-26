import {CODEGRPLIST, CODELIST, SAVECODEGRP} from '@/services/api'
import {request, METHOD} from '@/utils/request'


/**
 * 사용자조회
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function selectCodeGrpList(params) {
  // console.log('CODEGRPLIST ==',CODEGRPLIST)

  return request(CODEGRPLIST, METHOD.POST, params)
}
export async function searchDtlCode(params) {
  // console.log('CODELIST ==',CODELIST)

  return request(CODELIST, METHOD.POST, params)
}

export async function savecodeGrp(params) {
  console.log('SAVECODEGRP ==',SAVECODEGRP)
  //console.log('login password ==',password)
  return request(SAVECODEGRP, METHOD.POST, params)
}

export default {
}

/**
 * js 구성 파일의 형식에 따라 개체 형식을 지정합니다.
 * @param obj 서식이 지정된 개체
 * @param dep 레벨, 이 항목은 값으로 전달할 필요가 없습니다.
 * @returns {string}
 */
function formatConfig(obj, dep) {
  dep = dep || 1
  const LN = '\n', TAB = '  '
  let indent = ''
  for (let i = 0; i < dep; i++) {
    indent += TAB
  }
  let isArray = false, arrayLastIsObj = false
  let str = '', prefix = '{', subfix = '}'
  if (Array.isArray(obj)) {
    isArray = true
    prefix = '['
    subfix = ']'
    str = obj.map((item, index) => {
      let format = ''
      if (typeof item == 'function') {
        //
      } else if (typeof item == 'object') {
        arrayLastIsObj = true
        format = `${LN}${indent}${formatConfig(item,dep + 1)},`
      } else if ((typeof item == 'number' && !isNaN(item)) || typeof item == 'boolean') {
        format = `${item},`
      } else if (typeof item == 'string') {
        format = `'${item}',`
      }
      if (index == obj.length - 1) {
        format = format.substring(0, format.length - 1)
      } else {
        arrayLastIsObj = false
      }
      return format
    }).join('')
  } else if (typeof obj != 'function' && typeof obj == 'object') {
    str = Object.keys(obj).map((key, index, keys) => {
      const val = obj[key]
      let format = ''
      if (typeof val == 'function') {
        //
      } else if (typeof val == 'object') {
        format = `${LN}${indent}${key}: ${formatConfig(val,dep + 1)},`
      } else if ((typeof val == 'number' && !isNaN(val)) || typeof val == 'boolean') {
        format = `${LN}${indent}${key}: ${val},`
      } else if (typeof val == 'string') {
        format = `${LN}${indent}${key}: '${val}',`
      }
      if (index == keys.length - 1) {
        format = format.substring(0, format.length - 1)
      }
      return format
    }).join('')
  }
  const len = TAB.length
  if (indent.length >= len) {
    indent = indent.substring(0, indent.length - len)
  }
  if (!isArray || arrayLastIsObj) {
    subfix = LN + indent +subfix
  }
  return`${prefix}${str}${subfix}`
}

module.exports = {formatConfig}

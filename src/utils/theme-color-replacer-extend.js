const {cssResolve} = require('../config/replacer')
// webpack-theme-color-replacer 플러그인으로 추출한 CSS 결과 수정
function resolveCss(output, srcArr) {
  let regExps = []
  // 확인 구성에서 모든 일반 구성 추출
  Object.keys(cssResolve).forEach(key => {
    let isRegExp = false
    let reg = {}
    try {
      reg = eval(key)
      isRegExp = reg instanceof RegExp
    } catch (e) {
      isRegExp = false
    }
    if (isRegExp) {
      regExps.push([reg, cssResolve[key]])
    }
  })

  // 중복 제거
  srcArr = dropDuplicate(srcArr)

  // CSS를 처리
  let outArr = []
  srcArr.forEach(text => {
    // CSS 객체로 변환
    let cssObj = parseCssObj(text)
    // 선택기에 따라 구성을 일치시키고 일치에 성공하면 구성에 따라 CSS를 처리합니다.
    if (cssResolve[cssObj.selector] != undefined) {
      let cfg = cssResolve[cssObj.selector]
      if (cfg) {
        outArr.push(cfg.resolve(text, cssObj))
      }
    } else {
      let cssText = ''
      // 일치에 실패하면 일치하는 일반 구성이 있는지 테스트하고 있으면 일반 구성에 따라 처리됩니다.
      for (let regExp of regExps) {
        if (regExp[0].test(cssObj.selector)) {
          let cssCfg = regExp[1]
          cssText = cssCfg ? cssCfg.resolve(text, cssObj) : ''
          break
        }
        // 규칙성이 일치하지 않으면 cssText를 기본 CSS로 설정합니다(즉, 처리되지 않음).
        cssText = text
      }
      if (cssText != '') {
        outArr.push(cssText)
      }
    }
  })
  output = outArr.join('\n')
  return output
}

// 어레이 중복 제거
function dropDuplicate(arr) {
  let map = {}
  let r = []
  for (let s of arr) {
    if (!map[s]) {
      r.push(s)
      map[s] = 1
    }
  }
  return r
}

/**
 * 문자열에서 CSS 개체 구문 분석
 * @param cssText
 * @returns {{
 *   name: String,
 *   rules: Array[String],
 *   toText: function
 * }}
 */
function parseCssObj(cssText) {
  let css = {}
  const ruleIndex = cssText.indexOf('{')
  css.selector = cssText.substring(0, ruleIndex)
  const ruleBody = cssText.substring(ruleIndex + 1, cssText.length - 1)
  const rules = ruleBody.split(';')
  css.rules = rules
  css.toText = function () {
    let body = ''
    this.rules.forEach(item => {body += item + ';'})
    return `${this.selector}{${body}}`
  }
  return css
}

module.exports = {resolveCss}

/**
 * webpack-theme-color-replacer 플러그인 구성 확인
 * 특정 CSS 선택기에 대한 확인 규칙을 구성합니다
 *
 * key 는 CSS 선택기 값 또는 유효한 정규식 문자열입니다.
 * key 가 CSS 선택기 값으로 설정되면 해당 CSS와 일치합니다.
 * key 가 정규식으로 설정되면 이 정규식을 충족하는 모든 CSS와 일치합니다.
 *
 * value 은 부울 값 false 또는 개체로 설정할 수 있습니다.
 * value 이 false이면 이 CSS는 무시됩니다. 즉, 이 CSS는 webpack-theme-color-replacer 관리에 포함되지 않습니다.
 * value 이 객체일 때 객체의 resolve 함수가 호출되고 cssText(원본 CSS 텍스트) 및 cssObj(css 객체) 매개변수가 전달됩니다. resolve 함수는 다음을 반환해야 합니다.
 * 처리된 합법적인 CSS 문자열 반환(선택자 포함)
 * 참고: value를 true로 설정할 수 없습니다.
 */
const cssResolve = {
  '.ant-checkbox-checked .ant-checkbox-inner::after': {
    resolve(cssText, cssObj) {
      cssObj.rules.push('border-top:0', 'border-left:0')
      return cssObj.toText()
    }
  },
  '.ant-tree-checkbox-checked .ant-tree-checkbox-inner::after': {
    resolve(cssText, cssObj) {
      cssObj.rules.push('border-top:0', 'border-left:0')
      return cssObj.toText()
    }
  },
  '.ant-checkbox-checked .ant-checkbox-inner:after': {
    resolve(cssText, cssObj) {
      cssObj.rules.push('border-top:0', 'border-left:0')
      return cssObj.toText()
    }
  },
  '.ant-tree-checkbox-checked .ant-tree-checkbox-inner:after': {
    resolve(cssText, cssObj) {
      cssObj.rules.push('border-top:0', 'border-left:0')
      return cssObj.toText()
    }
  },
  '.ant-menu-dark .ant-menu-inline.ant-menu-sub': {
    resolve(cssText, cssObj) {
      cssObj.rules = cssObj.rules.filter(rule => rule.indexOf('box-shadow') == -1)
      return cssObj.toText()
    }
  },
  '.ant-menu-horizontal>.ant-menu-item:hover,.ant-menu-horizontal>.ant-menu-submenu:hover,.ant-menu-horizontal>.ant-menu-item-active,.ant-menu-horizontal>.ant-menu-submenu-active,.ant-menu-horizontal>.ant-menu-item-open,.ant-menu-horizontal>.ant-menu-submenu-open,.ant-menu-horizontal>.ant-menu-item-selected,.ant-menu-horizontal>.ant-menu-submenu-selected': {
    resolve(cssText, cssObj) {
      cssObj.selector = cssObj.selector.replace(/.ant-menu-horizontal/g, '.ant-menu-horizontal:not(.ant-menu-dark)')
      return cssObj.toText()
    }
  },
  '.ant-menu-horizontal>.ant-menu-item-active,.ant-menu-horizontal>.ant-menu-item-open,.ant-menu-horizontal>.ant-menu-item-selected,.ant-menu-horizontal>.ant-menu-item:hover,.ant-menu-horizontal>.ant-menu-submenu-active,.ant-menu-horizontal>.ant-menu-submenu-open,.ant-menu-horizontal>.ant-menu-submenu-selected,.ant-menu-horizontal>.ant-menu-submenu:hover': {
    resolve(cssText, cssObj) {
      cssObj.selector = cssObj.selector.replace(/.ant-menu-horizontal/g, '.ant-menu-horizontal:not(.ant-menu-dark)')
      return cssObj.toText()
    }
  },
  '.ant-layout-sider': {
    resolve(cssText, cssObj) {
      cssObj.selector = '.ant-layout-sider-dark'
      return cssObj.toText()
    }
  },
  '/keyframes/': false
}

module.exports = cssResolve

/**
 * 라우팅 권한이 있는지 확인
 * @param authority 라우팅 권한 구성
 * @param permissions 사용자 권한 집합
 * @returns {boolean|*}
 */
function hasPermission(authority, permissions) {
  let required = '*'
  if (typeof authority === 'string') {
    required = authority
  } else if (typeof authority === 'object') {
    required = authority.permission
  }
  return required === '*' || (permissions && permissions.findIndex(item => item === required || item.id === required) !== -1)
}

/**
 * 라우팅에 필요한 역할이 있는지 확인
 * @param authority 라우팅 권한 구성
 * @param roles 사용자 역할 집합
 */
function hasRole(authority, roles) {
  let required = undefined
  if (typeof authority === 'object') {
    required = authority.role
  }
  return authority === '*' || hasAnyRole(required, roles)
}

/**
 * 역할이 필요한지 결정
 * @param required {String | Array[String]} 단일 역할 또는 역할 배열일 수 있는 필수 역할
 * @param roles 소유 역할
 * @returns {boolean}
 */
function hasAnyRole(required, roles) {
  if (!required) {
    return false
  } else if(Array.isArray(required)) {
    return roles.findIndex(role => {
      return required.findIndex(item => item === role || item === role.id) !== -1
    }) !== -1
  } else {
    return roles.findIndex(role => role === required || role.id === required) !== -1
  }
}

/**
 * 라우팅 권한 확인
 * @param route 라우팅
 * @param permissions 사용자 권한 집합
 * @param roles 사용자 역할 집합
 * @returns {boolean}
 */
function hasAuthority(route, permissions, roles) {
  const authorities = [...route.meta.pAuthorities, route.meta.authority]
  for (let authority of authorities) {
    if (!hasPermission(authority, permissions) && !hasRole(authority, roles)) {
      return false
    }
  }
  return true
}

/**
 * 권한 구성에 따라 메뉴 데이터 필터링
 * @param menuData
 * @param permissions
 * @param roles
 */
function filterMenu(menuData, permissions, roles) {
  return menuData.filter(menu => {
    if (menu.meta && menu.meta.invisible === undefined) {
      if (!hasAuthority(menu, permissions, roles)) {
        return false
      }
    }
    if (menu.children && menu.children.length > 0) {
      menu.children = filterMenu(menu.children, permissions, roles)
    }
    return true
  })
}

export {filterMenu, hasAuthority}

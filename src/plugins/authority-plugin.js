/**
 * 라우팅에 필요한 권한 얻기
 * @param permissions
 * @param route
 * @returns {Permission}
 */
const getRoutePermission = (permissions, route) => permissions.find(item => item.id === route.meta.authority.permission)
/**
 * 라우팅에 필요한 역할 가져오기
 * @param roles
 * @param route
 * @returns {Array[Role]}
 */
const getRouteRole = (roles, route) => {
  const requiredRoles = route.meta.authority.role
  return requiredRoles ? roles.filter(item => requiredRoles.findIndex(required => required === item.id) !== -1) : []
}
/**
 * 권한이 메서드에 주입되었는지 확인
 * @param method
 * @returns {boolean}
 */
const hasInjected = (method) => method.toString().indexOf('//--auth-inject') !== -1

/**
 * 운영권한 확인
 * @param authConfig
 * @param permission
 * @param role
 * @param permissions
 * @param roles
 * @returns {boolean}
 */
const auth = function(authConfig, permission, role, permissions, roles) {
  const {check, type} = authConfig
  if (check && typeof check === 'function') {
    return check.apply(this, [permission, role, permissions, roles])
  }
  if (type === 'permission') {
    return checkFromPermission(check, permission)
  } else if (type === 'role') {
    return checkFromRoles(check, role)
  } else {
    return checkFromPermission(check, permission) || checkFromRoles(check, role)
  }
}

/**
 * 권한이 운영 권한을 가지고 있는지 확인
 * @param check 확인이 필요한 작업 권한
 * @param permission 권한
 * @returns {boolean}
 */
const checkFromPermission = function(check, permission) {
  return permission && permission.operation && permission.operation.indexOf(check) !== -1
}

/**
 * 역할에 작업 권한이 있는지 확인
 * @param check 확인이 필요한 작업 권한
 * @param roles 문자 배열
 * @returns {boolean}
 */
const checkFromRoles = function(check, roles) {
  if (!roles) {
    return false
  }
  for (let role of roles) {
    const {operation} = role
    if (operation && operation.indexOf(check) !== -1) {
      return true
    }
  }
  return false
}

const checkInject = function (el, binding,vnode) {
  const type = binding.arg
  const check = binding.value
  const instance = vnode.context
  const $auth = instance.$auth
  if (!$auth || !$auth(check, type)) {
    addDisabled(el)
  } else {
    removeDisabled(el)
  }
}

const addDisabled = function (el) {
  if (el.tagName === 'BUTTON') {
    el.disabled = true
  } else {
    el.classList.add('disabled')
  }
  el.setAttribute('title', '해당 권한 없음')
}

const removeDisabled = function (el) {
  el.disabled = false
  el.classList.remove('disabled')
  el.removeAttribute('title')
}

const AuthorityPlugin = {
  install(Vue) {
    Vue.directive('auth', {
      bind(el, binding,vnode) {
        setTimeout(() => checkInject(el, binding, vnode), 10)
      },
      componentUpdated(el, binding,vnode) {
        setTimeout(() => checkInject(el, binding, vnode), 10)
      },
      unbind(el) {
        removeDisabled(el)
      }
    })
    Vue.mixin({
      beforeCreate() {
        if (this.$options.authorize) {
          const authorize = this.$options.authorize
          Object.keys(authorize).forEach(key => {
            if (this.$options.methods[key]) {
              const method = this.$options.methods[key]
              if (!hasInjected(method)) {
                let authConfig = authorize[key]
                authConfig = (typeof authConfig === 'string') ? {check: authConfig} : authConfig
                const {check, type, onFailure} = authConfig
                this.$options.methods[key] = function () {
                  //--auth-inject
                  if (this.$auth(check, type)) {
                    return method.apply(this, arguments)
                  } else {
                    if (onFailure && typeof onFailure === 'function') {
                      this[`$${check}Failure`] = onFailure
                      return this[`$${check}Failure`](check)
                    } else {
                      this.$message.error(`죄송합니다. 작업 권한이 없습니다.${check}`)
                    }
                    return 0
                  }
                }
              }
            }
          })
        }
      },
      methods: {
        /**
         * 운영권한 확인
         * @param check 확인해야 하는 작업의 이름
         * @param type 권한 확인 또는 역할 확인을 통한 확인 유형입니다.
         * 설정되어 있지 않으면 자동으로 인식되며, 현재 경로 권한과 일치하면 type = permission, 아니면 type = role
         * @returns {boolean} 검증 통과 여부
         */
        $auth(check, type) {
          const permissions = this.$store.getters['account/permissions']
          const roles = this.$store.getters['account/roles']
          const permission = getRoutePermission(permissions, this.$route)
          const role = getRouteRole(roles, this.$route)
          return auth.apply(this, [{check, type}, permission, role, permissions, roles])
        }
      }
    })
  }
}

export default AuthorityPlugin

/**
 * 객체에 속성 주입
 * @param keys keys = ['config', 'path'] 와 같은 속성 키 배열은 object.config.path 속성을 개체에 삽입합니다.
 * @param value 属性值
 * @returns {Object}
 */
Object.defineProperty(Object.prototype, 'assignProps', {
  writable: false,
  enumerable: false,
  configurable: true,
  value: function (keys, value) {
    let props = this
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]
      if (i == keys.length - 1) {
        props[key] = value
      } else {
        props[key] = props[key] == undefined ? {} : props[key]
        props = props[key]
      }
    }
    return this
  }
})

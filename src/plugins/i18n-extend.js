// 문장 패턴
const MODE = {
  STATEMENTS: 's', //문장 패턴
  PHRASAL: 'p', //프레이즈 패턴
}

const VueI18nPlugin = {
  install: function (Vue) {
    Vue.mixin({
      methods: {
        $ta(syntaxKey, mode) {
          let _mode = mode || MODE.STATEMENTS
          let keys = syntaxKey.split('|')
          let _this = this
          let locale = this.$i18n.locale
          let message = ''
          let splitter = locale == 'US' ? ' ' : ''
          // 접합 message
          keys.forEach(key => {
            message += _this.$t(key) + splitter
          })
          // 영어 환경 문장 모드에서 단어의 대소문자 변경
          if (keys.length > 0 && _mode == MODE.STATEMENTS && locale == 'US') {
            message = message.charAt(0).toUpperCase() + message.toLowerCase().substring(1)
          }
          return message
        }
      }
    })
  }
}
export default VueI18nPlugin

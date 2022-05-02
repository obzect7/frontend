/**
 * webpack-theme-color-replacer 구성
 * webpack-theme-color-replacer 시스템이 실행 중일 때 테마를 동적으로 전환할 수 있는 효율적인 테마 색상 교체 플러그인입니다.
 * 但有些情景下，我们需要为 webpack-theme-color-replacer 개인화된 요구 사항을 달성하기 위해 몇 가지 규칙 구성
 *
 * @cssResolve: CSS 처리 규칙, webpack-theme-color-replacer 테마 색상을 대체해야 하는 CSS를 추출한 후 이 규칙을 적용합니다. 일반적으로
 *              webpack-theme-color-replacer 기본 규칙이 요구 사항을 충족할 수 없을 때 사용됩니다.
 */
const cssResolve = require('./resolve.config')
module.exports = {cssResolve}

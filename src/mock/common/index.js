const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
]

const positions = [
  {
    CN: 'Java工程师 | 蚂蚁金服-计算服务事业群-微信平台部',
    HK: 'Java工程師 | 螞蟻金服-計算服務事業群-微信平台部',
    US: 'Java engineer | Ant financial - Computing services business group - WeChat platform division',
    KR: 'Java 개발자 | 프로소프트 - SI그룹 '
  },{
    CN: '前端工程师 | 蚂蚁金服-计算服务事业群-VUE平台',
    HK: '前端工程師 | 螞蟻金服-計算服務事業群-VUE平台',
    US: 'Front-end engineer | Ant Financial - Computing services business group - VUE platform',
    KR: 'Java 개발자 | 프로소프트 - SI그룹 '
  },{
    CN: '前端工程师 | 蚂蚁金服-计算服务事业群-REACT平台',
    HK: '前端工程師 | 螞蟻金服-計算服務事業群-REACT平台',
    US: 'Front-end engineer | Ant Financial - Computing services business group - REACT platform',
    KR: 'Java 개발자 | 프로소프트 - SI그룹 '
  },{
    CN: '产品分析师 | 蚂蚁金服-计算服务事业群-IOS平台部',
    HK: '產品分析師 | 螞蟻金服-計算服務事業群-IOS平台部',
    US: 'Product analyst | Ant Financial - Computing services business group - IOS platform division',
    KR: 'Java 개발자 | 프로소프트 - SI그룹 '
  }
]

const sayings = [
  'Vue 프로젝트 수행중입니다.',
  'WMS 프로젝트 수행중입니다.',
  'Jquery -> Vue 변환작업중',
  '새로운 프로젝트 수행중'
]

const logos = [
  'https://logoproject.naver.com/img/img_story_renewal.png',
  'https://logoproject.naver.com/img/img_story_renewal.png',
  'https://logoproject.naver.com/img/img_story_renewal.png',
  'https://logoproject.naver.com/img/img_story_renewal.png',
  'https://logoproject.naver.com/img/img_story_renewal.png'
]

const admins = ['이민수', '이민수', '이민수', '이민수']

const groups = ['디자인팀', '개발그룹', '운영그룹', '회계그룹', '인사그룹']

const users = [
  {
    name: '이민수',
    avatar: avatars[0],
    groupId: 0
  },
  {
    name: '이민수',
    avatar: avatars[1],
    groupId: 0
  },
  {
    name: '이민수',
    avatar: avatars[2],
    groupId: 1
  },
  {
    name: '이민수',
    avatar: avatars[3],
    groupId: 2
  },
  {
    name: '이민수',
    avatar: avatars[4],
    groupId: 3
  },
  {
    name: '이민수',
    avatar: avatars[5],
    groupId: 4
  }
]

const teams = groups.map((item, index) => {
  return {
    name: item,
    avatar: avatars[index]
  }
})

export {logos, sayings, positions, avatars, admins, groups, users, teams}

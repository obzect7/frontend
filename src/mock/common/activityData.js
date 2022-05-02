import {users, groups} from './index'

const events = [
  {
    type: 0,
    event: '반복'
  },
  {
    type: 1,
    event: '메시지'
  },
  {
    type: 2,
    event: '진행'
  }
]

const activities = users.map((user, index) => {
  return {
    user: Object.assign({}, user, {group: groups[user.groupId]}),
    activity: events[index % events.length],
    template: ''
  }
})

const templates = [
  (user, activity) => { return `${user.name} 님 <a >${user.group}</a> 프로젝트 <a>${activity.event}</a>` },
  (user, activity) => { return `${user.name} 님 <a >${user.group}</a> 프로젝트 <a>${activity.event}</a>` },
  (user, activity) => { return `${user.name} 님 <a >${activity.event}</a> 업데이트` }
]

export {activities, templates}

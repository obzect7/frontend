import Mock from 'mockjs'
import '@/mock/user/current'
import '@/mock/project'
import '@/mock/user/login'
import '@/mock/workplace'
import '@/mock/user/routes'
import '@/mock/goods'

// 전역 lazy 설정
Mock.setup({
  timeout: '200-400'
})

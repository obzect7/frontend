import Mock from 'mockjs'

Mock.mock(`${process.env.VUE_APP_API_BASE_URL}/routes`, 'get', () => {
  let result = {}
  result.code = 0
  result.data = [{
    router: 'root',
    children: [
      {
        router: 'dashboard',
        children: ['workplace', 'analysis'],
      },
      {
        router: 'form',
        children: ['basicForm', 'stepForm', 'advanceForm']
      },
      {
        router: 'basicForm',
        name: 'μΈμ¦ μμ',
        icon: 'file-excel',
        authority: 'queryForm'
      },

    ]
  }]
  return result
})

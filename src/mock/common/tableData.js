const operation1 = [
  {
    key: 'op1',
    type: '주문대기',
    name: '이민수',
    status: 'agree',
    updatedAt: '2021-10-03  19:23:12',
    memo: '-'
  },
  {
    key: 'op2',
    type: '주문완료',
    name: '홍길동',
    status: 'reject',
    updatedAt: '2021-10-03  19:23:12',
    memo: '메모 테스트234'
  },
  {
    key: 'op3',
    type: '주문완료',
    name: '이민수',
    status: 'agree',
    updatedAt: '2021-10-03  19:23:12',
    memo: '-'
  },
  {
    key: 'op4',
    type: '주문완료',
    name: '이민수',
    status: 'agree',
    updatedAt: '2021-10-03  19:23:12',
    memo: '메모테스트1'
  },
  {
    key: 'op5',
    type: '주문완료',
    name: '김태리',
    status: 'agree',
    updatedAt: '2021-10-03  19:23:12',
    memo: '-'
  }
]

const operation2 = [
  {
    key: 'op2',
    type: '주문완료',
    name: '김태리',
    status: 'reject',
    updatedAt: '2021-10-03  19:23:12',
    memo: '메모테스트 256666777'
  },
  {
    key: 'op3',
    type: '주문완료',
    name: '홍길동',
    status: 'agree',
    updatedAt: '2021-10-03  19:23:12',
    memo: '-'
  },
  {
    key: 'op4',
    type: '주문완료',
    name: '이민수',
    status: 'agree',
    updatedAt: '2021-10-03  19:23:12',
    memo: '메모테스트2345'
  }
]

const operation3 = [
  {
    key: 'op2',
    type: '주문대기',
    name: '김태리',
    status: 'reject',
    updatedAt: '2021-10-03  19:23:12',
    memo: '메모를 테스트중입니다.'
  },
  {
    key: 'op3',
    type: '주문완료',
    name: '이민수',
    status: 'agree',
    updatedAt: '2021-10-03  19:23:12',
    memo: '-'
  }
]

const operationColumns = [
  {
    title: '작업유형',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '주문자',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '주문결과',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '수정일시',
    dataIndex: 'updatedAt',
    key: 'updatedAt'
  },
  {
    title: '메모',
    dataIndex: 'memo',
    key: 'memo'
  }
]

export {operation1, operation2, operation3, operationColumns}

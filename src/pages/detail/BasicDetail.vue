<template>
    <page-layout title="기본 세부정보 페이지">
      <a-card :bordered="false">
        <detail-list title="환불 세부정보">
          <detail-list-item term="픽업 주문 번호">1000000000</detail-list-item>
          <detail-list-item term="픽업">이민수</detail-list-item>
          <detail-list-item term="판매번호">987654321</detail-list-item>
          <detail-list-item term="테스트번호">1234567890</detail-list-item>
        </detail-list>
        <a-divider style="margin-bottom: 32px"/>
        <detail-list title="사용자 정보">
          <detail-list-item term="사용자명">이민수</detail-list-item>
          <detail-list-item term="연락처">010-1111-2222</detail-list-item>
          <detail-list-item term="창고명">창원 물류창고</detail-list-item>
          <detail-list-item term="픽업주소">창원시 창원천로 292</detail-list-item>
          <detail-list-item term="특이사항">없음</detail-list-item>
        </detail-list>
        <a-divider style="margin-bottom: 32px"/>
        <div class="title">반품</div>
        <a-table
          row-key="id"
          style="margin-bottom: 24px"
          :columns="goodsColumns"
          :dataSource="goodsData"
          :pagination="false"
        >
        </a-table>
        <div class="title">반품 진행</div>
        <a-table
          :columns="scheduleColumns"
          :dataSource="scheduleData"
          :pagination="false"
        >
        </a-table>
      </a-card>
    </page-layout>
</template>

<script>
import DetailList from '../../components/tool/DetailList'
import PageLayout from '../../layouts/PageLayout'

const DetailListItem = DetailList.Item

const goodsColumns = [
  {
    title: '제품번호',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '제품명',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '바코드',
    dataIndex: 'barcode',
    key: 'barcode'
  },
  {
    title: '가격',
    dataIndex: 'price',
    key: 'price',
    align: 'right'
  },
  {
    title: '수량（EA）',
    dataIndex: 'num',
    key: 'num',
    align: 'right'
  },
  {
    title: '가격',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right'
  }
]

const goodsData = [
  {
    id: '1234561',
    name: '코카콜라 550ml',
    barcode: '12421432143214321',
    price: '2.00',
    num: '1',
    amount: '2.00'
  },
  {
    id: '1234562',
    name: '스프라이트 300ml',
    barcode: '12421432143214322',
    price: '3.00',
    num: '2',
    amount: '6.00'
  },
  {
    id: '1234563',
    name: '감자칩',
    barcode: '12421432143214323',
    price: '7.00',
    num: '4',
    amount: '28.00'
  },
  {
    id: '1234564',
    name: '홈런볼',
    barcode: '12421432143214324',
    price: '8.50',
    num: '3',
    amount: '25.50'
  }
]

const scheduleColumns = [
  {
    title: '시각',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: '진행상태',
    dataIndex: 'rate',
    key: 'rate'
  },
  {
    title: '상태',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '운영자ID',
    dataIndex: 'operator',
    key: 'operator'
  },
  {
    title: '원가',
    dataIndex: 'cost',
    key: 'cost'
  }
]

const scheduleData = [
  {
    key: '1',
    time: '2021-10-01 14:10',
    rate: '고객에게 연락',
    status: 'processing',
    operator: '주문 ID1234',
    cost: '5mins'
  },
  {
    key: '2',
    time: '2021-10-01 14:05',
    rate: '주문출발',
    status: 'success',
    operator: '주문 ID1234',
    cost: '1h'
  },
  {
    key: '3',
    time: '2021-10-01 13:05',
    rate: '주문도착',
    status: 'success',
    operator: '주문 ID1234',
    cost: '5mins'
  },
  {
    key: '4',
    time: '2021-10-01 13:00',
    rate: '신청 승인됨',
    status: 'success',
    operator: '홍길동',
    cost: '1h'
  },
  {
    key: '5',
    time: '2021-10-01 12:00',
    rate: '반품요청 시작',
    status: 'success',
    operator: '사용자',
    cost: '5mins'
  }
]

export default {
  name: 'BasicDetail',
  components: {PageLayout, DetailListItem, DetailList},
  data () {
    return {
      goodsColumns,
      goodsData,
      scheduleColumns,
      scheduleData
    }
  }
}
</script>

<style lang="less" scoped>
  .title {
    color: @title-color;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
</style>

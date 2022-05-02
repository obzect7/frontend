<template>
  <page-layout title="주문번호: 234231029431" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <detail-list size="small" :col="2" slot="headerContent">
      <detail-list-item term="주문자">이민수</detail-list-item>
      <detail-list-item term="주문 제품">스프라이트 330ml</detail-list-item>
      <detail-list-item term="주문일자">2021-12-07</detail-list-item>
      <detail-list-item term="문서번호"><a>12421</a></detail-list-item>
      <detail-list-item term="일자">2021-12-07 ~ 2021-12-11</detail-list-item>
      <detail-list-item term="내용">영업일 기준 2일 이내에 확인하십시오.</detail-list-item>
    </detail-list>
    <template slot="extra">
      <head-info title="상태" content="보류중" />
      <head-info title="주문금액" content="15,000원" />
    </template>
    <template slot="action">
      <a-button-group style="margin-right: 8px;">
        <a-button>操作</a-button>
        <a-button>操作</a-button>
        <a-button><a-icon type="ellipsis"/></a-button>
      </a-button-group>
      <a-button type="primary" >主操作</a-button>
    </template>
    <a-card :bordered="false" title="진행 프로세스">
      <a-steps :current="1" progress-dot :direction="isMobile ? 'vertical' : 'horizontal'">
        <a-step title="프로젝트 생성">
          <a-step-item-group :align="isMobile ? 'left' : 'center'" slot="description">
            <a-step-item link="/dashboard/workplace" title="이민수" icon="dingding-o"/>
            <a-step-item title="2016-12-12 12:32"/>
          </a-step-item-group>
        </a-step>
        <a-step title="부서별 검토">
          <a-step-item-group :align="isMobile ? 'left' : 'center'" slot="description">
            <a-step-item link="/form/step" title="이민수" icon="dingding-o" />
            <a-step-item link="/result/success" title="성공" icon="bell"/>
          </a-step-item-group>
        </a-step>
        <a-step title="재무검토">
        </a-step>
        <a-step title="마감">
        </a-step>
      </a-steps>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="사용자 정보">
      <detail-list>
        <detail-list-item term="사용자명">이민수</detail-list-item>
        <detail-list-item term="회원카드번호">32943898021309809423</detail-list-item>
        <detail-list-item term="회원번호">3321944288191034921</detail-list-item>
        <detail-list-item term="연락처">18112345678</detail-list-item>
        <detail-list-item term="주소">경남 창원시 창원천로 2221</detail-list-item>
      </detail-list>
      <detail-list title="정보그룹">
        <detail-list-item term="더미데이터">725</detail-list-item>
        <detail-list-item term="수정일자">2021-12-08</detail-list-item>
        <detail-list-item >&nbsp;</detail-list-item>
        <detail-list-item term="더미데이터">725</detail-list-item>
        <detail-list-item term="수정일자">2021-12-08</detail-list-item>
        <detail-list-item >&nbsp;</detail-list-item>
      </detail-list>
      <a-card type="inner" title="테스트그룹">
        <detail-list title="그룹명" size="small">
          <detail-list-item term="사용자명">이민수</detail-list-item>
          <detail-list-item term="역할코드">1234567</detail-list-item>
          <detail-list-item term="부서">XX사-YY부서</detail-list-item>
          <detail-list-item term="만료일">2021-12-08</detail-list-item>
          <detail-list-item term="설명">테스트중입니다. 테스트 중입니다. 테스트 중입니다....</detail-list-item>
        </detail-list>
        <a-divider style="margin: 16px 0" />
        <detail-list title="그룹명" size="small" :col="1">
          <detail-list-item term="사용자명">이민수</detail-list-item>
          <detail-list-item term="역할코드">1234567</detail-list-item>
          <detail-list-item term="부서">XX사-YY부서</detail-list-item>
          <detail-list-item term="만료일">2021-12-08</detail-list-item>
          <detail-list-item term="설명">테스트중입니다. 테스트 중입니다. 테스트 중입니다....</detail-list-item>
        </detail-list>
        <a-divider style="margin: 16px 0" />
        <detail-list title="그룹명" size="small" :col="2">
          <detail-list-item term="사용자명">이민수</detail-list-item>
          <detail-list-item term="역할코드">1234567</detail-list-item>
          <detail-list-item term="부서">XX사-YY부서</detail-list-item>
          <detail-list-item term="만료일">2021-12-08</detail-list-item>
          <detail-list-item term="설명">테스트중입니다. 테스트 중입니다. 테스트 중입니다....</detail-list-item>
        </detail-list>
      </a-card>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="최근 6개월간 이용자의 이용기록">
      <a-list></a-list>
    </a-card>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="activeTabKey"
      @tabChange="(key) => {this.activeTabKey = key}"
    >
      <a-table
        v-if="activeTabKey === '1'"
        :columns="operationColumns"
        :dataSource="operation1"
        :pagination="false"
      />
      <a-table
        v-if="activeTabKey === '2'"
        :columns="operationColumns"
        :dataSource="operation2"
        :pagination="false"
      />
      <a-table
        v-if="activeTabKey === '3'"
        :columns="operationColumns"
        :dataSource="operation3"
        :pagination="false"
      />
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from '@/layouts/PageLayout'
import DetailList from '@/components/tool/DetailList'
import AStepItem from '@/components/tool/AStepItem'
import {operation1, operation2, operation3, operationColumns} from '@/mock/common/tableData'
import {mapState} from 'vuex'
import HeadInfo from '@/components/tool/HeadInfo';


const DetailListItem = DetailList.Item
const AStepItemGroup = AStepItem.Group

const tabList = [
  {
    key: '1',
    tab: '작업로그1'
  },
  {
    key: '2',
    tab: '작업로그2'
  },
  {
    key: '3',
    tab: '작업로그3'
  }
]

export default {
  name: 'AdvancedDetail',
  components: {HeadInfo, AStepItemGroup, AStepItem, DetailListItem, DetailList, PageLayout},
  data () {
    return {
      tabList,
      operationColumns,
      operation1,
      operation2,
      operation3,
      activeTabKey: '2'
    }
  },
  computed: {
    ...mapState('setting', ['isMobile'])
  },
  methods: {
    onTabChange (key) {
      console.log(key)
    }
  },
}
</script>

<style lang="less" scoped>
</style>

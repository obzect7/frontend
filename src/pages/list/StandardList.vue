<template>
  <div>
    <a-card :bordered="false">
      <div style="display: flex; flex-wrap: wrap">
          <head-info title="작업목록" content="8개" :bordered="true"/>
          <head-info title="평균작업처리시간" content="32분" :bordered="true"/>
          <head-info title="완료 작업수" content="24개"/>
      </div>
    </a-card>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="표준 목록"
    >
      <div slot="extra">
        <a-radio-group>
          <a-radio-button>전체</a-radio-button>
          <a-radio-button>진행중</a-radio-button>
          <a-radio-button>대기중</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div>
      <a-button type="dashed" style="width: 100%" icon="plus">추가</a-button>
      <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
        <a-list-item :key="i" v-for="i in 5">
          <a-list-item-meta
            description="작업하는 것 안하는 것"
          >
            <a-avatar slot="avatar" size="large" shape="square" src="https://logoproject.naver.com/img/img_story_renewal.png"/>
            <a slot="title">Prosoft</a>
          </a-list-item-meta>
          <div slot="actions">
            <a>수정</a>
          </div>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a>수정</a></a-menu-item>
                <a-menu-item><a>삭제</a></a-menu-item>
              </a-menu>
              <a>더보기<a-icon type="down"/></a>
            </a-dropdown>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>Owner</span>
              <p>이민수</p>
            </div>
            <div class="list-content-item">
              <span>시작시간</span>
              <p>2021-12-25 22:44</p>
            </div>
            <div class="list-content-item">
              <a-progress :percent="80" style="width: 180px" />
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import HeadInfo from '../../components/tool/HeadInfo'
export default {
  name: 'StandardList',
  components: {HeadInfo}
}
</script>

<style lang="less" scoped>
  .list-content-item{
    color: @text-color-second;
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;
    span{
      line-height: 20px;
    }
    p{
      margin: 4px 0 0;
      line-height: 22px;
    }
  }
</style>

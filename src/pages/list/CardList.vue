<template>
  <div class="card-list">
    <a-list
      :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
      :dataSource="dataSource"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <template v-if="item.add">
          <a-button class="new-btn" type="dashed">
            <a-icon type="plus" />새상품
          </a-button>
        </template>
        <template v-else>
          <a-card :hoverable="true">
            <a-card-meta >
              <div style="margin-bottom: 3px" slot="title">{{item.title}}</div>
              <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="large" />
              <div class="meta-content" slot="description">{{item.content}}</div>
            </a-card-meta>
            <a slot="actions">작업1</a>
            <a slot="actions">작업1</a>
          </a-card>
        </template>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
const dataSource = []
dataSource.push({
  add: true
})
for (let i = 0; i < 11; i++) {
  dataSource.push({
    title: 'Prosoft',
    avatar: 'https://logoproject.naver.com/img/img_story_renewal.png',
    content: '중대만 제품의 개발 과정에서 다른 디자인 사양과 구현 방법이 나타나지만 유사한 페이지와 구성 요소가 많이 있으며 이러한 유사한 구성 요소는 일련의 표준 사양으로 분리됩니다.'
  })
}

export default {
  name: 'CardList',
  data () {
    return {
      desc: '설명: Prosoft 는 최소한의 워크로드로 원활하게 연결되며 설계와 개발을 아우르는 경험 솔루션을 제공합니다.',
      linkList: [
        {icon: 'rocket', href: '/#/', title: '빠른시작'},
        {icon: 'info-circle-o', href: '/#/', title: '제품소개'},
        {icon: 'file-text', href: '/#/', title: '제품문서'}
      ],
      extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',
      dataSource
    }
  }
}
</script>

<style lang="less" scoped>
  .card-avatar {
    width: 48px;
    height: 48px;
    border-radius: 48px;
  }
  .new-btn{
    border-radius: 2px;
    width: 100%;
    height: 187px;
  }
  .meta-content{
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 64px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

</style>

<template>
  <div>
    <search-form />
    <a-card :bordered="false">
      <a-list itemLayout="vertical">
        <a-list-item :key="n" v-for="n in 10">
          <a-list-item-meta title="Prosoft">
            <div slot="description">
              <a-tag >Prosoft</a-tag>
              <a-tag >Prosoft</a-tag>
              <a-tag >Prosoft</a-tag>
            </div>
          </a-list-item-meta>
          <div class="content">
            <div class="detail">
              Prosoft Vue 프레임워크 개발중입니다.
            </div>
          </div>
          <span slot="actions"><a-icon style="margin-right: 8px" type="star-o" />156</span>
          <span slot="actions"><a-icon style="margin-right: 8px" type="like-o" />1435</span>
          <span slot="actions"><a-icon style="margin-right: 8px" type="message" />4</span>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import SearchForm from './SearchForm'
export default {
  name: 'ArticleList',
  components: {SearchForm}
}
</script>

<style lang="less" scoped>
  .extra{
    width: 272px;
    height: 1px;
  }
  .content {
    .detail {
      line-height: 22px;
      max-width: 720px;
    }
    .author {
      color: @text-color-second;
      margin-top: 16px;
      line-height: 22px;
      & > :global(.ant-avatar) {
          vertical-align: top;
          margin-right: 8px;
          width: 20px;
          height: 20px;
          position: relative;
          top: 1px;
        }
      & > em {
          color: @disabled-color;
          font-style: normal;
          margin-left: 16px;
        }
    }
  }
</style>

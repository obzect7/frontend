<template>
  <div>
    <search-form />
    <a-list
      :grid="{gutter: 16, xl: 4, lg: 3, md: 3, sm: 2, xs: 1}"
      style="margin: 0 -8px"
    >
      <a-list-item :key="n" v-for="n in 12" style="padding: 0 8px">
        <a-card>
          <a-card-meta title="Angular">
            <a-avatar slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png" size="small" />
          </a-card-meta>
            <a-tooltip class="tool"  title="다운로드" slot="actions">
              <a-icon type="download" />
            </a-tooltip>
            <a-tooltip class="tool"  title="수정" slot="actions">
              <a-icon type="edit" />
            </a-tooltip>
            <a-tooltip class="tool"  title="공유" slot="actions">
              <a-icon type="share-alt" />
            </a-tooltip>
            <a-dropdown class="tool" slot="actions">
              <a-icon type="ellipsis" />
              <a-menu slot="overlay">
                <a-menu-item>1 item</a-menu-item>
                <a-menu-item>2 item</a-menu-item>
                <a-menu-item>3 item</a-menu-item>
              </a-menu>
            </a-dropdown>
          <div class="content">
            <div>
              <p>기존</p>
              <p>500명</p>
            </div>
            <div>
              <p>신규</p>
              <p>1,950</p>
            </div>
          </div>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import SearchForm from './SearchForm'
export default {
  name: 'ApplicationList',
  components: {SearchForm}
}
</script>

<style lang="less" scoped>
  .clearfix() {
    zoom: 1;
    &:before,
    &:after {
      content: ' ';
      display: table;
    }
    &:after {
      clear: both;
      visibility: hidden;
      font-size: 0;
      height: 0;
    }
  }
  .content {
    .clearfix();
    margin-top: 16px;
    margin-left: 40px;
    & > div {
      position: relative;
      text-align: left;
      float: left;
      width: 50%;
      p {
        line-height: 32px;
        font-size: 24px;
        margin: 0;
      }
      p:first-child {
        color: @text-color-second;
        font-size: 12px;
        line-height: 20px;
        margin-bottom: 4px;
      }
    }
  }
</style>

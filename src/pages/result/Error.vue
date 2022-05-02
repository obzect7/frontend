<template>
    <a-card class="result-error" :bordered="false">
      <result style="margin-bottom: 16px; margin-top: 48px" :is-success="false" :title="title" :description="description">
        <template slot="action">
          <a-button type="primary" >돌아가기</a-button>
        </template>
        <div>
          <div style="fontSize: 16px; fontWeight: 500; marginBottom: 16px">
            제출한 콘텐츠에 다음 오류가 있습니다：
          </div>
          <div style="margin-bottom: 16px">
            <a-icon class="error-icon" type="close-circle-o"/>
            귀하의 계정이 동결되었습니다
            <a style="margin-left: 16px">해제하기 <a-icon type="right" /></a>
          </div>
          <div>
            <a-icon class="error-icon" type="close-circle-o"/>
            귀하의 계정은 아직 신청할 수 없습니다.
            <a style="margin-left: 16px">해제하기 <a-icon type="right" /></a>
          </div>
        </div>
      </result>
    </a-card>
</template>

<script>
import Result from '@/components/result/Result'
export default {
  name: 'Error',
  components: {Result},
  data () {
    return {
      title: '제출 실패',
      description: '다시 제출하기 전에 다음 정보를 확인하고 수정하십시오.'
    }
  }
}
</script>

<style scoped lang="less">
.result-error{
  .error-icon{
    color: @red-6;
    margin-right: 8px
  }
}
</style>

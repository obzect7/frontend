<template>
  <a-card :bordered="false" class="search-form">
    <a-form :form="form">
      <form-row label="보기">
        <a-form-item>
          <tag-select>
            <tag-select-option>카테고리 1</tag-select-option>
            <tag-select-option>카테고리 2</tag-select-option>
            <tag-select-option>카테고리 3</tag-select-option>
            <tag-select-option>카테고리 4</tag-select-option>
            <tag-select-option>카테고리 5</tag-select-option>
            <tag-select-option>카테고리 6</tag-select-option>
            <tag-select-option>카테고리 7</tag-select-option>
            <tag-select-option>카테고리 8</tag-select-option>
            <tag-select-option>카테고리 9</tag-select-option>
            <tag-select-option>카테고리 10</tag-select-option>
            <tag-select-option>카테고리 11</tag-select-option>
            <tag-select-option>카테고리 12</tag-select-option>
            <tag-select-option>카테고리 13</tag-select-option>
            <tag-select-option>카테고리 14</tag-select-option>
            <tag-select-option>카테고리 15</tag-select-option>
            <tag-select-option>카테고리 16</tag-select-option>
          </tag-select>
        </a-form-item>
      </form-row>
      <form-row label="owner" style="padding-bottom: 11px">
        <a-form-item>
          <a-select
            mode="multiple" style="max-width: 286px"
            v-decorator="['owner', {initialValue: ['1', '2']}]"
          >
            <a-select-option value="3">이민수</a-select-option>
            <a-select-option value="1">홍길동</a-select-option>
            <a-select-option value="2">김태리</a-select-option>
            <a-select-option value="4">김길수</a-select-option>
          </a-select>
        </a-form-item>
        <a @click="lookMyself">본인만 보기</a>
      </form-row>
      <form-row label="다른 옵션">
        <a-row>
          <a-col :span="8">
            <a-form-item label="활성화" :labelCol="{span: 6}" :wrapperCol="{span: 12}">
              <a-select placeholder="선택">
                <a-select-option value="1">김태리</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="테스트"
              :labelCol="{span: 6}"
              :wrapperCol="{span: 12}"
            >
              <a-select placeholder="선택">
                <a-select-option value="1">선택1</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </form-row>
    </a-form>
  </a-card>
</template>

<script>
import TagSelect from '../../../components/tool/TagSelect'
import FormRow from '../../../components/form/FormRow'

const TagSelectOption = TagSelect.Option

export default {
  name: 'SearchForm',
  components: {FormRow, TagSelectOption, TagSelect},
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    lookMyself () {
      this.form.setFieldsValue({
        owner: '3'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .search-form{
    margin-bottom: 24px;
  }
</style>

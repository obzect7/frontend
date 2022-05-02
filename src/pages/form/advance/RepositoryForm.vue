<template>
  <a-form @submit="handleSubmit" :form="form" class="form">
    <a-row class="form-row">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item :label="$t('name')">
          <a-input
            :placeholder="$ta('input|name')"
            v-decorator="['repository.name', {rules: [{ required: true, message: $ta('input|name'), whitespace: true}]}]"
          />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 6, offset: 2}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item :label="$t('domain')">
          <a-input
            addonBefore="http://" addonAfter=".github.io"
            :placeholder="$ta('input|domain')"
            v-decorator="['repository.domain', {rules: [{ required: true, message: $ta('input|domain'), whitespace: true}, {validator: validate}]}]"
          />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 8, offset: 2}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item :label="$t('manager')">
          <a-select
            :placeholder="$ta('select|manager')"
            v-decorator="['repository.manager', {rules: [{ required: true, message: $ta('select|manager')}]}]"
          >
            <a-select-option value="김학생1">김학생1</a-select-option>
            <a-select-option value="김학생2">김학생2</a-select-option>
            <a-select-option value="김학생3">김학생3</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item :label="$t('approval')">
          <a-select
            :placeholder="$ta('select|approval')"
            v-decorator="['repository.auditor', {rules: [{ required: true, message: $ta('select|approval')}]}]"
          >
            <a-select-option value="이민수">이민수</a-select-option>
            <a-select-option value="김태리">김태리</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 6, offset: 2}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item :label="$t('date')">
          <a-range-picker
            style="width: 100%"
            v-decorator="['repository.effectiveDate', {rules: [{ required: true, message: $ta('select|date')}]}]"
          />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 8, offset: 2}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item :label="$t('type')">
          <a-select
            :placeholder="$ta('select|type')"
            v-decorator="['repository.type', {rules: [{ required: true, message: $ta('select|type')}]}]"
          >
            <a-select-option value="공개">공개</a-select-option>
            <a-select-option value="비공개">비공개</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item v-if="showSubmit">
      <a-button htmlType="submit" >Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'RepositoryForm',
  props: ['showSubmit'],
  i18n: require('./i18n-repository'),
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    validate (rule, value, f) {
      if (value !== undefined && value !== 'iczer') {
        f('프로소프트？')
      }
      f()
    }
  }
}
</script>

<style lang="less" scoped>
  .form{
    .form-row{
      margin: 0 -8px
    }
    .ant-col-md-12,
    .ant-col-sm-24,
    .ant-col-lg-6,
    .ant-col-lg-8,
    .ant-col-lg-10,
    .ant-col-xl-8,
    .ant-col-xl-6{
      padding: 0 8px
    }
  }
</style>

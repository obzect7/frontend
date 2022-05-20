<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false" >
    <a-form :form="form" id="frm">
      <a-form-item :label="$t('userid')" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-input :placeholder="$t('userid')" name="userid" :required="true"
                 v-decorator="['userid', {rules: [{ required: true, message: '아이디를 입력하세요', whitespace: true}]}]"
        />
      </a-form-item>
      <a-form-item :label="$t('usernm')" :labelCol="{span: 7}" :wrapperCol="{span: 10}" >
        <a-input :placeholder="$t('usernm')" name="usernm" :required="true"
                 v-decorator="['usernm', {rules: [{ required: true, message: '사용자명을 입력하세요', whitespace: true}]}]"
        />
      </a-form-item>
      <a-form-item :label="$t('password')" :labelCol="{span: 7}" :wrapperCol="{span: 10}" >
        <a-input-password :placeholder="$t('password')" name="password" :required="true"
                          v-decorator="['password', {rules: [{ required: true, message: '비밀번호를 입력하세요', whitespace: true}]}]"
        />
      </a-form-item>

      <a-form-item :label="$t('socialCd')" :labelCol="{span: 7}" :wrapperCol="{span: 10}" >
        <select class="custom-select" v-model="socialCd" name="socialCd" >
          <option :value="null" >{{$t('SELECT')}}</option>
          <option :value="'KAKAO'" >{{$t('KAKAO')}}</option>
          <option :value="'NAVER'" >{{$t('NAVER')}}</option>
          <option :value="'GOOGLE'" >{{$t('GOOGLE')}}</option>
          <option :value="'INSIDE'" >{{$t('INSIDE')}}</option>
<!--          <option v-for="value in groupSortingLists" :key="value.DisplayName" :value="value">{{value.displayName}}</option>-->
        </select>

      </a-form-item>

      <a-form-item :label="$t('birthday')" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-date-picker style="width: 100%" placeholder="birthday" v-model="birthday" name="birthday" />
      </a-form-item>

      <a-form-item :label="$t('gender')" :labelCol="{span: 7}" :wrapperCol="{span: 10}" >
        <select class="custom-select" v-model="gender" >
          <option :value="null" >{{$t('SELECT')}}</option>
          <option :value="'M'" >{{$t('MAN')}}</option>
          <option :value="'W'" >{{$t('WOMAN')}}</option>

          <!--          <option v-for="value in groupSortingLists" :key="value.DisplayName" :value="value">{{value.displayName}}</option>-->
        </select>
      </a-form-item>

      <a-form-item :label="$t('remark')" :labelCol="{span: 7}" :wrapperCol="{span: 10}" >
        <a-textarea rows="4" :placeholder="$t('remark')" v-model="remark" />
      </a-form-item>

      <a-form-item :label="$t('useyn')" :labelCol="{span: 7}" :wrapperCol="{span: 10}" :required="false" >
        <a-radio-group v-model="useyn" >
          <a-radio :value="1">{{$t('use')}}</a-radio>
          <a-radio :value="2">{{$t('unused')}}</a-radio>
        </a-radio-group>
      </a-form-item>


      <a-form-item style="margin-top: 24px" :wrapperCol="{span: 10, offset: 7}">
        <a-button type="primary" style="margin-left: 8px" @click="saveUser" >{{$t('save')}}</a-button>
        <a-button type="primary" style="margin-left: 8px" @click="close" >{{$t('close')}}</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
export default {
  name: 'BasicForm',
  i18n: require('./i18n'),
  data () {
    return {
      userid : '',
      usernm : '',
      password :'',
      socialCd :null,
      birthday : '',
      gender : null,
      remark : '',
      useyn: 1,
      form: this.$form.createForm(this)
    }
  },
  computed: {
    desc() {
      return this.$t('pageDesc')
    }
  },
  methods : {
    close(){
      this.$emit("closepop", '')
    },
    saveUser(){
      console.log('saveUser')
      this.form.validateFields((err) => {

        if(!err) {
          let myForm = document.getElementById('frm');
          let formData = new FormData(myForm);
          const data = {};
          // need to convert it before using not with XMLHttpRequest
          for (let [key, val] of formData.entries()) {
            Object.assign(data, {[key]: val})
          }
          console.log("data===", data);
        }

      })

    }
  }

}
</script>

<style scoped>

</style>

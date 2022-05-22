<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false" >
    <a-form :form="form" id="PopUserfrm">
      <a-form-item :label="$t('userid')" :labelCol="{span: 7}" :wrapperCol="{span: 10}" >
        <a-input :placeholder="$t('userid')" name="userid" :required="true"
                 v-decorator="['userid', {initialValue: popinit.usernm,rules: [{ required: true, message: $t('requserid'), whitespace: true}]}]"
        />
      </a-form-item>
      <a-form-item :label="$t('usernm')" :labelCol="{span: 7}" :wrapperCol="{span: 10}" >
        <a-input :placeholder="$t('usernm')" name="usernm" :required="true"
                 v-decorator="['usernm', {initialValue: popinit.usernm, rules: [{ required: true, message: $t('requsernm'), whitespace: true}]}]"
        />
      </a-form-item>
      <a-form-item :label="$t('password')" :labelCol="{span: 7}" :wrapperCol="{span: 10}" >
        <a-input-password :placeholder="$t('password')" name="password" :required="true"
                          v-decorator="['password', {initialValue: popinit.password, rules: [{ required: true, message: $t('reqpassword'), whitespace: true}]}]"
        />
      </a-form-item>

      <a-form-item :label="$t('socialCd')" :labelCol="{span: 7}" :wrapperCol="{span: 10}" :required="true">
        <select class="custom-select" v-model="socialCd" name="socialCd" >
          <option :value="null" >{{$t('SELECT')}}</option>
          <option :value="'KAKAO'" >{{$t('KAKAO')}}</option>
          <option :value="'NAVER'" >{{$t('NAVER')}}</option>
          <option :value="'GOOGLE'" >{{$t('GOOGLE')}}</option>
          <option :value="'INSIDE'" >{{$t('INSIDE')}}</option>
<!--          <option v-for="value in groupSortingLists" :key="value.DisplayName" :value="value">{{value.displayName}}</option>-->
        </select>

      </a-form-item>

      <a-form-item :label="$t('usergb')" :labelCol="{span: 7}" :wrapperCol="{span: 10}" :required="true"
                   v-decorator="['usergb', {rules: [{ required: true, message: $t('requsergb'), whitespace: true}]}]">>
        <a-radio-group v-model="usergb" name="usergb">
          <a-radio :value="'N'">{{$t('normal')}}</a-radio>
          <a-radio :value="'C'">{{$t('coperation')}}</a-radio>
          <a-radio :value="'A'">{{$t('all')}}</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item :label="$t('hp')" :labelCol="{span: 7}" :wrapperCol="{span: 10}" >
        <a-input :placeholder="$t('hp')" name="hp" :required="true"
                 v-decorator="['hp', {initialValue: popinit.hp, rules: [{ required: false,  whitespace: true}]}]"
        />
      </a-form-item>

      <a-form-item :label="$t('birthday')" :labelCol="{span: 7}" :wrapperCol="{span: 10}" v-model="birthday">
        <a-date-picker style="width: 100%" placeholder="birthday" v-model="birthday" name="birthday" />
      </a-form-item>

      <a-form-item :label="$t('gender')" :labelCol="{span: 7}" :wrapperCol="{span: 10}" >
        <select class="custom-select" v-model="gender" name="gender" >
          <option :value="null" >{{$t('SELECT')}}</option>
          <option :value="'M'" >{{$t('MAN')}}</option>
          <option :value="'W'" >{{$t('WOMAN')}}</option>

          <!--          <option v-for="value in groupSortingLists" :key="value.DisplayName" :value="value">{{value.displayName}}</option>-->
        </select>
      </a-form-item>

      <a-form-item :label="$t('remark')" :labelCol="{span: 7}" :wrapperCol="{span: 10}" v-model="remark" >
        <a-textarea rows="4" :placeholder="$t('remark')" v-model="remark" name="remark"/>
      </a-form-item>

      <a-form-item :label="$t('useyn')" :labelCol="{span: 7}" :wrapperCol="{span: 10}" :required="false"
                   v-decorator="['useyn', {rules: [{ required: true, message: $t('requseyn'), whitespace: true}]}]">>
        <a-radio-group v-model="useyn" name="useyn">
          <a-radio :value="'Y'">{{$t('use')}}</a-radio>
          <a-radio :value="'N'">{{$t('unused')}}</a-radio>
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
import {saveuser} from "@/services/user";
//import {SAVEUSER} from "@/services/api";

export default {
  name: 'BasicForm',
  i18n: require('./i18n'),
  data () {
    return {
      userid : '',
      usernm : '',
      password :'',
      socialCd : null,
      usergb : 'N',
      hp : '',
      birthday : '',
      gender : null,
      remark : '',
      useyn: 'Y',
      form: this.$form.createForm(this)
    }
  },
  props : {
    popinit : {
      userid : '',
      usernm : '',
      password : '',
      socialCd : '',
      usergb : '',
      hp : '',
      birthday :'',
      gender : '',
      remark : '',
      useyn : ''
    }
  },
  created() {
    //console.log("pop created")
    //console.log("popinit.userid ==", this.popinit.userid)
    if(this.popinit.userid == '')
    {
      console.log('null임')
    }
    else {
      console.log('null아님')

      this.socialCd = this.popinit.socialCd;
      this.usergb = this.popinit.usergb;
      this.birthday = this.popinit.birthday;
      this.gender = this.popinit.gender;
      this.remark = this.popinit.remark;
      this.useyn = this.popinit.useyn;
    }

  },
  mounted() {
    //console.log("pop mounted")
  },
  computed: {

  },
  watch :{

  },
  methods : {
    close(){
      this.$emit("closepop", '')
    },
    saveUser(){
      console.log('saveUser')
      this.form.validateFields((err) => {

        if(!err) {
          let myForm = document.getElementById('PopUserfrm');
          let formData = new FormData(myForm);
          const data = {};
          // need to convert it before using not with XMLHttpRequest
          for (let [key, val] of formData.entries()) {
            Object.assign(data, {[key]: val})
          }

          let insUserid = 'admin' //store에서 가져올것

          Object.assign(data, {['insuserid']: insUserid})
          Object.assign(data, {['upduserid']: insUserid})

          console.log("data===", data);


          saveuser(data).then(this.aftersaveuser)
        }

      })

    },
    aftersaveuser(res) {
      //console.log('res==', res)
      const loginRes = res.data
      if (loginRes.code == '200') {

        this.$message.success('저장완료되었습니다.', 3)
        this.$emit("closepop", '')

      }
    }
  }

}
</script>

<style scoped>

</style>

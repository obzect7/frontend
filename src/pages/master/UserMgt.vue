<template>
  <a-card>
    <div>
      <PopUserMgt v-if="isPopUp" @closepop="closePopUserMgt" :popinit="this.popinit" />
    </div>
    <div v-if="!isPopUp" >
      <a-form layout="horizontal" id="frm">
        <div >
          <a-row >
            <a-col :md="5" :sm="24" >
              <a-form-item label="사용자ID" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">
                <a-input name="userid" placeholder="입력하세요." />
              </a-form-item>
            </a-col>
            <a-col :md="7" :sm="24" >
              <a-form-item label="사용자명" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}" >
                <a-input name="usernm" style="width: 100%" placeholder="입력하세요." />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24" align="right" >
              <a-button @click="search"  style="margin-left: 4px;margin-bottom: 4px; background-color: #A50000; color: white" >조회</a-button>
            </a-col>
          </a-row>
        </div>
        <a-row >
          <a-col :md="24" :sm="24" align="right" >
            <a-button @click="openPopUserMgt" type="primary" style="margin-left: 4px;margin-bottom: 4px">추가</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div v-if="!isPopUp">
      <AUIGrid ref="myGrid" class="grid-wrap"
               @cellClick="cellClickHandler"
      ></AUIGrid>
    </div>
  </a-card>
</template>
<script>

let socialCdList = [{"code" : "KAKAO", "codeNm" : "카카오"},{"code" : "NAVER", "codeNm" : "네이버"},{"code" : "GOOGLE", "codeNm" : "구글"},{"code" : "INSIDE", "codeNm" : "자체가입"}]
let usergbList = [{"code" : "N", "codeNm" : "일반회원"},{"code" : "C", "codeNm" : "기업회원"},{"code" : "A", "codeNm" : "전체"}]
let useynList = [{"code" : "Y", "codeNm" : "사용"},{"code" : "N", "codeNm" : "미사용"}]
 

// AUIGrid 컴포넌트
import AUIGrid from '@/static/AUIGrid-Vue.js/AUIGrid.vue'
import {selectUserList} from '@/services/user'
import PopUserMgt from './PopUserMgt'

export default {

    components : {
      AUIGrid,
      PopUserMgt
    },
    props :{
      //isPopUp : false
    },

    data: function () {

        return {

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
            },

            isPopUp : false,

            // 그리드 칼럼 레이아웃 정의
            columnLayout : [

              {dataField : "userid",    headerText : "사용자ID",width : 120},
              {dataField : "usernm",    headerText : "사용자명",width : 140},
              {dataField : "password",  headerText : "비밀번호",width : 120},
              {dataField : "socialCd",	headerText : "소셜구분"   , width : 120,
                renderer : {
                  type : "DropDownListRenderer",
                  list : socialCdList, //key-value Object 로 구성된 리스트
                  keyField : "code", // key 에 해당되는 필드명
                  valueField : "codeNm" // value 에 해당되는 필드명
                }
              },
              {dataField : "usergb",  	headerText : "사용자구분", width : 120,
                renderer : {
                  type : "DropDownListRenderer",
                  list : usergbList, //key-value Object 로 구성된 리스트
                  keyField : "code", // key 에 해당되는 필드명
                  valueField : "codeNm" // value 에 해당되는 필드명
                }
              },
              {dataField : "hp",      	headerText : "전화번호", width : 120},
              {dataField : "birthday",  headerText : "생일", width : 120},
              {dataField : "gender",  	headerText : "성별", width : 120},
              {dataField : "remark",  	headerText : "비고", width : 120},
              {dataField : "useyn", 	  headerText : "사용여부", width : 120,
                renderer : {
                  type : "DropDownListRenderer",
                  list : useynList, //key-value Object 로 구성된 리스트
                  keyField : "code", // key 에 해당되는 필드명
                  valueField : "codeNm" // value 에 해당되는 필드명
                }
              },
              {dataField : "insuserid",	headerText : "등록자", width : 120},
              {dataField : "insdttm", 	headerText : "등록일시", width : 120},
              {dataField : "upduserid",	headerText : "수정자", width : 120},
              {dataField : "upddttm", 	headerText : "수정일시", width : 120}
            ],

            // 그리드 속성 정의

            auigridProps : {

                // 편집 가능 여부 (기본값 : false)

                editable : false,

                // 셀 선택모드 (기본값: singleCell)

                selectionMode : "multipleCells"

            },

            // 그리드 데이터
            gridData : [],
        }
    },

    mounted(){

        let grid = this.$refs.myGrid;

        // 그리드 생성
        grid.create(this.columnLayout, this.auigridProps);

        // 그리드 데이터 삽입하기
        //grid.setGridData(this.gridData);
        this.search()


    },


    methods : {

      search :function (){

        //console.log('sss')

        let myForm = document.getElementById('frm');
        let formData = new FormData(myForm);
        const data = {};
        // need to convert it before using not with XMLHttpRequest
        for (let [key, val] of formData.entries()) {
          Object.assign(data, {[key]: val})
        }
        //console.log("data===", data);

        selectUserList(data).then(this.afterselectUserList)

      },

      afterselectUserList(res) {
        //console.log("res.status==", res.status)
        //console.log("res==", res)  status

        if(res.status == "200"){

          //console.log("res.data.data==", res.data.data)
          this.gridData = res.data.data.userList

          // 그리드 데이터 삽입하기
          let grid = this.$refs.myGrid;
          grid.setGridData(this.gridData);

        }else{
          this.$message.success("조회실패입니다.")
        }
      },

      openPopUserMgt(){
        //console.log('sssss')
        this.isPopUp = true
      },
      closePopUserMgt(){
        //console.log('sssss')
        this.isPopUp = false
        this.$router.go()
      },
      //그리드 셀클릭
      cellClickHandler(event){


        this.popinit.userid = event.item.userid;
        this.popinit.usernm = event.item.usernm;
        this.popinit.password = event.item.password;
        this.popinit.socialCd = event.item.socialCd;
        this.popinit.usergb = event.item.usergb;
        this.popinit.hp = event.item.hp;
        this.popinit.birthday = event.item.birthday;
        this.popinit.gender = event.item.gender;
        this.popinit.remark = event.item.remark;
        this.popinit.useyn = event.item.useyn;

        console.log("popinit===", this.popinit)

        this.openPopUserMgt()


      }

    }

}

</script>

 

<style scoped>

    .grid-wrap {

        width:100%;
        height:100%;
    }

</style>
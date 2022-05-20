<template>
  <a-card>
    <div >
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
        <div style="float: right"  >
          <span style="float: right; margin-top: 3px;">
            <a-button @click="search" type="primary" style="margin-left: 4px;margin-bottom: 4px">추가</a-button>
          </span>
        </div>

      </a-form>
    </div>
    <div>
      <AUIGrid ref="myGrid" class="grid-wrap"></AUIGrid>
    </div>
  </a-card>
</template>
<script>

 

// AUIGrid 컴포넌트
import AUIGrid from '@/static/AUIGrid-Vue.js/AUIGrid.vue'
import {selectUserList} from '@/services/user'



export default {

    components : {

        AUIGrid

    },

 

    data: function () {

        return {

            // 그리드 칼럼 레이아웃 정의

            columnLayout : [

              {dataField : "userid",    headerText : "사용자ID",width : 120},
              {dataField : "usernm",    headerText : "사용자명",width : 140},
              {dataField : "password",  headerText : "비밀번호",width : 120},
              {dataField : "socialCd",	headerText : "소셜구분"   , width : 120},
              {dataField : "usergb",  	headerText : "사용자구분", width : 120},
              {dataField : "hp",      	headerText : "전화번호", width : 120},
              {dataField : "birthday",  headerText : "생일", width : 120},
              {dataField : "gender",  	headerText : "성별", width : 120},
              {dataField : "remark",  	headerText : "비고", width : 120},
              {dataField : "useyn", 	  headerText : "사용여부", width : 120},
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

    },


    methods : {

      search :function (){

        console.log('sss')

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

          console.log("res.data.data==", res.data.data)
          this.gridData = res.data.data.userList

          // 그리드 데이터 삽입하기
          let grid = this.$refs.myGrid;
          grid.setGridData(this.gridData);

        }else{
          this.$message.success("조회실패입니다.")
        }
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
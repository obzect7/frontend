<template>
<!--  <multipane style="width: 100%; height: 100%" layout="horizontal">-->
  <a-card >

    <div  >
      <a-form layout="horizontal" id="frm">
          <div >
            <a-row >
              <a-col :md="5" :sm="24" >
                <a-form-item label="그룹코드" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">
                  <a-input name="groupCd" placeholder="입력하세요." />
                </a-form-item>
              </a-col>
              <a-col :md="7" :sm="24" >
                <a-form-item label="그룹코드명" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}" >
                  <a-input name="groupNm" style="width: 100%" placeholder="입력하세요." />
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24" align="right" >
                <a-button @click="search"  style="margin-left: 4px;margin-bottom: 4px; background-color: #A50000; color: white" >조회</a-button>
              </a-col>
            </a-row>
            <a-row >
              <a-col :md="24" :sm="24" align="right" >
                <a-button @click="saveGrp" type="primary" style="margin-left: 4px;margin-bottom: 4px">저장</a-button>
                <a-button @click="addGrp" type="primary" style="margin-left: 4px;margin-bottom: 4px">추가</a-button>
                <a-button @click="removeGrp" type="primary" style="margin-left: 4px;margin-bottom: 4px">삭제</a-button>
              </a-col>
            </a-row>
            <a-row >
              <AUIGrid ref="grpGrid" class="grid-wrap"
                       @cellDoubleClick="cellDoubleClickHandler"
              ></AUIGrid>
            </a-row>
          </div>
<!--          <multipane-resizer style="border-left: #cccccc; border-left: 1px; " ></multipane-resizer>-->

          <div >
            <a-row >
              <a-col :md="5" :sm="24" >
                &nbsp;
              </a-col>

            </a-row>
            <a-row >
              <a-col :md="24" :sm="24" align="right" >
                <a-button @click="openPopUserMgt(popNew)" type="primary" style="margin-left: 4px;margin-bottom: 4px">추가</a-button>
              </a-col>
            </a-row>
            <a-row >
              <AUIGrid ref="codeGrid" class="grid-wrap"></AUIGrid>
            </a-row>
          </div>




      </a-form>

    </div>

<!--    <div >-->
<!--      <AUIGrid ref="grpGrid" class="grid-wrap"-->
<!--               @cellDoubleClick="cellDoubleClickHandler"-->
<!--      ></AUIGrid>-->
<!--    </div>-->

  </a-card>
<!--  </multipane>-->

</template>
<script>

//import {saveuser} from "@/services/user";

let useynList = [{"code" : "Y", "codeNm" : "사용"},{"code" : "N", "codeNm" : "미사용"}]
 

// AUIGrid 컴포넌트
import AUIGrid from '@/static/AUIGrid-Vue.js/AUIGrid.vue'
import {searchDtlCode, selectCodeGrpList, savecodeGrp} from '@/services/common'

export default {

    i18n: require('./i18n'),

    components : {
      AUIGrid,
      // Multipane,
      // MultipaneResizer,
    },
    props :{

    },

    data: function () {



        return {
            // 그리드 칼럼 레이아웃 정의
            GrpcolumnLayout : [

              {dataField : "groupCd",     headerText : "그룹코드",width : '5%'},
              {dataField : "groupNm",     headerText : "그룹코드명",width : '5%'},
              {dataField : "groupNmEn",   headerText : "그룹코드영문명",width : '5%'},
              {dataField : "codeType",    headerText : "코드유형",width : '5%'},
              {dataField : "rem",         headerText : "비고",width : '5%'},
              {dataField : "useYn", 	    headerText : "사용여부", width : '5%',
                renderer : {
                  type : "DropDownListRenderer",
                  list : useynList, //key-value Object 로 구성된 리스트
                  keyField : "code", // key 에 해당되는 필드명
                  valueField : "codeNm" // value 에 해당되는 필드명
                }
              },
              {dataField : "regId",	    headerText : "등록자", width : '5%'},
              {dataField : "regDt", 	  headerText : "등록일시", width : '5%'},
              {dataField : "modId",	    headerText : "수정자", width : '5%'},
              {dataField : "modDt", 	  headerText : "수정일시", width : '5%'}
            ],

          CodecolumnLayout : [

            {dataField : "groupCd",     headerText : "그룹코드"     ,width : '5%'},
            {dataField : "groupNm",     headerText : "그룹코드명"    ,width : '5%'},
            {dataField : "code",        headerText : "상세코드"     ,width : '5%'},
            {dataField : "codeNm",      headerText : "상세코드명"    ,width : '5%'},
            {dataField : "codeNmEn",    headerText : "코드영문명"    ,width : '5%'},
            {dataField : "sort",        headerText : "정렬순서"     ,width : '5%'},
            {dataField : "data1",       headerText : "데이터1"     ,width : '5%'},
            {dataField : "data2",       headerText : "데이터2"     ,width : '5%'},
            {dataField : "data3",       headerText : "데이터3"     ,width : '5%'},
            {dataField : "data4",       headerText : "데이터4"     ,width : '5%'},
            {dataField : "data5",       headerText : "데이터5"     ,width : '5%'},
            {dataField : "data6",       headerText : "데이터6"     ,width : '5%'},
            {dataField : "data7",       headerText : "데이터7"     ,width : '5%'},
            {dataField : "data8",       headerText : "데이터8"     ,width : '5%'},
            {dataField : "data9",       headerText : "데이터9"     ,width : '5%'},
            {dataField : "data10",      headerText : "데이터10"    ,width : '5%'},
            {dataField : "rem",         headerText : "비고"       ,width : '5%'},
            {dataField : "useYn", 	    headerText : "사용여부"   , width : '5%',
              renderer : {
                type : "DropDownListRenderer",
                list : useynList, //key-value Object 로 구성된 리스트
                keyField : "code", // key 에 해당되는 필드명
                valueField : "codeNm" // value 에 해당되는 필드명
              }
            },
            {dataField : "regId",	    headerText : "등록자", width : '5%'},
            {dataField : "regDt", 	  headerText : "등록일시", width : '5%'},
            {dataField : "modId",	    headerText : "수정자", width : '5%'},
            {dataField : "modDt", 	  headerText : "수정일시", width : '5%'}
          ],

            // 그리드 속성 정의

            auigridProps : {
                noDataMessage : "조회된 데이터가 없습니다.",
                //selectionMode : "multipleCells", // 셀 선택모드 (기본값: singleCell)
                height:235,
                headerHeight:40,
                //rowHeight:40,
                usePaging : false,
                enableDrag : true, // 셀 드래그 여부
                fillColumnSizeMode: true,
                //enableMovingColumn : true, //컬럼헤드 이동여부 true
                //pageRowCount : 20,
                // 줄번호 칼럼 렌더러 출력
                showRowNumColumn : true,
                editable : true,
                showRowCheckColumn : true,
                // 엑스트라 체크박스에 shiftKey + 클릭으로 다중 선택 할지 여부 (기본값 : false)
                enableRowCheckShiftKey : true,
                //showRowAllCheckBox : false,
                showStateColumn : true,
                autoGridHeight: false,
                wordWrap : false,
            },

            // 그리드 데이터
            gridDatagrp : [],
            gridDatacode : [],
            SELGRPCODE : '',
        }
    },

    mounted(){

        let grid = this.$refs.grpGrid;
        grid.create(this.GrpcolumnLayout, this.auigridProps);
        this.search()

        let grid2 = this.$refs.codeGrid;
        grid2.create(this.CodecolumnLayout, this.auigridProps);
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
        console.log("data===", data);

        selectCodeGrpList(data).then(this.afterselectCodeGrpList)

      },

      afterselectCodeGrpList(res) {

        // console.log("res==", res)
        if(res.status == "200"){

          //console.log("res.data.data==", res.data.data)
          this.gridDatagrp = res.data.data.list

          // 그리드 데이터 삽입하기
          let grid = this.$refs.grpGrid;
          grid.setGridData(this.gridDatagrp);

          this.SELGRPCODE = ''

        }else{
          this.$message.success("조회실패입니다.")
        }
      },
      //그리드 셀클릭
      cellDoubleClickHandler(event){

        // console.log("event.dataField===", event.dataField)
        // console.log("event.item===", event.item)

        let GrpParam = event.item;
        this.SELGRPCODE = GrpParam.groupCd
        //console.log("GrpParam===", GrpParam)
        //console.log("SELGRPCODE===", this.SELGRPCODE)
        searchDtlCode(GrpParam).then(this.aftersearchDtlCode)
      },
      aftersearchDtlCode(res) {
        //console.log("res.status==", res.status)
        // console.log("res==", res)
        // console.log("res.status==", res.status)
        // console.log("res.data.data==", res.data.data)

        if(res.status == "200"){

          //console.log("res.data.data==", res.data.data)
          this.gridDatacode = res.data.data.list

          // 그리드 데이터 삽입하기
          let grid = this.$refs.codeGrid;
          grid.setGridData(this.gridDatacode);

        }else{
          this.$message.success("조회실패입니다.")
        }
      },
      addGrp(){
        let item = { useYn : "Y", };
        // 하단에 1행 추가
        this.$refs.grpGrid.addRow(item, "last");

      },
      removeGrp(){
        // 선택행(들) 삭제
        //this.$refs.grpGrid.removeRow("selectedIndex");
        const grid = this.$refs.grpGrid;
        let items = grid.getCheckedRowItems();

        if(items.length == 0){
          alert("삭제할 행이 없습니다.");
          return
        }

        // for(let i=0; i<items.length; i++){
        for(let i=items.length -1 ; i>-1; i--){
          // console.log("i===" + i.toString())
          // console.log("items===" + JSON.stringify(items[i]))
          let chkIdx = items[i].rowIndex;

          grid.removeRow(chkIdx);

        }
      },
      saveGrp(){

        let user = this.$session.get('userid')
        //console.log("user===", user)
        // let regid = user.get('name');
        // console.log("regid===", regid)

        const grid = this.$refs.grpGrid;
        // let items = grid.getCheckedRowItems();
        // console.log("items===", JSON.stringify(items))

        let addedRowItems = grid.getAddedRowItems(); // 추가된 행 아이템들(배열)
        let editedRowItems = grid.getEditedRowItems(); // 수정된 행 아이템들(배열) (수정되지 않은 칼럼들의 값도 가지고 있음)
        let removedRowItems = grid.getRemovedItems(); // 삭제된 행 아이템들(배열)

        // console.log("addedRowItems===", JSON.stringify(addedRowItems))
        // console.log("editedRowItems===", JSON.stringify(editedRowItems))
        // console.log("removedRowItems===", JSON.stringify(removedRowItems))

        let data = [];
        if (addedRowItems.length > 0) {
          for(let i=0;i<addedRowItems.length; i++){
            let addItem = addedRowItems[i]
            Object.assign(addItem, {['rowStatus']: 'I'})
            Object.assign(addItem, {['regId']: user})
            Object.assign(addItem, {['modId']: user})
            //console.log("editedItem==", editedItem)
            data.push(addItem)
          }
          //data.add = addedRowItems;
        }
        if (editedRowItems.length > 0) {
          for(let i=0;i<editedRowItems.length; i++){
            let editedItem = editedRowItems[i]
            Object.assign(editedItem, {['rowStatus']: 'U'})
            Object.assign(editedItem, {['modId']: user})
            //console.log("editedItem==", editedItem)
            data.push(editedItem)
          }
          //data.update = editedRowItems;
        }
        if (removedRowItems.length > 0) {
          for(let i=0;i<removedRowItems.length; i++){
            let removeItem = removedRowItems[i]
            Object.assign(removeItem, {['rowStatus']: 'D'})
            //console.log("editedItem==", editedItem)
            data.push(removeItem)
          }
          //data.remove = removedRowItems;
        }
        // if (data.add || data.update || data.remove) {
        if (data.length > 0) {
          //alert("저장 로직 작성하세요");
          //console.log("data===", JSON.stringify(data))
          savecodeGrp(data).then(this.aftersavecodeGrp)
        } else {
          alert("추가, 수정, 삭제된 행이 없습니다.");
        }
      },
      aftersavecodeGrp(res){

        const loginRes = res.data
        if (loginRes.code == '200') {
          this.search()
          this.$message.success('저장완료되었습니다.', 3)
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
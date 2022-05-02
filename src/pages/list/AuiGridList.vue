<template>

    <div>
        <AUIGrid ref="myGrid" class="grid-wrap"></AUIGrid>  
    </div>
</template>
<script>

 

// AUIGrid 컴포넌트
import AUIGrid from '@/static/AUIGrid-Vue.js/AUIGrid.vue'

 

export default {

    components : {

        AUIGrid

    },

 

    data: function () {

        return {

            // 그리드 칼럼 레이아웃 정의

            columnLayout : [{

                dataField : "id",

                headerText : "ID",

                width : 120

            }, {

                dataField : "name",

                headerText : "Name",

                width : 140

            }, {

                dataField : "price",

                headerText : "Price",

                dataType : "numeric",

                width : 120

            }, {

                dataField : "quantity",

                headerText : "Quantity",

                dataType : "numeric"

            }, {

                dataField : "date",

                headerText : "Date",

                dataType : "date"

            }],

            // 그리드 속성 정의

            auigridProps : {

                // 편집 가능 여부 (기본값 : false)

                editable : true,

                // 셀 선택모드 (기본값: singleCell)

                selectionMode : "multipleCells"

            },

            // 그리드 데이터

            gridData : [{

                    "id": "#Cust0",

                    "date": "2014/10/01",

                    "name": "Steve",

                    "country": "USA",

                    "flag": "usa.png",

                    "product": "IPad Air",

                    "color": "Green",

                    "quantity": 3,

                    "price": 630700

                }, {

                    "id": "#Cust1",

                    "date": "2014/09/30",

                    "name": "Emma",

                    "country": "Korea",

                    "flag": "korea.png",

                    "product": "LG G3",

                    "color": "Pink",

                    "quantity": 1,

                    "price": 503800

                }, {

                    "id": "#Cust2",

                    "date": "2014/09/29",

                    "name": "Emma",

                    "country": "Japan",

                    "flag": "japan.png",

                    "product": "IPad Air",

                    "color": "Yellow",

                    "quantity": 7,

                    "price": 66900

                }, {

                    "id": "#Cust3",

                    "date": "2014/09/28",

                    "name": "Emma",

                    "country": "UK",

                    "flag": "uk.png",

                    "product": "Galaxy Note3",

                    "color": "Orange",

                    "quantity": 9,

                    "price": 458300

                }, {

                    "id": "#Cust4",

                    "date": "2014/09/27",

                    "name": "Anna",

                    "country": "China",

                    "flag": "china.png",

                    "product": "LG G3",

                    "color": "Violet",

                    "quantity": 10,

                    "price": 168100

                }]

        }

    },

   

    mounted(){

        let grid = this.$refs.myGrid;

        // 그리드 생성
        grid.create(this.columnLayout, this.auigridProps);

        // 그리드 데이터 삽입하기
        grid.setGridData(this.gridData);

    },


    methods : {

    }

}

</script>

 

<style scoped>

    .grid-wrap {

        width:100%;
        height:100%;
    }

</style>
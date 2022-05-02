//이 구성은 시스템의 기본 설정이며, 수정이 필요한 설정 항목은 src/config/config.js에 수정 항목을 추가하면 됩니다. 이 파일에서 직접 수정할 수도 있습니다.
module.exports = {
  lang: 'KR',                           //언어, KR(한국어), CN(간체), HK(번체), US(영어) 선택 가능, 다른 언어도 확장 가능
  theme: {                              //테마
    color: '#1890ff',                   //테마 색상
    mode: 'dark',                       //테마모드 dark、 light or night
    success: '#52c41a',                 //Success 컬러
    warning: '#faad14',                 //warning 컬러
    error: '#f5222f',                   //error 컬러
  },
  layout: 'side',                       //메뉴 레이아웃 side or head，
  fixedHeader: false,                   //Header 고정여부，true，false
  fixedSideBar: true,                   //SideBar 고정여부, true，false
  fixedTabs: false,                      //Tab 고정여부，true , false
  pageWidth: 'fixed',                   //Content Width，fixed，fluid
  weekMode: false,                      //색약모드，true，false
  multiPage: false,                     //멀티페이지모드，true，false
  cachePage: true,                      //페이지 데이터를 캐시할지 여부, 다중 탭 모드에서만 유효, true，true 缓存, false 不缓存
  hideSetting: false,                   //설정모드 숨기기，true , false
  systemName: 'Prosoft Vue Framework',  //시스템명
  copyright: '2021 Prosoft',            //copyright
  asyncRoutes: false,                   //비동기식으로 라우팅 로드，true:열림，false:안열림
  showPageTitle: true,                  //페이지 타이틀 표시여부（PageLayout 레이아웃의 페이지 타이틀），true，false
  filterMenu: true,                     //권한에 따라 메뉴 필터링，true，false
  animate: {                            //애니메이션 설정
    disabled: true,                    //애니메이션 비활성화 모드，true:비활성화，false:활성화
    name: 'fade',                     //애니메이션 효과는 지원되는 애니메이션 효과를 참조바람 ./animate.config.js
    direction: 'left'                   //애니메이션 방향, 페이지 전환 시 애니메이션 방향，./animate.config.js
  },
  footerLinks: [                        //footerLink

  ],
}

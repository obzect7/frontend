---
title: 글로벌 API
lang: ko-KR
---
# 글로벌 API
우리는 일상적인 기능 개발에 도움이 될 수 있는 몇 가지 전역 API를 제공하며, 
모두 페이지 구성 요소 또는 하위 구성 요소 인스턴스에 바인딩됩니다.
컴포넌트에서 `this.$[apiName]`을 통해 직접 호출할 수 있습니다. 다음과 같이:

## 여러 탭
### $closePage(closeRoute, nextRoute)
이 API는 현재 열려 있는 탭을 닫고 두 개의 매개변수를 수신하는 데 사용됩니다.
* **closeRoute**  
닫을 탭에 해당하는 경로 개체로, 경로의 fullPath 문자열 값으로 축약될 수 있습니다.
* **nextRoute**  
탭을 닫은 후 점프할 경로 객체는 생략할 수 있으며, 통과하지 않으면 자동으로 탭이 선택된다(근접 원칙).

### $refreshPage(route)
이 API는 경로에 해당하는 페이지를 새로 고치고 매개변수를 수신하는 데 사용됩니다.
* **route**  
새로 고칠 탭에 해당하는 경로 개체로, 경로의 fullPath 문자열 값으로 축약될 수 있습니다.

### $openPage(route, title)
이 API는 새 탭을 여는 데 사용되며 두 개의 매개변수를 받습니다.
* **route**  
열려는 탭에 해당하는 경로 개체는 경로의 fullPath 문자열 값으로 축약될 수 있습니다.
* **title**  
열린 탭의 제목을 설정하되 통과시키지 마십시오.

### $setPageTitle(route, title)
이 API는 탭의 제목을 설정하는 데 사용되며 두 개의 매개변수를 수신합니다.
* **route**  
설정하고자 하는 탭에 해당하는 라우트 객체는 라우트의 fullPath 문자열 값으로 약칭할 수 있다.
* **title**  
탭의 제목입니다.

## 허가
### $auth(check, type)
이 API는 작업 권한 확인에 사용할 수 있으며 두 개의 매개변수를 수신합니다.
* **check**  
확인해야 하는 작업 권한
* **type**  
오퍼레이션 권한 검증 카테고리는 선택사항인 'permission'과 'role', 즉 권한 검증 또는 역할 검증을 통해 전달될 수 없습니다(전달되지 않으면 두 유형이 일치합니다. 전달).
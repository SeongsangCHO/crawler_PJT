
# :shopping_cart: 다링 - [리팩토링 진행중](https://github.dev/SeongsangCHO/crawler_PJT/tree/refactor/style)



## :grey_question: 다링은..

- 다 있다 링크 의 준말로써 해당 프로젝트의 이름입니다

- 구매하는 상품들의 링크들을 직접 저장하고 이와 관련된 상품들을 크롤링하여 부가정보를 제공합니다
- 재구매 상품 북마크로, 구매상품들을 카테고리화하여 관리, 저장하며 추후 같은 제품을 살 때 다시 검색하는 과정을 줄입니다.




### Tech


| Front                                                        | Back                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![react](https://img.shields.io/badge/react-%5E16.13.1-blue?style=plastic&logo=react)<br />![js](https://img.shields.io/badge/JavaScript-ES6+-black?style=plastic&logo=javascript)<br />![sc](https://img.shields.io/badge/styled--component-%5E5.2.0-%23ff69b4?style=plastic&logo=styled-components)<br />![saga](https://img.shields.io/badge/redux--saga-%5E1.1.3-green?style=plastic&logo=redux-saga) | ![node](https://img.shields.io/badge/node-%5E15.12.-green?style=plastic&logo=node.js)<br />![puppeteer](https://img.shields.io/badge/puppeteer-%5E5.3.1-blue?style=plastic&logo=puppeteer)<br />![express](https://img.shields.io/badge/express-%5E4.17.1-skyblue?style=plastic&logo=express)<br />![jwt](https://img.shields.io/badge/jwt-%5E8.5.1-pink?style=plastic&logo=JSON-Web-Tokens) |

<example screenshot>



### Example

![Demo](https://user-images.githubusercontent.com/55486644/115817951-bc57ec00-a436-11eb-96a6-efad3bc1b718.gif)



- 약 1.5배속
- 영상 속 크롤링 시간 : 총 6.532s
  - naver : 4.741s
  - coupang: 4.794s
  - Ssg: 6.532s



### Sequence

Register, Login

![스크린샷 2021-04-22 오후 3 49 56](https://user-images.githubusercontent.com/55486644/115668775-79d4d780-a382-11eb-9ea3-b387554f5f9c.png)



Insert data, doing crawler

![스크린샷 2021-04-22 오후 3 50 15](https://user-images.githubusercontent.com/55486644/115668766-780b1400-a382-11eb-9412-f5174dd2d352.png)



### Install



```shell
$ git clone https://github.com/SeongsangCHO/crawler_PJT.git
//front server
$ cd front
$ npm i
$ npm start
//back server
$ cd back
$ npm i
$ nodemon app.js
```



### 확인 사항

- dotenv로 db config, secret key 환경변수 설정



### 개발 일지

https://www.notion.so/88a83386702a440d84b622d2bf9f6e20

### 아쉬운점
  
- 폴더구조가 제대로 짜여있지 않아서 확인하기 힘듬
- 리덕스 사가를 제대로 알고 사용하지 않았음 - [전역상태관리에 대한 학습 정리](https://velog.io/@secho/series/%EC%A0%84%EC%97%AD%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC)
- 당시 css 선택자를 제대로 인지하고 있지 못해서 css와 styled-component를 둘 다 사용해서 확인하기 어려움 - 리팩토링
- css를 잘 모르는 상태에서 디자인하기 어려워서 bootstrap ui를 사용했는데 이마저도 제대로 알고 사용하지 못했음 - 리팩토링
- Modal을 Portal로 구현하고 하위 내용을 props로 전달하는 방식으로 재사용했어야했는데 그 부분을 알지 못했음 - 리팩토링
- 컴포넌트의 재사용이 전혀 되어있지 않음 - 리팩토링
- hooks로 상태관련 메소드를 분리했어야 했는데 그러지 못했음 - 리팩토링
- state대신 saga를 사용해 컴포넌트를 파악하기 매우 어려움 - 리팩토링 : 전역상태관리를 적용해놓아서 분리하는데에 있어 수월
- 3항연산자를 사용해 컴포넌트 파악이 어려움, 조건함수를 분리해 출력 text를 state로 관리해야했었음 - 리팩토링
- JWT의 동작을 제대로 이해하지 못하고 사용했음 - [추가학습](https://watermelonlike.tistory.com/159)
  
### 리팩토링 대상 (프로젝트 전체 대상) - 진행중 21.09.06 ~

- [x] 컴포넌트단위로 분리해서 재사용성을 높임
- [x] Modal을 Portal로 구현해 재사용성을 높임
- [x] styled-components로 스타일링 통일화
- [x] theme-provider로 자주 사용하는 스타일 속성 재사용
- [x] bootstarp 사용하지 않고 UI구현
- [진행중] redux, redux-saga 구조 개편
- [x] Authorization Header를 통해 토큰 유효성검사
- [x] 링크카드, 크롤링데이터 API수정
- [x] 크롤결과 카드리스트 스타일링
  
  
  
1인으로 백엔드, 프론트엔드를 맡아서 진행한 첫 웹 프로젝트입니다.
정해진 시간내에 구현하는 프로젝트였고 웹 분야를 깊이 있게 공부하지 못한 상태로 구현했던 상황이어서 아쉬움이 많이 남는 프로젝트입니다.
사용해보지 않은 기술 스택을 사용할 때 이에 대한 이해와 필요성을 생각해서 도입을 결정해야하는 것과 좋은 폴더구조를 설계하는 것
그리고 코드의 반복을 줄일 수 있는 컴포넌트 재사용성의 중요성을 알게되었습니다.

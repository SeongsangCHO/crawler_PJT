- 

# :shopping_cart: 다링



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

![demo](https://user-images.githubusercontent.com/55486644/115733118-8e858f80-a3c3-11eb-8f6e-cdb47f80c479.gif)


- 약 1.5배속
- 영상 속 크롤링 시간 : 총 6.532s
  - naver : 4.741s
  - coupang: 4.794s
  - Sag: 6.532s



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


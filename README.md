# README.md



# 다링

- 구매하는 상품들의 링크들을 직접 저장하고 이와 관련된 상품들을 크롤링하여 부가정보를 제공합니다

- 간단하게 재구매 상품 북마크로,  구매상품들을 카테고리화하여 관리, 저장하며 같은 제품을 살 때 다시 검색하는 과정을 줄입니다.

  

### 기술 스택

mostly javascript

- front : react (Create React App)
- back : node (expressJS)
- db : mysql (workbench)
- cloud service : Google Cloud Service
- Version control : git
- coworktool : notion, slack



# 기능



## 회원가입, 로그인

- 닉네임, 비밀번호를 입력해 회원가입을 진행합니다.

  - 비밀번호는 nodeJS의 bcrypt 패키지를 사용하여 지정한 키값으로 해싱되어 db에 저장됩니다.

    <img src="https://images.velog.io/images/secho/post/47d5a02a-0353-4d81-9998-01325948c914/image.png" style="zoom:33%;" />

- 로그인시 입력된 비밀번호와, 디코딩된 해싱비밀번호를 비교하여 일치하면 jwt 토큰을 발행합니다 (유지시간 30분)



<img src="https://images.velog.io/images/secho/post/d9e2ea26-3483-481f-b6e5-57c09dde975b/image.png" style="zoom:33%;" />



<br>

## 카테고리, 링크 저장

- 구매한 상품들을 관리할 카테고리를 생성합니다.
- <img src="https://images.velog.io/images/secho/post/948f0027-6d39-4966-9573-d9d33baf70dc/image.png" style="zoom:33%;" />

- 구매한 상품의 정보들을 입력합니다. 제목기반으로 크롤링이 수행됩니다.
  - 가격과 링크는 구매했던 곳 기준으로 작성합니다. 추후 가격비교, 재구매할 때 사용할 수 있습니다.
- <img src="/Users/secho/Library/Application Support/typora-user-images/image-20201118131832932.png" alt="image-20201118131832932" style="zoom:33%;" />

- 링크 추가 완료 후 6 ~ 8초 (서버 성능에 따라 좌우됨)정도 후 크롤링작업이 완료되며 ssg, naver, coupang사이트에서 각 제품 1 ~ 3위까지 가격, 이미지, 링크들을 제공합니다.
- <img src="https://images.velog.io/images/secho/post/513ad1cf-31c9-4413-86cb-4f9c39f258b9/image.png" style="zoom:25%;" />

- 카드 하단의 새로고침버튼은 이후 페이지 재방문시 이전데이터를 갱신하기 위해 사용합니다.



- 크롤러데이터 갯수는 임의로 지정가능합니다. 현재는 1페이지, 3개 항목지정

#### 개선사항

- 다양한 검색어로 테스트 필요, 예외상황 처리 필요
- 크롤러 데이터 페이지네이션
- 가격데이터 `,` 추가
- dotenv로 정보관리하기

- nosql?
# 💖달라달라 - 도서 판매 사이트💖

#### ➡️ [https://daladala.store/](https://daladala.store/) ⬅️

<br/>

```
// 관리자 계정
ID: admin1@gmail.com
PW: admin1Admin1!

// 일반 계정
ID: user1@gmail.com
PW: user1User1!
```

## 📅프로젝트 기간📅

2023.10.30(월) - 2023.11.12(일)
<br/><br/>

## ✏️기술 스택 및 도구✏️

### 프론트엔드

![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=ffffff)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=ffffff)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000)

### 백엔드

![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=ffffff)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=ffffff)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=ffffff)
![SWAGGER](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=000000)

### 기획 및 배포

![GITLAB](https://img.shields.io/badge/GitLab-FCA121?style=for-the-badge&logo=gitlab&logoColor=ffffff)
![FIGMA](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=ffffff)
![NOTION](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=ffffff)

<br/>

## 🤸‍♀️프로젝트 팀원🤸

- **김민희 (FE)**

  - 메인페이지
  - 도서 리스트, 도서 상세 페이지

- **김세연 (FE)**

  - 회원정보수정 페이지
  - 도서 목록조회, 도서 등록/수정 페이지

- **송은지 (FE)**

  - 캐러셀 이미지 제작
  - 장바구니, 주문하기, 주문 조회 페이지 (UI)

- **오강산 (BE, FE)**

  - 장바구니, 주문하기, 주문 조회 페이지 (api 연결)
  - 회원가입, 회원탈퇴, 로그인, 비밀번호 변경 페이지
  - 공통 컴포넌트, api 개발

- **박철휘 (BE, FE)**
  - api 개발
  - 카테고리 등록/수정 페이지
    <br/>

## ⚒️기능 구현⚒️

- **공통 컴포넌트**

  - header, sidebar, footer

- **모든 유저**

  - 회원가입, 회원탈퇴, 로그인, 로그아웃
  - 회원정보 수정
  - 카테고리별 도서 리스트, 도서 상세 페이지 조회
  - 장바구니, 주문(수정/취소 가능)
  - 주문/배송 조회

- **관리자**
  - 도서 등록/수정
  - 카테고리 등록/수정
  - 주문/배송 관리

<br/>

## 📌주요 페이지 구성📌

**[ 메인 페이지 ]**

- 회원가입/로그인
- 카테고리별 도서 조회
- 캐러셀
  <br />

![1번](https://github.com/tpdus001129/daladala-bookstore/assets/113432040/b6e910a8-2596-484a-8f2d-689e56ef9fdd)
<br /><br />

**[ 도서 상세 페이지 ]**

- 관리자가 추가한 도서의 이미지, 제목, 책소개 등을 조회
- 장바구니 담기, 바로 구매 가능
  <br />

![11번](https://github.com/team-daladala/daladala-bookstore/assets/113432040/b2f6f5e1-55e5-432e-a430-5726f326dd5d)
<br/><br/>

**[ 장바구니 페이지 ]**

- 장바구니에 넣은 도서 선택 구매 가능
- 수량 변경 후 구매 가능
  <br />

![2번](https://github.com/tpdus001129/daladala-bookstore/assets/113432040/7c921ef0-88da-4b5b-acdd-d4b94de35f86)
<br/><br/>

**[ 주문 페이지 ]**

- 배송 정보 입력 후 구매 가능
- 배송 시작 전까지 주문 수정/삭제 가능
  <br />

![3번](https://github.com/team-daladala/daladala-bookstore/assets/113432040/6fd57d35-50a9-430f-98ad-1b9b9b134a11)
<br/><br/>

**[ 마이 페이지 ]**

- 회원 정보 수정 가능
- **DAUM 주소 api** 사용
  <br />

![5번](https://github.com/tpdus001129/daladala-bookstore/assets/113432040/8c0d5794-2890-4950-ba72-250f7ed848d5)
<br/><br/>

**[ 일반 & 관리자 계정 ]**

- 스키마 필드 중 authority가 **관리자**인 계정은 추가 메뉴가 보인다.
- 도서 등록/수정 & 카테고리 등록/수정 & 주문/배송 관리 가능
  <br />

![6번](https://github.com/tpdus001129/daladala-bookstore/assets/113432040/3a973aa6-59a6-4feb-be50-e3b29e326b84)
<br/><br/>

**[ 도서 등록/수정 페이지 ]**

- 카테고리, 이미지, 제목, 책소개 등 도서 등록/수정 가능
  <br />

![7번](https://github.com/tpdus001129/daladala-bookstore/assets/113432040/2216a603-4db1-42e8-9a0e-07a805b28502)
<br/><br/>

**[ 주문/배송 관리 페이지 ]**

- 주문/배송 조회 가능
- 주문 번호 클릭 시, 주문 상세 조회 가능
- 관리자는 주문 상태 변경 가능
  <br />

![9번](https://github.com/tpdus001129/daladala-bookstore/assets/113432040/844e2d1b-53cc-46c0-b8f4-471148f769d2)
<br/><br/><br/>

## ❓사용법❓

### 로컬에서 사용하기

1. 리포지토리 클론

```bash
git clone https://kdt-gitlab.elice.io/sw_track/class_07/web_project/team06/daladala.git
```

2. 패키지 설치

```bash
npm i
```

3. 환경변수 설정

- 생성된 .env파일에 배포할 포트 번호와 Mongo DB URL을 입력

```bash
cp .env.sample .env
```

4. 실행

```bash
npm run dev
```

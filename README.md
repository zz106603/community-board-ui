# 게시판(Community)

이 프로젝트는 게시판 기능을 중심으로 한 웹 애플리케이션입니다. 초기 설정 시 "Blog"라는 이름을 사용했지만, 실제 구현 목적은 사용자 간의 게시글 작성, 수정, 삭제, 조회를 지원하는 게시판 기능에 중점을 두고 있습니다.

---

- CRUD 기능이 포함된 게시판 화면 개발 프로젝트
- 날짜별로 개발 현황 추가 예정

### 2024-05-20
- 게시글 리스트 화면 및 기능 구현/연동(ID, 제목, 작성자, 작성일)
- 게시글 상세보기 화면 및 기능 구현/연동(뒤로가기, 수정)
- 게시글 수정하기 화면 및 기능 구현/연동(취소, 완료, 삭제)
- 게시글 삭제 기능 구현/연동

### 2024-05-21
- 게시글 목록 페이징 적용(이전, 다음, 현재 페이지)

### 2024-05-22
- 로그인 페이지 화면(로그인, 회원가입)
- 회원가입 페이지 화면 및 기능 구현(아이디, 비밀번호, 이메일, 이름, 성별, 생년월일, 핸드폰 번호)

### 2024-05-23
- Spring Security 로그인 응답 및 화면 리디렉션
- (Jwt Token 인증 추가 예정)
- (로그인 상태에 따라 화면 렌더링 및 권한 추가 예정)

### 2024-05-28
- 로그인/로그아웃 Jwt 토큰 구현
- AccessToken, RefreshToken 응답 처리 및 localStorage 저장/활용

### 2024-05-29
- 조회/추천수 UI 추가
- 조회/추천수 관련 API 연동(사용자 정보 기준 추천 버튼 활성/비활성)

### 2024-05-30
- 조회 API 파라미터 추가(추천 및 조회수 이슈 해결)
- 최신순/오래된순/조회순/추천순 정렬 추가 및 연동
- 검색 UI 추가
- 추천 유무에 따른 Up/Down UI 추가

### 2024-05-31
- 게시글 댓글 UI 적용 및 CSS 테스트

### 2024-07-01
- 댓글 조회/등록/삭제 화면 연동
- 댓글 스크롤 영역 적용
- 사용자 기준 삭제 버튼 활성화

### 2024-07-24
- 텍스트 에디터 추가(ReactQuill)
- 입력창, 콘텐트 영역 수정

### 2024-09-26
- OAuth 2.0 연동

### 2024-11-04
- 생성형 AI 기능 추가
- 게시글 생성, 수정 시 문법 검사 기능 추가
- 게시글 생성, 수정 UI 수정

---

### 게시판
※ 게시글 목록

![스크린샷 2024-05-30 164543](https://github.com/zz106603/blog_react/assets/45379781/7a901634-321e-4a09-a8c8-20da2901de8c)

※  게시글 등록

![스크린샷 2024-11-04 172205](https://github.com/user-attachments/assets/0851cd2a-53b5-4c95-8cfb-a518293d1b0b)

※  게시글 상세보기

![스크린샷 2024-07-24 111701](https://github.com/user-attachments/assets/b96859ed-4d76-431b-9538-eb932ab30bc9)

※  게시글 추천

![스크린샷 2024-05-30 163127](https://github.com/zz106603/blog_react/assets/45379781/8c2b713c-9692-4b66-9248-82bc8f475828)
![스크린샷 2024-05-30 163133](https://github.com/zz106603/blog_react/assets/45379781/66be39d1-89a1-426a-bef3-78bf07d7b3ea)

※  게시글 수정

![스크린샷 2024-11-04 172205](https://github.com/user-attachments/assets/0851cd2a-53b5-4c95-8cfb-a518293d1b0b)

※  게시글 삭제

![스크린샷 2024-07-24 112714](https://github.com/user-attachments/assets/12f24521-3a8b-482c-9b79-137cd6e9f421)

※  게시글 댓글

![스크린샷 2024-07-01 170233](https://github.com/zz106603/blog_springboot/assets/45379781/4fb94cc7-2420-4c3b-afb8-5543485b2708)

※  게시글 페이징

![스크린샷 2024-05-21 164515](https://github.com/zz106603/blog_springboot/assets/45379781/55d32ae7-58ba-40f9-8797-13c82cc6353b)

※ 조회/추천 및 로그인/로그아웃 화면 갱신

![스크린샷 2024-05-29 190250](https://github.com/zz106603/blog_react/assets/45379781/11c3132d-d861-473f-8875-20cb0f4927b2)


### 사용자
※ 로그인 페이지

![스크린샷 2024-10-28 222315](https://github.com/user-attachments/assets/ae68f5f2-529b-4704-a06a-a9e2b26ae389)

※ 회원가입 페이지

![스크린샷 2024-10-28 222133](https://github.com/user-attachments/assets/c9c54784-e505-45c9-b04b-ecd454768cda)
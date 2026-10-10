# iconcert8's log

https://iconcert8.github.io

백엔드 개발자 iconcert8의 개인 페이지입니다. 저를 소개하고, 그동안 어떤 문제를 만나서 어떻게 풀었는지 정리해 둡니다.

## 페이지

| 메뉴 | 경로 | 내용 |
|---|---|---|
| About | `/about/about.html` | 소개, 경력, 스택 |
| Work | `/work/work.html` | 문제를 풀었던 일(상세 글), 해온 일 목록 |

메인(`index.html`)의 어항은 클릭하면 먹이를 주는 작은 게임입니다.

## 구조

```
index.html              메인
about/                  소개 페이지
work/
  work.html             Work 목록 (문제를 풀었던 일 + 해온 일)
  work-template.js      상세 글 공통 레이아웃 (head, 상단 nav, 제목·기간)
  *.html                상세 글
js/
  custom-nav.js         상단 뒤로가기 nav. /work/ 아래에선 스크롤하면 제목이 nav에 나타남
  interval-text.js      메인 메뉴 클릭 시 글자 타이핑 효과 후 이동
  fish-game.js          메인 어항
css/global.css          공통 스타일
```

빌드 도구 없이 정적 HTML만 씁니다. Bootstrap, Bootstrap Icons는 CDN으로 불러옵니다.

## 글 추가하기

1. `work/` 아래에 html 파일을 하나 만듭니다. 본문만 쓰면 레이아웃은 `work-template.js`가 씌워 줍니다.

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="UTF-8" />
       <script src="/work/work-template.js" type="text/javascript"></script>
       <meta id="contentInfo" title="🔁제목" date="2026.08 ~ 2026.09" />
       <title>제목</title>
     </head>
     <body>
       <h2>문제</h2>
       <p>...</p>
       <h2>원인</h2>
       <h2>작업</h2>
       <h2>결과</h2>
     </body>
   </html>
   ```

2. `work/work.html`의 "문제를 풀었던 일"에 링크를 추가합니다. 최근 것, 임팩트 큰 것을 위로 둡니다.

## 쓸 때 지키는 것

- 회사 내부 정보는 쓰지 않습니다. 고객사 이름, 내부 서비스·저장소 이름, 티켓 번호, 비용 금액, 트래픽 절대 수치, 동료 이름은 빼고 비율이나 일반적인 표현으로 씁니다.
- 개발 서버에서 잰 값은 개발 서버 값이라고 적습니다.
- 진행 중이거나 조치하지 않은 건 끝난 것처럼 쓰지 않습니다.

## 로컬에서 보기

절대 경로(`/work/...`)를 쓰기 때문에 파일을 직접 열면 깨집니다. 저장소 루트에서 서버를 띄워서 봅니다.

```bash
python3 -m http.server 8000
# http://localhost:8000
```

`main` 브랜치에 push하면 GitHub Pages로 바로 배포됩니다.

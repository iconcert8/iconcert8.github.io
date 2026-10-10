window.onload = ()=>{
  const contentTitle = document.getElementById("contentInfo").getAttribute("title");
  const contentDate = document.getElementById("contentInfo").getAttribute("date");

  head();
  body(contentTitle, contentDate);
}

function head(){
  const head = document.getElementsByTagName("head")[0];
  head.innerHTML = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <link rel="stylesheet" href="/css/global.css">
  ` 
  + head.innerHTML;

  // js는 createElement를 사용해야 로딩함.
  const customNavJS = document.createElement('script');
  customNavJS.src = "/js/custom-nav.js";
  customNavJS.type = "text/javascript";
  customNavJS.defer = true;
  head.appendChild(customNavJS);
}

// 결과는 회색 박스, 회고성 섹션은 왼쪽 강조선으로 구분
const RESULT_SECTIONS = ["결과"];
const NOTE_SECTIONS = ["하나 더", "남은 것", "돌아보면"];

function body(contentTitle, contentDate){
  const body = document.getElementsByTagName("body")[0];

  // 본문을 h2 단위 섹션으로 묶음
  const source = document.createElement("div");
  source.innerHTML = body.innerHTML;
  const article = document.createElement("div");
  let section = null;
  Array.from(source.childNodes).forEach(node=>{
    if(node.nodeName == "H2"){
      section = document.createElement("section");
      section.className = "post-section";
      const name = node.textContent.trim();
      if(RESULT_SECTIONS.includes(name)) section.classList.add("result");
      if(NOTE_SECTIONS.includes(name)) section.classList.add("note");
      article.appendChild(section);
    }
    (section || article).appendChild(node);
  });

  // 제목 앞 이모지를 분리
  const match = contentTitle.match(/^(\p{Extended_Pictographic}\uFE0F?)(.*)$/u);
  const emoji = match ? match[1] : "";
  const title = match ? match[2] : contentTitle;

  body.innerHTML = `
    <style>
      .post{
        max-width: 680px;
        margin: 0 auto;
        padding: 24px 16px 0;
      }
      .post-head{
        text-align: center;
        margin-bottom: 36px;
      }
      .post-head .post-emoji{
        display: block;
        font-size: 44px;
        margin-bottom: 8px;
      }
      .post-head h1{
        font-size: 1.7rem;
        font-weight: bold;
        word-break: keep-all;
      }
      .post-meta{
        font-size: small;
        color: gray;
      }
      .post-date{
        display: inline-block;
        margin-left: 6px;
        padding: 2px 10px;
        border: 1px solid #EEEEEE;
        border-radius: 999px;
        font-size: x-small;
      }
      .post-section{
        margin-bottom: 32px;
        line-height: 1.75;
        color: #333333;
      }
      .post-section h2{
        font-size: 1.2rem;
        font-weight: bold;
        color: black;
        padding-left: 10px;
        border-left: 4px solid #44C3BC;
        margin-bottom: 12px;
      }
      .post-section ul{
        padding-left: 20px;
      }
      .post-section li{
        margin-bottom: 4px;
      }
      .post-section code{
        color: #D63384;
        background-color: #F7F7F8;
        padding: 1px 5px;
        border-radius: 6px;
      }
      .post-section.result{
        background-color: #F7F7F8;
        border-radius: 16px;
        padding: 20px;
      }
      .post-section.result h2{
        border-left: none;
        padding-left: 0;
      }
      .post-section.note{
        padding: 4px 0 4px 16px;
        border-left: 2px solid #EEEEEE;
      }
      .post-section.note h2{
        border-left: none;
        padding-left: 0;
        font-size: 1.05rem;
      }
      .post-back{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        margin-top: 48px;
        border: 1px solid #EEEEEE;
        border-radius: 14px;
        color: black;
        text-decoration: none;
        transition: background-color .2s, transform .2s;
      }
      .post-back:hover{
        color: black;
        background-color: #F6F6F6;
        transform: translateY(-2px);
      }
    </style>
    <custom-nav href="/work/work.html"></custom-nav>
    <div class="post-head mx-4 mt-4"><h1><span class="post-emoji">${emoji}</span>${title}</h1>
      <div class="post-meta">iconcert8's log<span class="post-date">${contentDate}</span></div>
    </div>
    <div class="post">
      ${article.innerHTML}
      <a class="post-back" href="/work/work.html">
        <span><i class="bi bi-arrow-left"></i> 다른 일 보기</span>
        <span class="fs-7 text-secondary">Work 목록</span>
      </a>
    </div>
  `;

  // js는 createElement를 사용해야 로딩함.
  const bootstrapJS = document.createElement("script");
  bootstrapJS.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js";
  bootstrapJS.integrity = "sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN";
  bootstrapJS.crossOrigin = "anonymous";
  body.appendChild(bootstrapJS);
}

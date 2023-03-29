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

function body(contentTitle, contentDate){
  const body = document.getElementsByTagName("body")[0];
  const content = body.innerHTML;
  body.innerHTML = `
    <custom-nav href="/study/study.html"></custom-nav>
    <div class="mx-4 mt-4 text-center"><h1>${contentTitle}</h1></div>
    <p class="text-center mb-0" style="font-size: small;">iconcert8's log</p>
    <p class="text-center text-secondary" style="font-size: x-small;">${contentDate}</p>
    <div class="m-4 d-flex justify-content-center">
      <div class="d-inline-block limit-width">
        ${content}
      </div>
    </div>
  `;

  // js는 createElement를 사용해야 로딩함.
  const bootstrapJS = document.createElement("script");
  bootstrapJS.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js";
  bootstrapJS.integrity = "sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN";
  bootstrapJS.crossOrigin = "anonymous";
  body.appendChild(bootstrapJS);
}


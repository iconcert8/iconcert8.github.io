// function registerMouseHoverWriteIntevalText(element, initialHTML, prefix, sufix, text){
//   let intervalId = 0;
//   element.onmouseenter = ()=>{
//     if(intervalId != 0){
//       return;
//     }
//     intervalId = writeIntervalText(element, prefix, sufix, text);
//   }

//   element.onmouseleave = ()=>{
//     if(intervalId != 0){
//       clearInterval(intervalId);
//       intervalId = 0;
//     }
//     element.innerHTML = initialHTML;
//   }
// }

function registerMouseClickWriteIntevalText(element, prefix, sufix, text, href){
  let intervalId = 0;

  element.onclick = ()=>{
    if(intervalId != 0){
      return;
    }
    element.style.backgroundColor = '#D8D8D8';
    intervalId = writeIntervalText(element, prefix, sufix, text, href);
  }
}

function writeIntervalText(element, prefix, sufix, text, href){
  const words = text.split('');
  let i = 0;
  let str = "";
  let intervalId = setInterval(()=>{
    if(i >= words.length){
      clearInterval(intervalId);
      window.location.href = href;
      return;
    }
    str += words[i++];
    element.innerHTML = prefix + str + sufix;
  }, 140);

  return intervalId;
}
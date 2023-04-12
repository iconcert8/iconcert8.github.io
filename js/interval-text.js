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

let registerMouseClickWriteIntevalText = (element, prefix, sufix, text, href)=>{
  let intervalId = 0;

  element.onclick = ()=>{
    if(intervalId != 0){
      return;
    }
    writeIntervalText(element, prefix, sufix, text, href);
  }

  let writeIntervalText = (element, prefix, sufix, text, href)=>{
    const initialHTML = element.innerHTML;
    const initialStyle = element.style;
    element.style.backgroundColor = '#D8D8D8';
    const words = text.split('');
    let i = 0;
    let str = "";
    intervalId = setInterval(()=>{
      if(i >= words.length){
        clearInterval(intervalId);
        i = 0;
        element.innerHTML = initialHTML;
        element.style = initialStyle;
        str = "";
        intervalId = 0;
        window.location.href = href;
        return;
      }
      str += words[i++];
      element.innerHTML = prefix + str + sufix;
    }, 140);
  }
}
function registerMouseHoverEvent(element, initialHTML, prefix, sufix, text){
  let intervalId = 0;
  element.onmouseenter = ()=>{
    if(intervalId != 0){
      return;
    }
    intervalId = writeIntervalText(element, prefix, sufix, text);
  }

  element.onmouseleave = ()=>{
    if(intervalId != 0){
      clearInterval(intervalId);
      intervalId = 0;
    }
    element.innerHTML = initialHTML;
  }
}

function writeIntervalText(element, prefix, sufix, text){
  const words = text.split('');
  let i = 0;
  let str = "";
  return setInterval(()=>{
    if(i >= words.length) return;
    str += words[i++];
    element.innerHTML = prefix + str + sufix;
  }, 170);
}
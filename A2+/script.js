let text = prompt("Введите текст");

function fix (str) {
  
  let start = 0;
  let end = str.length;

  for (let i=0; i<str.length; i++) {
    if (str[i] === " ") {
      start++;
    } else {
      break
    }
  }

  for (let i = str.length - 1; i>=0; i--) {
    if (str[i] === " ") {
      end--;
    } else {
      break
    }
  }

  str = str.slice(start,end);
   
  return str;
} 

let textNew = fix (text);
alert ("*" + textNew + "*");
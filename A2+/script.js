let text = prompt("Введите текст");

function fix (str) {
  while (str[0] === " ") {
    str = str.substring (1);
   }
   
   while (str[str.length - 1] === " ") {
    str = str.substring (0, str.length - 1);
   }
   
   return str;
} 

let textNew = fix (text);
alert ("*" + textNew + "*");
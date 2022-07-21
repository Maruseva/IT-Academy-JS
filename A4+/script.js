let text = prompt ("Введите текст");

function pali (str) {
	
    const symb = {".": true, ",": true, ";": true, ":": true, "!": true, "?": true, "-": true, "(": true, ")": true, '"': true, ' ': true, 'ъ': true, 'ь': true};
	
    str = str.toLowerCase();
    str = str.replaceAll("ё","е");
    
    for (let value of str) {
        if (value in symb) {
            str = str.replaceAll(value,"");
        }
    }
    
    let check = str => {
        if (str[0] !== str[str.length - 1])  {
            return false;
        } else if ((str[0] === str[str.length - 1]) && (str.length <= 3)) {
            return true;
        } else {
            return check(str.slice(1,-1));
        }
    }
    
    let result = check(str);

    return result;  
}

if (pali(text) === true) {
    alert ("это палиндром");
} else {
    alert ("это не палиндром")
}


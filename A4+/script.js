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

    let check = i => {
        if (str[i] !== str[str.length - 1 - i])  {
            return false;
        } else if ((str[i] === str[str.length - 1 - i]) && (i >= ((str.length - 2) / 2))) {
            return true;
        } else {
            return check(++i);
        }
    }
    
    let result = check(0);

    return result;  
}

if (pali(text) === true) {
    alert ("это палиндром");
} else {
    alert ("это не палиндром")
}


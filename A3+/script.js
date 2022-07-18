let text = prompt ("Введите текст");

function pali (str) {
	
    let strNew = str;
    const symb = {".": true, ",": true, ";": true, ":": true, "!": true, "?": true, "-": true, "(": true, ")": true, '"': true, ' ': true, 'ъ': true, 'ь': true};
	
    str = str.toLowerCase();
    str = str.replaceAll("ё","е");
    
    for (let i=0; i<str.length; i++) {
        if (str[i] in symb) {
            strNew = strNew.replaceAll(str[i],"");
        }
    }
    
    for (let i = 0; i < ((strNew.length - 1) / 2); i++) {
    	if (strNew[i] !== strNew[strNew.length - 1 - i]) {
            return false;
    	}
    }
    return true;
}

if (pali(text) === true) {
    alert ("это палиндром");
} else {
    alert ("это не палиндром")
}


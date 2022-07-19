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

    console.log (str)
    
    for (let i = 0; i < ((str.length - 1) / 2); i++) {
    	if (str[i] !== str[str.length - 1 - i]) {
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


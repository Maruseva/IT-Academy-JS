let text = prompt ("Введите текст");

function pali (str) {
	
    let strPali = "";

    const symb = {".": true, ",": true, ";": true, ":": true, "!": true, "?": true, "-": true, "(": true, ")": true, '"': true, ' ': true, 'ъ': true, 'ь': true};
	
    str = str.toLowerCase();
    str = str.replaceAll("ё","е");
    
    for (let i=0; i<str.length; i++) {
        if (str[i] in symb) {
            str = str.replaceAll(str[i],"");
        }
    }
    
    for (let i = (str.length - 1); i >= 0; i--) {
        strPali += str[i];
    }
    
    if (str === strPali) {
        return "это палиндром";
    } else {
        return "это не палиндром"
    }
}

alert(pali(text))
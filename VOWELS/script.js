let text = prompt ("Введите текст");

function getCount (str) {

	let count = 0;

	const letter = {"а": true, "у": true, "о": true, "ы": true, "э": true, "я": true, "ю": true, "ё": true, "и": true, "е": true};
  
    str = str.toLowerCase();
  
    for (let i = 0; i < str.length; i++) {
       
        if (str[i] in letter) {
    	    count++
        } 
    }

    return count;
}

console.log(getCount(text))

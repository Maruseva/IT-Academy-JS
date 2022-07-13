let text = prompt ("Введите текст");

function getCount (str) {

	let count = 0;

	const letter = ["а", "у", "о", "ы", "э", "я", "ю", "ё", "и", "е", "А", "У", "О", "Ы", "Э", "Я", "Ю", "Ё", "И", "Е"];
  
    for (let i = 0; i < str.length; i++) {
        for (let j = 0; j < letter.length; j++) {
            if (letter[j] === str[i]) {
    	        count++
            } else {
    	        continue;
            }
        }
    }

    console.log (count);
    return count;
}

getCount(text)

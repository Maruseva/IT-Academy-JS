let text = prompt ("Введите текст");

function getCountForEach (str) {

    str = str.toLowerCase();
    str = str.split("");

    let count = 0;
    const letter = {"а": true, "у": true, "о": true, "ы": true, "э": true, "я": true, "ю": true, "ё": true, "и": true, "е": true};

    str.forEach(v => {
        if (v in letter) {
            count++
        }
    });

    return count;
}

console.log(getCountForEach(text));

function getCountFilter (str) {

    str = str.toLowerCase();
    str = str.split("");

    const letter = {"а": true, "у": true, "о": true, "ы": true, "э": true, "я": true, "ю": true, "ё": true, "и": true, "е": true};

    return str.filter(v => (v in letter)).length;
}

console.log(getCountFilter(text));

function getCountReduce (str) {

    str = str.toLowerCase();
    str = str.split("");

    const letter = {"а": true, "у": true, "о": true, "ы": true, "э": true, "я": true, "ю": true, "ё": true, "и": true, "е": true};
    
    function fra (count, v) {
        if (v in letter) {
            count++;
        }
        return count;
    }

    return str.reduce(fra, 0); 
}

console.log(getCountReduce(text));


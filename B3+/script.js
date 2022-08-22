function calc (str) {

    let arr;
    let arrSolution = [];

    if(typeof str === 'string') {

        arr = str.split("");

    } else {

        arr = str;
    };

    if(arr.indexOf("(") !== -1) {

        let parentheses = arr.slice(arr.indexOf("(") + 1, arr.indexOf(")")); 
        let parenthesesSolution = calc(parentheses);

        arr.splice(arr.indexOf("("), (arr.indexOf(")") - arr.indexOf("(") + 1), parenthesesSolution[0]);
        calc(arr);
    };

    for (let i = 0; i < arr.length; i++) {

        if ((i > 0) && (arr[i] !== "-" && arr[i] !== "+" && arr[i] !== "*" && arr[i] !== "/") 
        && (arrSolution[arrSolution.length-1] !== "-" && arrSolution[arrSolution.length-1] !== "+" && arrSolution[arrSolution.length-1] !== "*" && arrSolution[arrSolution.length-1] !== "/")) {

            arrSolution[arrSolution.length-1] += arr[i];

        } else {

            arrSolution[arrSolution.length] = arr[i];
        };
    };

    if (arrSolution[0] === "-") {

        arrSolution[1] = arrSolution[0] + arrSolution[1];
        arrSolution.shift();
    };

    if (arrSolution.includes("*") || arrSolution.includes("/")) {

        for (let i = 0; i < arrSolution.length; i++) {

            if (arrSolution[i] === "*") {
    
                let result = arrSolution[i-1] * arrSolution[i+1];
    
                arrSolution.splice(i-1, 3, result)
            };
    
            if (arrSolution[i] === "/") {
    
                let result = arrSolution[i-1] / arrSolution[i+1];
    
                arrSolution.splice(i-1, 3, result)
            };
        };  
    };

    if (arrSolution.includes("-") || arrSolution.includes("+")) {

        for (let i = 0; i < arrSolution.length; i++) {

            if (arrSolution[i] === "-") {
    
                let result = arrSolution[i-1] - arrSolution[i+1];
    
                arrSolution.splice(i-1, 3, result)
            };
    
            if (arrSolution[i] === "+") {
    
                let result = Number(arrSolution[i-1]) + Number(arrSolution[i+1]);
    
                arrSolution.splice(i-1, 3, result)
            };
        };
    };

    return arrSolution;
};
console.log(calc("2*(-3+1)")) 

function calc (str) {

    let arr;
    let arrSolution = [];
   
    if(typeof str === 'string') {

        arr = str.split("");

    } else {

        arr = str;
    };

    if(arr.indexOf("(") !== -1) {

        const parentheses = arr.slice(arr.indexOf("(") + 1, arr.indexOf(")")); 
        const parenthesesSolution = calc(parentheses);

        arr.splice(arr.indexOf("("), (arr.indexOf(")") - arr.indexOf("(") + 1), parenthesesSolution);
        calc(arr);
    };

    for (let i = 0; i < arr.length; i++) {

        if (((arr[i] !== "-" && arr[i] !== "+" && arr[i] !== "*" && arr[i] !== "/") && (arrSolution[arrSolution.length-1] === "-") &&
        (arrSolution[arrSolution.length-2] === "-" || arrSolution[arrSolution.length-2] === "+" || arrSolution[arrSolution.length-2] === "*" || arrSolution[arrSolution.length-2] === "/" || arrSolution[arrSolution.length-2] === undefined)) ||
        ((i > 0) && (arr[i] !== "-" && arr[i] !== "+" && arr[i] !== "*" && arr[i] !== "/") 
        && (arrSolution[arrSolution.length-1] !== "-" && arrSolution[arrSolution.length-1] !== "+" && arrSolution[arrSolution.length-1] !== "*" && arrSolution[arrSolution.length-1] !== "/"))) {

            arrSolution[arrSolution.length-1] += arr[i];

        } else {

            arrSolution[arrSolution.length] = arr[i];
        };
    };

    if (arrSolution.includes("*") || arrSolution.includes("/")) {

        for (let i = 0; i < arrSolution.length; i++) {

            if (arrSolution[i] === "*") {
    
                const result = arrSolution[i-1] * arrSolution[i+1];
    
                arrSolution.splice(i-1, 3, result)
            };
    
            if (arrSolution[i] === "/") {
    
                const result = arrSolution[i-1] / arrSolution[i+1];
    
                arrSolution.splice(i-1, 3, result)
            };
        };  
    };

    if (arrSolution.includes("-") || arrSolution.includes("+")) {

        for (let i = 0; i < arrSolution.length; i++) {

            if (arrSolution[i] === "-") {
    
                const result = arrSolution[i-1] - arrSolution[i+1];
    
                arrSolution.splice(i-1, 3, result)
            };
    
            if (arrSolution[i] === "+") {
    
                const result = Number(arrSolution[i-1]) + Number(arrSolution[i+1]);
    
                arrSolution.splice(i-1, 3, result)
            };
        };
    };

    return arrSolution[0];
};
console.log(calc("2*(-3.5+1)")) 

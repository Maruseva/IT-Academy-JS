function calc (str) {

    let arr;
    let arrSolution = [];
    let operations = {"-": true, "+": true, "*": true, "/": true};
    
    if(typeof str === 'string') {

        arr = str.split("");

    } else {

        arr = str;
    }

    if(arr.indexOf("(") !== -1) {

        const parentheses = arr.slice(arr.indexOf("(") + 1, arr.indexOf(")")); 
        const parenthesesSolution = calc(parentheses);

        arr.splice(arr.indexOf("("), (arr.indexOf(")") - arr.indexOf("(") + 1), parenthesesSolution);
        calc(arr);
    }

    for (let i = 0; i < arr.length; i++) {

        if ((i > 0) && !(arr[i] in operations) && !(arrSolution[arrSolution.length-1] in operations)) {

            arrSolution[arrSolution.length-1] += arr[i];

        } else {
            
            arrSolution[arrSolution.length] = arr[i];
        }
    }

    for (let i = 0; i < arrSolution.length; i++) {

        if (arrSolution[i] === "-" && (arrSolution[i-1] in operations || arrSolution[i-1] === undefined)) {

            arrSolution.splice(i, 2, arrSolution[i+1] * (-1));
        }
    }

    return count(arrSolution);

    function count (a) {

        if (arrSolution.length > 1) {

            if (a.includes("*") || a.includes("/")) {

                for (let i = 0; i < a.length; i++) {
        
                    if (a[i] === "*") {
            
                        const result = a[i-1] * a[i+1];
            
                        a.splice(i-1, 3, result);
    
                        return count (a);
                    }
            
                    if (a[i] === "/") {
            
                        const result = a[i-1] / a[i+1];
            
                        a.splice(i-1, 3, result);
                        
                        return count (a);
                    }
                }; 
            }
        
            if (a.includes("-") || a.includes("+")) {
        
                for (let i = 0; i < a.length; i++) {
        
                    if (a[i] === "-") {
            
                        const result = a[i-1] - a[i+1];
            
                        a.splice(i-1, 3, result);
                        
                        return count (a);
                    }
            
                    if (a[i] === "+") {
            
                        const result = Number(a[i-1]) + Number(a[i+1]);
            
                        a.splice(i-1, 3, result);
                        
                        return count (a);
                    }
                }
            }
    
        } else {
    
            return arrSolution[0];
        } 
    }
}

var a1=[Number.NaN, 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN];
var h1={ a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };

function deepCopy (a) {

    let aCopy;

    if (typeof a === "object") {

        if (a === null) {

            aCopy = null;

        } else if (Array.isArray(a) === true) {

            aCopy =[];
            
            for (let i = 0; i < a.length; i++) {

                if (typeof a[i] === "object") {

                    aCopy[i] = deepCopy (a[i]);

                } else {

                    aCopy[i] = a[i];
                }
            }

        } else {

            aCopy = {};

            for (let key in a) {

                if (typeof a[key] === "object") {

                    aCopy[key] = deepCopy (a[key]);

                } else {

                    aCopy[key] = a[key];
                }
            }
        }
   
    } else {

        aCopy = a;
    }

    return aCopy;
}

console.log(deepCopy(a1));
console.log(deepCopy(h1));
function deepComp (a, b) {
    
    if (a === b) {

        return true;

    } else if (a === null || b === null) {

        return false;
        
    } else if (Number.isNaN(a) === true && Number.isNaN(b) === true) {

        return true;

    } else if (Array.isArray(a) !== Array.isArray(b)) {

        return false;

    } else if ((Array.isArray(a) === true) && (Array.isArray(b) === true) && (a.length === b.length)) {

        for (let i = 0; i<a.length; i++) {

            if  (typeof a[i] === "object" && typeof b[i] === "object") {

                let c = deepComp(a[i], b[i]);

                if (c === false) {

                    return false;
                };

            } else if (a[i] !== b[i]) {

                return false;
            }; 
        };

        return true;

    } else if (typeof a === "object" && typeof b === "object" && Object.keys(a).length === Object.keys(b).length) {

        for (let key in a) {

            if (((key in b) && typeof a[key] === "object" && typeof b[key] === "object") || ((key in b) && Number.isNaN(a[key]) === true)) {

                let c = deepComp(a[key], b[key]);

                if (c === false) {

                    return false;  
                };

            } else if (!(key in b) || (a[key] !== b[key])) {

                return false;
            }; 
        };

        return true;

    } else {

        return false;
    };
};
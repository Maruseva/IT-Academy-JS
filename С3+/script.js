function deepComp (a, b) {

    if (Number.isNaN(a) === true && Number.isNaN(b) === true) {

        return true;
    };

    if (typeof a === "object" && typeof b === "object" && a !== null & b !== null) {

        if (Array.isArray(a) !== Array.isArray(b)) {

            return false;
        };

        if (Array.isArray(a) === true) {

            if (a.length !== b.length) {

                return false;

            } else {

                for (let i = 0; i<a.length; i++) {

                    if  (a[i] !== b[i]) {
        
                        let c = deepComp(a[i], b[i]);
        
                        if (c === false) {
        
                            return false;
                        };
                    }; 
                };

                return true;
            };
        };

        if (Object.keys(a).length !== Object.keys(b).length) {

            return false;

        } else {

            for (let key in a) {

                if (!(key in b)) {

                    return false;

                } else if (a[key] !== b[key]) {

                    let c = deepComp(a[key], b[key]);
    
                    if (c === false) {
    
                        return false;  
                    };
                }; 
            };
        };

    } else if (a !== b) {

        return false;
    };
        
    return true;
};
const mas = [ 5, 7, 
    [ 4, [2], 8, [1,3], 2 ], 
    [ 9, [] ], 
    1, 8
];

function treeSum (m) {

    let sum = 0;

    for (let i = 0; i < m.length; i++) {
        if (typeof m[i] === 'number') {
        sum += m[i];
        } else {
        sum = sum + treeSum(m[i]);
        }
    }

    return sum;
}

console.log(treeSum (mas));
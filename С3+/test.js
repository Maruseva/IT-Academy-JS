describe ("deepComp", function() {

    var H1={ a:5, b: { b1:6, b2:7 } };
    var H2={ b: { b1:6, b2:7 }, a:5 };
    var H3={ a:5, b: { b1:6 } };
    var H4={ a:5, b: { b1:66, b2:7 } };
    var H5={ a:5, b: { b1:6, b2:7, b3:8 } };
    var H6={ a:null, b:undefined, c:Number.NaN };
    var H7={ c:Number.NaN, b:undefined, a:null };
    var H8={a:5,b:6};
    var H9={c:5,d:6};
    var H10={a:5};
    var A1=[5,7];
    var A2=[5,5,7];
    var A3=[5,8,7];

    it ("сравнивает H1 и H2", function() {
        assert.strictEqual(deepComp(H1, H2), true);
    });

    it ("сравнивает H1 и H3", function() {
        assert.strictEqual(deepComp(H1, H3), false);
    });

    it ("сравнивает H1 и H4", function() {
        assert.strictEqual(deepComp(H1, H4), false);
    });

    it ("сравнивает H1 и H5", function() {
        assert.strictEqual(deepComp(H1, H5), false);
    });

    it ("сравнивает H6 и H7", function() {
        assert.strictEqual(deepComp(H6, H7), true);
    });

    it ("сравнивает H8 и H9", function() {
        assert.strictEqual(deepComp(H8, H9), false);
    });

    it ("сравнивает H8 и H10", function() {
        assert.strictEqual(deepComp(H8, H10), false);
    });

    it ("сравнивает null и H10", function() {
        assert.strictEqual(deepComp(null, H10), false);
    });

    it ("сравнивает H10 и null", function() {
        assert.strictEqual(deepComp(H10, null), false);
    });

    it ("сравнивает null и null", function() {
        assert.strictEqual(deepComp(null, null), true);
    });

    it ("сравнивает null и undefined", function() {
        assert.strictEqual(deepComp(null, undefined), false);
    });

    it ("сравнивает 5 и '5'", function() {
        assert.strictEqual(deepComp(5, '5'), false);
    });

    it ("сравнивает 5 и H1", function() {
        assert.strictEqual(deepComp(5, H1), false);
    });

    it ("сравнивает A1 и H1", function() {
        assert.strictEqual(deepComp(A1, H1), false);
    });

    it ("сравнивает A2 и A3", function() {
        assert.strictEqual(deepComp(A2, A3), false);
    });

    it ("сравнивает {a:5,b:undefined} и {a:5,c:undefined}", function() {
        assert.strictEqual(deepComp({a:5,b:undefined}, {a:5,c:undefined}), false);
    });

    it ("сравнивает [5,7] и {0:5,1:7}", function() {
        assert.strictEqual(deepComp([5,7],{0:5,1:7}), false);
    });

    it ("сравнивает [5,7] и {0:5,1:7,length:2}", function() {
        assert.strictEqual(deepComp([5,7],{0:5,1:7,length:2}), false);
    });

    it ("сравнивает 'aaa' и 'bbb'", function() {
        assert.strictEqual(deepComp("aaa","bbb"), false);
    });

    it ("сравнивает Number.NaN и Number.NaN", function() {
        assert.strictEqual(deepComp(Number.NaN,Number.NaN), true);
    });
})
describe("deepCopy", function() {

    describe("проводит глубокое копирование объекта", function() {

        var h1={ a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };
        var h2=deepCopy(h1);

        it ("исходный и новый объект не должны быть равны", function() {
            assert.notStrictEqual(h1,h2);
        });

        it ("соответствующие строковые элементы объектов должны быть равны", function() {
            assert.strictEqual(h1.a,h2.a);
        });

        it ("соответствующие элементы объектов в виде объектов не должны быть равны", function() {
            assert.notStrictEqual(h1.b,h2.b);
        });

        it ("соответствующие строковые элементы вложенных объектов должны быть равны", function() {
            assert.strictEqual(h1.b.b1,h2.b.b1);
        });

        it ("соответствующие элементы объектов в виде массивов не должны быть равны", function() {
            assert.notStrictEqual(h1.c,h2.c);
        });

        it ("соответствующие строковые элементы вложенных массивов должны быть равны", function() {
            assert.strictEqual(h1.c[0],h2.c[0]);
        });

        it ("соответствующие элементы объектов со значениями null должны быть равны", function() {
            assert.strictEqual(h1.d,h2.d);
        });

        it ("соответствующие элементы объектов со значениями undefined должны быть равны", function() {
            assert.strictEqual(h1.e,h2.e);
        });

        it ("элемент Number.NaN нового объекта должен быть NaN", function() {
            assert.isTrue(isNaN(h2.f));
        });

        it ("вложенный массив нового объекта является массивом", function() {
            assert.isTrue(h2.c instanceof Array);
        });
    })

    describe("проводит глубокое копирование массива", function() {

        var a1=[ 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN];
        var a2=deepCopy(a1);

        it ("исходный и новый массив не должны быть равны", function() {
            assert.notStrictEqual(a1,a2);
        });

        it ("тип исходного и нового массива должны быть равны", function() {
            assert.strictEqual(typeof(a2),typeof(a1));
        });

        it ("соответствующие строчные элементы массивов должны быть равны", function() {
            assert.strictEqual(a1[0],a2[0]);
        });

        it ("соответствующие элементы массивов в виде объектов не должны быть равны", function() {
            assert.notStrictEqual(a1[1],a2[1]);
        });

        it ("соответствующие строковые элементы вложенных объектов должны быть равны", function() {
            assert.strictEqual(a1[1].b1,a2[1].b1);
        });

        it ("соответствующие элементы массивов в виде массивов не должны быть равны", function() {
            assert.notStrictEqual(a1[2],a2[2]);
        });

        it ("соответствующие строковые элементы вложенных массивов должны быть равны", function() {
            assert.strictEqual(a1[2][0],a2[2][0]);
        });

        it ("соответствующие элементы массивов со значениями null должны быть равны", function() {
            assert.strictEqual(a1[3],a2[3]);
        });

        it ("соответствующие элементы массивов со значениями undefined должны быть равны", function() {
            assert.strictEqual(a1[4],a2[4]);
        });

        it ("элемент Number.NaN нового массива должен быть NaN", function() {
            assert.isTrue(isNaN(a2[5]));
        });

        it ("вложенный массив нового массива является массивом", function() {
            assert.isTrue(a2[2] instanceof Array);
        });
    });

    describe("копирование строки", function() {

        var v1="sss";
        var v2=deepCopy(v1);

        it ("тип исходной и новой строки должны быть равны", function() {
            assert.strictEqual(typeof(v2),typeof(v1));
        });

        it ("исходная и новая строка должны быть равны", function() {
            assert.strictEqual(v1,v2);
        });
    });

    describe("копирование null", function() {

        var z1=null;
        var z2=deepCopy(z1);

        it ("тип исходного и нового значения должны быть равны", function() {
            assert.strictEqual(typeof(z2),typeof(z1));
        });

        it ("исходное и новое значение должны быть равны", function() {
            assert.strictEqual(z1,z2);
        });
    });

    describe("копирование Number.NaN", function() {

        var n1=Number.NaN;
        var n2=deepCopy(n1);

        it ("тип исходного и нового значения должны быть равны", function() {
            assert.strictEqual(typeof(n2),typeof(n1));
        });

        it ("новое значение должно быть NaN", function() {
            assert.isTrue(isNaN(n2));
        });
    }); 
});
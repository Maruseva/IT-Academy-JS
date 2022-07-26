function HashStorageFunc () {

    this.obj = {};

    this.addValue = function (key,value) {

        this.obj[key] = value;
    }

    this.getValue = function (key) {

        return this.obj[key];
    }

    this.deleteValue = function (key) {

        if (!(key in this.obj)) {
            return false;
        } else {
            delete this.obj[key];
            return true;
        }
    }

    this.getKeys = function () {

        let arr = [];

        for (key in this.obj) {

            arr.push(key);
        }

        return arr;
    }
}

let drinkStorage = new HashStorageFunc ();

let add = document.getElementById('add');
add.addEventListener('click', function () {
    let nameDrink = prompt('Название напитка');
    let alco = confirm('Напиток алкогольный?');
    let recipe = prompt('Рецепт напитка');
    drinkStorage.addValue(nameDrink, [alco, recipe]);
    console.log(drinkStorage.obj)
});

let get_value = document.getElementById('get_value');
get_value.addEventListener('click', function () {
    let nameDrink = prompt('Название напитка');
    let info = drinkStorage.getValue(nameDrink);

    let alcoAlert;

    if (info === undefined) {
        console.log("Такого напитка нет")
    } else {
        if (info[0] === true) {
            alcoAlert = "да"
        } else {
            alcoAlert = "нет"
        };

        console.log(`
        напиток: ${nameDrink};
        aлкогольный: ${alcoAlert};
        рецепт: ${info[1]}`);
    }
});

let deleteDrink = document.getElementById('delete');
deleteDrink.addEventListener('click', function () {
    let nameDrink = prompt('Название напитка');

    if (drinkStorage.deleteValue (nameDrink) === false) {
        console.log("Такого напитка нет");
    } else {
        console.log("Напиток удален");
    }
})

let get_keys = document.getElementById('get_keys');
get_keys.addEventListener('click', function () {
    console.log(drinkStorage.getKeys())
})




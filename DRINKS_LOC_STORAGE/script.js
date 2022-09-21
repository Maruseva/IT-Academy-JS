class HashStorageClass {

    constructor (key) {

        this.key = key;

        if(localStorage[this.key]) {
            this.obj = JSON.parse(localStorage[this.key]);
        } else {
            this.obj = {};
        }
    }

    addValue (key,value) {

        this.obj[key] = value;
        localStorage[this.key] = JSON.stringify(this.obj);
    }

    getValue (key) {

        return this.obj[key];
    }

    deleteValue (key) {

        if (!(key in this.obj)) {
            return false;
        } else {
            delete this.obj[key];
            localStorage[this.key] = JSON.stringify(this.obj);
            return true;
        }
    }

    getKeys () {

        let arr = [];

        for (let key in this.obj) {

            arr.push(key);
        }

        return arr;
    }
}

let drinkStorage = new HashStorageClass ('drink');

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

let dishStorage = new HashStorageClass ("dish");

let addDish = document.getElementById('add_dish');
addDish.addEventListener('click', function () {
    let nameDish = prompt('Название блюда');
    let desert = confirm('Это десерт?');
    let recipeDish = prompt('Рецепт блюда');
    dishStorage.addValue(nameDish, [desert, recipeDish]);
    console.log(dishStorage.obj)
});

let getValueDish = document.getElementById('get_value_dish');
getValueDish.addEventListener('click', function () {
    let nameDish = prompt('Название блюда');
    console.log(nameDish)
    let infoDish = dishStorage.getValue(nameDish);

    let desetrAlert;

    if (infoDish === undefined) {
        console.log("Такого блюда нет")
    } else {
        if (infoDish[0] === true) {
            desetrAlert = "да"
        } else {
            desetrAlert = "нет"
        };

        console.log(`
        блюдо: ${nameDish};
        десерт: ${desetrAlert};
        рецепт: ${infoDish[1]}`);
    }
});

let deleteDish = document.getElementById('delete_dish');
deleteDish.addEventListener('click', function () {
    let nameDish = prompt('Название блюда');

    if (dishStorage.deleteValue (nameDish) === false) {
        console.log("Такого блюда нет");
    } else {
        console.log("Блюдо удалено");
    }
})

let getKeysDish = document.getElementById('get_keys_dish');
getKeysDish.addEventListener('click', function () {
    console.log(dishStorage.getKeys())
})
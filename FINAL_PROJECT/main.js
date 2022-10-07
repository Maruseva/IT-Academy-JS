'use strict'

window.onhashchange = changeURL;

var SPAState = {};

const buttons = ['ИГРАТЬ', 'РЕКОРДЫ', 'ОБ ИГРЕ'];
const page = document.getElementById('page');

function changeURL() {
    
    var currentHach = window.location.hash;
    var currentHachJSON = decodeURIComponent(currentHach.substring(1));

    if(!(currentHachJSON)) {
        SPAState.pageName = 'main';
    } else {
        SPAState = JSON.parse(currentHachJSON);
    }

    if(page.childNodes.length) {
        page.removeChild(page.firstChild);
    } 

    switch (SPAState.pageName) {
        case 'main':
            canvas.style.display = 'none';
            let newDiv = document.createElement('div');
            let arrBtn = [];
            newDiv.style.cssText = "background-image: url(img/background.jpeg); height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;";

            for(let i = 0; i < buttons.length; i++) {
                let btn = document.createElement('div');
                btn.innerHTML = buttons[i];
                btn.style.cssText = 'background: url(img/btn.png) no-repeat; background-size: contain; box-sizing: border-box; width: 420px; height: 74px; cursor: pointer; text-align: center; font-family: Stalinist One; font-size: 26px; padding-top: 20px;';
                newDiv.appendChild(btn);
                arrBtn[i] = btn;
            }
            arrBtn[0].addEventListener('click', goGame);
            arrBtn[1].addEventListener('click', goRecords);
            arrBtn[2].addEventListener('click', goRules);
            page.appendChild(newDiv);
            break;
        case 'game': 
            canvas.style.display = 'block';
            break;
        case 'rules':
            canvas.style.display = 'none';
            let newDiv1 = document.createElement('div');
            newDiv1.style.cssText = "background-image: url(img/background.jpeg); height: 100vh; display: flex; justify-content: center; align-items: center;";
            let divRules = document.createElement('div');
            divRules.style.cssText = "text-align: center; font-family: Stalinist One; font-size: 21px; color: gainsboro; width: 1000px;";
            divRules.innerHTML = 'Три в ряд — жанр компьютерных игр. Игры этого жанра характеризуются тем, что их игровой мир состоит из таблицы или сетки элементов, а задачей игрока является манипулирование элементами таким образом, чтобы совпали заданные игрой шаблонные комбинации, и после выполнения условия собранные элементы исчезают. Характерным представителем этого жанра является выпущенная в 2001 году игра Bejeweled, основанная на игре 1994 года «Шарики», а сама история появления элементов жанра прослеживается до «Тетриса» и Chain Shot! , изданных в 1985 году.'
            newDiv1.appendChild(divRules);
            page.appendChild(newDiv1);
            break;
        case 'records':
            canvas.style.display = 'none';
            let newDiv2 = document.createElement('div');
            newDiv2.style.cssText = "background-image: url(img/background.jpeg); height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;";
           
            for(let j = 1; j<7; j++) {
                let divRecords = document.createElement('div');
                divRecords.style.cssText = 'background: url(img/btn.png) no-repeat; background-size: contain; box-sizing: border-box; width: 420px; height: 74px; cursor: pointer; text-align: center; font-family: Stalinist One; font-size: 20px; padding-top: 20px;';
                divRecords.innerHTML = `${j}`
                newDiv2.appendChild(divRecords);
            } 
            page.appendChild(newDiv2);
            break;
    }
}

function goGame() {
    SPAState.pageName = 'game';
    updateNewState (SPAState)
}
function goRecords() {
    SPAState.pageName = 'records';
    updateNewState (SPAState)
}
function goRules() {
    SPAState.pageName = 'rules';
    updateNewState (SPAState)
}
function updateNewState (newState) {
    location.hash = encodeURIComponent(JSON.stringify(newState));
}
changeURL()

function gameEnd() {
    if (!(page.childNodes.length)) {
        const form = document.createElement('form');
        form.style.cssText = `background-image: url(img/background.jpeg);position: fixed; left: ${windowInnerWidth / 2 - 200}px; top: ${windowInnerHeight / 2 - 140}px; width: 400px; height: 280px; border-radius: 40px; font-family: Stalinist One; text-align: center; color: gainsboro; display: flex; flex-direction: column; justify-content: center; align-items: center;`
        const span = document.createElement('span');
        span.innerHTML = `Ваш результат: ${game.points} 
        Введите ваше имя:`;
        const input = document.createElement('input');
        input.type = 'text';
        const btn = document.createElement('div');
        input.style.cssText = 'background: gainsboro; border-radius: 8px; width: 250px; height: 35px; margin: 6px 0; font-family: Stalinist One; font-size: 20px; text-align: center;'
        btn.innerHTML = 'Новая игра';
        btn.style.cssText = 'background: url(img/btn.png) no-repeat; background-size: contain; box-sizing: border-box; width: 310px; height: 74px; cursor: pointer; padding-top: 15px;';
        form. appendChild(span);
        form. appendChild(input);
        form. appendChild(btn);
        page.appendChild(form);

        let userName = input.value;
        // console.log(gamersName)

        btn.addEventListener('click', saveUserData);
    } 
}

function saveUserData (event) {
    console.log(event)
}
'use strict'
window.onhashchange = changeURL;
const sound = document.getElementById('sound');
sound.addEventListener('click', turnOffSound)

const backgroundAudio = new Audio('musik/muzyka.mp3');
backgroundAudio.loop = true;
const matchAudio = new Audio('musik/heartwav.mp3');
var SPAState = {};
const buttons = ['ИГРАТЬ', 'РЕКОРДЫ', 'ОБ ИГРЕ'];
const page = document.getElementById('page');
let sp = new URLSearchParams();
sp.append('n', 'MARUSEVA_ALIENS_TABLEOFRECORDS');

async function changeURL(event) {
    
    var currentHach = window.location.hash;
    var stateStr = currentHach.substring(1);

    if(!(stateStr)) {
        SPAState.pageName = 'main';
    } else {
        SPAState = {pageName: stateStr};
    }

    if(page.childNodes.length) {
        page.removeChild(page.firstChild);
    } 

    switch (SPAState.pageName) {
        case 'main':
            game.stop()
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
            if(!(event)) {
                window.location.hash = '';
            } else{
                canvas.style.display = 'block';
                game.gameState = 0;
                game.start();
            }
            window.onbeforeunload = befUnload;
            window.onclose = befUnload;
            // window.onhashchange= befUnload;
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
           
            let data = await processingData ('READ');
            let dataArr = JSON.parse(data.result);
            dataArr.sort(( a, b ) => b.points - a.points);

            for(let j = 1; j<7; j++) {
                let divRecords = document.createElement('div');
                divRecords.style.cssText = 'background: url(img/btn.png) no-repeat; background-size: contain; box-sizing: border-box; width: 420px; height: 74px; color: gainsboro; text-align: center; font-family: Stalinist One; font-size: 20px; padding-top: 23px;';
                divRecords.innerHTML = `${j}. ${dataArr[j-1].name}: ${dataArr[j-1].points}`
                newDiv2.appendChild(divRecords);
            } 
            page.appendChild(newDiv2);
            break;
    }
}

changeURL()

function goGame() {
    SPAState.pageName = 'game';
    updateNewState (SPAState);
    audioMatchInit()
}
function goRecords() {
    SPAState.pageName = 'records';
    updateNewState (SPAState);
}
function goRules() {
    SPAState.pageName = 'rules';
    updateNewState (SPAState);
}
function updateNewState (newState) {
    location.hash = newState.pageName;
}

function gameEnd() {
    if (!(page.childNodes.length)) {

        const form = document.createElement('form');
        form.style.cssText = `background-image: url(img/background.jpeg);position: fixed; left: ${windowInnerWidth / 2 - 200}px; top: ${windowInnerHeight / 2 - 140}px; width: 400px; height: 280px; border-radius: 40px; font-family: Stalinist One; text-align: center; color: gainsboro; display: flex; flex-direction: column; justify-content: center; align-items: center;`
        const span = document.createElement('span');
        span.innerHTML = `Ваш результат: ${game.points} 
        Введите ваше имя:`;
        const input = document.createElement('input');
        input.type = 'text';
        if(localStorage['aliens']) {
            input.value = `${JSON.parse(localStorage['aliens'])}`;
        }
        const btn = document.createElement('div');
        input.style.cssText = 'background: gainsboro; border-radius: 8px; width: 250px; height: 35px; margin: 6px 0; font-family: Stalinist One; font-size: 20px; text-align: center;'
        btn.innerHTML = 'Сохранить';
        btn.style.cssText = 'background: url(img/btn.png) no-repeat; background-size: contain; box-sizing: border-box; width: 310px; height: 74px; cursor: pointer; padding-top: 15px;';
        form. appendChild(span);
        form. appendChild(input);
        form. appendChild(btn);
        page.appendChild(form);
       
        btn.addEventListener('click', saveUserData);
    }
}

async function saveUserData () {
    let userName = document.getElementsByTagName('input')[0].value;

    if(!(localStorage['aliens'])) {
        localStorage['aliens'] = JSON.stringify(userName);
    }

    if(!(userName)) {
        return
    }

    let userData = {'name': userName, 'points': game.points};
    let updatePassword = Math.random();
    sp.append('p', updatePassword);

    let data = await processingData ('LOCKGET');
    let dataArr = JSON.parse(data.result);
    dataArr.push(userData);

    const str = JSON.stringify(dataArr)
    sp.append('v', str);
    processingData ('UPDATE')

    game.movesGame = 20;
    game.points = 0;
    board.cells = [];
    
    page.removeChild(page.firstChild);
}

async function processingData (command) { 
    const ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
    sp.append('f', command);
    
    try {
        const response = await fetch(ajaxHandlerScript,{ method: 'post', body: sp });
        const data = await response.json();
        return data
    }
    catch ( error ) {
        console.error(error);
    }
}

function audioMatchInit() {
    if(matchAudio.currentTime > 1) {
        return;
    }
    matchAudio.play(); 
    matchAudio.pause();
    matchAudio.currentTime = 2;
}

function matchSound() {
    if(matchAudio.currentTime > 1) {
        matchAudio.currentTime = 0;
        matchAudio.playbackRate = 0.4;
        matchAudio.play();
    }
}

function vibro() {
    if ( navigator.vibrate ) {
        // вибрация 100мс
        window.navigator.vibrate(100);
    }
}

function befUnload(event) {
    if(game.movesGame < 20) {
        event.returnValue = 'Данные не будут сохранены!'
    }
}

function turnOffSound() {
    if(sound.dataset.status === 'stop') {
        backgroundAudio.play(); 
        sound.dataset.status = 'play';
        sound.style.width = '40px';
    } else {
        backgroundAudio.pause();
        sound.dataset.status = 'stop';
        sound.style.width = '70px';
    }
}
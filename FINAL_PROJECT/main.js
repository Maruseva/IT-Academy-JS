'use strict'

window.onhashchange = changeURL;

var SPAState = {};

const buttons = ['СТАРТ', 'РЕКОРДЫ', 'ПРАВИЛА ИГРЫ']

var currentHach = window.location.hash;
var currentHachJSON = decodeURIComponent(currentHach.substring(1));

if(!(currentHachJSON)) {
    SPAState.pageName = 'main';
} else {
    SPAState = JSON.parse(currentHachJSON);
}

function changeURL() {
    const page = document.getElementById('page');
    let newDiv = document.createElement('div');

    switch (SPAState.pageName) {
        case 'main':
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
            break;
        case 'game': 
            let canvas = document.createElement('canvas');
            canvas.id = 'canvas';
            newDiv.appendChild(canvas);
            break;
    }

    page.appendChild(newDiv);
}

function goGame() {
    SPAState.pageName = 'game';
    updateNewState (SPAState)
}
function goRecords() {
    SPAState.pageName = 'records';
    console.log(SPAState)
}
function goRules() {
    SPAState.pageName = 'rules';
    console.log(SPAState)
}

function updateNewState (newState) {
    location.hash = encodeURIComponent(JSON.stringify(newState));
}
changeURL()
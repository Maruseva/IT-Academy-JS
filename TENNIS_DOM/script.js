const body = document.getElementsByTagName('body');
const wrap = document.createElement('div');
const btn = document.createElement('button');
const score = document.createElement('span');
const court = document.createElement('div');
const ball = document.createElement('div');
const racquetL = document.createElement('div');
const racquetR = document.createElement('div');

court.appendChild(ball);
court.appendChild(racquetL);
court.appendChild(racquetR);
wrap.appendChild(btn);
wrap.appendChild(score);
wrap.appendChild(court);

let timer = 0;
const width = 400;
const height = 200;
const ballSize = 20;
let ballX;
let ballY;
let ballSpeedX = 2;
let ballSpeedY;
const racquetWidth = 10;
const racquetHeight = 60;
let racquetLY;
let racquetRY;
let racquetSpeedL = 0;
let racquetSpeedR = 0;
let countL = 0;
let countR = 0;

body[0].style.cssText = `display: flex; justify-content: center;`;
btn.innerText = `старт!`;
btn.style.width = `70px`;
score.innerText = `${countL} : ${countR}`;
score.style.cssText = `font-size: 35px; padding-left: 100px`;
court.style.cssText = `background: #dfdf53; width: ${width}px; height: ${height}px; border: solid 1px black; margin-top: 10px; position: relative;`;
ball.style.backgroundColor = `red`;
ball.style.borderRadius = `50%`;
ball.style.width = `${ballSize}px`;
ball.style.height = `${ballSize}px`;
ball.style.position = `absolute`;
ball.style.zIndex = `1`;

racquetL.style.width = `${racquetWidth}px`;
racquetL.style.height = `${racquetHeight}px`;
racquetL.style.background = `green`;
racquetL.style.position = `absolute`;
racquetR.style.width = `${racquetWidth}px`;
racquetR.style.height = `${racquetHeight}px`;
racquetR.style.background = `blue`;
racquetR.style.position = `absolute`;

body[0].appendChild(wrap);

function preload() {
    ballX = width / 2 - ballSize / 2;
    ballY = height / 2 - ballSize / 2;
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
    racquetLY = height / 2 - racquetHeight / 2;
    racquetRY = height / 2 - racquetHeight / 2;
    racquetL.style.top = `${racquetLY}px`;
    racquetR.style.top = `${racquetRY}px`;
    racquetR.style.left = `${width - racquetWidth}px`;
}

preload();

btn.addEventListener('click', start);
window.addEventListener('keydown', increaseSpeed);
window.addEventListener('keyup', decreaseSpeed);

function start() {
    if(!(timer)) {
        ballSpeedY = Math.random() * ((Math.random() < 0.5) ? -1 : 1);
        ballSpeedX *= ((Math.random() < 0.5) ? -1 : 1);
    
        preload();
        timer = requestAnimationFrame(tick);
    }
}

function tick() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX < racquetWidth && ballY < racquetLY+racquetHeight && ballY+ballSize > racquetLY) {
        ballSpeedX = -ballSpeedX;
        ballX = racquetWidth;
    }

    if((ballX+ballSize > width-racquetWidth) && (ballY < racquetRY+racquetHeight) && (ballY+ballSize > racquetRY)) {
        ballSpeedX = -ballSpeedX;
        ballX = width-racquetWidth-ballSize;
    }

    if(ballX <= 0) {
        ballX = 0;
        ballSpeedY = 0;
        countR += 1;
    }
    
    if(ballX + ballSize >= width) {
        ballX = width - ballSize;
        ballSpeedY = 0;
        countL += 1;
    }

    if(ballY < 0) {
        ballSpeedY = -ballSpeedY;
        ballY = 0;
    }

    if(ballY + ballSize > height) {
        ballSpeedY = -ballSpeedY;
        ballY = height - ballSize;
    }

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    if ( ballX === 0 || ballX === width - ballSize) {
        stop();
        return
    }

    if (racquetLY + racquetHeight > height) {
        racquetLY = height - racquetHeight;
    }

    if (racquetLY < 0) {
        racquetLY = 0;
    }

    if (racquetRY + racquetHeight > height) {
        racquetRY = height - racquetHeight;
    }

    if (racquetRY < 0) {
        racquetRY = 0;
    }

    racquetLY += racquetSpeedL;
    racquetL.style.top = `${racquetLY}px`;
    racquetRY += racquetSpeedR;
    racquetR.style.top = `${racquetRY}px`;
  
    requestAnimationFrame(tick);
}

function increaseSpeed(event) {
    if(event.keyCode === 16) {
        racquetSpeedL = -1;
    }

    if(event.keyCode === 17) {
        racquetSpeedL = 1;
    }

    if(event.keyCode === 38) {
        racquetSpeedR = -1;
    }

    if(event.keyCode === 40) {
        racquetSpeedR = 1;
    }  
}

function decreaseSpeed(event) {
    if(event.keyCode === 16 || event.keyCode === 17) {
        racquetSpeedL = 0;
    }

    if(event.keyCode === 38 || event.keyCode === 40) {
        racquetSpeedR = 0;
    } 
}

function stop() {
    score.innerText = `${countL} : ${countR}`;
    cancelAnimationFrame(timer);
    timer = 0;
    racquetSpeedL = 0;
    racquetSpeedR = 0;
}
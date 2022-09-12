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

const width = 400;
const height = 200;
const ballSize = 20;
let ballX;
let ballY;
let ballSpiedX = 2;
let ballSpiedY;
const racquetWidth = 10;
const racquetHeight = 60;
let racquetLY;
let racquetRY;
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

racquetL.style.width = `${racquetWidth}px`;
racquetL.style.height = `${racquetHeight}px`;
racquetL.style.background = `green`;
racquetL.style.position = `absolute`;
// `${}`;
racquetR.style.width = `${racquetWidth}px`;
racquetR.style.height = `${racquetHeight}px`;
racquetR.style.background = `blue`;
racquetR.style.position = `absolute`;
// `${}`;
// `${}`;

body[0].appendChild(wrap);

function prelude() {
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

prelude();

btn.addEventListener('click', start);

function start() {
    ballSpiedY = Math.random() * ((Math.random() < 0.5) ? -1 : 1);
    ballSpiedX *= ((Math.random() < 0.5) ? -1 : 1);

    prelude();
    requestAnimationFrame(tick);
}

function tick() {
    debugger
    ballX += ballSpiedX;
    ballY += ballSpiedY;
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    if(ballX < racquetWidth && ballY-ballSize/2 < racquetLY+racquetHeight && ballY+ballSize/2 > racquetLY) {
        ballSpiedX = -ballSpiedX;
        ballX = racquetWidth;
    }

    if((ballX+ballSize > width-racquetWidth) && (ballY-ballSize/2 < racquetRY+racquetHeight) && (ballY+ballSize/2 > racquetRY)) {
        ballSpiedX = -ballSpiedX;
        ballX = width-racquetWidth;
        console.log(ballX)
    }

    if(ballX < 0) {
        ballX = 0;
        ballSpiedY = 0;
        countR += 1;
        return stop ();
    }

    if(ballX + ballSize > width) {
        ballX = width - ballSize;
        ballSpiedY = 0;
        countL += 1;
        return stop ();
    }

    if(ballY < 0) {
        ballSpiedY = -ballSpiedY;
        ballY = 0;
    }

    if(ballY + ballSize > height) {
        ballSpiedY = -ballSpiedY;
        ballY = height - ballSize;
    }

    document.addEventListener('keydown', )

    


    
    
    
    requestAnimationFrame(tick);
}

function stop() {
    score.innerText = `${countL} : ${countR}`;
}





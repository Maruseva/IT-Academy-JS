const width = 400;
const height = 200;
const widthBtn = 70;
const heightBtn = 20;
let countL = 0;
let countR = 0;
let scoreСhange;
const racquetWidth = 10;
const racquetHeight = 60;
let racquetLY;
let racquetRY;
let racquetSpeedL = 0;
let racquetSpeedR = 0;
const ballSize = 10;
let ballX;
let ballY;
let ballSpeedX = 0;
let ballSpeedY = 0;
let ballDirectionX = 0;

const body = document.getElementsByTagName('body');
body[0].style.cssText = `display: flex; justify-content: center;`;

const canvas = document.createElement('canvas');
canvas.width = `${width}`;
canvas.height = `${height + heightBtn + 10}`;
body[0].appendChild(canvas);

const btn = document.createElement('button');
body[0].appendChild(btn);
btn.innerText = `старт!`;
btn.style.width = `${widthBtn}px`;
btn.style.height = `${heightBtn}px`;
btn.style.position = 'absolute';
btn.style.left = `${canvas.offsetLeft}px`;

requestAnimationFrame(tick);
btn.addEventListener('click', start);
window.addEventListener('keydown', increaseSpeed);
window.addEventListener('keyup', decreaseSpeed);

function preload() {
    racquetLY = height/2 + heightBtn+10 - racquetHeight/2;
    racquetRY = height/2 + heightBtn+10 - racquetHeight/2;
    ballX = width / 2;
    ballY = height/2 + heightBtn+10;
}

preload();

function start() {
    ballSpeedY = Math.random() * ((Math.random() < 0.5) ? -1 : 1);
    ballDirectionX = ((Math.random() < 0.5) ? -1 : 1);
    ballSpeedX = 2 * ballDirectionX;
    scoreСhange = true;
    
    preload();
}

function tick() {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX - ballSize < racquetWidth && ballY - ballSize < racquetLY+racquetHeight && ballY+ballSize > racquetLY) {
        ballSpeedX = -ballSpeedX;
        ballX = racquetWidth + ballSize;
    }

    if((ballX+ballSize > width-racquetWidth) && (ballY - ballSize < racquetRY+racquetHeight) && (ballY+ballSize > racquetRY)) {
        ballSpeedX = -ballSpeedX;
        ballX = width-racquetWidth-ballSize;
    }

    if(ballX - ballSize <= 0) {
        ballX = ballSize;
        ballSpeedY = 0;
    }
    
    if(ballX + ballSize >= width) {
        ballX = width - ballSize;
        ballSpeedY = 0;
    }

    if(ballY - ballSize < heightBtn + 10) {
        ballSpeedY = -ballSpeedY;
        ballY = heightBtn + 10 + ballSize;
    }

    if(ballY + ballSize  > height + heightBtn + 10) {
        ballSpeedY = -ballSpeedY;
        ballY = height + heightBtn + 10 - ballSize;
    }

    if ( ballX === ballSize || ballX === width - ballSize) {
        stop();
    }

    if (racquetLY + racquetHeight > height + heightBtn + 10) {
        racquetLY = height + heightBtn + 10 - racquetHeight;
    }

    if (racquetLY < heightBtn + 10) {
        racquetLY = heightBtn + 10;
    }

    if (racquetRY + racquetHeight > height + heightBtn + 10) {
        racquetRY = height + heightBtn + 10 - racquetHeight;
    }

    if (racquetRY < heightBtn + 10) {
        racquetRY = heightBtn + 10;
    }

    racquetLY += racquetSpeedL;
    racquetRY += racquetSpeedR;

    function stop() {
        if(scoreСhange === true) {
            if(ballX === ballSize) {
                countR += 1;
                scoreСhange = false;
            }
    
            if(ballX === width - ballSize) {
                countL += 1;
                scoreСhange = false;
            }
        }
        racquetSpeedL = 0;
        racquetSpeedR = 0;
    }

    context.beginPath();
    context.fillStyle='#dfdf53';
    context.fillRect(0, heightBtn+10 , width, height);
    context.strokeStyle='black';
    context.strokeRect(0, heightBtn+10 , width, height);
   
    context.beginPath();
    context.fillStyle = 'black';
    context.font = `normal 35px Arial`;
    context.textAlign = `center`;
    context.textBaseline = `top`;
    context.fillText (`${countL} : ${countR}`, `${width/2}`, 0);
    
    context.beginPath();
    context.fillStyle='green';
    context.fillRect(0, racquetLY, racquetWidth, racquetHeight);
    
    context.beginPath();
    context.fillStyle='blue';
    context.fillRect(width - racquetWidth, racquetRY, racquetWidth, racquetHeight);
    
    context.beginPath();
    context.fillStyle='red';
    context.arc(ballX, ballY, ballSize, 0, 360, false);
    context.fill();

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
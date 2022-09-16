const svgns = "http://www.w3.org/2000/svg";
let timer = 0;
const width = 400;
const height = 200;
const widthBtn = 70;
const heightBtn = 20;
let countL = 0;
let countR = 0;
const racquetWidth = 10;
const racquetHeight = 60;
let racquetLY;
let racquetRY;
let racquetSpeedL = 0;
let racquetSpeedR = 0;
const ballSize = 10;
let ballX;
let ballY;
let ballSpeedX = 2;
let ballSpeedY;

const body = document.getElementsByTagName('body');
body[0].style.cssText = `display: flex; justify-content: center;`;

const svg = document.createElementNS(svgns, 'svg');
svg.setAttribute ('width', `${width}`);
svg.setAttribute ('height', '400');

const btn = document.createElementNS(svgns, 'rect');
svg.appendChild(btn);
btn.setAttribute ('x', '0');
btn.setAttribute ('y', '0');
btn.setAttribute ('width', `${widthBtn}`);
btn.setAttribute ('height', `${heightBtn}`);
btn.setAttribute ('fill', 'gray');

const text = document.createElementNS(svgns, 'text');
svg.appendChild(text);
text.textContent = 'cтарт!';
text.setAttribute ('x', `${widthBtn/2}`);
text.setAttribute ('y', `15`);
text.setAttribute ('text-anchor', 'middle');

const score = document.createElementNS(svgns, 'text');
svg.appendChild(score);
score.textContent = `${countL} : ${countR}`;
score.setAttribute ('x', `${width/2}`);
score.setAttribute ('y', '25');
score.style.fontSize = '35px';
score.setAttribute ('text-anchor', 'middle');

const court = document.createElementNS(svgns, 'rect');
svg.appendChild(court);
court.setAttribute ('x', '0');
court.setAttribute ('y', `${heightBtn+10}`);
court.setAttribute ('width', `${width}`);
court.setAttribute ('height', `${height}`);
court.setAttribute ('fill', '#dfdf53');
court.setAttribute ('stroke', 'black');

const racquetL = document.createElementNS(svgns, 'rect'); 
svg.appendChild(racquetL);
racquetL.setAttribute ('width', `${racquetWidth}`);
racquetL.setAttribute ('height', `${racquetHeight}`);
racquetL.setAttribute ('fill', 'green');

const racquetR = document.createElementNS(svgns, 'rect'); 
svg.appendChild(racquetR);
racquetR.setAttribute ('width', `${racquetWidth}`);
racquetR.setAttribute ('height', `${racquetHeight}`);
racquetR.setAttribute ('fill', 'blue');

const ball = document.createElementNS(svgns, 'circle');
svg.appendChild(ball);
ball.setAttribute ('r', `${ballSize}`);
ball.setAttribute ('fill', 'red');

body[0].appendChild(svg);

function preload() {
    ballX = width / 2;
    ballY = height / 2 + heightBtn + 10;
    ball.setAttribute ('cx', `${ballX}`);
    ball.setAttribute ('cy', `${ballY}`);
    racquetLY = (height / 2 + heightBtn + 10) - racquetHeight / 2;
    racquetRY = (height / 2 + heightBtn + 10) - racquetHeight / 2;
    racquetL.setAttribute ('x', '0');
    racquetL.setAttribute ('y', `${racquetLY}`);
    racquetR.setAttribute ('x', `${width-racquetWidth}`);
    racquetR.setAttribute ('y', `${racquetRY}`);
}

preload();

btn.addEventListener ('click', start);
// window.addEventListener('keydown', increaseSpeed);
// window.addEventListener('keyup', decreaseSpeed);

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
    console.log(ballX)

    if(ballX - ballSize < racquetWidth && ballY + ballSize < racquetLY+racquetHeight && ballY-ballSize > racquetLY) {
        ballSpeedX = -ballSpeedX;
        ballX = racquetWidth - ballSize;
    }

    if((ballX+ballSize > width-racquetWidth) && (ballY + ballSize < racquetRY+racquetHeight) && (ballY+ballSize > racquetRY)) {
        ballSpeedX = -ballSpeedX;
        ballX = width-racquetWidth-ballSize;
    }

    if(ballX - ballSize <= 0) {
        ballX = ballSize;
        ballSpeedY = 0;
        countR += 1;
    }
    
    if(ballX + ballSize >= width) {
        ballX = width - ballSize;
        ballSpeedY = 0;
        countL += 1;
    }

    if(ballY - ballSize< 0) {
        ballSpeedY = -ballSpeedY;
        ballY = ballSize;
    }

    if(ballY + ballSize > height) {
        ballSpeedY = -ballSpeedY;
        ballY = height - ballSize;
    }

    ball.setAttribute ('cx', `${ballX}`);
    ball.setAttribute ('cy', `${ballY}`);

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
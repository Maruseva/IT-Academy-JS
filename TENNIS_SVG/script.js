const svgns = "http://www.w3.org/2000/svg";
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
const ballSize = 10;
let ballX;
let ballY;
let ballSpiedX = 2;
let ballSpiedY;

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
racquetL.setAttribute ('x', '0');
racquetL.setAttribute ('y', `${racquetLY}`);
racquetL.setAttribute ('width', `${racquetWidth}`);
racquetL.setAttribute ('height', `${racquetHeight}`);
racquetL.setAttribute ('fill', 'green');

const racquetR = document.createElementNS(svgns, 'rect'); 
svg.appendChild(racquetR);
racquetR.setAttribute ('x', `${width-racquetWidth}`);
racquetR.setAttribute ('y', `${racquetR}`);
racquetR.setAttribute ('width', `${racquetWidth}`);
racquetR.setAttribute ('height', `${racquetHeight}`);
racquetR.setAttribute ('fill', 'blue');

const ball = document.createElementNS(svgns, 'circle');
svg.appendChild(ball);
ball.setAttribute ('cx', `${ballX}`);
ball.setAttribute ('cy', `${ballY}`);
ball.setAttribute ('r', `${ballSize}`);
ball.setAttribute ('fill', 'red');

body[0].appendChild(svg);

btn.addEventListener('click', start);
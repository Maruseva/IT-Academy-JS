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

const btn = document.createElement('button');
body[0].appendChild(btn);
btn.innerText = `старт!`;
btn.style.width = `${widthBtn}px`;
btn.style.height = `${heightBtn}px`;

const canvas = document.createElement('canvas');
body[0].appendChild(canvas);
const context = canvas.getContext('2d');

context.beginPath();
context.fillStyle='#dfdf53';
context.fillRect(0, heightBtn+10 , width, height);
class Game {

    constructor(ctx) {
        this.ctx = ctx;
        this.cell = {};
    }

    getBackground(src) {
        this.ctx.drawImage(src, 0, 0)
    }

    getBoard(color, x, y, w, h) {
        context.beginPath();
        context.fillStyle = color;
        context.fillRect (x, y, w, h);
        context.strokeStyle = color;
        context.strokeRect (x, y, w, h);
    } 

    
}

const windowInnerWidth = window.innerWidth;
const windowInnerHeight = window.innerHeight;
const canvas = document.getElementById('canvas');
canvas.setAttribute(`width`, `${windowInnerWidth}`);
canvas.setAttribute(`height`, `${windowInnerHeight}`);
const context = canvas.getContext('2d');

let aliens = new Game(context);

const background = document.createElement('img');
background.src = `img/background.jpeg`;
aliens.getBackground(background)

document.addEventListener('load', () => {aliens.getBackground(background)});


const board = {color: 'rgba(255, 255, 255, 0.7)', w: '50', h: '50', itemsX: 9, itemsY: 9};
x = windowInnerWidth / 2 - board.w * board.itemsX / 2;
y = windowInnerHeight / 2 - board.h * board.itemsY / 2;

for (let i = 0; i < board.itemsX; i++) {
    
    for (let j = 0; j < board.itemsY; j++) {
        aliens.getBoard(board.color, x, y, board.w, board.h);
        y += Number(board.h);
    }

    y = windowInnerHeight / 2 - board.h * board.itemsY / 2;
    x += Number(board.w);
}







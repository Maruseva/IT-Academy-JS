'use strict'
class Game {

    constructor(ctx, img) {
        this.ctx = ctx;
        this.backgroundImage = img;
    }

    setBackground() {
        this.ctx.drawImage(this.backgroundImage, 0, 0)
    }

    setCell(color, x, y, w, h) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect (x, y, w, h);
        this.ctx.strokeStyle = color;
        this.ctx.strokeRect (x, y, w, h);
    } 

    start(){
        this.setBackground();
        drawBoard();
    }  
}

const windowInnerWidth = window.innerWidth;
const windowInnerHeight = window.innerHeight;
const canvas = document.getElementById('canvas');
canvas.setAttribute('width', `${windowInnerWidth}`);
canvas.setAttribute('height', `${windowInnerHeight}`);
const context = canvas.getContext('2d');
const img = document.getElementsByTagName('img');

const game = new Game(context, img[0]);
window.addEventListener('load', () => {game.start()});

const board = {color: 'rgba(255, 255, 255, 0.2)', w: '50', h: '50', itemsX: 9, itemsY: 9, cells: []};
const elementsOnSprite = [
    {x: 322, y: 322},
    {x: 0, y: 322},
    {x: 322, y: 0},
    {x: 322, y: 644},
    {x: 644, y: 0},
    {x: 644, y: 322},
    {x: 644, y: 644},];
let x = windowInnerWidth / 2 - board.w * board.itemsX / 2;
let y = windowInnerHeight / 2 - board.h * board.itemsY / 2;

function drawBoard() {
    for (let i = 0; i < board.itemsX; i++) {
        board.cells[i] = [];
        for (let j = 0; j < board.itemsY; j++) {
            let e = Math.floor (1 + Math.random() * (6 + 1 - 1));
            board.cells[i][j] = {numberPicture: e, x: x, y: y};
            game.setCell(board.color, x, y, board.w, board.h);
            context.drawImage(img[1], elementsOnSprite[e].x, elementsOnSprite[e].y, 322, 322, x, y, 50, 50);
            x += Number(board.w);
        }
        x = windowInnerWidth / 2 - board.w * board.itemsX / 2;
        y += Number(board.h);
    }

    for(let i = 0; i < (board.cells.length); i++) {
        // debugger
        for(let j = 1; j < (board.cells[i].length-1); j++) {
            if(board.cells[i][j].numberPicture === board.cells[i][j-1].numberPicture && board.cells[i][j].numberPicture === board.cells[i][j+1].numberPicture) {
                board.cells[i][j].numberPicture = null;
                board.cells[i][j-1].numberPicture = null;
                board.cells[i][j+1].numberPicture = null;
            }
            if(board.cells[i][j].numberPicture === board.cells[i-1][j].numberPicture && board.cells[i][j].numberPicture === board.cells[i+1][j].numberPicture) {
                board.cells[i][j].numberPicture = null;
                board.cells[i-1][j].numberPicture = null;
                board.cells[i+1][j].numberPicture = null;
            }
        }
    }
}
console.log(board.cells)




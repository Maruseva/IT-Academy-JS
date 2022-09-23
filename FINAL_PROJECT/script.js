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
const minCount = 3;
let x = windowInnerWidth / 2 - board.w * board.itemsX / 2;
let y = windowInnerHeight / 2 - board.h * board.itemsY / 2;
// debugger
function drawBoard() {
    for (let i = 0; i < board.itemsX; i++) {
        board.cells[i] = [];
        for (let j = 0; j < board.itemsY; j++) {
            let e = Math.floor (1 + Math.random() * (6 + 1 - 1));
            board.cells[i][j] = {numberPicture: e, x: x, y: y};
            game.setCell(board.color, x, y, board.w, board.h);
            context.drawImage(img[1], elementsOnSprite[e].x, elementsOnSprite[e].y, 322, 322, x, y, board.w, board.h);
            x += Number(board.w);
        }
        x = windowInnerWidth / 2 - board.w * board.itemsX / 2;
        y += Number(board.h);
    }

    for(let i = 0; i < (board.cells.length); i++) {
        for(let j = 0; j < board.cells[i].length; j++) {
            for(let n = j + 1; n < board.cells[i].length; n++) {
                if(board.cells[i][j].numberPicture !== board.cells[i][n].numberPicture){
                    if(n - j >= minCount) {
                        updatNumberPictureHorizontal(i, j, n);
                    }
                    j = n-1;
                    break
                }
                if((board.cells[i][j].numberPicture === board.cells[i][n].numberPicture) && (n === board.cells[i].length - 1)){
                    if(n + 1 - j >= minCount) {
                        updatNumberPictureHorizontal(i, j, n+1);
                    }
                }
            }    
        }
    }
    // debugger
    for(let i = 0; i < (board.cells.length); i++) {
        for(let j = 0; j < board.cells[i].length; j++) {
            for(let n = i + 1; n < board.cells.length; n++) {
                if(board.cells[i][j].numberPicture !== board.cells[n][j].numberPicture){
                    if(n - i >= minCount) {
                        updatNumberPictureVertical(i, n, j);
                    }
                    i = n;
                }
                if((board.cells[i][j].numberPicture === board.cells[n][j].numberPicture) && (n === board.cells.length - 1)){
                    if(n + 1 - i >= minCount) {
                        updatNumberPictureVertical(i, n+1, j);
                    }
                }
            }    
        }
    }
}

function updatNumberPictureHorizontal(numArrey, startIndex, endIndex) {
    for(let i = 0; i < (board.cells.length); i++) {
        if(i === numArrey) {
            for(let j = startIndex; j < endIndex; j++) {
                board.cells[i][j].numberPicture = null;
            }
        }
    }
}

function updatNumberPictureVertical(startNumArrey, endNumArrey, index) {
    for(let i = 0; i < (board.cells.length); i++) {
        for(let j = 0; j < board.cells[i].length; j++) {
            if((i >= startNumArrey && i < endNumArrey) && (j === index)) {
                board.cells[i][j].numberPicture = null;
            }
        }  
    }
}
console.log(board.cells)




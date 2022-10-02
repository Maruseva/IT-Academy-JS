'use strict'
class Game {

    constructor(ctx, img) {
        this.ctx = ctx;
        this.backgroundImage = img;
        this.gameState = 0; /* 0 - выстраивается игровое поле, 1 - поиск совпадений; 2 - удаление картинок, 3 - смещение картинок, 4 - перетягивание картинок */
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
        if(this.gameState === 1) {
            checkMatch();
        }
        if(this.gameState === 2) {
            removeMatchingPictures ()
        }
        if(this.gameState === 3) {
            movePictures()
        }
        requestAnimationFrame(this.start.bind(this));
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
window.addEventListener('load', () => {
    game.start();
    });

document.addEventListener('pointerdown', pointerdownPicture);

const board = {color: 'rgba(255, 255, 255, 0.2)', w: '50', h: '50', itemsX: 9, itemsY: 9, cells: []};
const elementsOnSprite = [
    {x: 322, y: 322},
    {x: 0, y: 322},
    {x: 322, y: 0},
    {x: 322, y: 644},
    {x: 644, y: 0},
    {x: 644, y: 322},
    {x: 644, y: 644},];
const spriteMatch = [
    {x: 0, y: 0},
    {x: 256, y: 0},
    {x: 512, y: 0},
    {x: 768, y: 0},
    {x: 0, y: 256},
    {x: 256, y: 256},
    {x: 512, y: 256},
    {x: 768, y: 256},
    {x: 0, y: 512},
    {x: 256, y: 512},
    {x: 512, y: 512},
    {x: 768, y: 512},
    {x: 0, y: 768},
    {x: 256, y: 768},
    {x: 512, y: 768},
    {x: 768, y: 768},
    {x: 0, y: 1024},
    {x: 256, y: 1024},
    {x: 512, y: 1024},
    {x: 768, y: 1024},
];

function drawBoard() {
    game.gameState = 1;
    let x = windowInnerWidth / 2 - board.w * board.itemsX / 2;
    let y = windowInnerHeight / 2 - board.h * board.itemsY / 2;
    for (let i = 0; i < board.itemsX; i++) {
        if(!(board.cells[i])) {
            board.cells[i] = [];
        }
        for (let j = 0; j < board.itemsY; j++) {
            if(!(board.cells[i][j])) {
                let e = Math.floor (1 + Math.random() * (6 + 1 - 1));
                board.cells[i][j] = {numberPicture: e, x: x, y: y, initialY: y, initialX: x};
            }
            game.setCell(board.color, x, y, board.w, board.h);
            if(board.cells[i][j].match) {
                game.gameState = 2;
            } else {
                const numberPicture = board.cells[i][j].numberPicture;
                const xPicture = board.cells[i][j].x;
                const yPicture = board.cells[i][j].y;
                context.drawImage(img[1], elementsOnSprite[numberPicture].x, elementsOnSprite[numberPicture].y, 322, 322, xPicture, yPicture, board.w, board.h);
            } 
            x += Number(board.w);
        }
        x = windowInnerWidth / 2 - board.w * board.itemsX / 2;
        y += Number(board.h);
    }
}

function checkMatch() {
    const minCount = 3;

    for(let row = 0; row < (board.cells.length); row++) {
        for(let column = 0; column < board.cells[row].length; column++) {
            const currentPicture = board.cells[row][column].numberPicture;
            for(let nextColumn = column + 1; nextColumn < board.cells[row].length; nextColumn++) {
                const nextPicture = board.cells[row][nextColumn].numberPicture;
                if(currentPicture !== nextPicture){
                    if(nextColumn - column >= minCount) {
                        addHorizontalMatch(row, column, nextColumn);
                    }
                    column = nextColumn - 1;
                    break
                }
                if((nextColumn + 1 - column >= minCount) && (nextColumn === board.cells[row].length - 1)){
                    addHorizontalMatch(row, column, nextColumn + 1);
                }
            }    
        }
    }
    for(let column = 0; column < board.itemsX; column++) {
        for(let row = 0; row < board.cells.length; row++) {
            const currentPicture = board.cells[row][column].numberPicture;
            for(let nextRow = row + 1; nextRow < board.cells.length; nextRow++) {
                const nextPicture = board.cells[nextRow][column].numberPicture;
                if(currentPicture !== nextPicture){
                    if(nextRow - row >= minCount) {
                        addVerticalMatch(row, nextRow, column);
                    }
                    row = nextRow - 1;
                    break;
                }
                if((nextRow + 1 - row >= minCount) && (nextRow === board.cells.length - 1)){
                    addVerticalMatch(row, nextRow + 1, column);
                }
            }    
        }
    }
}

function addHorizontalMatch(numArrey, startIndex, endIndex) {
    for(let i = 0; i < (board.cells.length); i++) {
        if(i === numArrey) {
            for(let j = startIndex; j < endIndex; j++) {
                board.cells[i][j].match = true;
            }
        }
    }
}

function addVerticalMatch(startNumArrey, endNumArrey, index) {
    for(let i = 0; i < (board.cells.length); i++) {
        for(let j = 0; j < board.cells[i].length; j++) {
            if((i >= startNumArrey && i < endNumArrey) && (j === index)) {
                board.cells[i][j].match = true;
            }
        }  
    }
}

function removeMatchingPictures () {
    for(let i = 0; i < (board.cells.length); i++) {
        for(let j = 0; j < board.cells[i].length; j++) {
            if('match' in board.cells[i][j]) {
               const obj = board.cells[i][j];
               const count_step = 3;
   
               if(!(obj.count)) {
                   obj.count = 0;
               }
               if(!(obj.numSprite)) {
                   obj.numSprite = 0;
               }
               if(!(obj.opacity)) {
                   obj.opacity = 1;
               }
           
               if(obj.count < count_step && obj.numSprite < spriteMatch.length) {
                   if (obj.opacity > 0) {
                       context.save();
                       context.globalAlpha = obj.opacity;
                       context.drawImage(img[1], elementsOnSprite[obj.numberPicture].x, elementsOnSprite[obj.numberPicture].y, 322, 322, obj.x, obj.y, board.w, board.h);
                       context.restore();
                   }
                   context.drawImage(img[2], spriteMatch[obj.numSprite].x, spriteMatch[obj.numSprite].y, 256, 256, obj.x, obj.y, board.w, board.h);
                   obj.count = obj.count + 1;
               } else {
                   game.gameState = 3;
               }
               if (obj.count === count_step) {
                   obj.count = 0;
                   obj.numSprite = obj.numSprite + 1;
                   obj.opacity -= 0.1;
               }
            } 
        }
    }
}

function movePictures() {
    board.cells[0].forEach(el => {
        if ('match' in el) {
            let e = Math.floor (1 + Math.random() * (6 + 1 - 1));
            context.drawImage(img[1], elementsOnSprite[e].x, elementsOnSprite[e].y, 322, 322, el.x, el.y, board.w, board.h);
            el.numberPicture = e;
            delete el.match;
            delete el.count;
            delete el.numSprite;
            delete el.opacity;
        }
    });
    board.cells.forEach((str, i) => {
        str.forEach((col, j) => {
            if(i <  board.cells.length - 1 && 'match' in board.cells[i+1][j] && !('match' in board.cells[i][j])) {
                const currentObject = board.cells[i][j];
                const nextObject = board.cells[i+1][j];
                board.cells[i][j].y += 5;
                if (board.cells[i][j].y >= board.cells[i+1][j].y) {
                    board.cells[i][j].y = board.cells[i+1][j].y;
                    board.cells[i][j] = {...nextObject};
                    board.cells[i][j].y = currentObject.initialY;
                    board.cells[i][j].initialY = currentObject.initialY;
                    board.cells[i+1][j] = {...currentObject};
                    board.cells[i+1][j].y = nextObject.initialY;
                    board.cells[i+1][j].initialY = nextObject.initialY;
                }
            }
        });
    }); 
    console.log(game.gameState)
}

function pointerdownPicture (event) {
    let picture;

    for(let i = 0; i < (board.cells.length); i++) {
        for(let j = 0; j < board.cells[i].length; j++) {
            if(board.cells[i][j].x < event.offsetX && board.cells[i][j].y < event.offsetY && 
            event.offsetX - board.cells[i][j].x < board.w && event.offsetY - board.cells[i][j].y < board.h) {
                
                picture = board.cells[i][j];
            }
        }
    }
   
    document.addEventListener("pointermove", pointermovePicture);
    document.addEventListener("pointerup", pointerupPicture);
    
    function pointermovePicture(event) { 
        picture.x = event.offsetX - picture.x;
        picture.y = event.offsetY - picture.y;


        console.log(picture) 
    }
    function pointerupPicture(event) {
        let changePicture;
        for(let i = 0; i < (board.cells.length); i++) {
            for(let j = 0; j < board.cells[i].length; j++) {
                if(board.cells[i][j].x < event.offsetX && board.cells[i][j].y < event.offsetY && 
                event.offsetX - board.cells[i][j].x < board.w && event.offsetY - board.cells[i][j].y < board.h) {
                    
                    changePicture = board.cells[i][j];
                }
            }
        }
        console.log(picture)
        if (Math.abs(picture.initialX - changePicture.x) !== board.w && Math.abs(picture.initialY - changePicture.y) !== board.h) {
            picture.x = picture.initialX;
            picture.y = picture.initialY;
        }
        document.removeEventListener("pointermove", pointermovePicture);
        document.removeEventListener("pointerup", pointerupPicture); 
    }
}



console.log(board.cells)




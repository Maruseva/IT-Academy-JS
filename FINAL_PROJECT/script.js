'use strict'
class Game {

    constructor(ctx, img) {
        this.ctx = ctx;
        this.backgroundImage = img;
        this.gameState = 0; /* 1 - поиск совпадений; 2 - удаление картинок, 3 - смещение картинок, 4 - перетягивание картинок, 5 - стоп */
        this.movesGame = 20;
        this.points = 0;
    }

    setBackground() {
        this.ctx.drawImage(this.backgroundImage, 0, 0)
    }

    setScoreboard(x, y, w, h) {
        this.ctx.drawImage(img[3], x, y, w, h);
    }

    setMovesGame(color, font, x, y,) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        this.ctx.textAlign='left';
        this.ctx.textBaseline='middle'
        this.ctx.fillText(`ход: ${this.movesGame}`, x, y);
    }

    setPoinpsGame(color, font, x, y,) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        this.ctx.textAlign='left';
        this.ctx.textBaseline='middle'
        this.ctx.fillText(`очки: ${this.points}`, x, y);
    }

    setCell(color, x, y, w, h) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect (x, y, w, h);
        this.ctx.strokeStyle = color;
        this.ctx.strokeRect (x, y, w, h);
    } 

    start(){
        if (this.gameState !== 5) {
            this.setBackground();
            drawScoreboard();
            drawBoard();
            if(this.gameState === 1) {
                checkMatch();
            }
            if(this.gameState === 2) {
                removeMatchingPictures ();
                matchSound();
                vibro();
            }
            if(this.gameState === 3) {
                movePictures();
            }
            if(this.gameState === 4 && this.movesGame === 0) {
                gameEnd();
            }
            requestAnimationFrame(this.start.bind(this));
        }
    }  

    stop() {
        board.cells = [];
        game.movesGame = 20;
        game.points = 0;
        this.gameState = 5;
    }
}

let windowInnerWidth = window.innerWidth;
let windowInnerHeight = window.innerHeight;
const canvas = document.getElementById('canvas');
canvas.setAttribute('width', `${windowInnerWidth}`);
canvas.setAttribute('height', `${windowInnerHeight}`);
const context = canvas.getContext('2d');
const img = document.getElementsByTagName('img'); 

window.addEventListener('resize', setNewSize);

const game = new Game(context, img[0]);

document.addEventListener('pointerdown', pointerdownPicture);

const board = {color: 'rgba(255, 255, 255, 0.2)', w: '50', h: '50', itemsX: 9, itemsY: 9, cells: []};
const score = {color: 'rgba(255, 255, 255, 0.9)', font: '24px Stalinist One'}
if(windowInnerWidth < 450) {
    board.w = windowInnerWidth / board.itemsX;
    board.h = board.w;
    score.font = '20px Stalinist One'
}
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

let startBoardX = windowInnerWidth / 2 - board.w * board.itemsX / 2;
let startBoardY = windowInnerHeight / 2 - board.h * board.itemsY / 2;
let resize = false;

function setNewSize() {
    windowInnerWidth = window.innerWidth;
    windowInnerHeight = window.innerHeight;
    canvas.setAttribute('width', `${windowInnerWidth}`);
    canvas.setAttribute('height', `${windowInnerHeight}`);
    startBoardX = windowInnerWidth / 2 - board.w * board.itemsX / 2;
    startBoardY = windowInnerHeight / 2 - board.h * board.itemsY / 2;
    resize = true;
}

function drawScoreboard() {
    game.setScoreboard(startBoardX, startBoardY - board.h * 2, board.w * board.itemsX, board.h * 2);
    game.setMovesGame(score.color, score.font, startBoardX + 20, startBoardY - board.h);
    game.setPoinpsGame(score.color, score.font, startBoardX + board.w * 4, startBoardY - board.h);
}

function drawBoard() {
    game.gameState = 1;
    let x = startBoardX ;
    let y = startBoardY;

    for (let i = 0; i < board.itemsX; i++) {
        if(!(board.cells[i])) {
            board.cells[i] = [];
        }
        for (let j = 0; j < board.itemsY; j++) {
            if(!(board.cells[i][j])) {
                let e = Math.floor (1 + Math.random() * (6 + 1 - 1));
                board.cells[i][j] = {numberPicture: e, x: x, y: y, initialY: y, initialX: x};
            } else if (resize === true) {
                board.cells[i][j].x = x;
                board.cells[i][j].y = y;
                board.cells[i][j].initialX = x;
                board.cells[i][j].initialY = y;
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
    resize = false;
}

function checkMatch() {
    game.gameState = 4;
    const minCount = 3;

    for(let row = 0; row < (board.cells.length); row++) {
        for(let column = 0; column < board.cells[row].length; column++) {
            const currentPicture = board.cells[row][column].numberPicture;
            for(let nextColumn = column + 1; nextColumn < board.cells[row].length; nextColumn++) {
                const nextPicture = board.cells[row][nextColumn].numberPicture;
                if(currentPicture !== nextPicture){
                    if(nextColumn - column >= minCount) {
                        addHorizontalMatch(row, column, nextColumn);
                        game.gameState = 2;
                    }
                    column = nextColumn - 1;
                    break
                }
                if((nextColumn + 1 - column >= minCount) && (nextColumn === board.cells[row].length - 1)){
                    addHorizontalMatch(row, column, nextColumn + 1);
                    game.gameState = 2;
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
                        game.gameState = 2;
                    }
                    row = nextRow - 1;
                    break;
                }
                if((nextRow + 1 - row >= minCount) && (nextRow === board.cells.length - 1)){
                    addVerticalMatch(row, nextRow + 1, column);
                    game.gameState = 2;
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
                game.points += 10;
            }
        }
    }
}

function addVerticalMatch(startNumArrey, endNumArrey, index) {
    for(let i = 0; i < (board.cells.length); i++) {
        for(let j = 0; j < board.cells[i].length; j++) {
            if((i >= startNumArrey && i < endNumArrey) && (j === index)) {
                board.cells[i][j].match = true;
                game.points += 10;
            }
        }  
    }
}

function removeMatchingPictures() {
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
                board.cells[i][j].y += 7;
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
}

function pointerdownPicture(event) {

    if ((event.offsetX < startBoardX) || (event.offsetX > startBoardX + board.w * board.itemsX) ||
    (event.offsetY < startBoardY) || (event.offsetY > startBoardY + board.h * board.itemsY)) {
        return;
    }

    if (game.gameState === 4 && game.movesGame > 0) {
        let picture;
        let indexX;
        let indexY;

        for(let i = 0; i < (board.cells.length); i++) {
            for(let j = 0; j < board.cells[i].length; j++) {
                if(board.cells[i][j].x < event.offsetX && board.cells[i][j].y < event.offsetY && 
                event.offsetX - board.cells[i][j].x < board.w && event.offsetY - board.cells[i][j].y < board.h) {
                    
                    picture = board.cells[i][j];
                    indexY = i;
                    indexX = j;
                }
            }
        }
        
        const clikcX = event.offsetX;
        const clikcY = event.offsetY;
        const shiftLeft = clikcX - picture.initialX;
        const shiftTop = clikcY - picture.initialY;
        const pictureNumber = picture.numberPicture;
    
        document.addEventListener("pointermove", pointermovePicture);
        document.addEventListener("pointerup", pointerupPicture);
        
        function pointermovePicture(event) { 
            if (Math.abs(clikcX - event.offsetX) > Math.abs(clikcY - event.offsetY)) {
                picture.x = event.offsetX - shiftLeft;
                picture.y = picture.initialY;
            } else {
                picture.x = picture.initialX;
                picture.y = event.offsetY - shiftTop;;
            }
    
            if ((Math.abs(picture.x - picture.initialX) > board.w * 1.5) || (Math.abs(picture.y - picture.initialY) > board.h * 1.5) ||
            (picture.x < startBoardX) || (picture.x > startBoardX + board.w * (board.itemsX - 1)) || 
            (picture.y < startBoardY) || (picture.y > startBoardY + board.h * (board.itemsY - 1))) {
                pointerupPicture()
                document.removeEventListener("pointermove", pointermovePicture);
                document.removeEventListener("pointerup", pointerupPicture); 
            }
        }
        
        function pointerupPicture() {
            let changePicture;

            if ((Math.abs(picture.x - picture.initialX) < 5) && (Math.abs(picture.y - picture.initialY) < 5)) {
                picture.x = picture.initialX;
                picture.y = picture.initialY;
                document.removeEventListener("pointermove", pointermovePicture);
                document.removeEventListener("pointerup", pointerupPicture); 
                return;
            }

            if(picture.x < picture.initialX) {
                changePicture = board.cells[indexY][indexX - 1];
            } else if (picture.x > picture.initialX) {
                changePicture = board.cells[indexY][indexX + 1];
            } else if (picture.y < picture.initialY) {
                changePicture = board.cells[indexY - 1][indexX];
            } else if (picture.y > picture.initialY) {
                changePicture = board.cells[indexY + 1][indexX];
            }

            const changePictureNumber = changePicture.numberPicture;

            changePicture.numberPicture = pictureNumber;
            picture.numberPicture = changePictureNumber; 
            picture.x = picture.initialX;
            picture.y = picture.initialY;
            checkMatch();
            
            if(game.gameState !== 2) {
                changePicture.numberPicture = changePictureNumber;
                picture.numberPicture = pictureNumber; 
                picture.x = picture.initialX;
                picture.y = picture.initialY;
            } else {
                game.movesGame -= 1;
            }
    
            document.removeEventListener("pointermove", pointermovePicture);
            document.removeEventListener("pointerup", pointerupPicture); 
        }
    }  
}

/*-------------------------------- Constants --------------------------------*/
const ROWS = 6
const COLS = 5


/*---------------------------- Variables (state) -----------------------------*/
let mysteryWord 
let currentGuess
let currentRow
let gameOver

/*------------------------ Cached Element References -------------------------*/

const boardEl = document.querySelector("#board")
const keyboardEl = document.querySelector("#keyboard")
const messageEl = document.querySelector("#message")
const restartBin = document.querySelector("#restart-btn")

/*-------------------------------- Functions --------------------------------*/

function init() {
    mysteryWord = words[Math.floor(Math.random() * words.length)]

    currentGuess = ""
    currentRow = 0
    gameOver = false

    messageEl.textContent = "Good Luck!"
}

function createBoard(){
    for(let row =0; row < ROWS; row++){
            for(let col = 0; col < COLS; col++){
            
             const tile = document.createElement("div")
             tile.classList.add("tile")
             boardEl.appendChild(tile)    
    }
        
    }
}

/*----------------------------- Event Listeners ------------------------------*/

init()
createBoard()